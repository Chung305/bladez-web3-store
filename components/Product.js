import { React, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Badge,
  Form,
  Label,
  Input,
} from "reactstrap";
import styles from "../styles/Product.module.css";
import Buy from "./Buy";

export default function Product({ product }) {
  const { id, name, price, description, imageUrl, category, type, inventory } =
    product;

  // Modal open state
  const [productModal, setProductModal] = useState(false);

  // Toggle for Modal
  const toggle = () => setProductModal(!productModal);
  console.log(product);

  return (
    <div className={styles.product_container}>
      <div>
        <img className={styles.product_image} src={imageUrl} alt={name} />
      </div>

      <div className={styles.product_details}>
        <div className={styles.product_text}>
          <div className={styles.product_title}>{name}</div>
        </div>

        <div className={styles.product_action}>
          <div className={styles.product_price}>{price} USDC</div>
          <Button type="button" onClick={toggle}>
            View
          </Button>
          <Modal
            className={styles.modal}
            size="xl"
            isOpen={productModal}
            toggle={toggle}
          >
            <ModalHeader toggle={toggle}>{name}</ModalHeader>
            <ModalBody className={styles.modalBody}>
              <img className={styles.modal_product_image} src={imageUrl} />
              <div className={styles.productDetails}>
                <div className={styles.productDetailsSpacing}>
                  {description}
                </div>
                <div className={styles.productDetailsSpacing}>
                  <Badge>{category}</Badge>
                  <Badge>{type}</Badge>
                </div>

                <div className={styles.productDetailsSpacing}>
                  <b>{price} USDC</b>
                </div>
              </div>
            </ModalBody>

            <div className={styles.modalFormContainer}>
              <Form>
                <Label>Inventory</Label>
                <Input bsSize="sm" className="mb-3" type="select">
                  <option></option>
                  {inventory.map((inv, i) => (
                    <option key={i}>
                      {inv.size} - {inv.color} - {inv.quantity} - {inv.id}
                    </option>
                  ))}
                </Input>
                <Button>Review</Button>
              </Form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
