import React from "react";
import { Article } from "types/article";
import Link from "next/link";
import Image from "next/image";
import { useLoadingBarContext } from "@providers/loadingBar/loadinBarContext";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const [, setIsLoading] = useLoadingBarContext();

  return (
    <div
      onClick={() => {
        setIsLoading(true);
      }}
    >
      <Link href={`/article/${article.url}`} passHref>
        <div className="max-w-3xl">
          <div className="my-4 border-t border-dotted">
            <div className=" flex">
              <div className="flex flex-col  w-8/12   ">
                <span className="py-2 uppercase font-extrabold text-sm font-Category">
                  {article.tags ? article.tags[0] : "Colorado City"}
                </span>
                <span className="font-medium font-Category text-lg my-4">
                  {article.title}
                </span>
              </div>
              <div className="min-h-full ml-auto flex items-center pt-8">
                <Image
                  className="w-24 h-24 object-cover rounded"
                  src={article.image}
                  alt=""
                  width="64"
                  height="64"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
