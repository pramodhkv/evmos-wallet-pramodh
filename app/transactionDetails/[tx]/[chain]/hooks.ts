import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import moment from "moment";
import { ethers, getBigInt } from "ethers";
import { constructTxObject } from "../../../utils/utils";

export const useFetchTransactionDetail = ({ tx, chain }: IChainTransaction) => {
  const [transaction, setTransaction] = useState<ITransaction>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const restOptions: RequestInit = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  };

  const fetchCosmosTx = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_COSMOS_WALLET_BASE_URL}${process.env.NEXT_PUBLIC_COSMOS_WALLET_TRANSACTIONS_BY_HASH_URL}/${tx}`,
        restOptions
      );
      const txObj = await res.json();

      const transactionDetail: ITransaction = {
        txHash: tx,
        chain: chain + " Testnet",
        gasDetails:
          txObj.tx_response.gas_used + " / " + txObj.tx_response.gas_wanted,
        fee: Number(txObj.tx.auth_info.fee.amount[0].amount / 10 ** 18).toFixed(
          6
        ),
        block: txObj.tx_response.height,
        time:
          moment(txObj.tx_response.timestamp).fromNow() +
          " (" +
          moment(txObj.tx_response.timestamp).format("DD.MM.YYYY HH:mm:ss") +
          ")",
        memo: txObj.tx.body.memo,
        messages: txObj.tx.body.messages,
      };

      const transformedTx: ITransaction = constructTxObject(transactionDetail);

      setTransaction(transformedTx);
    } catch (error: any) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEthereumTx = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ETHEREUM_WALLET_TRANSACTIONS_BY_HASH_URL}&txhash=${tx}`,
        restOptions
      );
      const data = await res.json();
      const txObj = data.result;

      const provider = new Web3Provider(window.ethereum);
      const block = await provider.getBlock(data.result.blockNumber);

      const transactionDetail: ITransaction = {
        txHash: tx,
        chain: chain + " Testnet",
        block: block.number.toString(),
        time:
          moment.unix(block.timestamp).fromNow() +
          " (" +
          moment.unix(block.timestamp).format("DD.MM.YYYY HH:mm:ss") +
          ")",
        gasDetails: ethers.formatEther(getBigInt(txObj.gasPrice).toString()),
        fee: ethers.formatEther(getBigInt(txObj.value).toString()),
      };

      const transformedTx: ITransaction = constructTxObject(transactionDetail);

      setTransaction(transformedTx);
    } catch (error: any) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!tx || !chain) return;

    if (chain === "evmos") {
      fetchCosmosTx();
    } else if (chain === "ethereum") {
      fetchEthereumTx();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, tx]);

  return { transaction, loading, error };
};
