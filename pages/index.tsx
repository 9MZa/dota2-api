import { Grid, Box, Title, Loader } from "@mantine/core";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import AllHero from "../components/AllHero";
import Example from "../components/Example";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Example />
      {/* <AllHero /> */}
    </Layout>
  );
}
