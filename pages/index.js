import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Product from "../components/Product";

// Constants

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <header className="header-container">
          <p className="header"> Crypto Bladez Club</p>
          <p className="sub-text">Where Crypto and Blading Meet</p>
        </header>

        <main></main>
      </div>
    </div>
  );
};

export default App;
