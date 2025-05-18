import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";
import Navigation from "@/components/shared/Navigation";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PetProtect | Web3 Pet Insurance, No Middlemen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
