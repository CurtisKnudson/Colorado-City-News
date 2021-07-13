import React from "react";

import { Layout } from "components/layout";
import { ArticleCard, FeaturedArticleCard } from "components/articleCard";
import { ChipBar } from "components/chipBar";

export default function Home() {
  return (
    <Layout>
      <ChipBar />
      <FeaturedArticleCard />
      <ArticleCard />
    </Layout>
  );
}
