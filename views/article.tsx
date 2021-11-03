import ReadOnly from "@components/wysiwyg/readOnly";
import Image from "next/image";
import { DynamicArticleProps } from "pages/article/[id]";
import React from "react";

const Article = ({ article, name, image }: DynamicArticleProps) => {
  return (
    <>
      <div>
        <Image
          src={article.image}
          width={1800}
          height={1200}
          layout="responsive"
        />
      </div>
      <div className="m-4">
        <div className="flex flex-col">
          <span className="font-lfBold button mt-2">Colorado City</span>
          <span className="h3Headline leading-tight my-2">{article.title}</span>
          <span className="text-black-60 subtitle2 my-2">
            {article.subTitle}
          </span>
          <AuthorCard name={name} image={image} />
        </div>
      </div>
      <div className="mx-4">
        <ReadOnly content={article.content} />
      </div>
    </>
  );
};

export default Article;

export const AuthorCard = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => {
  return (
    <div className="flex items-center mt-4 mb-8">
      <img src={image} alt="Author Image" className="rounded-full w-12" />
      <span className="mx-4 subtitle2">
        <span className="text-gray-600">by</span>
        <span className="border-b-2 font-bold border-gray-600 mx-2 cursor-pointer">
          {name}
        </span>
      </span>
    </div>
  );
};
