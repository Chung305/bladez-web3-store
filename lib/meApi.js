// change between dev/mainnet
// Devnet: api-devnet.magiceden.dev/v2/
const meURL = "https://api-mainnet.magiceden.dev/v2/";

export const getWalletNfts = (publicKey) => {
  const nfts = fetch(
    meURL +
      "wallets/" +
      publicKey +
      "/tokens?offset=0&limit=100&listStatus=unlisted",
    {
      method: "GET",
      redirect: "follow",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://bladez-web3-store.vercel.app/",
        "Access-Control-Allow-Credentials": "true",
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      //console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));

  return nfts;
};
