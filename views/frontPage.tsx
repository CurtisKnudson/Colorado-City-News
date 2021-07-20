import React, { useState } from "react";
import { ArticleCard, FeaturedArticleCard } from "@components/articleCard";
import { ChipBar } from "@components/chipBar";

const fetchArticles = async () => {
  const res = await fetch("http://localhost:3000/api/articles");
  const articles = await res.json();

  return articles;
};

const FrontPage = () => {
  const [articles, setArticles] = useState({});

  console.log(articles);
  return (
    <>
      <ChipBar />
      <FeaturedArticleCard />
      <ArticleCard />
    </>
  );
};

export default FrontPage;
