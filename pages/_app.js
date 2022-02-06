import '../styles/globals.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useRouter } from 'next/router'



function Marketplace({ Component, pageProps }) {
  const router = useRouter()
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        router.push('/profile')
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated')
      }
    })
    checkUser()
    return () => {
      authListener.unsubscribe()
    }
  }, [])
  async function checkUser() {
    const user = await supabase.auth.user()
    if (user) {
      setAuthenticatedState('authenticated')
    }
  }
  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }
  return (
    <div className="min-h-full bg-gray-100 py-4 flex flex-col justify-center sm:py-12">
        <p className="text-3xl font-bold flex justify-center">PikBlock - Secret Album </p>
        <nav className="box-content flex justify-center items-center border-red-300">
       <div className="text-base sm:text-sm grid grid-cols-4 hover:grid-cols-3 gap-1/2 justify-items-stretch">
       <button className="text-red-500 bg-transparent border border-solid border-red-600 hover:bg-red-600 hover:text-white active:bg-red-700 font-bold uppercase px-1 py-2 rounded outline-none focus:outline-none mr-1/2 mb-1 ease-linear transition-all duration-150" type="button">
          <Link href="/">
            <a className="text-1xl font-bold mr-1/2">
            Home
            </a>
          </Link>
          </button>
          <button className="text-yellow-600 bg-transparent border border-solid border-yellow-700 hover:bg-yellow-700 hover:text-white active:bg-yellow-800 font-bold uppercase px-1 py-2 rounded outline-none focus:outline-none mr-1/2 mb-1 ease-linear transition-all duration-150" type="button">
          <Link href="/event">
            <a className="text-1xl font-bold mr-1/2">
             Event Piks
            </a>
          </Link>
          </button>
          <button className="text-yellow-400 bg-transparent border border-solid border-yellow-500 hover:bg-yellow-500 hover:text-white active:bg-yellow-600 font-bold uppercase px-1 py-2 rounded outline-none focus:outline-none mr-1/2 mb-1 ease-linear transition-all duration-150" type="button">
          <Link href="/extra">
            <a className="text-1xl font-bold mr-1/2">
            Extra Piks
            </a>
          </Link>
          </button>
          <button className="text-green-500 bg-transparent border border-solid border-green-600 hover:bg-green-600 hover:text-white active:bg-green-700 font-bold uppercase px-1 py-2 rounded outline-none focus:outline-none mr-1/2 mb-1 ease-linear transition-all duration-150" type="button">
          <Link href="/family">
            <a className="text-1xl font-bold mr-1/2">
            Family Piks
            </a>
          </Link>
          </button>
          <button className="text-blue-400 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase px-1 py-2 rounded outline-none focus:outline-none mr-1/2 mb-1 ease-linear transition-all duration-150" type="button">
          <Link href="/friends">
            <a className="text-1xl font-bold mr-1/2">
            Friend Piks
            </a>
          </Link>
          </button>
          <button className="text-blue-600 bg-transparent border border-solid border-blue-700 hover:bg-blue-700 hover:text-white active:bg-blue-800 font-bold uppercase px-1 py-2 rounded outline-none focus:outline-none mr-1/2 mb-1 ease-linear transition-all duration-150" type="button">
          <Link href="/lifestyle">
            <a className="text-1xl font-bold mr-1/2">
            Lifestyle Piks
            </a>
          </Link>
          </button>
          <button className="text-purple-600 bg-transparent border border-solid border-purple-700 hover:bg-purple-700 hover:text-white active:bg-purple-800 font-bold uppercase px-1 py-2 rounded outline-none focus:outline-none mr-1/2 mb-1 ease-linear transition-all duration-150" type="button">
          <Link href="/portrait">
            <a className="text-1xl font-bold mr-1/2">
            Portrait Piks
            </a>
          </Link>
          </button>
          <button className="text-pink-600 bg-transparent border border-solid border-pink-700 hover:bg-pink-700 hover:text-white active:bg-pink-800 font-bold uppercase px-1 py-2 rounded outline-none focus:outline-none mr-1/2 mb-1 ease-linear transition-all duration-150" type="button">
          <Link href="/travel">
            <a className="text-1xl font-bold mr-1/2">
            Travel Piks
            </a>
          </Link>
          </button>
        </div>
      </nav>
            <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="/dao">
            <a className="text-1xl font-bold mr-2 text-pink-600">
            Pikblock Dao Tokens!
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="https://www.dchan.co">
            <a className="text-1xl mr-2 font-bold text-red-600">
            Post your NFT Meme here!
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="https://www.theartsmuseum.com/">
            <a className="text-1xl mr-2 font-bold text-yellow-600">
            Post your NFT ArtWork here!
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
      <Link href="/thera">
            <a className="text-2xl mr-2 font-bold text-green-500">
              Help Protect The Amazon!
            </a>
          </Link>
      </nav>
      <Component {...pageProps} />
    </div>  
  )
}

export default Marketplace