import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@components/Navbar";
import Head from "next/head";
import styles from "@styles/Home.module.css";
import { useEffect, useState } from "react";
import { TronProvider } from "@components/TronProvider";
import { accordionAnatomy } from "@chakra-ui/anatomy";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

declare global {
  interface Window {
    tronWeb: any;
  }
}

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const custom = definePartsStyle({
  root: {
    paddingBottom: "2rem",
  },
  panel: {
    padding: 0,
  },
  button: {
    padding: 0,
  },
  item: {
    border: "none",
  },
});

const switchTheme = defineMultiStyleConfig({ variants: { custom } });

const accordionTheme = defineMultiStyleConfig({
  variants: { custom },
});

const theme = extendTheme({
  styles: {
    global: {
      "*": {
        fontFamily: "Inter",
        color: "white",
      },
      a: {
        _hover: {
          textDecoration: "none !important",
        },
      },
    },
  },
  components: { Accordion: accordionTheme, Switch: switchTheme },
});

function MyApp({ Component, pageProps, router }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <ChakraProvider theme={theme}>
      <TronProvider>
        <Head>
          <title>SealKey: Bringing real-world assets on-chain</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Component {...pageProps} key={router.route} />
      </TronProvider>
      <Box className={styles.ellipseOne}></Box>
    </ChakraProvider>
  );
}

export default MyApp;
