import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Next ToDo App</title>
        <meta name="description" content="The next todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>TODO</main>
    </div>
  );
};

export default Home;
