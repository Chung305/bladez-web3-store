import prisma from "../../../lib/prisma";

async function getUser(req, res) {
  const { publicKey } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      publicKey: publicKey,
    },
  });
  if (!user) {
    res.status(404).send("user not found");
  }
  res.status(200).json(user);
}

async function deleteUser(req, res) {
  const { publicKey } = req.query;
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        publicKey: publicKey,
      },
    });
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(404).send("user not found");
  }
}

async function updateUser(req, res) {
  const { publicKey } = req.query;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        publicKey: publicKey,
      },
      data: {
        username: req.body.username,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).send("user not found");
  }
}

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      getUser(req, res);
      break;
    case "PATCH":
      updateUser(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      break;
    default:
      res.status(405).send("Method dnot allowed");
  }
}
