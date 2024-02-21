import { http, createConfig } from "wagmi";
import { mainnet, sepolia, Chain } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

const seiTestnet = {
  id: 713715,
  name: "Sei Testnet Network",
  // network: "sei",
  contracts: {
    multicall3: {
      address: "0xDdaa5FbffD813Ed02D140946EB66bD6487F3C778",
    },
  },
  nativeCurrency: {
    decimals: 18,
    name: "Sei",
    symbol: "SEI",
  },
  rpcUrls: {
    public: { http: ["https://evm-rpc.arctic-1.seinetwork.io"] },
    default: { http: ["https://evm-rpc.arctic-1.seinetwork.io"] },
  },
  blockExplorers: {
    default: {
      name: "Seitrace",
      url: "https://seitrace.com/",
    },
  },
} as const satisfies Chain;

export const config = createConfig({
  chains: [seiTestnet],
  connectors: [
    injected({
      target: {
        id: "compassWalletProvider",
        name: "Compass Wallet",
        provider: window.compassEvm,
      },
    }),
  ],
  transports: {
    [seiTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
