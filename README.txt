TONGUES LANGUAGE GAMES

Tongues is an app that provides social games for language learning. In this document, I will outline 3 parts:
1. Setup for developping in a local environment 
2. Basic structure of the applications
3. API references


******************************************************

Setup instructions

******************************************************

Code
1. Open a terminal
2. CD into the directory you want to copy the code
3. git clone https://github.com/computernate/Tongues.git
4. Enter your git credentials

Server
1. Install Visual Studio Code
2. Open Tongues/TonguesDB
3. press f5 to run the code

App
1. Open a terminal and run the command ipconfig to find your local ip address
2. install node https://nodejs.org/en/download/
3. Verify that you have node (by opening a terminal and running npm -v)
4. CD into Tongues/TonguesReact
5. run npm install to install all the dependencies
6. run expo start
7. scan the QR code
/*NOTE
For now, open a terminal, run ipconfig, and get your personal ip address to make all your apicalls in the app.
We are looking at a solution to make this process easier, it just sucks for now
*/

With the server and app running, you're ready to develop


*******************************************************

Structure

*******************************************************


SERVER

	MODELS
		This shows the structure to be expected in the mongodb database
		
		The only weird things here are that there are 3 kinds of game objects:
			Game 
				Actual playable instance of a game 
			GameParent 
				The publically listed post that can create and organize games 
			UserGameBucket
				Buckets that belong to users that show basic information like if it's their turn or notifications
				

	SERVICES
		These are the connection to mongodb. When you want to make a new kind of call, do it through services

	CONTROLLERS
		Each game object should have its own controller that is based on the gamescontrollerbase to insure that serialization is handled correctly.
		Anything that can be used by multiple games (such as a join function) should be put in the base, and anything that can be done otherwise
		should be done in the individual game controller.


APP
	The app structure is more like a website. It should be fairly clear


*******************************************************

API Reference

*******************************************************

AUTH REQUIRED HEADER:
	{
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'AuthToken':user.id+";"+user.email,
		"Language":learningLanguage //Only sometimes
	}

api/Users
    Get
		Gets a list of users (to change, don't rely on this)
		
	/{ID}
		Get
			returns all user data based on an email
			
		Post
			Creates a new user 
			
		Put
			possible values
				WordModifier
			Changes a user
			
			/addLearningLanguage
				language: 1, level: 1
			Adds a language to the learning language list of the user
			
		Delete

api/Words
	/{ID}
		Get
		Post 
			WORD OBJECT: term, definition
		/newLanguage 
			Post
				WORD_BUCKET: Language1, Language2, UserId
			
		Put
			/Use/{index}
				Uses the word
			/Edit/{index}
				WORD: new term, new definition
			/Resort
				Start at the head node, sort the word list 
		DELETE 
			/{headbucketid}/{targetbucketid}/{index}
				Head bucket should be the user's head bucket, and the target bucket should be the bucket we are trying to delete from
			
		
api/Games 

	Get 
		?learningLanguage=0&NativeLanguages=1,2,3&start=5
		Filter by the REQUESTING USER's learning language, native language, and start index 
	/{ID}
		Get 
			Get by the id












