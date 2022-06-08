import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Orders from "../components/dashboard-components/Orders";
import SolanaMarketInfo from "../components/dashboard-components/SolanaMarketInfo";

const Dashboard = () => {
  const { publicKey } = useWallet();
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`../api/orders?buyer=${publicKey.toString()}`)
        .then((response) => response.json())
        .then((data) => {
          setUserOrders(data);
          console.log(data);
        });
    }
  }, [publicKey]);

  return (
    <div className="page-container">
      <SolanaMarketInfo />
      <h2>Past Orders</h2>
      {userOrders.map((orders) => (
        <Orders key={orders.orderId} orders={orders} />
      ))}
    </div>
  );
};

export default Dashboard;
