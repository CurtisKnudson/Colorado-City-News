import * as React from "react";
import { Article } from "types/article";
import { ArticleCard } from ".";

interface ArticlesProps {
  articles: Article[] | undefined;
}

export const Articles = ({ articles }: ArticlesProps) => {
  return (
    <>
      {articles &&
        articles.map((article: Article, index) => {
          return <ArticleCard article={article} key={index} />;
        })}
    </>
  );
};
