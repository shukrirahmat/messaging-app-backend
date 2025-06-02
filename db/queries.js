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

async function logInUser(username) {
    const user = await prisma.user.update({
        where : {
            username
        },
        data : {
            isLoggedIn : true,
            lastVerified : new Date()
        }
    })

    return user;
}

async function logOutUser(username) {
    const user = await prisma.user.update({
        where : {
            username
        },
        data : {
            isLoggedIn : false,
        }
    })

    return user;
}

async function updateLastVerified(username) {
    const user = await prisma.user.update({
        where : {
            username
        },
        data : {
            lastVerified: new Date()
        }
    })
    return user;
}

async function getUserList() {
    const users = await prisma.user.findMany({
        select : {
            username: true,
            isLoggedIn: true,
            lastVerified: true
        }
    })
    return users
}

module.exports = {
    createUser,
    findUser,
    logInUser,
    logOutUser,
    getUserList,
    updateLastVerified
}