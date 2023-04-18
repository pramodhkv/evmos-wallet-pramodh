"use client";

import React from "react";
import UserInfo from "../ components/UserInfo";
import FormTextInput from "../ components/FormTextInput";
import { addressConverter } from "evmosjs";
import TransactionTable from "../ components/TransactionTable";
import { ethers } from "ethers";
import { useFetchTransactions } from "./hooks";
import { GridLoader } from "react-spinners";
import InfoMessage from "../ components/InfoMessage";

const Transactions = () => {
  const { transactions, loading, error, fetchTransactions } =
    useFetchTransactions();

  const getAddressType = (address: string): string => {
    if (address.startsWith("evm") && address.length === 44) {
      return "Evmos";
    } else if (ethers.isAddress(address)) {
      return "Ethereum";
    } else {
      return "Unknown";
    }
  };

  const handleSubmit = async (address: string) => {
    const addressType = getAddressType(address);

    if (addressType === "Evmos") {
      fetchTransactions(address, addressConverter.evmosToEth(address));
    } else if (addressType === "Ethereum") {
      fetchTransactions(addressConverter.ethToEvmos(address), address);
    } else {
      alert("Invalid address");
      return;
    }
  };

  return (
    <div className="flex flex-col">
      <UserInfo />

      <FormTextInput onSubmit={handleSubmit} />

      {loading && (
        <div className="flex items-center justify-center">
          <GridLoader color="#0ea5e9" />
        </div>
      )}

      {error && (
        <InfoMessage
          message={`Something went wrong, please try again later! ${error}`}
          className="text-red-500"
        />
      )}

      {!loading && !!transactions.length && (
        <TransactionTable transactions={transactions} />
      )}
    </div>
  );
};

export default Transactions;
