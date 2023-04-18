import { useWalletContext } from "@/app/context/context";
import {
  EVMOS_NETWORK_DATA,
  EVMOS_TESTNET_CHAIN_INFO,
} from "@/app/utils/constants";

export const useConnectWithMetaMask = () => {
  const { metaMaskAddress, setMetaMaskAddress } = useWalletContext();

  const connectWithMetaMask = async () => {
    const ethereum = window?.ethereum;

    if (ethereum === undefined) {
      return alert("Please install Metamask");
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setMetaMaskAddress(accounts[0]);
      addEvmosChainToMetaMask();
    } catch (error) {
      console.error(error);
    }
  };

  const addEvmosChainToMetaMask = async () => {
    const ethereum = window?.ethereum;

    try {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [EVMOS_NETWORK_DATA],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { metaMaskAddress, connectWithMetaMask };
};

export const useConnectWithKeplr = () => {
  const { keplrAddress, setKeplrAddress } = useWalletContext();

  const connectWithKeplr = async () => {
    const keplr = window?.keplr;

    if (keplr === undefined) {
      return alert("Please install Keplr");
    }

    try {
      await keplr.experimentalSuggestChain(EVMOS_TESTNET_CHAIN_INFO);

      const offlineSigner = keplr.getOfflineSigner(
        EVMOS_TESTNET_CHAIN_INFO.chainId
      );
      const accounts = await offlineSigner.getAccounts();
      setKeplrAddress(accounts[0].address);
    } catch (error) {
      console.error(error);
    }
  };

  return { keplrAddress, connectWithKeplr };
};
