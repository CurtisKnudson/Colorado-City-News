import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import { ArticleComment } from "types/article";

const Comment = ({
  comment,
  index,
  scrolled,
}: {
  comment: ArticleComment;
  index: number;
  scrolled?: boolean;
}) => {
  const [closed, setClosed] = useState(false);

  const handleClosed = () => {
    setClosed(!closed);
  };

  const timeSince = (date: number) => {
    const seconds = Math.floor((new Date().getTime() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "mo";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    return Math.floor(seconds) + "s";
  };

  return (
    <div key={index} id={comment.id} className={`flex flex-col my-2 `}>
      <div className="flex justify-between pr-4" onClick={handleClosed}>
        {/* Everything on the left side of Comment header */}
        <div className="flex justify-end items-end">
          <Image
            src={comment.authorImage}
            width={25}
            height={25}
            alt="Comment Author Image"
          />
          <div className="font-bold pt-auto ml-2 text-sm">
            <a href={`/user/${comment.authorProfileUrl}`}>
              {comment.authorName}
            </a>
          </div>
        </div>
        {/* Everything on the right side of Comment header */}
        <div className="text-xs ml-2 flex justify-end items-end text-gray-400">
          {typeof comment.date === "string"
            ? timeSince(Date.parse(comment.date))
            : "Just now"}
        </div>
      </div>
      <div
        className={`${
          scrolled ? "rounded bg-gray-200" : ""
        } mt-1 text-sm  text-black-60 accordion-panel  ${
          closed ? "max-h-0" : ""
        }`}
      >
        {comment.comment}
      </div>
    </div>
  );
};

export default Comment;
