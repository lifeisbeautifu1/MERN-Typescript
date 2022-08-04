import { IPost } from '../interfaces';
import { formatDistanceToNow } from 'date-fns';
import { DeleteButton, LikeButton, CommentsButton } from './';
import { useAppSelector } from '../app/hooks';
import { motion } from 'framer-motion';

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="border border-gray-300 rounded shadow p-2 hover:shadow-lg flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold capitalize">{post.author.username}</h1>
            <h1 className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </h1>
          </div>
          <div className="h-12 w-12">
            <img
              className="object-cover"
              src="https://semantic-ui.com/images/avatar2/large/matthew.png"
              alt="post author"
            />
          </div>
        </div>
        <div className="border-b-gray-300 border-b my-2 pb-2">
          <div className="text-gray-500">
            <p>{post.body}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LikeButton post={post} />
          <CommentsButton post={post} />

          {user && post.author._id == user._id && <DeleteButton post={post} />}
        </div>
      </div>
    </motion.div>
  );
};

export default Post;
