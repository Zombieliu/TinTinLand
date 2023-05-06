import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next'
import '@rainbow-me/rainbowkit/styles.css';
import "../css/font-awesome.css"

import {WagmiConfig} from "wagmi";
import {chains, CustomAvatar, wagmiClient} from "../wallet_configuration";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains} showRecentTransactions={true}
            //主题颜色
            // theme={midnightTheme()}
                            avatar={CustomAvatar}
                            appInfo={{
                              // appName: 'TinTinLand- - Powered by Web3Games',
                              // learnMoreUrl: 'https://learnaboutcryptowallets.example',
                            }}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
  )
}
export default  appWithTranslation(MyApp)

