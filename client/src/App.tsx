import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Auth, SinglePost } from './pages';
import { SharedLayout } from './components';

function App() {
  return (
    <div className="font-primary w-3/4 mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Auth />} />
            <Route path="register" element={<Auth />} />
            <Route path="posts/:id" element={<SinglePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
