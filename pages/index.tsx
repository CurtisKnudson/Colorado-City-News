import React from "react";
import { ArticleCard, FeaturedArticleCard } from "@components/articleCard";
import { ChipBar } from "@components/chipBar";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { Article } from "types/article";
import { useAsyncValue } from "@mediator/observables/hooks";
import { Layout } from "@components/layout";

export interface FeaturedArticle {
  featuredArticle: Article;
  name: string;
  image: string;
}

const FrontPage = () => {
  const mediator = useMediator();
  // mediator.getFeaturedArticle();

  const featuredArticle: FeaturedArticle = useAsyncValue(
    mediator.featuredArticle
  );

  console.log({
    text: "I have been hit",
    featuredArticle,
  });
  React.useEffect(() => {
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
