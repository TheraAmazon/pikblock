import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import PikBlock from '../public/pikblock.png';

export default function Home() {
  return (
    <div>
      <div className="relative py-2 sm:max-w-xl sm:mx-auto max-w-md mx-auto md:max-w-4xl justify-center center-items">
        <div className="md:flex relative px-4 py-3 shadow-lg sm:rounded-3xl sm:p-12">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center items-center">
              <Image
                src="/pikblock.png"
                alt="PikBlock Logo"
                width={222}
                height={222}
              />
            </div>
            <h1 className="px-5 py-2 text-3xl flex justify-center">
              Blockchain Album
            </h1>

            <p className={styles.description}>
              YOUR PICTURES AND MEMORIES SECURE IN THE BLOCKCHAIN!
            </p>

            <div className="box-content p-3 flex justify-center items-center border-red-300">
              <nav className="flex justify-center">
                <div className="text-base text-gray-700 sm:text-sm grid grid-cols-1 hover:grid-cols-1 gap-1 justify-items-stretch">
                  <button
                    className="text-yellow-600 bg-transparent border border-solid border-yellow-700 hover:bg-yellow-700 hover:text-white active:bg-yellow-800 font-bold uppercase px-3 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <Link href="/event">
                      <a className="mr-1/2">Post Event Piks!</a>
                    </Link>
                  </button>
                  <button
                    className="text-yellow-400 bg-transparent border border-solid border-yellow-500 hover:bg-yellow-500 hover:text-white active:bg-yellow-600 font-bold uppercase px-3 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <Link href="/extra">
                      <a className="mr-1/2">Post Extra Piks!</a>
                    </Link>
                  </button>
                  <button
                    className="text-green-400 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase px-3 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <Link href="/family">
                      <a className="mr-1/2">Post Family piks!</a>
                    </Link>
                  </button>
                  <button
                    className="text-blue-400 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase px-3 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <Link href="/friends">
                      <a className="mr-1/2">Post Friend Piks!</a>
                    </Link>
                  </button>
                  <button
                    className="text-blue-600 bg-transparent border border-solid border-blue-700 hover:bg-blue-700 hover:text-white active:bg-blue-800 font-bold uppercase px-3 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <Link href="/lifestyle">
                      <a className="mr-1/2">Post Lifestyle Piks!</a>
                    </Link>
                  </button>
                  <button
                    className="text-purple-600 bg-transparent border border-solid border-purple-700 hover:bg-purple-700 hover:text-white active:bg-purple-800 font-bold uppercase px-3 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <Link href="/portrait">
                      <a className="mr-1/2">Post Portrait Piks!</a>
                    </Link>
                  </button>
                  <button
                    className="text-pink-600 bg-transparent border border-solid border-pink-700 hover:bg-pink-700 hover:text-white active:bg-pink-800 font-bold uppercase px-3 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <Link href="/travel">
                      <a className="mr-1/2">Post Travel Piks!</a>
                    </Link>
                  </button>
                  <button
                    className="text-green-400 bg-transparent border border-solid border-green-400 hover:bg-green-400 hover:text-white active:bg-green-400 font-bold uppercase px-3 py-4 rounded outline-none focus:outline-none mr-1/2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <Link href="/thera">
                      <a className="mr-1/2 font-bold">
                        /Amazon Protection Program/
                      </a>
                    </Link>
                  </button>
                </div>
              </nav>
            </div>
            <div className="box-content p-3 flex justify-center items-center border-red-300">
              <nav className="flex justify-center">
                <div className="text-base text-gray-700 sm:text-sm grid grid-cols-1 hover:grid-cols-4 gap-1 justify-items-center"></div>
              </nav>
            </div>
            <div className="relative py-4 sm:max-w-xl sm:mx-auto max-w-md mx-auto md:max-w-4xl justify-center center-items">
              <h1 className="px-8 py-2 text-2xl flex justify-center items-center">
                <a className="mr-1 text-red-600">
                  Help the platform through donations and lets create together a
                  better world!
                </a>
              </h1>
            </div>
            <div className="relative py-4 sm:max-w-xl sm:mx-auto max-w-md mx-auto md:max-w-4xl justify-center center-items">
              <h1 className="px-5 py-2 text-1xl flex justify-center items-center">
                <a className="mr-1 text-green-600 flex flex-1 text-xs justify-left">
                  Bitcoin Wallet : bc1qd29zqcm78w57zhr6zdt2cxrrsqd5mxuk28lmwp
                </a>
              </h1>
            </div>
            <div className="relative py-4 sm:max-w-xl sm:mx-auto max-w-md mx-auto md:max-w-4xl justify-center center-items">
              <h1 className="px-5 py-2 text-2xl flex justify-center items-center">
                <a className="mr-1 text-blue-600 flex flex-1 text-xs justify-left">
                  Eth Mainnet : 0x2E05EC78064E6E2b6fAAf6E4B6ed11684e7C9947
                </a>
              </h1>
            </div>
            <div className="relative py-4 sm:max-w-xl sm:mx-auto max-w-md mx-auto md:max-w-4xl justify-center center-items">
              <h1 className="px-5 py-2 text-2xl flex justify-center items-center">
                <a className="mr-1 text-purple-600 flex flex-1 text-xs justify-left">
                  Polygon (Matic Network) :
                  0x2eb0071ab3067dFEbd8926761dE152Eb432b6820
                </a>
              </h1>
            </div>
            <div className="box-content">
              <div className="aspect-w-2 aspect-h-1 flex justify-center">
                <iframe
                  src="https://www.youtube.com/embed/r9jwGansp1E"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
            <Image
              src="/Thera Thera.png"
              alt="Vercel Logo"
              width={40}
              height={40}
            />
          </span>
          v0.0.3
        </a>
      </footer>
    </div>
  );
}
