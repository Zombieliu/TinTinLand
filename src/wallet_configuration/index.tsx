import {configureChains, createClient} from "wagmi";
import {bsc, polygon, taraxa} from "@wagmi/core/chains";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {AvatarComponent, connectorsForWallets} from "@rainbow-me/rainbowkit";
import {
    argentWallet, coinbaseWallet,
    imTokenWallet,
    metaMaskWallet,
    rainbowWallet,
    walletConnectWallet
} from "@rainbow-me/rainbowkit/wallets";
import {iotex, polygonMumbai} from "@wagmi/chains";

const { chains, provider } = configureChains(
    [
        // {
        //     ...polygon,
        //     // iconUrl: 'https://web3games-prod.oss-cn-hongkong.aliyuncs.com/20221118991d7966cd16173e.png',
        // },
        // {
        //     ...taraxa,
        //     // iconUrl: 'https://web3games-prod.oss-cn-hongkong.aliyuncs.com/202203022ff7021a7352e13d.png',
        // },
        {
            ...polygonMumbai,
        },

    ],
    [
        alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
        publicProvider()
    ]
);
const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            metaMaskWallet({ chains }),
            rainbowWallet({ chains }),
            walletConnectWallet({ chains }),
            argentWallet({chains}),
            imTokenWallet({ chains }),
            coinbaseWallet({appName: "TinTinLand", chains}),

        ],
    },
]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {

    return ensImage ? (
        <img
            className="rounded-full    w-20 h-20"
        />
    ) : (
        <div
            className=" rounded-full    w-20 h-20 bg-gradient-to-br from-[#DB5E7F]  via-[#876BD2] to-[#6E93E8]"
        >
        </div>
    );
};


export {wagmiClient,CustomAvatar,chains}
