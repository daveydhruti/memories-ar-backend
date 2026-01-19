//Importing the .env file
require("dotenv").config();

//Importing the third party libraries
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

//Importing all the routes
const userRoutes = require("./routes/Users/users.js")
const authRoutes = require("./routes/Users/auth.js")
const UserProfileRoute = require("./routes/Users/Profile/ProfilePage.js")  // profile page     
const repAccRoutes = require("./routes/Users/Profile/reportAcc.js")
const userRequests = require("./routes/Users/userRequests.js")
const blockUsers = require("./routes/Users/blockedUsers.js")
const UsersFriends = require("./routes/Users/Profile/UsersFriends.js")      //DC - users friends
const searchRoute = require("./routes/Users/searchUser.js")
const users_statistics = require("./routes/Users/users_statistics.js")
const interest = require("./routes/Users/interests.js")
const userInterests = require("./routes/Users/userInterests.js")

//home page
const homePage = require("./routes/Posts/homePage.js")                    //DC - home page
const homeScrapbooks = require("./routes/Scrapbooks/scrapbookRoutes")

// posts
const SavedPosts = require("./routes/Posts/savePost.js")                   //DC - saved posts
const postComment = require("./routes/Posts/commentPost.js")           
const userPost = require("./routes/Posts/userPost.js")                 
const likePost = require("./routes/Posts/likePost.js")                 
const dislikePost = require("./routes/Posts/dislikePost.js")           
const tagUser = require("./routes/Posts/tagPost")                

// map 
const map = require("./routes/Posts/mapScreen.js")

const userPlatform = require("./routes/Users/user_platform.js")        //DC - user places
// verify account
const verifyAccount = require("./routes/Users/otpVerification")

const app = express()

// imp // DD - tag and untag usersort group routes
const groupRoutes = require("./routes/Groups/group.js");                // DD - create, edit, delete group
const groupMemberRoutes = require("./routes/Groups/groupMember.js");    // DD - add, remove, make admin, remove admin
const sendEmail = require("./utils/mail/sendEmail.js");


//Using all the thrid party functions
// app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.json({limit: '100mb'}));

app.use(express.urlencoded({limit: '100mb'}));

// auth routes
app.use("/api/auth",authRoutes) // login, register, logout, checkYser?, forgotPass, resetPass, updatePass, getId, sendOtp, verifyOtp, updatePassByEmail  

// user routes
app.use("/api/users",UserProfileRoute) // getNumOfPost, getNumOfFriends, getProfileData, getPersonalData, updateProfile, updatePersonal, deactivate, activate?, deleteAcc, verifyAcc, unverifyAcc  
app.use("/api/report",repAccRoutes) // reportAcc
app.use("/api/requests",userRequests) 
app.use("/api/block",blockUsers)
app.use("/api/search",searchRoute) 
app.use("/api/usersfriends",UsersFriends)        
app.use("/api/savedposts",SavedPosts)
app.use("/api/userStats",users_statistics)            
app.use("/api/interests",interest) 
app.use("/api/userinterests",userInterests) 

app.use("/api/userRoutes",userRoutes)
app.use("/api/homePage",homePage) 

app.use("/api/map",map)

//verify account
app.use("/api/verify",verifyAccount) // verify account 

// posts
app.use("/api/posts", userPost) // create, delete, edit post
app.use("/api/comment", postComment) // add, delete comments
app.use("/api/likes", likePost) // like and unlike posts
app.use("/api/dislikes", dislikePost) // dislike and undislike posts
app.use("/api/tagUser", tagUser) // tag and untag users

// groups
app.use("/api/groups", groupRoutes); // create, edit, delete group 
app.use("/api/groupMember", groupMemberRoutes);

//recent searches
app.use("/api/recentSearches",require("./routes/Users/recentSearches.js")); // create, delete, user searches, suggested users

//scrapbooks
app.use("/api/scrapbooks",require("./routes/Scrapbooks/scrapbookRoutes.js"));
app.use("/api/scrapUtils",require("./routes/Scrapbooks/scrapUtils.js"));

//user platform
app.use("/api/userPlatform",userPlatform);

//themes
app.use("/api/themes",require("./routes/Themes/theme.js"));



//Telling app to listen to specific port
const port = process.env.PORT || 3000
app.listen(port ,()=>{
    console.log(`Server Listening on port ${port}`)
})
