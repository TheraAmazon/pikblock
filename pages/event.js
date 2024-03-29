import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import axios from 'axios';
import Web3Modal from 'web3modal';
import Link from 'next/link';
import Pagination from './components/pagination';
import styles from '../styles/Home.module.css';

import { pikblockeventaddress, pikblockeventMarketaddress } from '../config';

import PIKBLOCKEVENT from '../artifacts/contracts/PIKBLOCKEVENT.sol/PIKBLOCKEVENT.json';
import PIKBLOCKEVENTMarket from '../artifacts/contracts/PIKBLOCKEVENTMarket.sol/PIKBLOCKEVENTMarket.json';

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const LIMIT = 10; // limite de itens por página
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [offset, setOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(
    nfts.slice(offset, offset + LIMIT)
  );

  useEffect(() => {
    setCurrentItems(nfts.slice(offset, offset + LIMIT));
    console.log(currentItems);
  }, [offset, nfts]);

  useEffect(() => {
    (async () => await loadNFTs())();
  }, []);
  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://goerli.infura.io/v3/291697c1912845f4b55b544eebda4698'
    );
    const tokenContract = new ethers.Contract(
      pikblockeventaddress,
      PIKBLOCKEVENT.abi,
      provider
    );
    const marketContract = new ethers.Contract(
      pikblockeventMarketaddress,
      PIKBLOCKEVENTMarket.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items.concat().reverse());
    setLoadingState('loaded');
    console.log(items);
  }
  async function buyNft(pikblockevent) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      pikblockeventMarketaddress,
      PIKBLOCKEVENTMarket.abi,
      signer
    );

    const price = ethers.utils.parseUnits(
      pikblockevent.price.toString(),
      'ether'
    );
    const transaction = await contract.createMarketSale(
      pikblockeventaddress,
      pikblockevent.itemId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }
  if (loadingState === 'loaded' && !nfts.length)
    return (
      <h1 className="flex flex-col justify-center space-y-1 px-4 mt-4">
        <Link href="/event">
          <a className="bg-yellow-600 px-10 py-4 text-1xl flex justify-center rounded">
            PikBlock event
          </a>
        </Link>
        <Link href="/event-post">
          <a className="bg-yellow-600 px-10 py-4 text-1xl flex justify-center rounded">
            Post
          </a>
        </Link>
        <Link href="/event-catalog">
          <a className="bg-yellow-600 px-10 py-4 text-1xl flex justify-center rounded">
            Full event catalog
          </a>
        </Link>
        <Link href="/event-my">
          <a className="bg-yellow-600 px-10 py-4 text-1xl flex justify-center rounded">
            My collection
          </a>
        </Link>
        <Link href="/event-dash">
          <a className="bg-yellow-600 px-10 py-4 text-1xl flex justify-center rounded">
            My event dashboard
          </a>
        </Link>
      </h1>
    );
  return (
    <div className="flex flex-col justify-center space-y-1 px-4 mt-4">
      <Link href="/event">
        <a className="bg-yellow-600 px-10 py-4 text-1xl flex justify-center rounded">
          PikBlock event
        </a>
      </Link>
      <Link href="/event-post">
        <a className="bg-yellow-600 px-10 py-4 text-1xl flex justify-center rounded">
          Post
        </a>
      </Link>
      <Link href="/event-catalog">
        <a className="bg-yellow-600 px-10 py-4 text-1xl flex justify-center rounded">
          Full event catalog
        </a>
      </Link>
      <Link href="/event-my">
        <a className="bg-yellow-600 px-10 py-4 text-1xl flex justify-center rounded">
          My collection
        </a>
      </Link>
      <Link href="/event-dash">
        <a className="bg-yellow-600 px-10 py-4 text-1xl flex justify-center rounded">
          My event dashboard
        </a>
      </Link>
      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: '1000px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-1 pt-1">
            {currentItems.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p
                    style={{ height: '30px' }}
                    className="text-2xl font-semibold"
                  >
                    {nft.name}
                  </p>
                  <div style={{ height: '150px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl mb-4 font-italic text-white">
                    N. {nft.itemId}
                  </p>
                  <p className="text-2xl mb-4 font-bold text-white">
                    {nft.price} xDai
                  </p>
                  <button
                    className="w-full bg-yellow-600 text-white font-bold py-2 px-12 rounded"
                    onClick={() => buyNft(nft)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            limit={LIMIT}
            total={nfts.length}
            offset={offset}
            setOffset={setOffset}
          />
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req)

//   if (!user) {
//     return { props: {}, redirect: { destination: '/sign-in' } }
//   }

//   return { props: { user } }
// }
