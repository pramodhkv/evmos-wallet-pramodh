import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React from "react";
import InfoItem from "../InfoItem";

interface IMessageProps {
  message: IMessage;
  chain: string;
}

const Message = (props: IMessageProps) => {
  const { message, chain } = props;

  return (
    <div className="border border-slate-800 w-full my-4 rounded-lg">
      <div className="flex flex-col p-4">
        <div className="flex items-center gap-4">
          <PaperAirplaneIcon className="h-7 w-7 -rotate-45" fill="#3b82f6" />
          <span className="font-bold text-lg text-blue-500">send</span>
        </div>

        <div className="border-b border-b-slate-800 my-4"></div>

        <InfoItem
          label="From Address"
          value={message.from_address}
          className="text-blue-500"
        />

        <InfoItem
          label="To Address"
          value={message.to_address}
          className="text-blue-500"
        />

        <InfoItem
          label="Amount"
          value={Number(message.amount[0].amount / 10 ** 18).toFixed(6)}
          extraInfo={chain === "evmos" ? "TEVMOS" : "ETH"}
        />
      </div>
    </div>
  );
};

export default Message;
