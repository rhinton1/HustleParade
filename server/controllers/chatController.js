const Chat = require('../models/Chat');

exports.createChat = async (req, res) => {
    try {
        const { participants } = req.body; // array of participant user ids

        if (!participants || !Array.isArray(participants) || participants.length < 2) {
            return res.status(400).json({ message: 'Provide at least two participants' });
        }

        // Check if chat between these participants exists
        const existingChat = await Chat.findOne({ participants: { $all: participants, $size: participants.length } });
        if (existingChat) return res.status(400).json({ message: 'Chat already exists', chat: existingChat });

        const chat = new Chat({ participants, messages: [] });

        await chat.save();

        res.status(201).json(chat);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getChatsForUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const chats = await Chat.find({ participants: userId }).populate('participants', 'username email');
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const { text } = req.body;

        if (!text) return res.status(400).json({ message: 'Message text is required' });

        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ message: 'Chat not found' });

        // Check if user is participant
        if (!chat.participants.some(p => p.toString() === req.user.id)) return res.status(403).json({ message: 'Cannot send to this chat' });

        chat.messages.push({ sender: req.user.id, text });
        await chat.save();

        res.status(201).json(chat);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};