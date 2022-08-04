import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { logout } from '../features/user/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="flex justify-between border-b-2 font-semibold text-gray-600">
      <NavLink to="/" className="p-2">
        {user ? user?.username : 'Home'}
      </NavLink>
      <div className="flex">
        {user ? (
          <NavLink
            to="/login"
            className="p-2"
            onClick={() => dispatch(logout())}
          >
            Logout
          </NavLink>
        ) : (
          <>
            <NavLink to="/login" className="p-2">
              Login
            </NavLink>
            <NavLink to="/register" className="p-2">
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
