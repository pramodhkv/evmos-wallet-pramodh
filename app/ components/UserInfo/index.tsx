"use client";
import { useWalletContext } from "@/app/context/context";
import { transformAddressOrHash } from "@/app/utils/utils";
import Image from "next/image";
import React from "react";

const UserInfo = () => {
  const { keplrAddress, metaMaskAddress } = useWalletContext();

  return (
    <div className="flex items-center gap-3">
      <Image
        src="/avatar.svg"
        alt="avatar"
        className="w-12 h-12 rounded-full"
        width={48}
        height={48}
      />

      <h1 className="text-2xl font-mono md:text-2xl w-max text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Hello,{" "}
        {transformAddressOrHash(keplrAddress || metaMaskAddress) || "User"}{" "}
        <span className="text-2xl text-yellow-100 animate-wave inline-block">
          👋🏽
        </span>
      </h1>
    </div>
  );
};

export default UserInfo;
