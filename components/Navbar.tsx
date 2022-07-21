import React from "react";
import { Title, Text, Stack, Button, Space } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";

const Navbar = () => {
  return (
    <>
      <Space h={20} />
      <Stack align={`flex-end`}>
        <Button
          href="https://github.com/9MZa/dota2-api"
          component="a"
          target="_blank"
          leftIcon={<BrandGithub />}
          variant="white"
        ></Button>
      </Stack>
    </>
  );
};

export default Navbar;
