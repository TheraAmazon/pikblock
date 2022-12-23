import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  useEffect(() => {
    fetchProfile();
  }, []);
  async function update() {
    const { user, error } = await supabase.auth.update({
      data: {
        city: 'New York',
      },
    });
    console.log('user:', user);
  }
  async function fetchProfile() {
    const profileData = await supabase.auth.user();
    console.log('profileData: ', profileData);
    if (!profileData) {
      router.push('/sign-in');
    } else {
      setProfile(profileData);
    }
  }
  async function signOut() {
    await supabase.auth.signOut();
    router.push('/sign-in');
  }
  if (!profile) return null;
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <h2>Hello, {profile.email}</h2>
      <p>User ID: {profile.id}</p>
      <button onClick={signOut}>Sign Out</button>
      <button onClick={update}>Set Attribute</button>
      <div className="Faucet-header py-4 flex justify-center items-center">
        <button
          className="text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-blue-600 font-bold uppercase px-3 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          <Link href="/thera">
            <a className="px-3 py-2 text-1xl flex justify-center">
              Donate to help develop the Amazon!
            </a>
          </Link>
        </button>
      </div>
    </div>
  );
}
