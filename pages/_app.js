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
       <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="/">
            <a className="text-1xl font-bold mr-2 text-red-400">
            Pikblock
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="/event">
            <a className="text-1xl font-bold mr-2 text-yellow-600">
            Event Piks
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="/extra">
            <a className="text-1xl font-bold mr-2 text-yellow-400">
            Extra Piks
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="/family">
            <a className="text-1xl font-bold mr-2 text-green-500">
            Family Piks
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="/friends">
            <a className="text-1xl font-bold mr-2 text-blue-400">
            Friends Piks
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="/lifestyle">
            <a className="text-1xl font-bold mr-2 text-blue-600">
            Lifestyle Piks
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="/portrait">
            <a className="text-1xl font-bold mr-2 text-purple-600">
            Portrait Piks
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="/travel">
            <a className="text-1xl font-bold mr-2 text-pink-600">
            Travel Piks
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="https://www.dchan.co">
            <a className="text-2xl mr-2 font-bold text-red-600">
            Post your NFT Meme here!
            </a>
          </Link>
        </div>
      </nav>
      <nav className="border-b p-2 mt-2 flex justify-center">
        <div className="flex justify-wrap mt-1">
          <Link href="https://www.theartsmuseum.com/">
            <a className="text-2xl mr-2 font-bold text-yellow-600">
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