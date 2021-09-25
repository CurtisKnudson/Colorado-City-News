import { Layout } from "@components/layout";
import { config } from "@constants/config";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

export interface Article {
  url: string;
}

const DynamicArticle = ({ post }: { post: any }) => {
  console.log(post);
  return (
    <Layout>
      <div> I am dynamic as fuck</div>
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
  console.log(params);
  const url = config.url.API_URL;
  const res = await fetch(`${url}/article/${params!.slug}`);
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
};
