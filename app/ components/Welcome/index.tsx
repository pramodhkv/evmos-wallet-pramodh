"use client";

import React from "react";
import { useConnectWithKeplr, useConnectWithMetaMask } from "./hooks";

const Welcome = () => {
  const { metaMaskAddress, connectWithMetaMask } = useConnectWithMetaMask();
  const { keplrAddress, connectWithKeplr } = useConnectWithKeplr();

  const handleConnectWithMetaMask = () => {
    if (metaMaskAddress) {
      return;
    }

    connectWithMetaMask();
  };

  const handleConnectWithKeplr = () => {
    if (keplrAddress) {
      return;
    }

    connectWithKeplr();
  };

  return (
    <div className="flex flex-col items-center justify-center text-white w-full">
      <h1 className="text-2xl font-mono md:text-3xl w-max text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Welcome to Evmos!
      </h1>

      <p className="text-center my-10">
        Feeling adventurous? Try connecting with the below wallets to view your
        wallet details and search for transactions.
      </p>

      <div className="flex items-center gap-5">
        <button
          className="p-2 bg-yellow-600 rounded-lg text-lg"
          onClick={handleConnectWithMetaMask}
        >
          {metaMaskAddress
            ? "Connected with MetaMask"
            : "Connect with MetaMask"}
        </button>

        <button
          className="p-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg text-lg"
          onClick={handleConnectWithKeplr}
        >
          {keplrAddress ? "Connected" : "Connect with Keplr"}
        </button>
      </div>
    </div>
  );
};

export default Welcome;
