import * as React from "react";
import { ArticleNotFound } from "@components/undraw/articleNotFound";
import { Article } from "types/article";
import { ArticleCard } from ".";
import { useEffect, useState } from "react";

interface ArticlesProps {
  articles: Article[] | undefined;
  tag: string | undefined;
}

export const Articles = ({ articles, tag }: ArticlesProps) => {
  // const articlesWithTags = tag
  //   ? articles?.filter((article) => article.tags?.includes(tag))
  //   : articles?.splice(1);

  const [articlesWithTag, setArticlesWithTag] = useState<Article[] | undefined>(
    articles
  );

  useEffect(() => {
    if (tag) {
      const filteredArticle = articles?.filter((article) =>
        article.tags?.includes(tag)
      );
      setArticlesWithTag(filteredArticle);
    } else {
      setArticlesWithTag(articles);
    }
  }, [articles, tag]);

  return (
    <>
      {articlesWithTag &&
        articlesWithTag.map((article: Article, index) => {
          if (tag) {
            return <ArticleCard article={article} key={index} />;
          }
          if (index === 0) {
            return;
          }
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
