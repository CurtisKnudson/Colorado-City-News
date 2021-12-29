import Image from "next/image";
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
  return (
    <div
      key={index}
      id={comment.id}
      className={`flex items-center justify-between my-2 `}
    >
      <div className={`${scrolled ? "rounded bg-gray-200 p-4" : ""}`}>
        {comment.comment}
      </div>
      <a href={`/user/${comment.authorProfileUrl}`}>
        <Image
          src={comment.authorImage}
          alt="User profile picture"
          height={48}
          width={48}
        />
      </a>
    </div>
  );
};

export default Comment;
