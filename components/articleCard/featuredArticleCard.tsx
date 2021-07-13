import React from "react";
import Image from "next/image";

export const FeaturedArticleCard = () => {
  return (
    <div>
      <div className="min-h-full bg-black"></div>
      <Image
        src="https://picsum.photos/1080/1080"
        priority
        width="1080"
        height="1080"
      />
      <div className="flex flex-col">
        <span className="font-lfBold text-sm my-2">World</span>
        <span className="font-lfRegular text-4xl">
          {" "}
          The Quiet, Yet Powerful Healthcare Revolution
        </span>
      </div>
    </div>
  );
};
