module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/dashboard",
        destination: "https://api-mainnet.magiceden.dev/v2",
      },
    ];
  };
  return {
    rewrites,
  };
};
