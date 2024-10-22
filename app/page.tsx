'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/links')
  }, [router])


  return (
    <main className='mainContainer mx-4 mt-4 bg-[#fafafa]'>
    </main>
  );
}
