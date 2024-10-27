import expressAsyncHandler from "express-async-handler";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";

export const sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.error("Invalid data passed into request");
    return res.status(400).send("Invalid data");
  }

  const newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const allMessages = expressAsyncHandler(async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    console.error("Invalid data passed into request");
    return res.status(400).send("Invalid data");
  }

  try {
    const messages = await Message.find({ chat: chatId })
      // .sort({ createdAt: -1 })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
