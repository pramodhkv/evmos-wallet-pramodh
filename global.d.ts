/// <reference types="react-scripts" />
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: import("ethers").providers.ExternalProvider;
    keplr: import("@keplr-wallet/types").Keplr;
  }
}
