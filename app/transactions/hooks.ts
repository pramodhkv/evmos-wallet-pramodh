import { useState } from "react";
import { constructTxObject, formatPriceInTevmos } from "../utils/utils";
import { ethers } from "ethers";

export const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const restOptions: RequestInit = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  };

  const fetchCosmosTransactions = async (address: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_COSMOS_WALLET_TRANSACTIONS_BY_ADDRESS_URL}${address}/txs?limit=10&from=0`,
      restOptions
    );
    const rawTransactionList = await res.json();

    const txs: ITransaction[] = rawTransactionList.map((tx: any) => {
      const transaction: ITransaction = {
        txHash: tx.data.txhash,
        chain: "evmos",
        type:
          tx.data.tx.body.messages[0]["from_address"] === address
            ? "OUT"
            : "IN",
        amount: formatPriceInTevmos(
          tx.data.tx.body.messages[0].amount[0].amount
        ),
        fee: formatPriceInTevmos(tx.data.tx.auth_info.fee.amount[0].amount),
        block: tx.data.height,
        time: tx.data.timestamp,
      };

      return constructTxObject(transaction);
    });

    return txs;
  };

  const fetchEthereumTransactions = async (address: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ETHEREUM_WALLET_TRANSACTIONS_BY_ADDRESS_URL}&address=${address}`,
      restOptions
    );
    const rawTransactionList = await res.json();

    if (rawTransactionList.status !== "1") {
      return [];
    }

    const txs: ITransaction[] = rawTransactionList.result.map((tx: any) => {
      const transaction: ITransaction = {
        txHash: tx.hash,
        chain: "ethereum",
        type: tx.from === address ? "OUT" : "IN",
        amount: ethers.formatEther(tx.value),
        fee: ethers.formatUnits(tx.gasPrice, "gwei"),
        block: tx.blockNumber,
        time: tx.timeStamp,
      };

      return constructTxObject(transaction);
    });

    return txs;
  };

  const fetchTransactions = async (
    evmosAddress: string,
    ethereumAddress: string
  ) => {
    setTransactions([]);
    setError(null);
    setLoading(true);

    try {
      const cosmosTransactions = await fetchCosmosTransactions(evmosAddress);
      const ethereumTransactions = await fetchEthereumTransactions(
        ethereumAddress
      );

      setTransactions([...cosmosTransactions, ...ethereumTransactions]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
  };
};
