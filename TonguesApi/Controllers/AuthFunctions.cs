using TonguesApi.Models;

namespace TonguesApi.Controllers;

class AuthFunctions{
    public static string VerifyUser(string authString){
        string[] splitString = authString.Split(";");
        string userId = splitString[0];
        string emailId = splitString[1];
        return userId;
    }
}