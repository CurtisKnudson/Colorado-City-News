import React, { useState } from "react";
import useSWR from "swr";
import { ArticleCard, FeaturedArticleCard } from "@components/articleCard";
import { ChipBar } from "@components/chipBar";

const FrontPage = ({ articles }: any) => {
  return (
    <>
      <ChipBar />
      <FeaturedArticleCard />
      <ArticleCard />
    </>
  );
};

export default FrontPage;
