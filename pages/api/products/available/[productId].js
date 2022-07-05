//PATCH changes current availability { true -> false } and vice versa
// request -> current products availability
export default async function handler(req, res) {
  const { productId } = req.query;

  var bool;

  if (req.body === "true") bool = true;
  else bool = false;

  if (req.method === "PATCH") {
    try {
      const updateAvailable = await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          available: bool,
        },
      });
      res.status(200).json(updateAvailable);
    } catch (err) {
      console.log(err);
      res.status(404).send("product not found");
    }
  }
}
