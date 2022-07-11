import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Product from "../components/Product";
import styles from "../styles/shop-styles/Shop.module.css";

const Shop = () => {
  const { publicKey } = useWallet();
  //const [products, setProducts] = useState([]);

  const [publicProducts, setPublicProducts] = useState([]);
  const [digitalProducts, setDigitalProducts] = useState([]);
  const [isHolderProducts, setIsHolderProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      fetch("../api/products")
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          setPublicProducts(
            data.filter(
              (product) =>
                product.available === true &&
                product.onlyHolder === false &&
                product.type === "PHYSICAL"
            )
          );
          setDigitalProducts(
            data.filter((product) => {
              product.available === true &&
                product.onlyHolder === false &&
                product.type === "DIGITAL";
            })
          );
          setIsHolderProducts(
            data.filter((product) => {
              product.available === true && product.onlyHolder === true;
            })
          );
          console.log(publicProducts);
        });
    };
    fetchProducts();
    console.log(publicProducts);
  }, []);

  const renderPublicProducts = () => (
    <div className="products-container">
      {publicProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  // const renderFreeDownload = () => (
  //   <div className="products-container">
  //     {products.map((product) => (
  //       <Product key={product.id} product={product} />
  //     ))}
  //   </div>
  // );

  return (
    <div className={styles.shopContainer}>
      <h1>The Shop</h1>

      {/**
       * Public Products for anyone to purchase
       */}
      <div className={styles.pageBanner}>
        <h2>Merchandise</h2>
      </div>
      <div className={styles.productsContainer}>{renderPublicProducts()}</div>

      {/**
       * Digital Downloads for anyone to purchase/download
       */}
      <div className={styles.pageBanner}>
        <h2>Digital Downloads</h2>
      </div>
      <div className={styles.productsContainer}>
        <div>
          <p>Coming Soon...</p>
        </div>
      </div>

      {/**
       * private products for NFT holders only
       */}
      <div className={styles.pageBanner}>
        <h2>Bladez Club Holders</h2>
      </div>
      <div className={styles.productsContainer}>
        {publicKey === "000" ? (
          <p>nft holder products</p>
        ) : (
          <div>
            <p> Purchase a Crypto Bladez Club NFT to view these products</p>
            <p>
              <a>Marketplace outgoing link 1</a>
            </p>
            <p>
              <a>Marketplace outgoing link 2</a>
            </p>
          </div>
        )}
      </div>
    </div>
    // <div className="page-container">
    //   {publicKey ? (
    //     renderFreeDownload()
    //   ) : (
    //     <p>Connect Wallet for free team Blade PNG</p>
    //   )}
    // </div>
  );
};

export default Shop;
