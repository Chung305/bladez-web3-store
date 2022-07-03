import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Orders from "../components/dashboard-components/Orders";
import SolanaMarketInfo from "../components/dashboard-components/SolanaMarketInfo";
import AccountNfts from "../components/dashboard-components/AccountNfts";

import { addUser } from "../lib/controller/user";
import { getWalletNft } from "../lib/web3Util";

import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const Dashboard = () => {
  const { publicKey } = useWallet();
  const [userOrders, setUserOrders] = useState([]);
  const [nfts, setNfts] = useState([]);

  const isOwner = publicKey
    ? publicKey.toString() === process.env.NEXT_PUBLIC_MANAGEMENT
    : false;

  const [activeTab, setActiveTab] = useState("1");

  // check if user exists if not created new user in databse
  useEffect(() => {
    try {
      if (publicKey) {
        console.log(publicKey);
        addUser(publicKey);
      }
    } catch (err) {
      console.log("error", err);
    }
  }, [publicKey]);

  // fetching wallet Nfts if wallet is connected
  useEffect(() => {
    try {
      if (publicKey) {
        const fetchNfts = getWalletNft(publicKey.toString());
        fetchNfts.then((data) => {
          setNfts(data);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [publicKey]);

  return (
    <div className="page-container">
      <SolanaMarketInfo />

      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab == "1" ? "active" : ""}
            onClick={() => setActiveTab("1")}
          >
            Wallet
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "2" ? "active" : ""}
            onClick={() => setActiveTab("2")}
          >
            NFTs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "3" ? "active" : ""}
            onClick={() => setActiveTab("3")}
          >
            Past Orders
          </NavLink>
        </NavItem>
        {isOwner && (
          <NavItem>
            <NavLink className={activeTab == "4" ? "active" : ""} href="/admin">
              Admin
            </NavLink>
          </NavItem>
        )}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">tab index wallet info</TabPane>
        <TabPane tabId="2">
          <div>
            <div className="nft-container">
              {publicKey ? (
                nfts.map((nft, i) => <AccountNfts key={i} nfts={nft} />)
              ) : (
                <p>Connect Wallet</p>
              )}
            </div>
          </div>
        </TabPane>
        <TabPane tabId="3">
          {/* {userOrders.map((orders) => (
            <Orders key={orders.orderId} orders={orders} />
          ))} */}
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Dashboard;
