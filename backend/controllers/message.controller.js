import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		// Check if conversation exists
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		// Create a new message
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		// Push message ID into the conversation's messages array
		conversation.messages.push(newMessage._id);

		// Save both the conversation and the message
		await Promise.all([conversation.save(), newMessage.save()]);

		// Emit the new message to the receiver if connected
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		// Respond with the new message
		res.status(201).json(newMessage);
	} catch (error) {
		console.error("Error in sendMessage controller:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		// Find the conversation and populate messages
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // Populate actual messages

		if (!conversation) return res.status(200).json([]);

		// Send back the messages
		const messages = conversation.messages;
		res.status(200).json(messages);
	} catch (error) {
		console.error("Error in getMessages controller:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
