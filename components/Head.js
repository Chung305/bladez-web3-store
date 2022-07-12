import React from "react";
import Head from "next/head";

export default function HeadComponent() {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#000000" />

      <title>Crypto Bladez Store</title>
      <link rel="icon" href="/favicon.ico" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Racing+Sans+One&family=Russo+One&display=swap"
        rel="stylesheet"
      />
      <meta name="title" content="Solana Pay Store" />
      <meta
        name="description"
        content="Buy items on my store using Solana Pay!"
      />
    </Head>
  );
}
