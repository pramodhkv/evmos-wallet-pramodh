import Web3 from "web3";

export const EVMOS_NETWORK_DATA = {
  chainId: Web3.utils.toHex(9000),
  chainName: "Evmos Testnet",
  blockExplorerUrls: ["https://evm.evmos.dev"],
  rpcUrls: ["https://eth.bd.evmos.dev:8545"],
  nativeCurrency: {
    name: "TEVMOS",
    symbol: "tEVMOS",
    decimals: 18,
  },
};

export const EVMOS_TESTNET_CHAIN_INFO = {
  chainId: "evmos_9000-4",
  chainName: "Evmos Testnet",
  rpc: "https://tendermint.bd.evmos.dev:26657",
  rest: "https://rest.bd.evmos.dev:1317",
  bip44: {
    coinType: 60,
  },
  bech32Config: {
    bech32PrefixAccAddr: "evmos",
    bech32PrefixAccPub: "evmospub",
    bech32PrefixValAddr: "evmosvaloper",
    bech32PrefixValPub: "evmosvaloperpub",
    bech32PrefixConsAddr: "evmosvalcons",
    bech32PrefixConsPub: "evmosvalconspub",
  },
  currencies: [
    {
      coinDenom: "TEVMOS",
      coinMinimalDenom: "atevmos",
      coinDecimals: 18,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "TEVMOS",
      coinMinimalDenom: "atevmos",
      coinDecimals: 18,
      gasPriceStep: {
        low: 25000000000,
        average: 25000000000,
        high: 40000000000,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "TEVMOS",
    coinMinimalDenom: "atevmos",
    coinDecimals: 18,
  },
  coinType: 60,
  beta: true,
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
};
