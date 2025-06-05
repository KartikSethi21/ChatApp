import { compare } from "bcrypt";
import {User} from "../models/user.js";
import {Chat} from "../models/chat.js";
import { cookieOptions, emitEvent, sendToken, uploadFilesToCloudinary } from "../utils/features.js";
import { tryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Request } from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/event.js";
import {getOtherMembers} from "../lib/helper.js";

const newUser=tryCatch(async(req,res,next)=>{
    // Create a new User and Save it to  Database and save token in Cookie

    const {name,userName,password,bio}=req.body;

    // console.log(req.body);
    const file=req.file;
    if(!file) return next(new ErrorHandler("Please Upload Avatar"));

    const result=await uploadFilesToCloudinary([file]);
    const avatar={
        public_id:result[0].public_id,
        url:result[0].url,
    }
    const user=await User.create({
        name,
        bio,  
        userName,
        password,
        avatar:avatar
    }); 

    sendToken(res,user,201,"User Created") 
    // res.status(201)
    //    .json({
    //     message:"User Created Successfully"
    //     });
}
);


// Login user and save token in cookie
const login=tryCatch(async(req,res,next)=>{

    const {userName,password}=req.body;

    const user =await User.findOne({userName}).select("+password");

    if(!user) return next(new ErrorHandler("Invalid UserName or Password",404));
        // return res.status(400).json({message:"Invalid UserName"});


    const isMatch=await compare(password,user.password);

    if(!isMatch) return next(new ErrorHandler("Invalid UserName or Password",404));
    // res.status(400).json({ message:"Invalid Password"});
    sendToken(res,user,200,`Welcome Back ${user.name}`);
});


const getMyProfile=tryCatch(async(req,res,next)=>{
    const user=await User.findById(req.user) ;
    if(!user) return next(new ErrorHandler("User not found",404));
    res.status(200).json({
        success:true,
        data:req.user,
        user,
    });
    
});

const logout=tryCatch(async(req,res)=>{
    return res
    .status(200)
    .cookie("ChatToken","",{...cookieOptions,maxAge:0})
    .json({
        success:true,
        message:"Logged out Successfully",
    });
    
});

const searchUser=tryCatch(async(req,res)=>{
    const {name=""}=req.query;
    // finding all my Chats
    const myChats= await Chat.find({
        groupChat:false,
        members:req.user  
    });
    // const allUsersFrommyChats= myChats.map((chat)=>chat.members).flat();
    //flat() when there is arrays inside an array it makes all arrays comes under a single array
    
    //all users from my chats means friends or people i have chatted with
    const allUsersFromMyChats= myChats.flatMap((chat)=>chat.members);

    //Finding all users except me and my friends
    const allUsersExceptMeAndFriends= await User.find({
        _id:{$nin :allUsersFromMyChats},
        name:{$regex:name, $options:"i"},
    });
    
    // modifying the response
    const users= allUsersExceptMeAndFriends.map(({_id,name,avatar})=>({
        _id,
        name,
        avatar:avatar.url,
    }));

    return res
    .status(200)
    .json({
        success:true,
        // message:name,
        // myChats
        users,
    });
    
});

const sendFriendRequest=tryCatch(async(req,res,next)=>{
    const {userId}=req.body;
    if (!userId) {
        return next(new ErrorHandler("User ID is required", 400));
    }
    const request= await Request.findOne({
        $or:[
            {sender:req.user,receiver:userId},
            {sender:userId,receiver:req.user},
        ],
    });
    // if(request) return next(new ErrorHandler("Request already sent",400));
    if (request) {
        return res.status(400).json({ success: false, message: "Request already sent" });
    }

    await Request.create({
        sender:req.user,
        receiver:userId,
    });

    emitEvent(req,NEW_REQUEST,[userId]);

    return res
    .status(200)
    .json({
        success:true,
        message:"Friend Request Sent",
    });
    
});
 

const acceptFriendRequest=tryCatch(async(req,res,next)=>{
    const {requestId,accept}=req.body;
    const request =await Request.findById(requestId)
    .populate("sender","name")
    .populate("receiver","name");
    if(!request) return next(new ErrorHandler("Request not Found",404));

    if(request.receiver._id.toString() !== req.user.toString()) 
        return next(new ErrorHandler("You are not authorized to accept this request",401));
    
    if(!accept) {
       await request.deleteOne();
       return res
        .status(200).json({
        success:true,
        message:"Friend Request Rejected",
    });
    }

    const members=[request.sender._id,request.receiver._id];
     await Promise.all([
        Chat.create({
            members,
            name:`${request.sender.name}~${request.receiver.name}`,
        }),
    request.deleteOne(),
     ]);

    emitEvent(req,REFETCH_CHATS,members); 
    return res
    .status(200).json({
        success:true,
        message:"Friend Request Accepted",
        senderID:request.sender._id,
    });
    
});

const getMyNotifications=tryCatch(async(req,res)=>{
    const requests= await Request.find({receiver:req.user}).populate("sender","name avatar");
     
    const allRequests= requests.map(({_id,sender})=>({
        _id,
        sender:{
            _id:sender._id,
            name:sender.name,
            avatar:sender.avatar.url, 
        },
    }));
    return res.status(200).json({
        success:true,
        allRequests
    })
});

const getMyFriends=tryCatch(async(req,res)=>{
    const chatId=req.query.chatId;

    const chats=await Chat.find({
        members:req.user,
        groupChat:false,
    }).populate("members","name avatar");

    const friends=chats.map(({members})=>{
        const otherUser=getOtherMembers(members,req.user);
        
    return {
        _id:otherUser._id,
        name:otherUser.name,
        avatar:otherUser.avatar.url,
    };
    });

    if(chatId){
        const chat =await Chat.findById(chatId);
        // other members that can be added to the group
        const availableFriends=friends.filter(
            (friend)=> !chat.members.includes(friend._id)
        );
        return res.status(200).json({
            success:true,
            friends:availableFriends,
         });
    }else{
    return res.status(200).json({
        success:true,
        friends,
     });
    }
});

export {newUser,login,getMyProfile,logout,searchUser,sendFriendRequest,acceptFriendRequest,getMyNotifications,getMyFriends};