export const createProduct = async (product) => {
  console.log("creating new product...");
  console.log(product);
  try {
    const response = await fetch("../api/products", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (res.status(200)) {
      return response;
    }
    console.log("product created", response);
  } catch (err) {
    console.log(err);
  }
};
