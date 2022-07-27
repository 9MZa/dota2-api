import React, { useState } from "react";
import { Stack, Text, Title, Button, Space } from "@mantine/core";
import { Prism } from "@mantine/prism";

const url = `https://dota2-game-api.vercel.app/api/heroes?pageOffset=0&pageSize=1`;

const exampleFetch = `
fetch('${url}')
.then(response => response.json())
.then(json => console.log(json))
`;

const exampleResult = `
{
    "items": [
      {
        "id": 1,
        "name": "Abaddon",
        "primary_stat": {
          "icon": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png",
          "name": "Strength"
        },
        "hero_one_liner": "Shields his allies or himself from attacks",
        "small_thumbnail": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/abaddon.png",
        "big_thumbnail": "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/abaddon.png",
        "video_thumbnail": "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/abaddon.webm",
        "source_link": "https://www.dota2.com/hero/abaddon"
      }
    ],
    "nextPageOffset": 1
  }
`;

const Example = () => {
  const [data, setData] = useState("{}");
  const [loading, setLoading] = useState(false);

  const result = () => {
    setLoading(true);
    setInterval(() => {
      setData(exampleResult);
      setLoading(false);
    }, 500);
  };

  return (
    <Stack>
      <Space h={`xl`} />
      <Title>Try it Run</Title>
      <Text
        sx={(theme) => ({
          fontSize: theme.fontSizes.xl,
        })}
      >
        this code here, in a console or from any site
      </Text>
      <Prism language="javascript">{exampleFetch}</Prism>
      <Stack align="flex-start">
        <Button onClick={result} loading={loading}>
          Run
        </Button>
      </Stack>
      <Prism language="coffeescript">{data}</Prism>
    </Stack>
  );
};

export default Example;
