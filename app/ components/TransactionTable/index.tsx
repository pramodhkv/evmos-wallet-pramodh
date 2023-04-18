"use client";

import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { transformAddressOrHash } from "@/app/utils/utils";

interface ITransactionTableProps {
  transactions: ITransaction[];
}

const TransactionTable = (props: ITransactionTableProps) => {
  const { transactions } = props;

  const headers: string[] = [
    "Tx Hash",
    "Chain",
    "Type",
    "Amount",
    "Fee",
    "Block",
    "Time",
  ];

  return (
    <div className="flex flex-col gap-4 bg-[#080b18] rounded-lg p-4 w-full h-auto">
      <div className="flex justify-between items-center my-4">
        <span className="text-2xl">Transactions</span>
        {/* TODO filters dropdown */}
        <div>Filters dropdown</div>
      </div>

      <div className="flex flex-col w-full border-collapse my-6 max-h-[600px] overflow-x-hidden overflow-y-auto">
        <div className="grid grid-cols-7 justify-between items-center w-full">
          {headers.map((header, index) => (
            <span className="font-extrabold text-sm" key={`${header}-index`}>
              {header}
            </span>
          ))}
        </div>

        {transactions.map((transaction, index) => (
          <div
            className="grid grid-cols-7 justify-between items-center h-20 w-full"
            key={`transaction-row-${index}`}
          >
            <Link
              href={`/transactionDetails/${transaction.txHash}/${transaction.chain}`}
              className="text-blue-500"
            >
              {transformAddressOrHash(transaction.txHash)}
            </Link>

            <div>
              {transaction.chain === "evmos" ? (
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
            </div>

            <span
              className={`w-fit text-center px-2 py-1 text-sm font-bold rounded-lg ${
                transaction.type === "IN"
                  ? "bg-green-800 text-green-400 border border-green-400"
                  : "bg-red-800 text-red-200 border border-red-200"
              }`}
            >
              {transaction.type}
            </span>
            <span className="">
              {transaction.amount}{" "}
              <span className="text-red-500">
                {transaction.chain === "evmos" ? "TEVMOS" : "ETH"}
              </span>
            </span>
            <span className="">
              {transaction.fee}{" "}
              <span className="text-red-500">
                {transaction.chain === "evmos" ? "TEVMOS" : "ETH"}
              </span>
            </span>
            <span className="">{transaction.block}</span>
            <span className="">
              {transaction.chain === "evmos"
                ? moment(transaction.time).fromNow()
                : moment.unix(Number(transaction.time)).fromNow()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
