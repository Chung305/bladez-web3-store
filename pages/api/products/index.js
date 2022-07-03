import prisma from "../../../lib/prisma";

// GET all products including invetory
async function getProducts(req, res) {
  const product = await prisma.product.findMany({
    include: {
      inventory: true,
    },
  });

  if (product.length === 0) res.status(204).send();
  else res.status(200).json(product);
}

// POST create a single product not including inventory
// see -> /api/products/inventory for product inventory
async function createProduct(req, res) {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        price: req.body.price,
        onlyHolder: req.body.onlyHolder,
        available: req.body.available,
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
