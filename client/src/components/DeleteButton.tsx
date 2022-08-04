import { FaTrash } from 'react-icons/fa';
import { IComment, IPost } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deletePost,
  updatePost,
  setSelectedPost,
} from '../features/posts/postSlice';
import axios from 'axios';

interface DeleteButtonProps {
  post?: IPost;
  comment?: IComment;
  callback?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  post,
  callback,
  comment,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (post && !comment && !callback) {
      try {
        await axios.delete('/api/posts/' + post._id, {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        });
        dispatch(deletePost(post));
      } catch (error) {
        console.log(error);
      }
    } else if (comment && !callback) {
      try {
        const { data } = await axios.delete(
          `/api/posts/${post?._id}/comment/${comment?._id}`,
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          }
        );
        dispatch(updatePost(data));
        dispatch(setSelectedPost(data));
      } catch (error) {
        console.log(error);
      }
    } else if (callback) {
      try {
        await axios.delete('/api/posts/' + post?._id, {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        });
        callback();
        dispatch(deletePost(post!));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <button
      onClick={handleClick}
      className="ml-auto bg-red-500 hover:bg-red-500/90 text-white p-2 rounded shadow relative delete-btn"
    >
      <FaTrash />
      <span className=" text-xs text-gray-600 absolute  -right-2 -top-11 p-2 rounded  bg-gray-100 invisible tooltip-text">
        Delete
      </span>
    </button>
  );
};

export default DeleteButton;
