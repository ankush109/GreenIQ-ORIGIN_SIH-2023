import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";
import { getReciverSocketId, io } from "../../../socket";

const prisma = new PrismaClient();

const messageController = {
    async sendMessage(req, res, next) {
        try {
            const { message, receiverId, conversationId } = req.body;
            const senderId = req.user.id;

            let conversation;
            if (conversationId) {
                conversation = await prisma.conversation.findUnique({
                    where: {
                        id: conversationId
                    }
                });
            }

            if (!conversation) {
                conversation = await prisma.conversation.create({
                    data: {
                        participantIds: [senderId, receiverId]
                    }
                });
            }

            await prisma.chat.create({
                data: {
                    message,
                    senderId,
                    receiverId,
                    conversationId: conversation.id
                }
            });

            const reciverSocketId = getReciverSocketId(receiverId);
            if (reciverSocketId) {
                console.log(message, "message");
                console.log(reciverSocketId, "reciever");
                io.to(reciverSocketId).emit("new_message", message);
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

            const messages = await prisma.chat.findMany({
                where: {
                    conversationId: conversationId
                },
                orderBy: {
                    timestamp: 'asc'
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
            const conversations = await prisma.conversation.findMany({
                where: {
                    participantIds: {
                        has: req.user.id
                    }
                },
                include: {
                    messages: true
                }
            });

            const conversationsWithParticipants = await Promise.all(conversations.map(async (convo) => {
                const otherParticipantIds = convo.participantIds.filter(id => id !== req.user.id);

                const participants = await prisma.user.findMany({
                    where: {
                        id: {
                            in: otherParticipantIds
                        }
                    }
                });

                return {
                    ...convo,
                    participants
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
