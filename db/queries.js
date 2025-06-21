const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function createUser(username, password) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });

  return user;
}

async function findUser(username) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
}

async function getUserProfile(username) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      firstName: true,
      lastName: true,
      age: true,
      gender: true,
      from: true,
      bio: true,
      imgUrl: true,
    },
  });

  return user;
}

async function logInUser(username) {
  const user = await prisma.user.update({
    where: {
      username,
    },
    data: {
      isLoggedIn: true,
      lastVerified: new Date(),
    },
  });

  return user;
}

async function logOutUser(username) {
  const user = await prisma.user.update({
    where: {
      username,
    },
    data: {
      isLoggedIn: false,
    },
  });

  return user;
}

async function updateLastVerified(username) {
  const user = await prisma.user.update({
    where: {
      username,
    },
    data: {
      lastVerified: new Date(),
    },
  });
  return user;
}

async function getUserList(username) {
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        username: username,
      },
    },
    select: {
      username: true,
      isLoggedIn: true,
      lastVerified: true,
    },
    orderBy: {
      lastVerified: "desc",
    },
  });
  return users;
}

async function createMessage(content, sender, receiver) {
  const message = await prisma.message.create({
    data: {
      content,
      senderName: sender,
      receiverName: receiver,
      dateSend: new Date(),
    },
  });

  return message;
}

async function getChat(user1, user2) {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {
          senderName: user1,
          receiverName: user2,
        },
        {
          senderName: user2,
          receiverName: user1,
        },
      ],
    },
    orderBy: {
      dateSend: "asc",
    },
  });

  return messages;
}

module.exports = {
  createUser,
  findUser,
  getUserProfile,
  logInUser,
  logOutUser,
  getUserList,
  updateLastVerified,
  createMessage,
  getChat,
};
