import React from "react";
import { ArticleCard, FeaturedArticleCard } from "@components/articleCard";
import { ChipBar } from "@components/chipBar";

const FrontPage = () => {
  setTimeout(() => {
    console.log("is this working");
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
