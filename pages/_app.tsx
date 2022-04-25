import type { AppProps } from 'next/app';
import Head from 'next/head';

import { NotificationProvider } from '../context/notificationContext';
import { TodosProvider } from '../context/todosContext';

function TodoApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next ToDo App</title>
        <meta name="description" content="The next todo app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <TodosProvider>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </TodosProvider>
    </>
  );
}

export default TodoApp;
