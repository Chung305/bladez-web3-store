import prisma from "../../../../lib/prisma";

async function updateProductImages(req, res) {
  const { productId } = req.query;

  var images = [];

  try {
    for (var i in req.body) {
      images.push(req.body[i]);
    }
    console.log(images);

    const updatedProductImage = await prisma.product.update({
      where: {
        id: productId.toString(),
      },
      data: {
        imageUrl: {
          set: images,
        },
      },
    });
    return res.status(200).json(updatedProductImage);
  } catch (err) {
    console.log(err);
    res.status(404).send("Product not found", err);
  }
}

export default function handler(req, res) {
  switch (req.method) {
    case "PATCH":
      updateProductImages(req, res);
      break;
    default:
      res.status(405).send("Method not allowed");
  }
}
