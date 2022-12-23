import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useRouter } from 'next/router';
import '@rainbow-me/rainbowkit/styles.css';
import { goerli } from 'wagmi/chains';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import Navbar from './components/Navbar';

const gnosisChain = {
  id: 100,
  name: 'Gnosis Chain',
  network: 'Gnosis',
  iconUrls:
    'https://images.prismic.io/koinly-marketing/16d1deb7-e71f-48a5-9ee7-83eb0f7038e4_Gnosis+Chain+Logo.png',
  nativeCurrency: {
    decimals: 18,
    name: 'xDai',
    symbol: 'xDai',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/gnosis'],
    },
  },
  blockExplorers: {
    default: { name: 'Gnosis Scan', url: 'https://gnosisscan.io/' },
  },
  testnet: false,
};

const { provider, chains } = configureChains(
  [gnosisChain, goerli],
  [
    jsonRpcProvider({ rpc: () => ({ http: 'https://rpc.ankr.com/gnosis' }) }), //<<<< New RPC Provider
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] =
    useState('not-authenticated');
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === 'SIGNED_IN') {
          setAuthenticatedState('authenticated');
          router.push('/profile');
        }
        if (event === 'SIGNED_OUT') {
          setAuthenticatedState('not-authenticated');
        }
      }
    );
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setAuthenticatedState('authenticated');
    }
  }
  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  }
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
