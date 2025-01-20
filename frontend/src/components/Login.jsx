import React, { useEffect, useState } from 'react';
import PhonePng from "../assets/phone.png"
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        input,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
        setInput({
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);
  return (
    <div className="flex md:gap-10 items-center w-screen h-screen justify-center">
      <img src={PhonePng} alt="" className="w-[30rem] hidden md:block" />
      <form
        onSubmit={loginHandler}
        className="flex flex-col items-center justify-center gap-4 md:p-8 bg-gradient-to-t from-[#f0abdc] to-[#88aae5] rounded-lg h-screen w-screen md:w-auto md:h-auto border border-gray-600"
      >
        <div className="my-4">
          <h1 className="text-center font-bold font-serif text-2xl">
            FaceZone
          </h1>
          <p className="text-xs md:text-sm text-center">
            Login to see photos & videos from your friends
          </p>
        </div>
        <div>
          <h1 className="font-medium font-sans-serif text-gray-800">Email</h1>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="px-12 py-2 rounded-lg border border-gray-600"
          />
        </div>
        <div>
          <h1 className="font-medium font-sans-serif text-gray-800">
            Password
          </h1>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="px-12 py-2 rounded-lg border border-gray-600"
          />
        </div>
        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-gradient-to-t from-red-600 to-pink-400 px-28 py-3 rounded-full text-center text-white"
          >
            Login
          </Button>
        )}

        <span className="text-center">
          Dosent have an account?{' '}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
