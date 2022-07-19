import React from "react";

import { Image, Title } from "@mantine/core";

export interface Hero {
  id?: Number;
  name: String;
  hero_one_liner?: String;
  small_thumbnail?: String;
  video_thumbnail?: String;
}

const HeroList = ({ name, small_thumbnail }: Hero) => {
  let newUrl = small_thumbnail?.toString();
  return (
    <>
      <Image radius="xs" src={newUrl} alt="my" width={256} height={144} />
      <Title order={3}>{name}</Title>
    </>
  );
};

export default HeroList;
