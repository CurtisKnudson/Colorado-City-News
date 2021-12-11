import React from "react";
import { Layout } from "@components/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { Article as ArticleType } from "types/article";
import Article from "@components/article";
import Comments from "@components/comments";
import { connectToDatabase } from "@database/mongodb";

export interface DynamicArticleProps {
  article: ArticleType;
  name: string;
  image: string;
  profileUrl: string;
}

export interface StaticPaths {}

const DynamicArticle = ({
  name,
  image,
  article,
  profileUrl,
}: DynamicArticleProps) => {
  return (
    <Layout className="mx-0">
      {article && (
        <>
          <Article
            article={article}
            name={name}
            image={image}
            profileUrl={profileUrl}
          />
          <Comments article={article} />
        </>
      )}
    </Layout>
  );
};

export default DynamicArticle;

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = await connectToDatabase();
  const query = { publishedArticles: { $exists: true } };
  const options = { projection: { _id: 0, "publishedArticles.url": 1 } };
  let articles = await db.collection("users").find(query, options).toArray();

  const url = articles[0].publishedArticles.map((obj: any) => ({
    params: { id: obj.url },
  }));

  const paths = url;

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { db } = await connectToDatabase();
  const query = { "publishedArticles.url": params!.id };
  const options = {
    projection: {
      _id: 0,
      publishedArticles: { $elemMatch: { url: params!.id } },
      name: 1,
      image: 1,
      profileUrl: 1,
    },
  };
  const databaseArticle = await db
    .collection("users")
    .findOne(query, options)
    .then((res: any) => {
      return res;
    });

  const { name, image, publishedArticles, profileUrl } = databaseArticle;

  const article = publishedArticles[0];

  delete article._id;

  // Pass post data to the page via props
  return { props: { name, image, profileUrl, article } };
};
