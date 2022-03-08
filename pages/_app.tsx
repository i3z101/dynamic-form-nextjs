import '../styles/globals.css'
import '../styles/dynamic-form.css'
import type { AppProps } from 'next/app'
import { wrapper } from 'store/store-config';
import { NextUIProvider } from '@nextui-org/react';
import { Fragment } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return <Fragment>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />    
        </Head>
        <Component {...pageProps} />
    </Fragment>
}


export default wrapper.withRedux(MyApp)