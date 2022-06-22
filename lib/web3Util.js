import * as web3 from "@solana/web3.js";

// change for devnet
const rpcUrl = "https://api.mainnet-beta.solana.com";

export const getWeb3Connection = () => {
  return new web3.Connection(rpcUrl);
};

export const getSolanaTps = async () => {
  const solanaPerformance =
    await getWeb3Connection().getRecentPerformanceSamples(1);
  const tps =
    solanaPerformance[0].numTransactions /
    solanaPerformance[0].samplePeriodSecs;

  return tps;
};
