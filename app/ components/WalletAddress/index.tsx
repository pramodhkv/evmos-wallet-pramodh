"use client";

import { transformAddressOrHash } from "@/app/utils/utils";
import { ethToEvmos, evmosToEth } from "@evmos/address-converter";
import { WalletIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IWalletAddressProps {
  address: string;
  chain: string;
}

const WalletAddress = (props: IWalletAddressProps) => {
  const { address, chain } = props;
  const [bech32Address, setBech32Address] = useState<string>("");
  const [hexAddress, setHexAddress] = useState<string>("");

  useEffect(() => {
    if (!address) return;

    if (address.startsWith("0x")) {
      setHexAddress(transformAddressOrHash(address));
      setBech32Address(transformAddressOrHash(ethToEvmos(address)));
    } else {
      setBech32Address(transformAddressOrHash(address));
      setHexAddress(transformAddressOrHash(evmosToEth(address)));
    }
  }, [address]);

  if (!address) return null;

  return (
    <div className="flex flex-col items-start gap-6 p-4 h-auto min-w-[350px] bg-[#5461981f] rounded-lg">
      <div className="flex items-center gap-2 text-2xl">
        {chain.toLowerCase() === "evmos" ? (
          <Image src="/evmosNew.png" alt="evmos" width={30} height={30} />
        ) : (
          <Image
            src="/ethereum1.png"
            alt="ethereum"
            key="/ethereum1.png"
            width={32}
            height={32}
          />
        )}
        <span>{chain} Address:</span>
      </div>

      <div className="flex items-center gap-2 text-lg">
        <span>Bech32: </span>
        <span className="text-xl text-cyan-500">{bech32Address}</span>
      </div>

      <div className="flex items-center gap-2 text-lg">
        <span>Hex: </span>
        <span className="text-xl text-cyan-500">{hexAddress}</span>
      </div>
    </div>
  );
};

export default WalletAddress;
