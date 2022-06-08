import React from "react";
import styles from "../../styles/Orders.module.css";

export default function Orders({ orders }) {
  return (
    <div className={styles.order_container}>
      <div className={styles.data_container}>
        <p>
          <span>Buyer:</span>
        </p>
        <p>
          <span>
            <a>{orders.buyer}</a>
          </span>
        </p>
        <p>Order ID:</p>
        <p>
          <a className={styles.linkbreak}>{orders.orderID}</a>
        </p>
      </div>
      <div>
        <p>Item ID:</p>
        <p>{orders.itemID}</p>
      </div>
    </div>
  );
}
