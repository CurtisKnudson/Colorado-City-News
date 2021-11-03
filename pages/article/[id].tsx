import React from "react";
import { Layout } from "@components/layout";
import { config } from "@constants/config";
import { GetServerSideProps } from "next";

import { Article as ArticleType } from "types/article";
import Article from "views/article";

export interface DynamicArticleProps {
  article: ArticleType;
  name: string;
  image: string;
}

export interface StaticPaths {}

const DynamicArticle = ({ name, image, article }: DynamicArticleProps) => {
  return (
    <Layout className="mx-0">
      {article && <Article article={article} name={name} image={image} />}
    </Layout>
  );
};

export default DynamicArticle;

// export const getStaticPaths: GetStaticPaths = async () => {
//   // const url = config.url.API_URL;
//   const res = await fetch(`/api/article/getAllArticles`).then((res) => {
//     return res.json();
//   });

//   console.log(res);

//   // if (!res) {
//   return {
//     paths: [{ params: { id: "chicago" } }],
//     fallback: false,
//   };
//   // }

//   // const paths = res;

//   // return {
//   //   paths,
//   //   fallback: true,
//   // };
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const url = config.url.API_URL;
  const res = params && (await fetch(`${url}/article/${params.id}`));
  const resObj = res && (await res.json());

  const { name, image, publishedArticles } = resObj;

  let article = publishedArticles[0];

  // Pass post data to the page via props
  return { props: { name, image, article } };
};
