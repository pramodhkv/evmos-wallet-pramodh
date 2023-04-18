# Evmos Frontend task - Basic Read only Wallet

Thank you for giving me the opportunity to work on this task. I enjoyed working on it and I hope you like the result.
This is basically a read only wallet web application. The users can get connected to the app using MetaMask wallet or Keplr wallet.
Once the user is logged in, the wallet balance, wallet address (in HEX and Bech32 formats) can be viewed.
Also, the users can search for transactions by entering a valid evmos wallet address or an ethereum wallet address.

# Tech Stack

- 📦 **NextJS, React**
- 🔐 **TypeScript**
- 🎨 **Tailwind CSS**
- 📗 **EthersJS**
- 🌐 **Web3JS**

## Features

- Welcome page to allow users to login using MetaMask wallet or Keplr Wallet.
- View Wallet details (balance, addresses)
- Search for transactions based on the address (Evmos address or Ethereum address)
- Transactions are listed based on the entered address. The list shows Evmos transactions and ERC20 transfer transactions.
- Transaction detail page is shown once the user clicks on the transaction hash number.

# Challenges

- The main issue i faced was the time. I could not dedicate continuous hours to work on this task, but tried my best to complete it in a week's time.
- Could not get proper documentation regarding API call for fetching transactions for Evmos address. I did manage to get a link to fetch the evmos transactions (https://api.mintscan.io/v1/evmos-testnet/). The other indexers like (Covalent) which was given through email did not seem to work for Evmos wallet. I could not view the Evmos transactions through their website. But i was able to view the Ethereum transactions though.

# Potential Improvements

- Make it responsive for mobile / tablet devices.
- Retain the session even after reloading the page.
- Improve user experience when you are directly accessing the Transaction Detail page. It seems inconsistent in displaying the record / info messages.
- Add an infinity scroller to the transaction list.
- Add proper color schemes in the tailwind config file.
- Probably have a custom scrollbar matching with the theme.

## References

[API for Evmos transactions](https://testnet.mintscan.io/evmos-testnet/txs)

[API for Ethereum transactions](https://api-goerli.etherscan.io/api?module=account&action=tokentx&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YOUR_API_KEY&address=YOUR_ADDRESS)

[EthersJS for accessing utility functions](https://docs.ethers.org/v6/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
