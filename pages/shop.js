import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Product from "../components/Product";

const Shop = () => {
  const { publicKey } = useWallet();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderFreeDownload = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <div>
      {publicKey
        ? renderFreeDownload()
        : "Connect Wallet for free team Blade PNG"}
    </div>
  );
};

export default Shop;
