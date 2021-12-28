import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { supabase } from '../client'
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'

import {
  pikblockaddress
} from '../config'

import Pikblock from '../artifacts/contracts/Pikblock.sol/Pikblock.json'

function Faucet({ user }) {
  console.log({ user })
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function WinPiktokens() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(pikblockaddress, Pikblock.abi, signer)
      const balance = await contract.drip({});
      console.log("Balance: ", balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <h1 className="bg-gradient-to-r from-yellow-200 to-purple-100 px-5 py-4 text-1xl">
    
    <div className="Faucet">
      <p>
      <h4 className="text-3xl font-normal leading-normal mt-0 mb-2 text-red-500 flex justify-center">
       Pikblock is a photo community that register piks in the blockchain
      </h4>
      </p>
      <p>
      <h4 className="text-3xl font-normal leading-normal mt-0 mb-2 text-yellow-700 flex justify-center">
       Each pik is sent to the interplanetary file system and hosted forever!
      </h4>
      </p>
      <p>
      <h4 className="text-3xl font-normal leading-normal mt-0 mb-2 text-yellow-400 flex justify-center">
       Piks are listed for sale, and users will automatically receive on sale!
      </h4>
      </p>
      <p>
      <h4 className="text-3xl font-normal leading-normal mt-0 mb-2 text-green-400 flex justify-center">
       The rules still apply to regulations of copyright, stealing others pictures is a crime!
      </h4>
      </p>
       <p>
      <h4 className="text-3xl font-normal leading-normal mt-0 mb-2 text-blue-400 flex justify-center">
       To create a better community we have created the Pikblock DAO!
      </h4>
      </p>
       <p>
      <h4 className="text-3xl font-normal leading-normal mt-0 mb-2 text-blue-600 flex justify-center">
       To participate just ask for free Pikblock tokens and receive your Crypto
      </h4>
      </p>
      <p>
      <h4 className="text-3xl font-normal leading-normal mt-0 mb-2 text-indigo-600 flex justify-center">
       The Faucet resets every 45 minutes! Come back hourly to receive more!
      </h4>
      </p>
      <p>
      <h4 className="text-3xl font-normal leading-normal mt-0 mb-2 text-purple-600 flex justify-center">
       Watch the tutorial and participate on our Discord through the following Link for airdrops!
      </h4>
      </p>

      <header className="Faucet-header flex justify-center">
        <button onClick={WinPiktokens} className="text-yellow-500 bg-transparent border border-solid border-yellow-500 hover:bg-yellow-500 hover:text-white active:bg-blue-600 font-bold uppercase px-1 py-7 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Receive Free PikBlock Crypto!</button>
      </header>
      
      <header className="Faucet-header flex justify-center">
      <button className="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase px-4 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
<Link href="https://discord.gg/myeSk52J6x">
            <a className="px-10 py-4 text-1xl flex justify-center">
              Pikblock Discord!
            </a>
          </Link>
</button>   
      </header>
      
    </div>
    </h1>
  );
}

export default Faucet;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/sign-in' } }
  }

  return { props: { user } }
}
