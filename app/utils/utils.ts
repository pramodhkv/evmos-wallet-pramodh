export const constructTxObject = (tx: ITransaction) => {
  const {
    txHash,
    chain,
    gasDetails,
    block,
    time,
    fee,
    amount,
    type,
    memo,
    messages,
  } = tx;
  return {
    txHash,
    chain,
    gasDetails,
    block,
    time,
    amount,
    fee,
    type,
    memo: memo || "",
    messages: messages || [],
  };
};

export const transformAddressOrHash = (value: string) => {
  return value ? value.slice(0, 6) + "..." + value.slice(-6) : "";
};

export const formatPriceInTevmos = (price: number) => {
  return Number(price / 10 ** 18).toFixed(6);
};
