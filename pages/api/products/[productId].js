import prisma from "../../../lib/prisma";

// GET 1 product
// request -> id query
async function getProduct(req, res) {
  const { productId } = req.query;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        inventory: true,
      },
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).send("Product not found");
  }
}

//DELETE 1 product
async function deleteProduct(req, res) {
  const { productId } = req.query;

  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    res.status(200).json(deleteProduct);
  } catch (err) {
    res.status(404).send("Product not found");
  }
}

//PATCH update a products
// request -> name, imageUri, description, category, type, price
async function updateProduct(req, res) {
  const { productId } = req.query;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        price: req.body.price,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(404).send("product not found");
  }
}

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      getProduct(req, res);
      break;
    case "PATCH":
      updateProduct(req, res);
      break;
    case "DELETE":
      deleteProduct(req, res);
      break;
    default:
      res.status(405).send("Method not allowed");
  }
}
