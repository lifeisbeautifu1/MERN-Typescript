import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { login } from '../features/user/userSlice';
import { useAppDispatch } from '../app/hooks';
import { IErrors } from '../interfaces';
import axios from 'axios';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({} as IErrors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      switch (pathname) {
        case '/login':
          {
            const { data } = await axios.post('/api/auth/login', formData);
            dispatch(login(data));
          }
          break;
        case '/register':
          {
            const { data } = await axios.post('/api/auth/register', formData);
            dispatch(login(data));
          }
          break;
        default:
          return;
      }
      navigate('/');
    } catch (error: any) {
      setErrors(error.response.data.errors);
    }
  };
  if (pathname === '/register') {
    return (
      <div className="flex flex-col w-[400px] mx-auto mt-6 gap-6">
        <h1 className="font-bold text-2xl">Register</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div
            className={`flex flex-col gap-1 ${
              errors?.username && 'text-red-500'
            }`}
          >
            <label className="font-bold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`p-2 rounded border border-gray-300 ${
                errors?.username && 'border-red-500 placeholder:text-red-500'
              }`}
            />
          </div>

          <div
            className={`flex flex-col gap-1 ${errors?.email && 'text-red-500'}`}
          >
            <label className="font-bold">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`p-2 rounded border border-gray-300 ${
                errors?.email && 'border-red-500 placeholder:text-red-500'
              }`}
            />
          </div>
          <div
            className={`flex flex-col gap-1 ${
              errors?.password && 'text-red-500'
            }`}
          >
            <label className="font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`p-2 rounded border border-gray-300 ${
                errors?.password && 'border-red-500 placeholder:text-red-500'
              }`}
            />
          </div>
          <div
            className={`flex flex-col gap-1 ${
              errors?.confirmPassword && 'text-red-500'
            }`}
          >
            <label className="font-bold">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className={`p-2 rounded border border-gray-300 ${
                errors?.confirmPassword &&
                'border-red-500 placeholder:text-red-500'
              }`}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-400 text-white rounded py-2 px-4 self-start
        hover:bg-blue-400/90"
          >
            Register
          </button>
        </form>
        {Object.keys(errors).length > 0 && (
          <div className="rounded shadow p-4 text-red-500 border-[0.5px] bg-red-100 border-red-500">
            <ul className="flex flex-col gap-4">
              {Object.values(errors).map((error) => (
                <li className="font-semibold" key={error}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-[400px] mx-auto mt-6 gap-6">
        <h1 className="font-bold text-2xl">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div
            className={`flex flex-col gap-1 ${
              errors?.username && 'text-red-500'
            }`}
          >
            <label className="font-bold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`p-2 rounded border border-gray-300 ${
                errors?.username && 'border-red-500 placeholder:text-red-500'
              }`}
            />
          </div>

          <div
            className={`flex flex-col gap-1 ${
              errors?.password && 'text-red-500'
            }`}
          >
            <label className="font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`p-2 rounded border border-gray-300 ${
                errors?.password && 'border-red-500 placeholder:text-red-500 '
              }`}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-400 text-white rounded py-2 px-4 self-start
        hover:bg-blue-400/90"
          >
            Login
          </button>
        </form>
        {Object.keys(errors).length > 0 && (
          <div className="rounded shadow p-4 text-red-500 border-[0.5px] bg-red-100 border-red-500">
            <ul className="flex flex-col gap-2 text-sm list-disc pl-4">
              {Object.values(errors).map((error) => (
                <li className="font-semibold" key={error}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
};

export default Register;
