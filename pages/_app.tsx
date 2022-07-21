import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { getCookie, setCookies } from "cookies-next";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  Global,
} from "@mantine/core";

const reaverBold = `https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/Reaver-Bold.woff`;
const reaverSemiBold = `https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/Reaver-SemiBold.woff`;

const radiance = `https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance.woff`;
const radianceSemiBold = `https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance-semibold.woff`;

const queryClient = new QueryClient();

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookies("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <Global
            styles={[
              {
                "@font-face": {
                  fontFamily: "Reaver Bold",
                  src: `url(${reaverBold}) format("woff")`,
                },
              },
              {
                "@font-face": {
                  fontFamily: "Reaver Semi Bold",
                  src: `url(${reaverSemiBold}) format("woff")`,
                },
              },
              {
                "@font-face": {
                  fontFamily: "Radiance",
                  src: `url(${radiance}) format("woff")`,
                },
              },
              {
                "@font-face": {
                  fontFamily: "Radiance Semi Bold",
                  src: `url(${radianceSemiBold}) format("woff")`,
                },
              },
            ]}
          />
          <MantineProvider
            theme={{
              colorScheme,
              fontFamily: "Radiance",
              headings: { fontFamily: "Reaver Bold" },

              primaryColor: "orange",
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
