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
    <div className="page-container">
      {publicKey ? (
        renderFreeDownload()
      ) : (
        <p>Connect Wallet for free team Blade PNG</p>
      )}
    </div>
  );
};

export default Shop;
