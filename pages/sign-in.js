import { useState } from 'react'
import styles from '../styles/Home.module.css'

import { supabase } from '../client'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  async function signIn() {
    const { error, data } = await supabase.auth.signIn({
      email
    })
    if (error) {
      console.log({ error })
    } else {
      setSubmitted(true)
    }
  }
  if (submitted) {
    return (
      <div className="text-lg font-bold text-gray-900 flex items-center justify-center">
        <h1>Please check your email to sign in</h1>
      </div>
    )
  }
  return (

<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
<div className="relative py-3 sm:max-w-xl sm:mx-auto">
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
  <div className="relative px-4 py-4 bg-white shadow-lg sm:rounded-3xl sm:p-10">
    <div className="max-w-md mx-auto">
      <div className="divide-y divide-gray-200">
        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <p>By signing in :</p>
          <ul className="list-disc space-y-2">
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">
              You permit Thera to 
                <code className="text-sm font-bold text-gray-900"> send</code> you e-mail as a KYC process
              </p>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">
                You understand that global warming
                <code className="text-sm font-bold text-gray-900"> depends on everybody working together</code>
              </p>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">You will help share will people the program and help accelerate reforestation</p>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">You will help humanity evolve to its ultimate potential</p>
            </li>
          </ul>
          <input className="p-5 h-10 border-4 flex items-center border-blue-500 sm:h-7"
          onChange={e => setEmail(e.target.value)}
          style={{ margin: 10 }}
        />
        <button
        type="button" className="pt-6 text-base font-bold p-6 border-6 flex items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500" onClick={() => signIn()}>Sign in!</button>
        </div>
        <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
          {/* <p>
            <a href="https://www.copyright.gov/legislation/dmca.pdf" className="text-cyan-600 hover:text-cyan-700"> Read about Copyright! &rarr; </a>
          </p> */}
        </div>
      </div>
    </div>
  </div>
</div>
</div>

  )
}