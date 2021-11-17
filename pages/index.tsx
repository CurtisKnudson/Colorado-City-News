import React, { useEffect } from "react";
import { ArticleCard, FeaturedArticleCard } from "@components/articleCard";
import { ChipBar } from "@components/chipBar";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { Article } from "types/article";
import { useAsyncValue } from "@mediator/observables/hooks";
import { Layout } from "@components/layout";

export interface FeaturedArticle extends Article {
  image: string;
}

const FrontPage = () => {
  const mediator = useMediator();
  const featuredArticle: FeaturedArticle = useAsyncValue(
    mediator.featuredArticle
  );

  useEffect(() => {
    mediator.getFeaturedArticle();
  }, [mediator]);

  return (
    <>
      <Layout>
        <ChipBar />
        <FeaturedArticleCard featuredArticle={featuredArticle} />
        <ArticleCard />
      </Layout>
    </>
  );
};

export default FrontPage;
