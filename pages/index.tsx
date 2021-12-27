import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Articles, FeaturedArticleCard } from "@components/articleCard";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { Article } from "types/article";
import { useAsyncValue } from "@mediator/observables/hooks";
import { Layout } from "@components/layout";
import { useSelectedTag } from "@providers/tags/selectedTagContext";

const DynamicChipBar = dynamic(() => import("../components/chipBar"), {
  ssr: false,
});

export interface FeaturedArticle extends Article {
  image: string;
}

const FrontPage = () => {
  const mediator = useMediator();
  const [articles, setArticles] = useState<Article[] | undefined>(undefined);
  const featuredArticle: FeaturedArticle = useAsyncValue(
    mediator.featuredArticle
  );
  const [tag] = useSelectedTag();

  useEffect(() => {
    mediator.getAllArticles().then((res) => {
      if (tag) {
        setArticles(res.filter((article) => article.tags?.includes(tag)));
        return;
      }
      const articlesWithoutFeatured = res.splice(1);
      setArticles(articlesWithoutFeatured);
    });
    console.log(tag);
  }, [mediator, tag]);

  return (
    <>
      <Layout>
        <DynamicChipBar />
        {tag ? null : <FeaturedArticleCard featuredArticle={featuredArticle} />}
        <Articles articles={articles} tag={tag} />
      </Layout>
    </>
  );
};

export default FrontPage;
