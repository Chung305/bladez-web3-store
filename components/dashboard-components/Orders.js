import { React, useState, useEffect } from "react";
import styles from "../../styles/Orders.module.css";

export default function Orders({ orders }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(`/api/fetchProducts`)
        .then((response) => response.json())
        .then((data) => {
          const result = data.find((data) => data.id === orders.itemID);
          console.log(result);
          setProduct(result);
        });
    };
    fetchData();
  }, []);

  return (
    <div className={styles.order_container}>
      <div className={styles.data_container}>
        <p>
          <span>Buyer:</span>
        </p>
        <p>
          <span>
            <a className={styles.break}>{orders.buyer}</a>
          </span>
        </p>
        <p>Order ID:</p>
        <p>
          <a
            className={styles.break}
            href={"https://solscan.io/account/" + orders.orderID}
            target="_blank"
          >
            {orders.orderID}
          </a>
        </p>
        <p>Item ID:</p>
        <p>{orders.itemID}</p>
      </div>
      <div>
        <img className={styles.itemImage} src={product && product.image_url} />
        <p>{product && product.name}</p>
        <p>Price: {product && product.price}</p>
      </div>
    </div>
  );
}
