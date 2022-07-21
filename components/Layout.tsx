import React from "react";
import { Container, createStyles, Box } from "@mantine/core";
import Navbar from "./Navbar";
type LayoutProps = {
  children: React.ReactNode;
};

// const bgUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//home/heroes_mobile.jpg`;

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Container size={`lg`}>
        <Navbar />
      </Container>
      <Container size={`lg`}>{children}</Container>
    </Box>
  );
};

export default Layout;
