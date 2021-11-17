import React from "react";
import { Layout } from "@components/layout";
import { config } from "@constants/config";
import { GetStaticPaths, GetStaticProps } from "next";
import { Article as ArticleType } from "types/article";
import Article from "views/article";
import Comments from "@components/comments";

export interface DynamicArticleProps {
  article: ArticleType;
  name: string;
  image: string;
}

export interface StaticPaths {}

const DynamicArticle = ({ name, image, article }: DynamicArticleProps) => {
  return (
    <Layout className="mx-0">
      {article && (
        <>
          <Article article={article} name={name} image={image} />
          <Comments articleId={article.id} />
        </>
      )}
    </Layout>
  );
};

export default DynamicArticle;

export const getStaticPaths: GetStaticPaths = async () => {
  const url = config.url.API_URL;

  const res = await fetch(`${url}/article/getAllArticles`).then((res) => {
    return res.json();
  });

  const paths = res;

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const url = config.url.API_URL;
  const res = await fetch(`${url}/article/${params!.id}`);
  const resObj = await res.json();

  const { name, image, publishedArticles } = resObj;

  let article = publishedArticles[0];

  // Pass post data to the page via props
  return { props: { name, image, article } };
};
