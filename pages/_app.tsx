import "@/styles/global.css"
import type {AppProps} from 'next/app'
import Head from "next/head";
import {DefaultTemplate} from "@/components/index";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <DefaultTemplate>
      <Head>
        <title>Alexander Jeam Oro</title>
        <meta name="description" content="Generated by create next app"/>
      </Head>
      <Component {...pageProps} />
    </DefaultTemplate>
  )
}

export default MyApp