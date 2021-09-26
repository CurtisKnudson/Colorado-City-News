import React from "react";
import { Layout } from "@components/layout";
import { config } from "@constants/config";
import { GetStaticPaths, GetStaticProps } from "next";

import { Article } from "types/article";

interface DynamicArticleProps {
  article: Article;
}

const DynamicArticle = ({ article }: DynamicArticleProps) => {
  return <Layout>{article && <></>}</Layout>;
};

export default DynamicArticle;

export const getStaticPaths: GetStaticPaths = async () => {
  const url = config.url.API_URL;
  const res = await fetch(`${url}/article/getAllArticles`);
  const urls = await res.json();

  const paths = urls;
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const url = config.url.API_URL;
  const res = params && (await fetch(`${url}/article/${params.slug}`));
  const article: Article = res && (await res.json());

  // Pass post data to the page via props
  return { props: { article } };
};
