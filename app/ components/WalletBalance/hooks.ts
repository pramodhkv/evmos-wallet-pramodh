import { useWalletContext } from "@/app/context/context";
import { formatPriceInTevmos } from "@/app/utils/utils";
import { ethers } from "ethers";
import { provider } from "evmosjs";
import { useEffect, useState } from "react";

export const useFetchWalletBalance = () => {
  const { keplrAddress, metaMaskAddress } = useWalletContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [evmosBalance, setEvmosBalance] = useState<string | null>(null);
  const [ethereumBalance, setEthereumBalance] = useState<string | null>(null);

  const fetchEvmosBalance = async () => {
    if (!keplrAddress) return;

    setEvmosBalance(null);
    setLoading(true);
    const queryEndpoint = `${
      process.env.NEXT_PUBLIC_NODE_URL
    }${provider.generateEndpointBalances(keplrAddress)}`;

    const restOptions: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    };

    try {
      const rawResult = await fetch(queryEndpoint, restOptions);
      const data = await rawResult.json();

      setEvmosBalance(formatPriceInTevmos(data.balances[0].amount) + " TEVMOS");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEthereumBalance = async () => {
    if (!metaMaskAddress) return;

    setLoading(true);

    try {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const data = await ethersProvider.getBalance(metaMaskAddress);

      setEthereumBalance(ethers.formatUnits(data, "ether") + " ETH");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvmosBalance();
    fetchEthereumBalance();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keplrAddress]);

  return { loading, error, evmosBalance, ethereumBalance };
};
