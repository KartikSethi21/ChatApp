import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { v2 as cloudinary } from "cloudinary";

// import { createGroupChats, createSingleChats ,createMessagesInAChat} from "./seeders/chat.js";

// import { createUser } from "./seeders/user.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT, START_TYPING, STOP_TYPING } from "./constants/event.js";
import { v4 as uuid } from "uuid";
import { getSocket } from "./lib/helper.js";
import { Message } from "./models/message.js";
import { corsOption } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "KartikSethi";

const userSocketIDs = new Map();

connectDB(mongoURI);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// createUser(10);
// createSingleChats(10);
// createGroupChats(10);

// createMessagesInAChat("6740a51a52798ae1cc287ba4",50);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOption,
});

app.set("io", io);

// Using middle wares
app.use(express.json()); // for json data
// app.use(express.urlencoded()); //to access form data

app.use(cookieParser());

app.use(cors(corsOption));
// Allow preflight requests for all routes
// app.options("*", cors());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// Middleware by socket for socket connect
io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});

io.on("connection", (socket) => {
  const user = socket.user;
  // console.log(user);

  userSocketIDs.set(user._id.toString(), socket.id);
  console.log("a user connected", socket.id);
  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    // console.log("New Message",data);

    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    // console.log("Emitting", messageForRealTime);

    const membersSocket = getSocket(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });

    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });
    // console.log("New Message ",messageForRealTime);

    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on(START_TYPING,({members,chatId})=>{
    console.log("typing started ",chatId);
    const membersSocket=getSocket(members);
    socket.to(membersSocket).emit(START_TYPING,{chatId});
  });

  socket.on(STOP_TYPING,({members,chatId})=>{
    console.log("typing stopped ",chatId);
    const membersSocket=getSocket(members);
    socket.to(membersSocket).emit(STOP_TYPING,{chatId});
  });


  socket.on("disconnect", () => {
    console.log("user disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${envMode} Mode`);
});

export { userSocketIDs, envMode, adminSecretKey };
