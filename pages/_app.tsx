import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";
import Navigation from "@/components/shared/Navigation";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      <title>PetProtect | Web3 Pet Insurance, No Middlemen</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

