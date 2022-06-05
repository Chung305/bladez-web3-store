import React from "react";
import styles from "../../styles/Orders.module.css";

export default function Orders({ orders }) {
  return (
    <div className={styles.order_container}>
      <div>
        <p>
          <a>Buyer:</a>
        </p>
        <p>
          <a>{orders.buyer}</a>
        </p>
      </div>
      <div>
        <p>
          <a>Order ID:</a>
        </p>
        <p>
          <a>{orders.orderID}</a>
        </p>
      </div>
      <div>
        <p>Item ID:</p>
        <p>{orders.itemID}</p>
      </div>
    </div>
  );
}
