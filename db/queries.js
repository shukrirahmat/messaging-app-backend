const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function createUser(username, password) {
    const user = await prisma.user.create({
        data : {
            username,
            password
        }
    })

    return user;
}

async function findUser(username) {
    const user = await prisma.user.findUnique({
        where : {
            username
        }
    })

    return user;
}

async function logUser(username) {
    const user = await prisma.user.update({
        where : {
            username
        },
        data : {
            isLoggedIn : true,
            lastLogDate : new Date()
        }
    })

    return user;
}

module.exports = {
    createUser,
    findUser,
    logUser
}