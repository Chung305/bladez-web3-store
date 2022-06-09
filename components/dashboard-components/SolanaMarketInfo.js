import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import styles from "../../styles/SolanaMarketInfo.module.css";

export default function SolanaMarketInfo() {
  const [solanaMarketInfo, setSolanaMarketInfo] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true"
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setSolanaMarketInfo(data);
        });
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.marketTitle}>Solana</p>

      <div className={styles.subContainer}>
        <div className={styles.dataContainer}>
          <h3>Price</h3>
          <p>${solanaMarketInfo && solanaMarketInfo.solana.usd}</p>
        </div>
        <div className={styles.dataContainer}>
          <h3>Market Cap</h3>
          <p>
            $
            {(
              Math.round(
                solanaMarketInfo && solanaMarketInfo.solana.usd_market_cap * 100
              ) / 100
            ).toFixed(2)}
          </p>
        </div>
        <div className={styles.dataContainer}>
          <h3>24h Volume</h3>
          <p>
            $
            {(
              Math.round(
                solanaMarketInfo && solanaMarketInfo.solana.usd_24h_vol * 100
              ) / 100
            ).toFixed(2)}
          </p>
        </div>
        <div className={styles.dataContainer}>
          <h3>24h Change</h3>
          <p>
            {(
              Math.round(
                solanaMarketInfo && solanaMarketInfo.solana.usd_24h_change * 100
              ) / 100
            ).toFixed(2)}
            %
          </p>
        </div>
      </div>
    </div>
  );
}
