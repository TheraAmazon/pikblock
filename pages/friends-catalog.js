import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import axios from 'axios';
import Web3Modal from 'web3modal';
import Link from 'next/link';
import Pagination from './components/pagination';

import {
  pikblockfriendsaddress,
  pikblockfriendsMarketaddress,
} from '../config';

import PIKBLOCKFRIENDS from '../artifacts/contracts/PIKBLOCKFRIENDS.sol/PIKBLOCKFRIENDS.json';
import PIKBLOCKFRIENDSMarket from '../artifacts/contracts/PIKBLOCKFRIENDSMarket.sol/PIKBLOCKFRIENDSMarket.json';

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const LIMIT = 30; // limite de itens por página
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
      pikblockfriendsaddress,
      PIKBLOCKFRIENDS.abi,
      provider
    );
    const marketContract = new ethers.Contract(
      pikblockfriendsMarketaddress,
      PIKBLOCKFRIENDSMarket.abi,
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
  async function buyNft(pikblockfriends) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      pikblockfriendsMarketaddress,
      PIKBLOCKFRIENDSMarket.abi,
      signer
    );

    const price = ethers.utils.parseUnits(
      pikblockfriends.price.toString(),
      'ether'
    );
    const transaction = await contract.createMarketSale(
      pikblockfriendsaddress,
      pikblockfriends.itemId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }
  if (loadingState === 'loaded' && !nfts.length)
    return (
      <h1 className="bg-blue-400 flex flex-col justify-center space-y-1 px-4 mt-4">
        <Link href="/friends">
          <a className="bg-blue-400 px-10 py-4 text-1xl flex justify-center rounded">
            PikBlock friends
          </a>
        </Link>
        <Link href="/friends-post">
          <a className="bg-blue-400 px-10 py-4 text-1xl flex justify-center rounded">
            Post
          </a>
        </Link>
        <Link href="/friends-catalog">
          <a className="bg-blue-400 px-10 py-4 text-1xl flex justify-center rounded">
            Full friends catalog
          </a>
        </Link>
        <Link href="/friends-my">
          <a className="bg-blue-400 px-10 py-4 text-1xl flex justify-center rounded">
            My collection
          </a>
        </Link>
        <Link href="/friends-dash">
          <a className="bg-blue-400 px-10 py-4 text-1xl flex justify-center rounded">
            My friends dashboard
          </a>
        </Link>
      </h1>
    );
  return (
    <div className="flex flex-col justify-center space-y-1 px-4 mt-4">
      <Link href="/friends">
        <a className="bg-blue-400 px-10 py-4 text-1xl flex justify-center rounded">
          PikBlock friends
        </a>
      </Link>
      <Link href="/friends-post">
        <a className="bg-blue-400 px-10 py-4 text-1xl flex justify-center rounded">
          Post
        </a>
      </Link>
      <Link href="/friends-catalog">
        <a className="bg-blue-400 px-10 py-4 text-1xl flex justify-center rounded">
          Full friends catalog
        </a>
      </Link>
      <Link href="/friends-my">
        <a className="bg-blue-400 px-10 py-4 text-1xl flex justify-center rounded">
          My collection
        </a>
      </Link>
      <Link href="/friends-dash">
        <a className="bg-blue-400 px-10 py-4 text-1xl flex justify-center rounded">
          My friends dashboard
        </a>
      </Link>
      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: '2000px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 pt-5 flex items-end">
            {currentItems.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p
                    style={{ maxHeight: '64px' }}
                    className="text-1xl font-semibold"
                  >
                    {nft.name}
                  </p>
                  <div style={{ maxHeight: '80px', overflow: 'hidden' }}></div>
                </div>
                <div className="w-full p-4 bg-black">
                  <p className="text-2xl mb-4 font-italic text-white">
                    N. {nft.itemId}
                  </p>
                  <p className="text-2xl mb-4 font-bold text-white">
                    {nft.price} xDai
                  </p>
                  <button
                    className="w-full bg-blue-400 text-white font-bold py-2 px-12 rounded"
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
