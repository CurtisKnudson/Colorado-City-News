import React from "react";
import Image from "next/image";
import Link from "next/link";
import SlateEditor from "@components/wysiwyg/editor";
import { DynamicArticleProps } from "pages/article/[id]";

const Article = ({ article, author }: DynamicArticleProps) => {
  const { name, profileUrl, image } = author;
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
          <AuthorCard name={name} image={image} profileUrl={profileUrl} />
        </div>
      </div>
      <div className="mx-4">
        <SlateEditor content={article.content} readOnly />
      </div>
      <hr className="mx-4 mt-8" />
    </>
  );
};

export default Article;

export const AuthorCard = ({
  name,
  image,
  profileUrl,
}: {
  name: string;
  image: string;
  profileUrl: string;
}) => {
  return (
    <div className="flex items-center mt-4 mb-8">
      <img src={image} alt="Author Image" className="rounded-full w-12" />
      <span className="mx-4 subtitle2">
        <span className="text-gray-600">by</span>
        <span className="border-b-2 font-bold border-gray-600 mx-2 cursor-pointer">
          <Link href={`/user/${profileUrl}`}>{name}</Link>
        </span>
      </span>
    </div>
  );
};
