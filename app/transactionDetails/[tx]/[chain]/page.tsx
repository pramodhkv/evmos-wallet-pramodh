"use client";

import React from "react";

import InfoItem from "@/app/ components/InfoItem";
import Message from "@/app/ components/Message";
import { useFetchTransactionDetail } from "@/app/transactionDetails/[tx]/[chain]/hooks";
import { GridLoader } from "react-spinners";
import InfoMessage from "@/app/ components/InfoMessage";

interface ITransactionDetailsProps {
  params: {
    tx: string;
    chain: string;
  };
}

const TransactionDetails = (props: ITransactionDetailsProps) => {
  const { tx, chain } = props.params;
  const { transaction, loading, error } = useFetchTransactionDetail({
    tx,
    chain,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[95vh]">
        <GridLoader color="#0ea5e9" />
      </div>
    );
  }

  if (error) {
    return (
      <InfoMessage
        message={`Something went wrong, please try again later! ${error}`}
        className="text-red-500"
      />
    );
  }

  if (!transaction) {
    return <InfoMessage message="Transaction not found" />;
  }

  return (
    <div className="flex flex-col gap-3 mt-3">
      <h1 className="text-xl font-bold uppercase">Transaction Details</h1>

      <div className="flex flex-col bg-[#080b18] rounded-lg h-auto w-full p-4 my-6">
        <h2 className="font-bold text-2xl">Information</h2>

        <div className="border-b border-b-slate-800 w-full my-4"></div>

        <InfoItem label="Tx Hash" value={tx} className="text-blue-500" />

        <InfoItem label="Chain" value={`${chain} Testnet`} />

        <InfoItem label="Block" value={transaction.block} />

        <InfoItem label="Time" value={transaction.time.toString()} />

        <InfoItem
          label="Fee"
          value={transaction.fee}
          extraInfo={chain === "evmos" ? "TEVMOS" : "ETH"}
        />

        <InfoItem
          label="Gas (Used / wanted)"
          value={`${transaction.gasDetails}`}
          extraInfo={chain === "evmos" ? "" : "ETH"}
        />

        {chain === "evmos" && (
          <InfoItem label="Memo" value={transaction.memo || ""} />
        )}
      </div>

      {chain === "evmos" && !!transaction.messages?.length ? (
        <div className="flex flex-col bg-[#080b18] rounded-lg h-auto w-full p-4">
          <h2 className="font-bold text-2xl">Messages</h2>

          {transaction.messages.map((msg: IMessage, index: number) => (
            <Message key={`message-${index}`} message={msg} chain={chain} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TransactionDetails;
