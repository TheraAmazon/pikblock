import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { supabase } from '../client'
import Thera from '../artifacts/contracts/Thera.sol/Thera.json'
import TheraUnique from '../artifacts/contracts/Thera.sol/TheraUnique.json'
import TheraEccentric from '../artifacts/contracts/Thera.sol/TheraEccentric.json'
import TheraExtraordinary from '../artifacts/contracts/Thera.sol/TheraExtraordinary.json'
import TheraSpecial from '../artifacts/contracts/Thera.sol/TheraSpecial.json'
import TheraPreSale from '../artifacts/contracts/Thera.sol/TheraPreSale.json'
import TheraMainSale from '../artifacts/contracts/Thera.sol/TheraMainSale.json'
import TheraStable from '../artifacts/contracts/Thera.sol/TheraStable.json'
const theraaddress = "0x525C7063E7C20997BaaE9bDa922159152D0e8417"
const theraUniqueaddress = "0x38a024C0b412B9d1db8BC398140D00F5Af3093D4"



//import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

export default function Sale() {
  const [userAccount, setUserAccount] = useState()
  const [tokenAmount, setAmount] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }


  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(theraaddress, Thera.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(theraUniqueaddress, TheraUnique.abi, signer);
      const options = {value: ethers.utils.parseEther(tokenAmount)};
      const transation = await contract.buyTokens(userAccount, options);
      await transation.wait();
      console.log(`${tokenAmount} Theras Successfully bought! ${userAccount}`);

    }
  }

  return (
<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
<div className="relative py-3 sm:max-w-xl sm:mx-auto">
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
  <div className="relative px-4 py-4 bg-white shadow-lg sm:rounded-3xl sm:p-10">
    <div className="max-w-md mx-auto">
            <div className="flex justify-center">
            <img src="/Thera Thera.png" alt="Vercel Logo" width={222} height={222} />
          </div>
      <div className="divide-y divide-gray-300/50">
        <div className="py-8 text-base leading-7 space-y-6 text-gray-600">
          <p>A program constructed in the heart of the Amazon Rainforest</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg className="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">
                Tokenomics based on Resorces!
                <code className="text-sm font-bold text-green-500"> Each 200 Theras equals a Grown Frutiful Tree</code>
              </p>
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">
                Fruits, juices, seeds are turned into profit and enpower the Thera Programs!
                <code className="text-sm font-bold text-blue-500"> Thera owners may also use Theras to purchase these products in the future.</code>
              </p>
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">Multiple Sales will be given and offered to <code className="text-sm font-bold text-purple-500">all humans!</code></p>
            </li>
          </ul>
          <p>By using the best tokenomics we will create an economy that can mitigate and <code className="text-sm font-bold text-red-500">stop the deforestation together.</code></p>
        </div>
        <div className="pt-8 text-base leading-7 font-semibold">
        <input 
          placeholder="Wallet Account"
          className="mt-2 border rounded px-4 py-4 flex items-center justify-center display: flex"
          onChange={e => setUserAccount(e.target.value)}
        />
        <input 
          placeholder="Polygon quantity"
          className="mt-2 border rounded px-4 py-4 flex items-center justify-center display: flex"
          onChange={e => setAmount(e.target.value)}
        />
        <div className="mt-4 flex items-center justify-center">
        <button className="text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-blue-600 font-bold uppercase px-12 py-4 rounded outline-none focus:outline-none mr-1 mb-4 ease-linear transition-all duration-150 flex items-center" onClick={sendCoins}>Buy Theras</button>
        </div>
          <p className="text-green-500">Read the emerald paper here!</p>
          <p>
            <a href="https://tailwindcss.com/docs" className="text-green-500 hover:text-sky-600">Emerald Paper &rarr;</a>
          </p>
          </div>
        </div>
      </div>
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

