"use client"
import Navbar from '@/components/Navbar'
import { AuthContextProvider } from '@/contexts/AuthContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <AuthContextProvider>
    <Navbar>
      <Component {...pageProps} />
    </Navbar>
</AuthContextProvider>
  )
}
