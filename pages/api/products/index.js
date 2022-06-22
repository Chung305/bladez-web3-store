import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

async function getProducts(req, res) {
  const product = await prisma.product.findMany({
    include: {
      inventory: true,
    },
  });

  if (product.length === 0) res.status(204).send();
  else res.status(200).json(product);
}

async function createProduct(req, res) {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: req.body.name,
        imageUri: req.body.imageUri,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        price: req.body.price,
      },
    });
    res.status(200).json(newProduct);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
}

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      getProducts(req, res);
      break;
    case "POST":
      createProduct(req, res);
      break;
    default:
      res.status(405).send("Method dnot allowed");
  }
}
