const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const createMessage = asyncHandler(async (req, res) => {
    const sender = req.currentUsername;
    const receiver = req.body.receiver;
    const content = req.body.content;

    const message = await db.createMessage(content, sender, receiver)
    return res.json(message);
})

const getChat = asyncHandler(async (req, res) => {
    const user1 = req.currentUsername;
    const user2 = req.body.user;

    const messages = await db.getChat(user1, user2);
    return res.json(messages);
})

module.exports = {
    createMessage,
    getChat
}