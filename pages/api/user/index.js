import prisma from "../../../lib/prisma";

async function getUsers(req, res) {
  const users = await prisma.user.findMany({
    include: {
      orders: true,
    },
  });

  if (users.length === 0) res.status(204).send();
  else res.status(200).json(users);
}

async function createUser(req, res) {
  try {
    const newUser = await prisma.user.create({
      data: {
        publicKey: req.body.publicKey,
      },
    });
    console.log(req.body.publicKey);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
}

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      //add function
      getUsers(req, res);
      break;
    case "POST":
      createUser(req, res);
      break;
    default:
      res.status(405).send("Method dnot allowed");
  }
}
