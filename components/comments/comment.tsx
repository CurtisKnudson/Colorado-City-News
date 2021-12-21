import Image from "next/image";
import { ArticleComment } from "types/article";

const Comment = ({
  comment,
  index,
}: {
  comment: ArticleComment;
  index: number;
}) => {
  return (
    <div key={index} className="flex items-center justify-between my-2">
      <div>{comment.comment}</div>
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
