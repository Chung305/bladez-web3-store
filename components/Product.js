import React from "react";
import { Button } from "reactstrap";
import styles from "../styles/Product.module.css";
import Buy from "./Buy";

export default function Product({ product }) {
  const { id, name, price, description, imageUrl, category, type, inventory } =
    product;

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
          <Button type="button">View</Button>
          {/* <Buy itemID={id} /> */}
        </div>
      </div>
    </div>
  );
}
