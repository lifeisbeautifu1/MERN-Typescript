import { useAppSelector, useAppDispatch } from '../app/hooks';
import { initPosts } from '../features/posts/postSlice';
import { useEffect } from 'react';
import { Post, PostForm } from '../components';
import axios from 'axios';

const Home = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/api/posts/', {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        });
        dispatch(initPosts(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [dispatch]);
  return (
    <div>
      <h1 className="text-2xl p-8 font-bold text-center w-full">
        Recent Posts
      </h1>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {user && <PostForm />}
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
