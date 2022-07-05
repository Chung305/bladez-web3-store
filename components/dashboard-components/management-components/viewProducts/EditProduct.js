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

  const formSubmit = async () => {
    console.log("function executed");
    try {
      const response = await fetch(`../api/products/` + id, {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productUpdate),
      });
      const data = await response.json();
      console.log("passed response");
      if (response.status === 201) {
        alert("Product updated!");
      } else {
        alert("Unable to update product: ", data.error);
      }
    } catch (err) {
      console.log(err);
    }
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

        <FormGroup check row>
          <Col
            sm={{
              offset: 2,
              size: 10,
            }}
          >
            <Button type="submit">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default EditProduct;
