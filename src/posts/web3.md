---
title: "Web3 Wallet"
date: "2022-03-07"
category: ["JavaScript", "Web3", "React"]
cover: "/images/blog/web3-wallet-cover.png"
thumb: "/images/blog/sm/web3-wallet-thumb.png"
---

## Web3 Wallet

Web3 Wallet is a front end focused project with access to Ethereum network. It allows for connecting to any compatible Ethereum provider (`window.ethereum`) via the [Ethereum JavaScript API](https://eips.ethereum.org/EIPS/eip-1193).

The application is able to detect which network a user is connected to, it also allows for switching between chains like Ethereum, Binance, Polygon or other ERC-20 compatible token. It is compattible with MetaMask and Coinbase wallets.

### Main Features

**Wallet**
- connecting to ERC-20 (Ethereum) compatible network
- switching between chains
- displaying user's account balance

**Transaction Form**
- checking recipient address validity (checksum)
- displaying live token price (using [CoinGecko API](https://www.coingecko.com/en/api/documentation))
- calculating token amount in fiat
- displaying live gas fees 
- pre-checking transaction amount against the wallet balance
  
**Transaction History**
- displaying transaction history
- displaying each transaction date, status (incoming, outgoing) and address
- displaying [etherscan.io](https://etherscan.io/) transaction link

**Blockchain Transactions**
- sending tokens via a selected chain (upon approval)
- avaiting transaction confirmation
- displaying transaction status
- displaying [etherscan.io](https://etherscan.io/) transaction link for validation

**Error handling**
- none or malformed recipient address (address checksum check)
- none or insufficient transaction amount
- on chain network errors


### Code sample

The main part of the application is the `WalletProvider` responsible for majority of the wallet related opperations. Connecting/disconnecting to an account, getting account balance from the blockchain base on the connected account address, getting gas fees and waiting for blockchain transaction confirmation.

```js
export const WalletProvider = (props: PropsWithChildren) => {
  const [hash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash,
  });

  const connect = useConnect({
    connector: new InjectedConnector(),
  });
  const disconnect = useDisconnect();
  const account = useAccount();
  const balance = useBalance({
    address: account.address,
    watch: true,
  });
  const gas = useFeeData({
    formatUnits: "ether",
    watch: true,
  });

  const value = {
    connect,
    disconnect,
    account,
    balance,
    gas,
    transaction: {
      setTxHash,
      isLoading,
      isSuccess,
      isError,
    },
  };

  return <WalletContext.Provider value={value} {...props} />;
};
```

### Libraries and tools

This is a `React` `TypeScript` project using the following libraries and tools:
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [CoinGecko API Client](https://www.npmjs.com/package/coingecko-api)
- [wagmi](https://wagmi.sh/) - for interacting with the blockchain
- [react-hook-form](https://react-hook-form.com/) - for form handling and validation
- [react-query](https://react-query.tanstack.com/) - for data fetching and caching
- [use-debounce](https://www.npmjs.com/package/use-debounce) - for debouncing user input


##### Dolorem et et distinctio rerum.

Eveniet suscipit eveniet recusandae. Vero qui quas aliquam. Expedita saepe non et velit voluptas quidem ut dignissimos. Labore odio deserunt deserunt ipsam omnis ut. Consequatur aut eos voluptas harum cumque explicabo dicta.

> Eaque minus aut voluptatum. Aut beatae numquam similique quasi. Est perferendis voluptatem qui sint ut veritatis inventore. Quaerat repudiandae deleniti asperiores mollitia rerum voluptate.
