import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Orders from "../components/dashboard-components/Orders";
import SolanaMarketInfo from "../components/dashboard-components/SolanaMarketInfo";
import AccountNfts from "../components/dashboard-components/AccountNfts";
import { getWalletNfts } from "../lib/meApi";
import { addUser } from "../lib/controller/user";

import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ManagementUtilityBar from "../components/dashboard-components/management-components/ManagementUtilityBar";

const Dashboard = () => {
  const { publicKey } = useWallet();
  const [userOrders, setUserOrders] = useState([]);
  const [nfts, setNfts] = useState([]);

  const isOwner = publicKey
    ? publicKey.toString() === process.env.MANAGEMENT
    : false;
  const [creating, setCreating] = useState(false);

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
  // useEffect(() => {
  //   const fetchNfts = async () => {
  //     if (publicKey) {
  //       const getNfts = await getWalletNfts(publicKey.toString());
  //       setNfts(getNfts);
  //     }
  //   };
  //   fetchNfts();
  // }, [publicKey]);

  // fetching user past orders
  // useEffect(() => {
  //   try {
  //     if (publicKey) {
  //       try {
  //         fetch(`../api/orders?buyer=${publicKey.toString()}`)
  //           .then((response) => response.json())
  //           .then((data) => {
  //             setUserOrders(data);
  //           });
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   } catch (err) {
  //     // 👇️ SyntaxError: Unexpected end of JSON input
  //     console.log("error something happened");
  //     console.log("error", err);
  //   }
  // }, [publicKey]);

  return (
    <div className="page-container">
      {/* <div>
        {isOwner && (
          <button onClick={() => setCreating(!creating)}>
            {creating ? "Close" : "Create Product"}
          </button>
        )}
        {creating && <CreateProduct />}
      </div> */}

      <div>{isOwner && <ManagementUtilityBar />}</div>

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
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">tab index wallet info</TabPane>
        <TabPane tabId="2">
          <div>
            <div className="nft-container">
              {publicKey ? (
                nfts.map((nft) => <AccountNfts key={nft.name} nfts={nft} />)
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
