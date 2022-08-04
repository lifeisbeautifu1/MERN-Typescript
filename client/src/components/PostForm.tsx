import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import axios from 'axios';
import { addPost } from '../features/posts/postSlice';

const PostForm = () => {
  const [body, setBody] = useState('');
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/posts',
        {
          body,
        },
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      dispatch(addPost(data));
      setError('');
    } catch (error: any) {
      setError(error.response.data.message);
    }
    setBody('');
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Create Post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Post body..."
            className={`p-2 border border-gray-300 rounded ${
              error && 'bg-red-100 placeholder:text-red-500 border-red-500'
            }`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-400 text-white rounded self-start py-2 px-4 hover:bg-blue-400/90"
          >
            Submit
          </button>
        </form>
        {error && (
          <div className="rounded shadow p-4 text-red-500 border-[0.5px] bg-red-100 border-red-500">
            <ul className="flex flex-col gap-2 text-sm list-disc pl-4">
              <li className="font-semibold">{error}</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default PostForm;
