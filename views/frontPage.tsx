import React from "react";
import { ArticleCard, FeaturedArticleCard } from "@components/articleCard";
import { ChipBar } from "@components/chipBar";

const FrontPage = () => {
  return (
    <>
      <ChipBar />
      <FeaturedArticleCard />
      <ArticleCard />
    </>
  );
};

export default FrontPage;
