import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";
import Navigation from "@/components/shared/Navigation";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 96x96" />
        <title> Pet Protect Insurance – Decentralized Coverage Pools</title>
      </Head>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

