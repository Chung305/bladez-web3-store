import prisma from "../../../../lib/prisma";

//PATCH decreases inventory quantity by 1 after being purchased
// request inventory ID
async function decrementQuantity(req, res) {
  const { inventoryId } = req.query;

  try {
    const inventory = await prisma.inventory.update({
      where: {
        id: inventoryId,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
    res.status(200).json(inventory);
  } catch (err) {
    console.log(err);
    res.status(404).send("Product inventory not found");
  }
}

export default function handler(req, res) {
  switch (req.method) {
    case "PATCH":
      decrementQuantity(req, res);
      break;
    default:
      res.status(405).send("Method not allowed");
  }
}
