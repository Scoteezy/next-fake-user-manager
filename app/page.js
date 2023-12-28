'use client'
import { Roboto } from 'next/font/google'
const roboto = Roboto({subsets:['latin'], weight: "500"});

export default function Home() {
  return (
      <div>
        <h1>hELLO</h1>
        <h2 className={roboto.className}>Hello this is roboto font</h2>
      </div>
  )
}
