import React from "react";
import { ArticleCard, FeaturedArticleCard } from "@components/articleCard";
import { ChipBar } from "@components/chipBar";

const FrontPage = () => {
  window.setTimeout(() => {
    console.log("Do you see me? ");
  }, 10000);
  return (
    <>
      <ChipBar />
      <FeaturedArticleCard />
      <ArticleCard />
    </>
  );
};

export default FrontPage;
