import { ArticleNotFound } from "@components/undraw/articleNotFound";
import * as React from "react";
import { Article } from "types/article";
import { ArticleCard } from ".";

interface ArticlesProps {
  articles: Article[] | undefined;
  tag: string | undefined;
}

export const Articles = ({ articles, tag }: ArticlesProps) => {
  const articlesWithTags = tag
    ? articles?.filter((article) => article.tags?.includes(tag))
    : articles?.splice(1);

  return (
    <>
      {articlesWithTags &&
        articlesWithTags.map((article: Article, index) => {
          return <ArticleCard article={article} key={index} />;
        })}
      {tag && (
        <>
          {articles?.length ? null : (
            <div>
              <h1 className="h4Headline mt-16">
                No Articles were found with that tag
              </h1>
              <div className="center-all mt-20">
                <ArticleNotFound className="h-auto w-full" />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
