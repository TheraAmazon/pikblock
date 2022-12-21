import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { supabase } from '../client';
import Thera from '../artifacts/contracts/Thera.sol/Thera.json';
import TheraUnique from '../artifacts/contracts/Thera.sol/TheraUnique.json';
import TheraEccentric from '../artifacts/contracts/Thera.sol/TheraEccentric.json';
import TheraExtraordinary from '../artifacts/contracts/Thera.sol/TheraExtraordinary.json';
import TheraSpecial from '../artifacts/contracts/Thera.sol/TheraSpecial.json';
import TheraPreSale from '../artifacts/contracts/Thera.sol/TheraPreSale.json';
import TheraPromo from '../artifacts/contracts/Thera.sol/TheraPromo.json';
import TheraFoundation from '../artifacts/contracts/Thera.sol/TheraFoundation.json';
const theraaddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const theraUniqueaddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

//import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

function Sale({ user }) {
  console.log({ user });
  const [userAccount, setUserAccount] = useState();
  const [tokenAmount, setAmount] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(theraaddress, Thera.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log('Balance: ', balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        theraUniqueaddress,
        TheraUnique.abi,
        signer
      );
      const options = { value: ethers.utils.parseEther(tokenAmount) };
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
              <img
                src="/Thera Thera.png"
                alt="Thera Logo"
                width={222}
                height={222}
              />
            </div>
            <div className="divide-y divide-gray-300/50">
              <div className="py-8 text-base leading-7 space-y-6 text-gray-600">
                <p>
                  A program constructed in the heart of the Amazon Rainforest
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg className="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2">
                      <circle cx="12" cy="12" r="11" />
                      <path
                        d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                        fill="none"
                      />
                    </svg>
                    <p className="ml-4">
                      Tokenomics based on Love!
                      <code className="text-sm font-bold text-orange-500">
                        {' '}
                        Theras are directed to our Fund to help the Amazon
                      </code>
                    </p>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2">
                      <circle cx="12" cy="12" r="11" />
                      <path
                        d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                        fill="none"
                      />
                    </svg>
                    <p className="ml-4">
                      Theras give rights to
                      <code className="text-sm font-bold text-blue-500">
                        {' '}
                        vote, exclusive Thera Art, Thera Music and much more
                        products coming soon!
                      </code>
                    </p>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2">
                      <circle cx="12" cy="12" r="11" />
                      <path
                        d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                        fill="none"
                      />
                    </svg>
                    <p className="ml-4">
                      By owning Theras you participate in our DAO voting and
                      have the power to guide{' '}
                      <code className="text-sm font-bold text-green-500">
                        the Amazon!
                      </code>
                    </p>
                  </li>
                </ul>
                <p>
                  Together lets direct our funds and{' '}
                  <code className="text-sm font-bold text-purple-500">
                    stop deforestation together.
                  </code>
                </p>
                <p>
                  Insert your wallet address and verify your wallet is confirmed
                  on your transaction;{' '}
                  <code className="text-sm font-bold text-red-500">
                    1 XDAI dollar equals 12 Theras.
                  </code>
                </p>
              </div>
              <div className="pt-2 text-base leading-7 font-semibold">
                <div className="mt-2 flex items-center justify-center">
                  <input
                    placeholder="Wallet Account"
                    className="mt-2 border rounded px-4 py-4 flex justify-center items-center"
                    onChange={(e) => setUserAccount(e.target.value)}
                  />
                </div>
                <div className="mt-2 flex items-center justify-center">
                  <input
                    placeholder="xDai quantity"
                    className="mt-2 border rounded px-4 py-4 flex items-center justify-center display: flex"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <button
                    className="text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-blue-600 font-bold uppercase px-12 py-4 rounded outline-none focus:outline-none mr-1 mb-4 ease-linear transition-all duration-150 flex items-center"
                    onClick={sendCoins}
                  >
                    Buy Theras
                  </button>
                </div>
                <p className="text-green-500">Read the emerald paper here!</p>
                <p>
                  <a
                    href="https://bafybeidfie36julhtnfvahgihvqu3xbuop7edqvnay6pnqepju2womulta.ipfs.dweb.link/Papel%20Esmeralda%20ENG.pdf"
                    className="text-green-500 hover:text-sky-600"
                  >
                    Emerald Paper &rarr;
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sale;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: '/sign-in' } };
  }

  return { props: { user } };
}
