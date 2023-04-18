"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IWalletContextProps {
  metaMaskAddress: string;
  setMetaMaskAddress: Dispatch<SetStateAction<string>>;
  keplrAddress: string;
  setKeplrAddress: Dispatch<SetStateAction<string>>;
}

export const WalletContext = createContext<IWalletContextProps>({
  metaMaskAddress: "",
  setMetaMaskAddress: () => {},
  keplrAddress: "",
  setKeplrAddress: () => {},
});

type Props = {
  children: ReactNode;
};

export const WalletContextProvider = ({ children }: Props) => {
  const [metaMaskAddress, setMetaMaskAddress] = useState("");
  const [keplrAddress, setKeplrAddress] = useState("");

  return (
    <WalletContext.Provider
      value={{
        metaMaskAddress,
        setMetaMaskAddress,
        keplrAddress,
        setKeplrAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
