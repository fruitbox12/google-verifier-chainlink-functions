import '../styles/index.css';
import '@rainbow-me/rainbowkit/styles.css';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [polygonMumbai]
      : []),
  ],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'Twitter Verifier',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Twitter Verifier</title>
        <meta
          name='description'
          content='A Twitter account verification tool using your Ethereum address'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: 'var(--color-blue)',
          })}
        >
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#5d16a6',
              },
            }}
          >
            <Component {...pageProps} />
          </ConfigProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default MyApp;
