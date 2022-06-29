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
  const addInventory = async () => {};

  return (
    <div>
      <h1>{productId.productId}</h1>
      <Form>
        <FormGroup>
          <Row>
            <Col>
              <Label>Size</Label>
              <Input id="size" name="size" type="select">
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
              <Input id="color" name="color" />
            </Col>

            <Col>
              <Label>Quantity</Label>
              <Input id="quantity" name="quantity" type="integer" />
            </Col>
          </Row>

          <Input type="submit" />
        </FormGroup>
      </Form>
    </div>
  );
};

export default AddInventory;
