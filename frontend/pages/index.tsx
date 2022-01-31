import type { NextPage } from "next";
import Head from "next/head";

import { Navbar } from "../components";
import { Pyramid } from "../components";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <Pyramid />
      </main>
    </div>
  );
};

export default Home;