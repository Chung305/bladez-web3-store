import { React, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Badge,
  UncontrolledCarousel,
  Form,
  Label,
  Input,
} from "reactstrap";
import styles from "../styles/Product.module.css";
import Buy from "./Buy";

export default function Product({ product }) {
  const { id, name, price, description, imageUrl, category, type, inventory } =
    product;
  const [imageItem, setImageItem] = useState([]);

  // Modal open state
  const [productModal, setProductModal] = useState(false);

  // Toggle for Modal
  const toggle = () => setProductModal(!productModal);
  console.log(product);

  useEffect(() => {
    const items = imageUrl.map((image, i) => {
      return {
        key: i,
        src: image,
      };
    });
    console.log(items);
    setImageItem(items);
  }, []);

  return (
    <div className={styles.product_container}>
      <div>
        <UncontrolledCarousel items={[...imageItem]} />
        {/* <img className={styles.product_image} src={imageUrl[1]} alt={name} /> */}
      </div>

      <div className={styles.product_details}>
        <div className={styles.product_text}>
          <div className={styles.product_title}>{name}</div>
        </div>

        <div className={styles.product_action}>
          <div className={styles.product_price}>${price} USDC</div>
          <Button
            className={styles.modalOpenButton}
            type="button"
            onClick={toggle}
          >
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
              <div className={styles.modalImages}>
                <UncontrolledCarousel items={[...imageItem]} />
              </div>

              <div className={styles.productDetails}>
                <div className={styles.productDetailsSpacing}>
                  {description}
                </div>
                <div className={styles.productDetailsSpacing}>
                  <Badge>{category}</Badge>
                  <Badge>{type}</Badge>
                </div>

                <div className={styles.productDetailsSpacing}>
                  <b>$ {price} USDC</b>
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
                <Button>Purchase</Button>
              </Form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
