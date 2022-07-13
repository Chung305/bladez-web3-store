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

export const updateProduct = async (id, product) => {
  console.log(product);
  try {
    const response = await fetch(`../api/products/${id}`, {
      method: "PATCH",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    console.log("passed response");
    if (response.status === 200) {
      console.log("updated!");
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateIsHolder = async (id, isHolder) => {
  console.log(id);
  try {
    const response = await fetch(`../api/products/holders/${id}`, {
      method: "PATCH",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(isHolder),
    });
    if (response.status === 200) {
      console.log("updated!");
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateAvailable = async (id, available) => {
  try {
    const response = await fetch(`../api/products/available/${id}`, {
      method: "PATCH",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(available),
    });
    if (response.status === 200) {
      console.log("updated!");
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateProductImage = async (id, images) => {
  try {
    const response = await fetch(`../api/products/images/${id}`, {
      method: "PATCH",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(images),
    });
    if (response.status === 200) {
      console.log("updated!");
    }
  } catch (err) {
    console.log(err);
  }
};
