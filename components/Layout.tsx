import React from "react";
import { Container, createStyles } from "@mantine/core";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <Container size={`lg`}>{children}</Container>;
};

export default Layout;
