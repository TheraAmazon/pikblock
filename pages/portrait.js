import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { supabase } from '../client'
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'
import Pagination from "./components/pagination"
import styles from '../styles/Home.module.css'

import {
  pikblockportraitaddress, pikblockportraitMarketaddress
} from '../config'

import PIKBLOCKPORTRAIT from '../artifacts/contracts/PIKBLOCKPORTRAIT.sol/PIKBLOCKPORTRAIT.json'
import PIKBLOCKPORTRAITMarket from '../artifacts/contracts/PIKBLOCKPORTRAITMarket.sol/PIKBLOCKPORTRAITMarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const LIMIT = 10 // limite de itens por página
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
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.infura.io/v3/291697c1912845f4b55b544eebda4698")
    const tokenContract = new ethers.Contract(pikblockportraitaddress, PIKBLOCKPORTRAIT.abi, provider)
    const marketContract = new ethers.Contract(pikblockportraitMarketaddress, PIKBLOCKPORTRAITMarket.abi, provider)
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
  async function buyNft(pikblockportrait) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(pikblockportraitMarketaddress, PIKBLOCKPORTRAITMarket.abi, signer)

    const price = ethers.utils.parseUnits(pikblockportrait.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(pikblockportraitddress, pikblockportrait.itemId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="bg-purple-600 px-5 py-4 text-1xl">
    <Link href="/portrait">
            <a className="bg-purple-600 px-10 py-4 text-1xl flex justify-center">
              PikBlock Portrait
            </a>
          </Link>
            <Link href="/portrait-post">
            <a className="bg-purple-600 px-10 py-4 text-1xl flex justify-center">
              Post
            </a>
          </Link>
          <Link href="/portrait-catalog">
            <a className="bg-purple-600 px-10 py-4 text-1xl flex justify-center">
            Full Portrait catalog
            </a>
          </Link>
          <Link href="/portrait-my">
            <a className="bg-purple-600 px-10 py-4 text-1xl flex justify-center">
              My collection       
            </a>
          </Link>
          <Link href="/portrait-dash">
            <a className="bg-purple-600 px-10 py-4 text-1xl flex justify-center">
              My Portrait dashboard
            </a>
          </Link>
          </h1>)
  return (
    <div>
    <Link href="/portrait">
            <a className="bg-purple-600 px-10 py-4 text-1xl flex justify-center">
              PikBlock Portrait
            </a>
          </Link>
            <Link href="/portrait-post">
            <a className="bg-purple-600 px-10 py-4 text-1xl flex justify-center">
              Post
            </a>
          </Link>
          <Link href="/portrait-catalog">
            <a className="bg-purple-600 px-10 py-4 text-1xl flex justify-center">
            Full Portrait catalog
            </a>
          </Link>
          <Link href="/portrait-my">
            <a className="bg-purple-600 px-10 py-4 text-1xl flex justify-center">
              My collection       
            </a>
          </Link>
          <Link href="/portrait-dash">
            <a className="bg-purple-600 px-10 py-4 text-1xl flex justify-center">
              My Portrait dashboard
            </a>
          </Link>
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1000px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-1 pt-1">
           {
            currentItems.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: '300px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl mb-4 font-italic text-white">N. {nft.itemId}</p>
                  <p className="text-2xl mb-4 font-bold text-white">{nft.price} Matic</p>
                  <button className="w-full bg-purple-600 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
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