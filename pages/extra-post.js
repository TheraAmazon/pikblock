import { useState } from 'react';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { supabase } from '../client';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
import Link from 'next/link';

import imageCompression from 'browser-image-compression';
import { pikblockextraaddress, pikblockextraMarketaddress } from '../config';

import PIKBLOCKEXTRA from '../artifacts/contracts/PIKBLOCKEXTRA.sol/PIKBLOCKEXTRA.json';
import PIKBLOCKEXTRAMarket from '../artifacts/contracts/PIKBLOCKEXTRAMarket.sol/PIKBLOCKEXTRAMarket.json';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const subdomain = 'https://pikblock.infura-ipfs.io';
const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: '',
    name: '',
    description: '',
  });
  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const compressedFile = await imageCompression(file, {
        ...compressionOptions,
        onProgress: (prog) => console.log(`compressing: ${prog}`),
      });
      const added = await client.add(compressedFile, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://pikblock.infura-ipfs.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }
  async function createMarket() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://pikblock.infura-ipfs.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(
      pikblockextraaddress,
      PIKBLOCKEXTRA.abi,
      signer
    );
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, 'ether');

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(
      pikblockextraMarketaddress,
      PIKBLOCKEXTRAMarket.abi,
      signer
    );
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(
      pikblockextraaddress,
      tokenId,
      price,
      { value: listingPrice }
    );
    await transaction.wait();
    router.push('/extra');
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <p className="text-1xl italic">
          For the safety of your copyright work and best practices please
          provide your full name, date, address, social media and if possible
          sign your Pik in the description.
        </p>
        <input
          placeholder="Pik Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="Pik Description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Pik Price in xDai"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <input
          type="file"
          accept="image/*"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        <p className="text-1xl italic">
          You will need a wallet funded with xDai to post. After posting please
          wait 3 seconds to mine your NFT.
        </p>
        <div className="box-content">
          <div className="aspect-w-2 aspect-h-1 flex justify-center">
            <iframe
              src="https://www.youtube.com/embed/HlghEfyI2J8"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div>
          <Link href="https://add.gnosis.tools/">
            <a className="mr-2 font-bold text-yellow-600">
              🦊 Add chain to MetaMask
            </a>
          </Link>
        </div>
        <div>
          <Link href="https://www.gimlu.com/faucet">
            <a className="mr-2 font-bold text-purple-600">
              Get some Optimistic xDai from the Faucet here
            </a>
          </Link>
        </div>
        <button
          onClick={createMarket}
          className="font-bold mt-4 bg-yellow-400 text-white rounded p-4 shadow-lg"
        >
          Create Post
        </button>
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
