import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import React, { useState, useRef, useEffect } from 'react';
import { LikeButton, DeleteButton, CommentsButton } from '../components';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { setSelectedPost, updatePost } from '../features/posts/postSlice';

const SinglePost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { posts, selectedPost: post } = useAppSelector((state) => state.posts);
  const callback = () => navigate('/');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/posts/' + post?._id + '/comment',
        {
          body: comment,
        },
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      dispatch(updatePost(data));
      dispatch(setSelectedPost(data));
      setComment('');
    } catch (error) {
      console.log(error);
    }
    inputRef?.current?.blur();
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get('/api/posts/' + id, {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        });
        dispatch(setSelectedPost(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <div className="mt-12">
      <div className="flex flex-col items-center lg:flex-row gap-4 lg:items-start">
        <div className="w-1/5 m-auto lg:self-start lg:m-0">
          <img
            className="object-cover"
            src="https://semantic-ui.com/images/avatar2/large/matthew.png"
            alt="post author"
          />
        </div>
        <div className="w-4/5 flex flex-col gap-4 mb-10">
          <div className="border border-gray-300 rounded shadow p-2 hover:shadow-lg flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <h1 className="font-bold capitalize">
                  {post?.author.username}
                </h1>
                <h1 className="text-sm text-gray-500">
                  {post &&
                    formatDistanceToNow(new Date(post?.createdAt), {
                      addSuffix: true,
                    })}
                </h1>
              </div>
            </div>
            <div className="border-b-gray-300 border-b my-2 pb-2">
              <div className="text-gray-500">
                <p>{post?.body}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {post && <LikeButton post={post} />}
              {post && <CommentsButton post={post} />}

              {user && post?.author?._id === user?._id && (
                <DeleteButton post={post} callback={callback} />
              )}
            </div>
          </div>
          {user && (
            <div className="border border-gray-300 rounded shadow p-4 flex flex-col gap-2">
              <h1 className="text-lg font-bold">Post comment</h1>
              <form className="flex" onSubmit={handleSubmit}>
                <input
                  className="w-2/3 lg:w-4/5 border rounded-tl rounded-bl shadow p-2 outline-none"
                  type="text"
                  value={comment}
                  ref={inputRef}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={comment.trim() === ''}
                  className="w-1/3 lg:w-1/5 py-2 px-5 bg-teal-400 text-white rounded-tr rounded-br hover:bg-teal-400/90"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {post?.comments.map((c) => (
            <div
              className="border p-4 border-gray-300 shadow rounded flex flex-col gap-2"
              key={c._id}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="font-bold">{c.author.username}</h1>
                  <h2 className="text-sm text-gray-400 ">
                    {formatDistanceToNow(new Date(c.createdAt), {
                      addSuffix: true,
                    })}
                  </h2>
                </div>
                {user && user._id === c.author._id && (
                  <DeleteButton comment={c} post={post} />
                )}
              </div>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
