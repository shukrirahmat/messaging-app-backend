const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const createMessage = asyncHandler(async (req, res) => {
    const sender = req.currentUsername;
    const receiver = req.body.receiver;
    const content = req.body.content;

    const message = await db.createMessage(content, sender, receiver)
    return res.json(message);
})

module.exports = {
    createMessage
}