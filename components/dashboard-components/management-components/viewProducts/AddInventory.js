import { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";

const AddInventory = (productId) => {
  const [inventory, setInventory] = useState({
    size: "",
    color: "",
    quantity: 0,
  });

  // state to allow form submission
  const [confirmInventory, setConfirmInventory] = useState(false);

  //creates new inventory to product
  const addInventory = async () => {
    console.log(inventory);
    try {
      const response = await fetch("../api/products/inventory/" + productId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inventory),
      });
      if (response.status === 201) {
        alert("Inventory created!");
      } else {
        alert("Unable to create inventory: ", data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>{productId.productId}</h1>
      <Form onSubmit={addInventory} disabled={!confirmInventory}>
        <FormGroup>
          <Row>
            <Col>
              <Label>Size</Label>
              <Input
                id="size"
                name="size"
                type="select"
                onChange={(e) => {
                  setInventory({ ...inventory, size: e.target.value });
                }}
              >
                <option></option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </Input>
            </Col>

            <Col>
              <Label>Color</Label>
              <Input
                id="color"
                name="color"
                onChange={(e) => {
                  setInventory({
                    ...inventory,
                    color: e.target.value,
                  });
                }}
              />
            </Col>

            <Col>
              <Label>Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="integer"
                onChange={(e) => {
                  setInventory({
                    ...inventory,
                    quantity: parseInt(e.target.value),
                  });
                }}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Input type="Submit" disabled={!confirmInventory} />
          <Input
            type="checkbox"
            onChange={(e) => {
              e.target.checked
                ? setConfirmInventory(true)
                : setConfirmInventory(false);
            }}
          />
          <Label>Confirm</Label>
        </FormGroup>
      </Form>
    </div>
  );
};

export default AddInventory;
