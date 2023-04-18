interface IChainTransaction {
  tx: string;
  chain: string;
}

interface IMessage {
  from_address: string;
  to_address: string;
  amount: any;
}

interface ITransaction {
  txHash: string;
  chain: string;
  block: string;
  time: string | number;
  fee: string;
  amount?: string;
  type?: string;
  gasDetails?: string;
  memo?: string;
  messages?: IMessage[];
}
