// change between dev/mainnet
// Devnet: api-devnet.magiceden.dev/v2/
const meURL = "http://api-mainnet.magiceden.dev/v2/";

export const getWalletNfts = (publicKey) => {
  var requestOptions = {
    method: "GET",
    credentials: "include",
    redirect: "follow",
  };
  const nfts = null;
  try {
    nfts = fetch(
      meURL +
        "wallets/" +
        publicKey +
        "/tokens?offset=0&limit=100&listStatus=unlisted",
      { requestOptions }
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        return result;
      });
  } catch (err) {
    console.log(err);
  }

  return nfts;
};
