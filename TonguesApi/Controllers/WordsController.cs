using TonguesApi.Models;
using TonguesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace TonguesApi.Controllers;

[Produces("application/json")]
[Route("api/Words")]
public class WordsController : ControllerBase
{
    private readonly WordsService _wordsService;
    private readonly UsersService _usersService;
    private static int bucketSize = 15;
    private static int basicBucketSize = 10;


    public WordsController(WordsService wordsService, UsersService usersService) {
        _wordsService = wordsService;
        _usersService = usersService;
    }
    


    
    private async Task<BasicWordBucket> UpdateUserWordBucket(User user, int languageId){

        string newBucketId = user.WordBuckets.Find(bucket => bucket.Language2 == languageId).Id;
        WordBucket oldBucket = await _wordsService.GetAsync(newBucketId);
        BasicWordBucket newBucket = new BasicWordBucket(oldBucket);

        if(newBucket.Words.Count < basicBucketSize && oldBucket.NextBucketId!=string.Empty){
            WordBucket nextBucket = await _wordsService.GetAsync(oldBucket.NextBucketId);
            newBucket.Words.AddRange(nextBucket.Words.Take(basicBucketSize-newBucket.Words.Count).ToList());
        }

        user.WordBuckets.RemoveAll(bucket => bucket.Language2 == languageId);
        user.WordBuckets.Add(newBucket);

        await _usersService.UpdateAsync(user.Id, user);

        return newBucket;
    }


    private async Task<BasicWordBucket> UpdateUserWordBucket(User user, WordBucket newBucket){

        user.WordBuckets.RemoveAll(bucket => bucket.Language2 == newBucket.Language2);

        if(newBucket.Words.Count < basicBucketSize && newBucket.NextBucketId!=string.Empty){
            WordBucket? nextBucket = await _wordsService.GetAsync(newBucket.NextBucketId);
            newBucket.Words.AddRange(nextBucket.Words.Take(basicBucketSize-newBucket.Words.Count).ToList());
        }
        BasicWordBucket basicBucket = new BasicWordBucket(newBucket);
        user.WordBuckets.Add(basicBucket);

        await _usersService.UpdateAsync(user.Id, user);

        return basicBucket;
    }



    //Get the words
    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<WordBucket>> Get(string id)
    {
        WordBucket? bucket = await _wordsService.GetAsync(id);
        if (bucket is null) return NotFound();
        return bucket;
    }



    [HttpPost("{id:length(24)}")]
    public async Task<IActionResult> Post(string id, [FromBody]Word newWord)
    {
        WordBucket? bucket = await _wordsService.GetAsync(id);
        if (bucket is null || bucket.LastBucketId != string.Empty)  return NotFound();
        //If lastBucketId exists, return an error
        User? user = await _usersService.GetIdAsync(bucket.UserId);
        if (user is null) {
            return NotFound();
        }

        newWord.calculateScore(user.WordModifier);
        Word? extraWord = await InsertWordRecursive(bucket, newWord);
        
        if(extraWord != null){
            WordBucket newBucket = new WordBucket(bucket, extraWord);
            await _wordsService.CreateAsync(newBucket);
            bucket.LastBucketId = newBucket.Id;
            await _wordsService.UpdateAsync(bucket.Id, bucket);
            BasicWordBucket returnBucket = await UpdateUserWordBucket(user, newBucket);
            return Ok(returnBucket);
        }
        else{
            BasicWordBucket returnBucket = await UpdateUserWordBucket(user, bucket);
            return Ok(returnBucket);
        }
        
    }



    [HttpPost("newLanguage")]
    public async Task<IActionResult> PostBucket([FromBody]WordBucket newBucket)
    {
        User? updateUser = await _usersService.GetIdAsync(newBucket.UserId);
        if(updateUser is null) return NotFound();

        await _wordsService.CreateAsync(newBucket);

        BasicWordBucket returnBucket = await UpdateUserWordBucket(updateUser, newBucket);
        return Ok(returnBucket);
    }



    public async Task<Word> InsertWordRecursive(WordBucket bucket, Word useWord){
        Word? returningWord = null;
        //Start recursive:
            //Try to put word in bucket
        int index = bucket.Words.BinarySearch(useWord);

        if(index >= bucket.Words.Count && bucket.NextBucketId != null){
            //If the word lands beyond the scope, and there is a next bucket, add it to the next bucket
            WordBucket? nextBucket = await _wordsService.GetAsync(bucket.NextBucketId);
            useWord = await InsertWordRecursive(nextBucket, useWord);
        }
        if(useWord == null) return null;

        //Take next bucket's output and sort it here
        index = bucket.Words.BinarySearch(useWord);
        if (index < 0)  index = ~index;
        bucket.Words.Insert(index, useWord);

        //If the bucket is full, pop and return
        if(bucket.Words.Count >= bucketSize){
            returningWord = bucket.Words[0];
            bucket.Words.RemoveAt(0);
        }
        await _wordsService.UpdateAsync(bucket.Id, bucket);
        return returningWord;
    }


    private async Task UseWordRecursive(WordBucket workingBucket, Word newWord){
        int index = workingBucket.Words.BinarySearch(newWord);
        if (index < 0)  index = ~index;
        if (index == 0){
            //If there is no last bucket, insert at 0 and return
            if(workingBucket.LastBucketId==string.Empty){
                workingBucket.Words.Insert(0, newWord);
            }
            else{
                //Get the bottom of the last bucket
                WordBucket lastBucket = await _wordsService.GetAsync(workingBucket.LastBucketId);
                Word lastWord = lastBucket.Words.Last();
                //If their word is greater, put newWord at 0 and return
                if(newWord.CompareTo(lastWord)>=0){
                    workingBucket.Words.Insert(0, newWord);
                }
                //If ours is greater, take theirs and UseWordRecursive their bucket with new word
                else{
                    workingBucket.Words.Insert(0, lastWord);
                    lastBucket.Words.RemoveAt(lastBucket.Words.Count-1);
                    UseWordRecursive(lastBucket, newWord);
                }
            }
        }
        else if(index >= workingBucket.Words.Count-1){
            //If there is no next bucket, insert at 0 and return
            if(workingBucket.NextBucketId==string.Empty){
                workingBucket.Words.Add(newWord);
            }
            else{
                //Get the bottom of the last bucket
                WordBucket nextBucket = await _wordsService.GetAsync(workingBucket.NextBucketId);
                Word nextWord = nextBucket.Words[0];
                //If their word is less, put newWord at Count and return
                if(newWord.CompareTo(nextWord)<=0){
                    workingBucket.Words.Add(newWord);
                }
                //If ours is less, take theirs and UseWordRecursive their bucket with new word
                else{
                    workingBucket.Words.Add(nextWord);
                    nextBucket.Words.RemoveAt(0);
                    UseWordRecursive(nextBucket, newWord);
                }
            }
        }
        else{
                workingBucket.Words.Insert(index, newWord);
        }
        await _wordsService.UpdateAsync(workingBucket.Id, workingBucket);
    }

    //Use a word. Add one to its times used, update the timestamp, and resort the words
    [HttpPut("{id:length(24)}/Use/{index:int}")]
    public async Task<IActionResult> UseWord(string id, int index)
    {
        //Remove the word from the bucket
        WordBucket bucket = await _wordsService.GetAsync(id);
        if(bucket is null || bucket.Words.Count <= index) return NotFound();
        Word removedWord = bucket.Words[index];
        User updateUser = await _usersService.GetIdAsync(bucket.UserId);
        bucket.Words.RemoveAt(index);

        removedWord.TimesUsed++;
        removedWord.LastUsed=DateTime.Now;
        removedWord.calculateScore(updateUser.WordModifier);

        await UseWordRecursive(bucket, removedWord);

        BasicWordBucket returnBucket = await UpdateUserWordBucket(updateUser, bucket.Language2);
        return Ok(returnBucket);
    }



    //Edits a specific word
    [HttpPut("{id:length(24)}/Edit/{index:int}")]
    public async Task<IActionResult> EditWord(string id, int index, [FromBody]Word newWord)
    {
        //Get the bucket
        WordBucket bucket = await _wordsService.GetAsync(id);
        if(bucket is null || bucket.Words.Count >= index) return NotFound();
        User updateUser = await _usersService.GetIdAsync(bucket.UserId);
        if(id == string.Empty) return NotFound();
        bucket.Words[index].Definition = newWord.Definition;
        bucket.Words[index].Term = newWord.Term;
        await _wordsService.UpdateAsync(id, bucket);
        
        BasicWordBucket returnBucket = await UpdateUserWordBucket(updateUser, bucket.Language2);
        return Ok(returnBucket);
    }



    //Delete a word
    [HttpDelete("{startId:length(24)}/{bucketId:length(24)}/{index:int}")]
    public async Task<IActionResult> DeleteWord(string startId, string bucketId, int index){
        WordBucket? checkingBucket = await _wordsService.GetAsync(startId);
        if(checkingBucket is null || checkingBucket.LastBucketId != string.Empty || checkingBucket.Words.Count >= index) return NotFound();
        Word? passingWord = null;
        User updateUser = await _usersService.GetIdAsync(checkingBucket.UserId);

        while(true){
            if(checkingBucket == null) return NotFound();

            if(passingWord != null){
                checkingBucket.Words.Insert(0, passingWord);
            }

            if(checkingBucket.Id == bucketId){
                checkingBucket.Words.RemoveAt(index);
                await _wordsService.UpdateAsync(checkingBucket.Id, checkingBucket);
                if(checkingBucket.Id != startId) checkingBucket = await _wordsService.GetAsync(startId);
                BasicWordBucket returnBucket = await UpdateUserWordBucket(updateUser, checkingBucket);
                return Ok(returnBucket);
            }

            else{

                passingWord = checkingBucket.Words.Last();
                checkingBucket.Words.RemoveAt(checkingBucket.Words.Count-1);
                await _wordsService.UpdateAsync(checkingBucket.Id, checkingBucket);

                if(checkingBucket.NextBucketId==string.Empty) return NotFound();

                if(checkingBucket.Words.Count==0) {
                    startId = checkingBucket.NextBucketId;
                    await _wordsService.RemoveAsync(checkingBucket.Id);
                    checkingBucket = await _wordsService.GetAsync(startId);
                    checkingBucket.LastBucketId="";
                }

                else checkingBucket = await _wordsService.GetAsync(checkingBucket.NextBucketId);
            }
        }
    }

    //NOTE: THIS IS THE HEAD BUCKET
    [HttpPut("{id:length(24)}/Resort")]
    public async Task<IActionResult> Sort(string id){

        List<WordBucket> allBuckets = new List<WordBucket>();
        List<Word> allWords = new List<Word>();
        WordBucket currentBucket = await _wordsService.GetAsync(id);;
        if(currentBucket is null || currentBucket.LastBucketId != string.Empty) return NotFound();
        
        while(currentBucket is not null){
            allWords.AddRange(currentBucket.Words);
            allBuckets.Insert(0, currentBucket);
            if(currentBucket.NextBucketId!=string.Empty){
                currentBucket = await _wordsService.GetAsync(currentBucket.NextBucketId);
            }
            else{
                break;
            }
        }
        
        User user = await _usersService.GetIdAsync(currentBucket.UserId);

        foreach(Word word in allWords){
            word.calculateScore(user.WordModifier);
        }

        allWords.Sort();
        List<Word> tempList;
        
        foreach(WordBucket bucket in allBuckets){
            tempList =  allWords.TakeLast(bucketSize).ToList();
            if(allWords.Count > bucketSize){
                allWords.RemoveRange(allWords.Count-bucketSize, bucketSize);
            }
            else{
                allWords = null;
            }
            bucket.Words = tempList;
            await _wordsService.UpdateAsync(bucket.Id, bucket);
            if(bucket.LastBucketId==string.Empty){
                BasicWordBucket returnBucket = await UpdateUserWordBucket(user, bucket);
                return Ok(returnBucket);
            }
        }
        

        return NoContent();
    }
}
