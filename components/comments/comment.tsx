import * as React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArticleComment } from "types/article";
import { ArrowUpIcon } from "icons";
import { useUserProfileContext } from "@providers/profile";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

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
  const [isVoted, setIsVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(comment.voteCountObject.count);
  const [userProfileData] = useUserProfileContext();
  const mediator = useMediator();
  const { data: session } = useSession();

  const handleClosed = () => {
    setClosed(!closed);
  };

  const handleVoted = async () => {
    if (
      comment.voteCountObject.usersWhoVoted.includes(userProfileData.userId)
    ) {
      setIsVoted(false);
      setVoteCount(voteCount - 1);
      const updatedVoteCount = comment.voteCountObject.usersWhoVoted.filter(
        (id) => id !== userProfileData.userId
      );
      mediator.updateCommentVoteCount(comment.id, {
        count: voteCount - 1,
        usersWhoVoted: updatedVoteCount,
      });
      comment.voteCountObject.usersWhoVoted = updatedVoteCount;
      return;
    }
    comment.voteCountObject.usersWhoVoted.push(userProfileData.userId);
    mediator.updateCommentVoteCount(comment.id, {
      count: voteCount + 1,
      usersWhoVoted: comment.voteCountObject.usersWhoVoted,
    });
    setIsVoted(true);
    setVoteCount(voteCount + 1);
  };

  const handleNoSession = () => {
    toast.warn("To prevent spam, you must be logged in to vote");
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

  useEffect(() => {
    if (
      comment.voteCountObject.usersWhoVoted.includes(userProfileData.userId)
    ) {
      setIsVoted(true);
    }
  }, [comment.voteCountObject.usersWhoVoted, userProfileData.userId]);

  return (
    <div key={index} id={comment.id} className={`flex flex-col my-2 `}>
      <div className="flex justify-between pr-4">
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
          <div
            className={`flex text-xs ml-2 mb-0.5 text-black-60  `}
            onClick={session ? handleVoted : handleNoSession}
          >
            <ArrowUpIcon className={`h-4 w-4 ${isVoted ? "accent" : ""}`} />{" "}
            <span className={`${isVoted ? "accent font-bold" : ""}`}>
              {voteCount}
            </span>
          </div>
        </div>
        {/* Everything on the right side of Comment header */}
        <div onClick={handleClosed} className="h-6 w-auto"></div>
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
