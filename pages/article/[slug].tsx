import { Layout } from "@components/layout";
import { config } from "@constants/config";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

export interface Article {
  author: string;
  date: string;
  title: string;
  subTitle: string;
  readTime: string;
  content: string;
  url: string;
}

interface DynamicArticleProps {
  article: Article;
}

const DynamicArticle = ({ article }: DynamicArticleProps) => {
  return (
    <Layout>
      <div>{article.content}</div>
    </Layout>
  );
};

export default DynamicArticle;

export const getStaticPaths: GetStaticPaths = async () => {
  const url = config.url.API_URL;
  const res = await fetch(`${url}/article/getAllArticles`);
  const articles: Article[] = await res.json();

  const paths = articles.map((article) => ({
    params: { slug: article.url },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const url = config.url.API_URL;
  const res = await fetch(`${url}/article/${params!.slug}`);
  const article = await res.json().then((res) => {
    return res[0];
  });

  // Pass post data to the page via props
  return { props: { article } };
};
