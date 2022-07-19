import Head from "next/head";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import HeroList from "../components/Hero";
import { Grid, Button, Box, Title, Loader } from "@mantine/core";
import Layout from "../components/Layout";
import { Hero } from "../components/Hero";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const fetchHeroes = ({ pageParam = 0 }) =>
  axios
    .get("api/heroes", {
      params: {
        pageOffset: pageParam,
        pageSize: 20,
      },
    })
    .then((res) => res.data);

export default function Home() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery(["heroes"], fetchHeroes, {
    getNextPageParam: (lastPage, pages) => lastPage.nextPageOffset,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Layout>
      <Title>Dota2 Hero</Title>

      <Grid>
        {data
          ? data.pages.map((page, index) => {
              return (
                <Fragment key={index}>
                  {page.items.map((post: Hero, i: any) => (
                    <Grid.Col span={3} key={i}>
                      <HeroList
                        name={post.name}
                        video_thumbnail={post.video_thumbnail}
                        small_thumbnail={post.small_thumbnail}
                      />
                    </Grid.Col>
                  ))}
                </Fragment>
              );
            })
          : ""}
      </Grid>

      {isFetchingNextPage ? <Loader /> : ""}

      <Box sx={{ opacity: 0 }} ref={ref}>
        <h2>{`Header inside viewport ${inView}.`}</h2>
      </Box>
    </Layout>
  );
}
