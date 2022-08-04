import { FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IPost } from '../interfaces';

interface CommentsButtonProps {
  post: IPost;
}

const CommentsButton: React.FC<CommentsButtonProps> = ({ post }) => {
  return (
    <Link to={`/posts/${post._id}`}>
      <button className="text-blue-500 text-lg flex items-center border rounded border-blue-500 hover:border-[1.5px] transition duration-300 comment relative">
        <span className="py-2 pl-4 pr-8 ">
          <FaComments className="text-blue-500 transition duration-300 hover:scale-125" />
        </span>
        <span className="p-2 px-3 leading-[18px] border-l border-blue-500   ">
          {post.comments.length}
        </span>
        <span className="text-xs text-gray-600 absolute  right-6 -top-10 p-2 rounded  bg-gray-100 invisible tooltip-text ">
          Comments
        </span>
      </button>
    </Link>
  );
};

export default CommentsButton;
