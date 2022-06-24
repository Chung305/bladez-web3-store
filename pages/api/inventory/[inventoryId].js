import prisma from "../../../lib/prisma";

async function addQuantity(req, res) {
  const { inventoryId } = req.query;

  try {
    const inventory = await prisma.inventory.update({
      where: {
        id: inventoryId,
      },
      data: {
        quantity: {
          increment: req.body.quantity,
        },
      },
    });
    res.status(200).json(inventory);
  } catch (err) {
    console.log(err);
    res.status(404).send("product inventory not found");
  }
}

export default function handler(req, res) {
  switch (req.method) {
    case "PATCH":
      addQuantity(req, res);
      break;
    case "POST":
      break;
    default:
      res.status(405).send("Method not allowed");
  }
}
