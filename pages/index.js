import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>PikBlock - Blockchain album</title>
        <meta name="description" content="The Arts Museum" />
        <link rel="icon" href="/pikblock.png" />
      </Head>
      <div className="relative py-4 sm:max-w-xl sm:mx-auto max-w-md mx-auto md:max-w-4xl justify-center center-items">
            <div className="md:flex relative px-4 py-3 bg-gray-100 shadow-lg sm:rounded-3xl sm:p-12">
            <div className="max-w-md mx-auto">

      <div className="flex justify-center">
            <Image src="/pikblock.png" alt="PikBlock Logo" width={222} height={222} />
          </div>
        <h1 className="px-5 py-2 text-3xl flex justify-center">
          Blockchain Album 
        </h1>

        <p className={styles.description}> 
          YOUR PICTURES AND MEMORIES SECURE IN THE BLOCKCHAIN!
        </p>

        <div className="Faucet-header flex justify-center">
      <button className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase px-3 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
          <Link href="/dao">
            <a className="px-3 py-2 text-1xl flex justify-center">
            Join Our DAO for community engagement, NFT drops and more here!
            </a>
          </Link>
      </button>   
      </div>
      
      <div className="flex justify-center items-center">
          <nav className="flex justify-center">
          <div className="text-base text-gray-700 sm:text-md grid grid-cols-1 gap-1 justify-items-stretch">
          <button className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase px-3 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
        <Link href="/event">
            <a className="px-3 py-2 text-2xl flex justify-center">
              Post Event Piks!
            </a>
          </Link>
          </button>
        </div>
      </nav>
        </div>
        <div className="box-content h-1000 w-1000 p-4 flex border-2 flex justify-center border-yellow-400">
          <nav className="flex justify-center">
          <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <Link href="/extra">
            <a className="text-2xl mr-2 font-bold text-yellow-400">
              Post Extra Piks!
            </a>
          </Link>
        </div>
      </nav>
        </div>
        <div className="box-content h-1000 w-1000 p-4 flex border-2 flex justify-center border-green-500">
          <nav className="flex justify-center">
          <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <Link href="/family">
            <a className="text-2xl mr-2 font-bold text-green-500">
              Post Family Piks!
            </a>
          </Link>
        </div>
      </nav>
        </div>
        <div className="box-content h-1000 w-1000 p-4 flex border-2 flex justify-center border-red-400">
          <nav className="flex justify-center">
          <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <Link href="/friends">
            <a className="text-2xl mr-2 font-bold text-blue-400">
              Post Friends Piks!
            </a>
          </Link>
        </div>
      </nav>
        </div>
        <div className="box-content h-1000 w-1000 p-4 flex border-2 flex justify-center border-blue-600">
          <nav className="flex justify-center">
          <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <Link href="/lifestyle">
            <a className="text-2xl mr-2 font-bold text-blue-600">
              Post Lifestyle Piks!
            </a>
          </Link>
        </div>
      </nav>
        </div>
        <div className="box-content h-1000 w-1000 p-4 flex border-2 flex justify-center border-purple-600">
          <nav className="flex justify-center">
          <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <Link href="/portrait">
            <a className="text-2xl mr-2 font-bold text-purple-600">
              Post Portrait Piks!
            </a>
          </Link>
        </div>
      </nav>
        </div>
        <div className="box-content h-1000 w-1000 p-4 flex border-2 flex justify-center border-pink-600">
          <nav className="flex justify-center">
          <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <Link href="/travel">
            <a className="text-2xl mr-2 font-bold text-pink-600">
              Post Travel Piks!
            </a>
          </Link>
        </div>
      </nav>
        </div>
        <div className="box-content h-1000 w-1000 p-4 flex border-2 flex justify-center border-pink-300">
          <nav className="flex justify-center">
          <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <Link href="/dao">
            <a className="text-2xl mr-2 font-bold text-pink-800">
              /PIKBLOCK DAO TOKENS!/
            </a>
          </Link>
        </div>
      </nav>
        </div>
        <div className="box-content h-1000 w-1000 p-4 flex border-2 flex justify-center border-green-300">
          <nav className="flex justify-center">
          <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <Link href="/thera">
            <a className="text-2xl mr-2 font-bold text-green-500">
              /Amazon Protection Program/
            </a>
          </Link>
        </div>
      </nav>
        </div>
        <div>
        <p className="mr-1 text-red-600">Help the platform through donations and lets create together a better world!</p>
      </div>
      <div>
        <a className="mr-1 text-green-600 flex flex-1 text-sm justify-left">Bitcoin : bc1qd29zqcm78w57zhr6zdt2cxrrsqd5mxuk28lmwp</a>
      </div>
      <div>
        <a className="mr-1 text-blue-600 flex flex-1 text-sm justify-left">Eth Mainnet : 0x2E05EC78064E6E2b6fAAf6E4B6ed11684e7C9947</a>
      </div>
      <div>
        <a className="mr-1 text-purple-600 flex flex-1 text-sm justify-left">Polygon (Matic Network) : 0x2eb0071ab3067dFEbd8926761dE152Eb432b6820</a>
      </div>
           <div className="box-content">
        <div className="aspect-w-2 aspect-h-1 flex justify-center">
         <iframe src="https://www.youtube.com/embed/r9jwGansp1E" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
         </div>
       </div>
</div>
      </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://thera.foundation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/Thera Thera.png" alt="Vercel Logo" width={40} height={40} />
          </span>
          v0.0.3
        </a>
      </footer>
    </div>
  )
}