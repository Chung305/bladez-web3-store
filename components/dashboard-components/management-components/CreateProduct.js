import React, { useState } from "react";
import { create } from "ipfs-http-client";
import styles from "../../../styles/dashboard-styles/CreateProduct.module.css";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";

const client = create("https://ipfs.infura.io:5001/api/v0");

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    imageUrl: [],
    price: 0,
    description: "",
    category: "",
    type: "",
    onlyHolder: false,
    available: false,
  });

  // state to allow form submission
  const [newProductConfirm, setNewProductConfirm] = useState(false);

  const [file, setFile] = useState({});
  const [uploading, setUploading] = useState(false);

  //will add a new product to database after checking the confirmation checkbox
  const addProduct = async () => {
    console.log(newProduct);

    try {
      const response = await fetch("../api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (response.status === 201) {
        alert("Product added!");
      } else {
        alert("Unable to add product: ", data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form onSubmit={addProduct} disabled={!newProductConfirm}>
        <FormGroup>
          <Label for="productName"> Product Name</Label>
          <Input
            name="productName"
            id="productName"
            required
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value });
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label for="imageUrl">Image URL</Label>
          <Input
            name="imageUrl"
            id="imageUrl"
            placeholder="ex: https://i.imgur.com/rVD8bjt.png"
            required
            onChange={(e) => {
              setNewProduct({ ...newProduct, imageUrl: e.target.value });
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            id="description"
            name="description"
            type="textarea"
            required
            onChange={(e) => {
              setNewProduct({ ...newProduct, description: e.target.value });
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            type="float"
            name="price"
            id="price"
            placeholder="Enter amount ex: 1.00"
            pattern="^\d+(.\d{1,2})?$"
            required
            onChange={(e) => {
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              });
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label for="category" sm={2}>
            Category
          </Label>

          <Input
            id="category"
            name="category"
            type="select"
            onChange={(e) => {
              setNewProduct({ ...newProduct, category: e.target.value });
            }}
          >
            <option></option>
            <option>Tshirts</option>
            <option>Merchandise</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="type" sm={2}>
            Product Type
          </Label>

          <Input
            id="type"
            name="type"
            type="select"
            onChange={(e) => {
              setNewProduct({ ...newProduct, type: e.target.value });
            }}
          >
            <option></option>
            <option>DIGITAL</option>
            <option>PHYSICAL</option>
          </Input>
        </FormGroup>

        <FormGroup check inline>
          <Input
            type="checkbox"
            name="onlyHolder"
            onChange={(e) => {
              e.target.checked
                ? setNewProduct({ ...newProduct, onlyHolder: true })
                : setNewProduct({ ...newProduct, onlyHolder: false });
            }}
          />
          <Label>NFT holders only</Label>
        </FormGroup>

        <FormGroup check inline>
          <Input
            type="checkbox"
            name="available"
            onChange={(e) => {
              e.target.checked
                ? setNewProduct({ ...newProduct, available: true })
                : setNewProduct({ ...newProduct, available: false });
            }}
          />
          <Label> Make product available</Label>
        </FormGroup>

        <FormGroup></FormGroup>

        <FormGroup>
          <Input type="submit" disabled={!newProductConfirm} />
          <Input
            type="checkbox"
            onChange={(e) => {
              e.target.checked
                ? setNewProductConfirm(true)
                : setNewProductConfirm(false);
            }}
          />
          <Label>Confirm</Label>
        </FormGroup>
      </Form>
    </div>
  );
};
// <div className={styles.background_blur}>
//   <div className={styles.create_product_container}>
//     <div className={styles.create_product_form}>
//       <header className={styles.header}>
//         <h1>Create Product</h1>
//       </header>

//       <div className={styles.form_container}>
//         <input
//           type="file"
//           className={styles.input}
//           accept=".zip,.rar,.7zip"
//           placeholder="Emojis"
//           onChange={onChange}
//         />
//         {file.name != null && <p className="file-name">{file.filename}</p>}
//         <div className={styles.flex_row}>
//           <input
//             className={styles.input}
//             type="text"
//             placeholder="Product Name"
//             onChange={(e) => {
//               setNewProduct({ ...newProduct, name: e.target.value });
//             }}
//           />
//           <input
//             className={styles.input}
//             type="text"
//             placeholder="0.01 USDC"
//             onChange={(e) => {
//               setNewProduct({ ...newProduct, price: e.target.value });
//             }}
//           />
//         </div>

//         <div className={styles.flex_row}>
//           <input
//             className={styles.input}
//             type="url"
//             placeholder="Image URL ex: https://i.imgur.com/rVD8bjt.png"
//             onChange={(e) => {
//               setNewProduct({ ...newProduct, image_url: e.target.value });
//             }}
//           />
//         </div>
//         <textarea
//           className={styles.text_area}
//           placeholder="Description here..."
//           onChange={(e) => {
//             setNewProduct({ ...newProduct, description: e.target.value });
//           }}
//         />

//         <button
//           className={styles.button}
//           onClick={() => {
//             createProduct();
//           }}
//           disabled={uploading}
//         >
//           Create Product
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
export default CreateProduct;
