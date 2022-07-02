import prisma from "../../../../lib/prisma";

// POST creates an inventory of a product using [productId] query
// request -> size, color, quantity
async function createInventory(req, res) {
  const { productId } = req.query;

  try {
    const inventory = await prisma.product.update({
      where: {
        id: productId,
      },

      data: {
        inventory: {
          create: {
            size: req.body.size,
            color: req.body.color,
            quantity: req.body.quantity,
          },
        },
      },
    });
    res.status(200).json(inventory);
  } catch (err) {
    console.log(err);
    console.log(err);
    res.status(404).send("product not found");
  }
}

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      createInventory(req, res);
      break;
    default:
      res.status(405).send("Method dnot allowed");
  }
}
