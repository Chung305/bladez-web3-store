import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
const metaplex = new Metaplex(connection);

export const getSolanaTps = async () => {
  const solanaPerformance = await connection.getRecentPerformanceSamples(1);
  const tps =
    solanaPerformance[0].numTransactions /
    solanaPerformance[0].samplePeriodSecs;

  return tps;
};

/*
  creates object of data selected to display nft metadata
*/
export const getWalletNft = async (publicKey) => {
  const keypair = Keypair.generate();
  metaplex.use(keypairIdentity(keypair));

  const wallet = new PublicKey(publicKey);
  const data = await metaplex.nfts().findAllByOwner(wallet);

  const walletNfts = [];

  data.forEach((allData) => {
    var nftData = {
      isMutable: false,
      mintAuthority: "",
      updateAuthority: "",
      data: [],
    };

    nftData.isMutable = allData.isMutable;
    nftData.mintAuthority = allData.mint.toString();
    nftData.updateAuthority = allData.updateAuthority.toString();

    fetch(allData.uri)
      .then((response) => response.json())
      .then((data) => {
        nftData.data = data;
        walletNfts.push(nftData);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  console.log(walletNfts);
  return walletNfts;
};
