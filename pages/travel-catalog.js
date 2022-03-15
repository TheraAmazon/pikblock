import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { supabase } from '../client'
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'
import Pagination from "./components/pagination"

import {
  pikblocktraveladdress, pikblocktravelMarketaddress
} from '../config'

import PIKBLOCKTRAVEL from '../artifacts/contracts/PIKBLOCKTRAVEL.sol/PIKBLOCKTRAVEL.json'
import PIKBLOCKTRAVELMarket from '../artifacts/contracts/PIKBLOCKTRAVELMarket.sol/PIKBLOCKTRAVELMarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const LIMIT = 30 // limite de itens por página
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [offset, setOffset] = useState(0)
  const [currentItems, setCurrentItems] = useState(nfts.slice(offset, offset + LIMIT))
  
  useEffect(() => {
    setCurrentItems(nfts.slice(offset, offset + LIMIT))
    console.log(currentItems)
  }, [offset, nfts])

  useEffect(() => {
    (async () => await loadNFTs())()
  }, [])
  async function loadNFTs() {    
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.gnosischain.com")
    const tokenContract = new ethers.Contract(pikblocktraveladdress, PIKBLOCKTRAVEL.abi, provider)
    const marketContract = new ethers.Contract(pikblocktravelMarketaddress, PIKBLOCKTRAVELMarket.abi, provider)
    const data = await marketContract.fetchMarketItems()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        itemId: i. itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items.concat().reverse())
    setLoadingState('loaded') 
    console.log(items)
  }
  async function buyNft(pikblocktravel) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(pikblocktravelMarketaddress, PIKBLOCKTRAVELMarket.abi, signer)

    const price = ethers.utils.parseUnits(pikblocktravel.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(pikblocktraveladdress, pikblocktravel.itemId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="bg-pink-600 px-5 py-4 text-1xl">
    <Link href="/travel">
            <a className="bg-pink-600 px-10 py-4 text-1xl flex justify-center">
              PikBlock travel
            </a>
          </Link>
            <Link href="/travel-post">
            <a className="bg-pink-600 px-10 py-4 text-1xl flex justify-center">
              Post
            </a>
          </Link>
          <Link href="/travel-catalog">
            <a className="bg-pink-600 px-10 py-4 text-1xl flex justify-center">
            Full travel catalog
            </a>
          </Link>
          <Link href="/travel-my">
            <a className="bg-pink-600 px-10 py-4 text-1xl flex justify-center">
              My collection       
            </a>
          </Link>
          <Link href="/travel-dash">
            <a className="bg-pink-600 px-10 py-4 text-1xl flex justify-center">
              My travel dashboard
            </a>
          </Link>
          </h1>)
  return (
    <div>
    <Link href="/travel">
            <a className="bg-pink-600 px-10 py-4 text-1xl flex justify-center">
              PikBlock travel
            </a>
          </Link>
            <Link href="/travel-post">
            <a className="bg-pink-600 px-10 py-4 text-1xl flex justify-center">
              Post
            </a>
          </Link>
          <Link href="/travel-catalog">
            <a className="bg-pink-600 px-10 py-4 text-1xl flex justify-center">
            Full travel catalog
            </a>
          </Link>
          <Link href="/travel-my">
            <a className="bg-pink-600 px-10 py-4 text-1xl flex justify-center">
              My collection       
            </a>
          </Link>
          <Link href="/travel-dash">
            <a className="bg-pink-600 px-10 py-4 text-1xl flex justify-center">
              My travel dashboard
            </a>
          </Link>
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '2000px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 pt-5 flex items-end">
           {
            currentItems.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p style={{ maxHeight: '64px' }} className="text-1xl font-semibold">{nft.name}</p>
                  <div style={{ maxHeight: '80px', overflow: 'hidden' }}>
                  </div>
                </div>
                <div className="w-full p-4 bg-black">
                  <p className="text-2xl mb-4 font-italic text-white">N. {nft.itemId}</p>
                  <p className="text-2xl mb-4 font-bold text-white">{nft.price} xDai</p>
                  <button className="w-full bg-pink-600 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div>
              </div>
            ))
          }
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
  )
}

// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req)

//   if (!user) {
//     return { props: {}, redirect: { destination: '/sign-in' } }
//   }

//   return { props: { user } }
// }