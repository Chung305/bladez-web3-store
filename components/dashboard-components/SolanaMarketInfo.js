import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import styles from "../../styles/SolanaMarketInfo.module.css";
import { getSolanaTps } from "../../lib/web3Util";
import { numberWithCommas } from "../../lib/utilities";

export default function SolanaMarketInfo() {
  const { publicKey } = useWallet();
  const [solanaMarketInfo, setSolanaMarketInfo] = useState(null);
  const [solanaTPS, setSolanaTPS] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true"
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setSolanaMarketInfo(data);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTps = async () => {
      const tps = await getSolanaTps();
      setSolanaTPS(tps);
    };
    fetchTps();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img className={styles.name} src="/Solana.PNG" />
      </div>
      <div className={styles.card}>
        <span className={styles.label}>Price: </span>
        <span className={styles.solanaData}>
          ${solanaMarketInfo && solanaMarketInfo.solana.usd}
        </span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>M.Cap:</span>
        <span className={styles.solanaData}>
          {" "}
          $
          {numberWithCommas(
            (
              Math.round(
                solanaMarketInfo && solanaMarketInfo.solana.usd_market_cap * 100
              ) / 100
            ).toFixed(2)
          )}
        </span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>24h V: </span>
        <span className={styles.solanaData}>
          $
          {numberWithCommas(
            (
              Math.round(
                solanaMarketInfo && solanaMarketInfo.solana.usd_24h_vol * 100
              ) / 100
            ).toFixed(2)
          )}
        </span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>24h Ch: </span>
        <span className={styles.solanaData}>
          {numberWithCommas(
            (
              Math.round(
                solanaMarketInfo && solanaMarketInfo.solana.usd_24h_change * 100
              ) / 100
            ).toFixed(2)
          )}
          %
        </span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>Network: </span>
        <span className={styles.solanaData}>
          {solanaTPS && solanaTPS.toFixed(0)} TPS
        </span>
      </div>
      {/* <p className={styles.marketTitle}>Solana</p>

      <div className={styles.subContainer}>
        <Table className={styles.table}>
          <thead>
            <tr>
              <th>Price</th>
              <th>Market Cap</th>
              <th>24h Volume</th>
              <th>24h Change</th>
              <th>TPS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">
                ${solanaMarketInfo && solanaMarketInfo.solana.usd}
              </td>
              <td>
                $
                {numberWithCommas(
                  (
                    Math.round(
                      solanaMarketInfo &&
                        solanaMarketInfo.solana.usd_market_cap * 100
                    ) / 100
                  ).toFixed(2)
                )}
              </td>
              <td>
                {" "}
                $
                {numberWithCommas(
                  (
                    Math.round(
                      solanaMarketInfo &&
                        solanaMarketInfo.solana.usd_24h_vol * 100
                    ) / 100
                  ).toFixed(2)
                )}
              </td>
              <td>
                {" "}
                {numberWithCommas(
                  (
                    Math.round(
                      solanaMarketInfo &&
                        solanaMarketInfo.solana.usd_24h_change * 100
                    ) / 100
                  ).toFixed(2)
                )}
                %
              </td>
              <td>{solanaTPS && solanaTPS.toFixed(0)}</td>
            </tr>
          </tbody>
        </Table>
      </div> */}
    </div>
  );
}
