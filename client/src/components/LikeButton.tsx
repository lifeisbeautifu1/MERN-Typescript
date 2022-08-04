import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { updatePost, setSelectedPost } from '../features/posts/postSlice';
import { FaHeart } from 'react-icons/fa';
import { IPost } from '../interfaces';
import axios from 'axios';

interface LikeButtonProps {
  post: IPost;
}

const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    user && post.likes.find((u) => u._id == user?._id)
      ? setIsLiked(true)
      : setIsLiked(false);
  }, [user, post.likes]);
  const likePost = async () => {
    try {
      const { data } = await axios.patch(
        '/api/posts/' + post._id,
        {},
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(data);
      dispatch(updatePost(data));
      dispatch(setSelectedPost(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={likePost}
      className={`text-teal-500 text-lg flex items-center border border-teal-500 transition duration-200 hover:border-[1.5px] rounded peer relative ${
        isLiked ? 'bg-teal-500' : 'bg-white'
      }`}
    >
      <span className="py-2 pl-4 pr-8 ">
        <FaHeart
          className={`transition duration-300 hover:scale-125 ${
            isLiked ? 'text-white ' : 'text-teal-500'
          }`}
        />
      </span>
      <span
        className={`p-2 px-3  border-l border-l-teal-500 leading-[18px] ${
          isLiked
            ? 'text-white border-teal-500 border-l-white'
            : 'text-teal-500 '
        }`}
      >
        {post.likes.length}
      </span>
      <span className="text-xs text-gray-600 absolute  right-6 -top-10 p-2 rounded  bg-gray-100 invisible tooltip-text ">
        Like Post
      </span>
    </button>
  );
};

export default LikeButton;
