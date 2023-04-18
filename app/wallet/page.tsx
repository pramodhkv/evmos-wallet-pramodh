"use client";

import React from "react";
import UserInfo from "../ components/UserInfo";
import WalletBalance from "../ components/WalletBalance";
import WalletAddress from "../ components/WalletAddress";
import { useWalletContext } from "../context/context";

const WalletDetails = () => {
  const { metaMaskAddress, keplrAddress } = useWalletContext();

  return (
    <div className="flex flex-col">
      <UserInfo />

      <div className="flex flex-col gap-3 md:flex-row my-10">
        <WalletBalance />
        <WalletAddress address={keplrAddress} chain="Evmos" />
        <WalletAddress address={metaMaskAddress} chain="Ethereum" />
      </div>
    </div>
  );
};

export default WalletDetails;
