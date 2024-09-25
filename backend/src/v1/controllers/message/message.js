import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";
import { getReciverSocketId, io } from "../../../socket";

const prisma = new PrismaClient();

const messageController = {
async sendMessage(req, res, next) {
    try {
        const { message, receiverId, conversationId } = req.body;
        const senderId = req.user.id;

        // Check if the conversation already exists
        let conversation;
        if (conversationId) {
            // Fetch existing conversation
            conversation = await prisma.conversation.findUnique({
                where: {
                    id: conversationId
                }
            });
        }

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantIds: [senderId, receiverId]
                }
            });
        }

        // Create a new chat message
        await prisma.chat.create({
            data: {
                message,
                senderId,
                receiverId,
                conversationId: conversation.id
            }
        });
    const reciverSocketId=getReciverSocketId(receiverId);
    if(reciverSocketId){
        console.log(message,"message")
        console.log(reciverSocketId,"reciever")
        io.to(reciverSocketId).emit("new_message",message) // send the message to the client
    }
        return res.status(200).json({
            success: true,
            message: "Message sent."
        });
    } catch (err) {
        console.error(err, "Error sending message");
        return res.status(400).json({
            success: false,
            message: "Failed to send message."
        });
    }
},

async getMessage(req, res, next) {
    try {
        const { id: conversationId } = req.params;

        // Fetch all messages for a specific conversation
        const messages = await prisma.chat.findMany({
            where: {
                conversationId: conversationId
            },
            orderBy: {
                timestamp: 'asc' // Order messages by timestamp
            }
        });

        if (!messages.length) {
            return res.status(404).json({ success: false, message: 'No messages found' });
        }

        return res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error retrieving messages', error });
    }
},

async getAllConversations(req, res, next) {
    try {
        // Fetch all conversations where the user is a participant
        const conversations = await prisma.conversation.findMany({
            where: {
                participantIds: {
                    has: req.user.id
                }
            },
            include: {
                messages: true // Include messages in the response
            }
        });

        // Prepare an array to store conversations with participant details
        const conversationsWithParticipants = await Promise.all(conversations.map(async (convo) => {
            // Get participant IDs excluding the current user
            const otherParticipantIds = convo.participantIds.filter(id => id !== req.user.id);

            // Fetch user details for the other participants
            const participants = await prisma.user.findMany({
                where: {
                    id: {
                        in: otherParticipantIds
                    }
                }
            });

            // Return the conversation along with participants
            return {
                ...convo,
                participants // Add participants to the conversation object
            };
        }));

        return res.status(200).json({ success: true, message: conversationsWithParticipants });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error retrieving conversations', error });
    }
}


};

export default messageController;
