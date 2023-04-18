"use client";

import React from "react";
import Image from "next/image";
import { useFetchWalletBalance } from "./hooks";
import { BarLoader } from "react-spinners";

const WalletBalance = () => {
  const { evmosBalance, ethereumBalance, loading, error } =
    useFetchWalletBalance();

  const chains = [
    {
      name: "Evmos",
      logo: "/evmosNew.png",
      balance: evmosBalance || "0.0 TEVMOS",
    },
    {
      name: "Ethereum",
      logo: "/ethereum1.png",
      balance: ethereumBalance || "0.0 ETH",
    },
  ];

  return (
    <div className="flex flex-col items-start gap-6 p-4 h-auto min-w-[350px] bg-[#5461981f] rounded-lg">
      <div className="flex items-center gap-2 text-2xl">
        <span className="text-3xl">💰</span>
        <span>Wallet Balance:</span>
      </div>
      {chains.map((chain) => (
        <div
          className="flex items-center gap-2"
          key={`account-detail-${chain.name}`}
        >
          <div className="flex items-center gap-2 text-lg">
            <Image
              src={chain.logo}
              width={30}
              height={30}
              alt={`${chain.name}-logo`}
            />
            <span>{chain.name}: </span>
          </div>
          {loading ? (
            <BarLoader color="#0ea5e9" />
          ) : (
            <span className="text-xl text-cyan-500">{chain.balance}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default WalletBalance;
