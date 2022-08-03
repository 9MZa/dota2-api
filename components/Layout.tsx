import React from "react";
import { Container, Box } from "@mantine/core";
import Navbar from "./Navbar";
import Head from "next/head";
type LayoutProps = {
  children: React.ReactNode;
};

// const bgUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//home/heroes_mobile.jpg`;

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Head>
        <title>DOTA 2 API</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container size={`lg`}>
        <Navbar />
      </Container>
      <Container size={`lg`}>{children}</Container>
    </Box>
  );
};

export default Layout;
