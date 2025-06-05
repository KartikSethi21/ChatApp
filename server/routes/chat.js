import express from "express";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from "../controllers/chat.js";
import { addMemberValidator, chatIdValidator, leaveGroupValidator, newGroupChatValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentMulter } from "../middlewares/multer.js";


const app=express.Router();


// After here user must be logged in to access the router

app.use(isAuthenticated);

app.post("/new",newGroupChatValidator(),validateHandler ,newGroupChat);

app.get("/my",getMyChats);

app.get("/my/groups",getMyGroups);

app.put("/addmembers",addMemberValidator(),validateHandler,addMembers);

app.put("/removemember",removeMemberValidator(),validateHandler,removeMembers);

app.delete("/leave/:id",leaveGroupValidator(),validateHandler,leaveGroup);

// Send Attachments
app.post("/message",attachmentMulter,sendAttachmentsValidator(),validateHandler,sendAttachments);

// Get Messages
app.get("/message/:id",chatIdValidator(),validateHandler,getMessages);


app.route("/:id")
.get(chatIdValidator(),validateHandler,getChatDetails)
.put(renameValidator(),validateHandler,renameGroup)
.delete(chatIdValidator(),validateHandler,deleteChat);

// route is used for chaining process that is on same route but different methods
// app.get("/chat/:id",A);
// app.put("/chat/:id",B);
// app.delete("/chat/:id",C);  instead use app.route("/chat/:id").get(A).put(B).delete(C);
// make shore to put it in end
export default app;