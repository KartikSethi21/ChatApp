import { userSocketIDs } from "../app.js";

export const getOtherMembers = (members, userId) => {
  return members.find((member) => member._id.toString() !== userId.toString());
  // return other members other than userId passed
};

export const getSocket = (users) => {
  const sockets = users.map((user) => userSocketIDs.get(user.toString()));

  return sockets;
};

export const getBased64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
