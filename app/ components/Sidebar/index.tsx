"use client";

import React from "react";
import { WalletIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { useWalletContext } from "@/app/context/context";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { metaMaskAddress, setMetaMaskAddress, keplrAddress, setKeplrAddress } =
    useWalletContext();
  const router = useRouter();

  const handleLogout = () => {
    setMetaMaskAddress("");
    setKeplrAddress("");
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-between h-screen max-w-xs md:min-w-[20rem] p-3 bg-[#080b18]">
      <div className="flex flex-col gap-4">
        <Link href="/" className="h-24">
          <Image
            src="https://assets-global.website-files.com/62691815e834438f848547e0/62691815e834430f668547f4_Evmos_PrimaryLogo_Sand_RGB.svg"
            width={150}
            height={150}
            alt="Evmos"
          />
        </Link>

        <div className="flex flex-col gap-4">
          <Link
            href="/wallet"
            className="flex px-2 py-4 items-center gap-3 hover:text-gray-400 border-b border-b-slate-800 text-lg"
          >
            <WalletIcon className="w-6 h-6" />
            <span>Wallet</span>
          </Link>

          <Link
            href="/transactions"
            className="flex px-2 py-4 items-center gap-3 hover:text-gray-400 border-b border-b-slate-800 text-lg"
          >
            <ArrowsRightLeftIcon className="w-6 h-6" />
            <span>Transactions</span>
          </Link>
        </div>
      </div>

      {metaMaskAddress || keplrAddress ? (
        <button
          className="p-2 mb-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg text-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : null}
    </div>
  );
};

export default Sidebar;
