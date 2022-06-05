import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { PublicKey, web3 } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import logo from "../public/logo.png";
import styles from "../styles/Layout.module.css";
//import styles2 from '../styles/Home.module.css'

export default function Layout({ children }) {
  // this will fetch users public key (wallet address)
  const { publicKey } = useWallet();

  //page data for <li> prop
  const pages = [
    { id: 0, page: "/shop", name: "Shop" },
    { id: 1, page: "/team", name: "Team" },
    { id: 2, page: "/about", name: "About" },
  ];

  //render when wallet not connected
  const renderNotConnectedContainer = () => (
    <div>
      <WalletMultiButton classname="cta-button  connect-wallet-button" />
    </div>
  );

  //render when wallet is connected
  const renderConnectedContainer = () => (
    <div>
      <WalletMultiButton classname="disconnect-wallet-button" />
    </div>
  );

  const renderDashboardLink = () => (
    <li className={styles.navitem}>
      <Link href="/dashboard">
        <a
          className={
            isOpen === false
              ? styles.navlink
              : styles.navlink + " " + styles.active
          }
          onClick={openMenu}
        >
          Dashboard
        </a>
      </Link>
    </li>
  );

  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(!isOpen);
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Link href="/">
            <a>
              <Image src={logo} height={50} width={265} />
            </a>
          </Link>
          <ul
            className={
              isOpen === false
                ? styles.navmenu
                : styles.navmenu + " " + styles.active
            }
          >
            {pages.map((pages) => {
              return (
                <li className={styles.navitem} key={pages.id}>
                  <Link href={pages.page}>
                    <a
                      className={
                        isOpen === false
                          ? styles.navlink
                          : styles.navlink + " " + styles.active
                      }
                      onClick={openMenu}
                    >
                      {pages.name}
                    </a>
                  </Link>
                </li>
              );
            })}
            {/* 
                render Dashboard link when user connects wallet
                implement { render dashboard link if user owns CBC NFT }  
            */}
            {publicKey ? renderDashboardLink() : null}

            {/* 
              implement {render an admin link to admin wallets to view orders/transactions } 
            */}

            <li className={styles.navitem}>
              {publicKey
                ? renderConnectedContainer()
                : renderNotConnectedContainer()}
            </li>
          </ul>

          <button
            className={
              isOpen === false
                ? styles.hamburger
                : styles.hamburger + " " + styles.active
            }
            onClick={openMenu}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </nav>
      </header>

      {/* Main page container */}
      <main className={styles.mainContainer}>{children}</main>

      {/* {footer} */}
      <div className={styles.footerContainer}>
        <footer>
          <div className={styles.copyrightContainer}>
            <p>&copy;2022 Bladez Club</p>
          </div>
          <div className={styles.logoContainer}>
            <Link href="/">
              <a>
                <Image src={"/cbcLogo.png"} width={100} height={100} />
              </a>
            </Link>
            <a href="https://solana.com/" target="_blank">
              <Image src={"/Solana.png"} width={90} height={14} />
            </a>
          </div>
          <div className={styles.socialContainer}>
            <ul>
              {/** add social links to new tabs */}
              <li>
                <Image src={"/social/discord.png"} width={30} height={30} />
              </li>
              <li>
                <Image src={"/social/instagram.png"} width={30} height={30} />
              </li>
              <li>
                <Image src={"/social/twitter.png"} width={30} height={30} />
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
