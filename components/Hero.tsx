import React from "react";
import { Title, Text, Stack, Space } from "@mantine/core";

const Hero = () => {
  return (
    <Stack>
      <Space h={80} />
      <Title>DOTA 2 API</Title>
      <Text
        sx={(theme) => ({
          fontSize: theme.fontSizes.xl,
        })}
      >
        Example get heroes data from DOTA 2
      </Text>
      <Space h={`xl`} />
    </Stack>
  );
};

export default Hero;
