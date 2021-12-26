import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Articles, FeaturedArticleCard } from "@components/articleCard";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { Article } from "types/article";
import { useAsyncValue } from "@mediator/observables/hooks";
import { Layout } from "@components/layout";

const DynamicChipBar = dynamic(() => import("../components/chipBar"), {
  ssr: false,
});

export interface FeaturedArticle extends Article {
  image: string;
}

const FrontPage = () => {
  const mediator = useMediator();
  const [articles, setArticles] = useState<Article[]>();
  const featuredArticle: FeaturedArticle = useAsyncValue(
    mediator.featuredArticle
  );

  useEffect(() => {
    mediator.getAllArticles().then((res) => {
      const articlesWithoutFeatured = res.splice(1);
      setArticles(articlesWithoutFeatured);
    });
  }, [mediator]);

  return (
    <>
      <Layout>
        <DynamicChipBar />
        <FeaturedArticleCard featuredArticle={featuredArticle} />
        <Articles articles={articles} />
      </Layout>
    </>
  );
};

export default FrontPage;
