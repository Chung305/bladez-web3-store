// change between dev/mainnet
// Devnet: api-devnet.magiceden.dev/v2/
const meURL = "https://api-mainnet.magiceden.dev/v2/";

export const getWalletNfts = (publicKey) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "api-mainnet.magiceden.dev/v2",
    },
  };

  const nfts = fetch(
    meURL +
      "wallets/" +
      publicKey +
      "/tokens?offset=0&limit=100&listStatus=unlisted",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      //console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));

  return nfts;
};
