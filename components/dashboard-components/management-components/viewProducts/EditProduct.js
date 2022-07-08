import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormText,
  Row,
  Col,
} from "reactstrap";
import { updateProduct } from "../../../../lib/controller/product";
import styles from "../../../../styles/dashboard-styles/EditProduct.module.css";
const querystring = require("querystring");

const EditProduct = (product) => {
  const {
    id,
    imageUrl,
    name,
    price,
    description,
    isHolder,
    available,
    category,
    type,
  } = product.product;

  const [productUpdate, setProductUpdate] = useState({
    name: "",
    price: 0.0,
    description: "",
    category: "",
    type: "",
  });

  // state to allow form submission
  const [confirmInventory, setConfirmInventory] = useState(false);

  useEffect(() => {
    console.log(product);
    setProductUpdate({
      name: name,
      price: price,
      description: description,
      category: category,
      type: type,
    });
    console.log(productUpdate);
  }, []);

  const formSubmit = async (event) => {
    event.preventDefault();
    console.log("function executed");
    console.log(id);
    const productId = id.toString();
    console.log(productId);

    await fetch(`../api/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productUpdate),
    })
      .then((data) => {
        if (data.status === 200) {
          alert("product updated!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <h3>ID: {id}</h3>
      <Form onSubmit={formSubmit}>
        <FormGroup row>
          <Label sm={2}>Name</Label>
          <Col sm={10}>
            <Input
              id="name"
              name="name"
              defaultValue={name}
              type="text"
              onChange={(e) => {
                setProductUpdate({ ...productUpdate, name: e.target.value });
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>price</Label>
          <Col sm={10}>
            <Input
              id="price"
              name="price"
              defaultValue={price}
              type="integer"
              onChange={(e) => {
                setProductUpdate({
                  ...productUpdate,
                  price: parseFloat(e.target.value),
                });
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              id="description"
              name="description"
              defaultValue={description}
              type="textarea"
              onChange={(e) => {
                setProductUpdate({
                  ...productUpdate,
                  description: e.target.value,
                });
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Category</Label>
          <Col sm={10}>
            <Input
              id="category"
              name="category"
              type="select"
              defaultValue={category}
              onChange={(e) => {
                setProductUpdate({
                  ...productUpdate,
                  category: e.target.value,
                });
              }}
            >
              <option value="Tshirts">Tshirts</option>
              <option value="Merchandise">Merchandise</option>
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            Type
          </Label>
          <Col sm={10}>
            <Input
              id="type"
              name="type"
              type="select"
              defaultValue={type}
              onChange={(e) => {
                setProductUpdate({ ...productUpdate, type: e.target.value });
              }}
            >
              <option value="DIGITAL">DIGITAL</option>{" "}
              <option value="PHYSICAL">PHYSICAL</option>
            </Input>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={3}>
            <Input type="submit" disabled={!confirmInventory} />
            <Input
              type="checkbox"
              onChange={(e) => {
                e.target.checked
                  ? setConfirmInventory(true)
                  : setConfirmInventory(false);
              }}
            />
            <Label>Confirm</Label>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default EditProduct;
