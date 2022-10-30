import React, {useEffect} from 'react';
import axiosInstance from '../services/axios_instance';
import {toast} from 'react-toastify';

export const AuthContext = React.createContext ();

export const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState (null);
  const [isAuthenticated, setIsAuthenticated] = React.useState (false);

  const handleRegister = async data => {
    try {
      const res = await axiosInstance.post ('/register', data);

      if (res.success === false) {
        return res.message;
      }
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  };

  const handleLogin = async data => {
    try {
      const res = await axiosInstance.post ('/login', data);
      if (res.success === false) {
        return {
          success: false,
          message: res.message,
        };
      }
      const {user, token} = res.data;
      setUser (user);
      localStorage.setItem ('user', JSON.stringify (user._id));
      localStorage.setItem ('token', JSON.stringify (token));

      setIsAuthenticated (true);
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  };

  useEffect (() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get ('/user/details');
      if (res.status === 200) {
        setUser (res.data.user);
        setIsAuthenticated (true);
      } else {
        toast ('Please login to further proceed');
        setIsAuthenticated (false);
        setUser (null);
      }
    };
    
    fetchUser ();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.get('/logout');
      if(res.status === 200) {
        setUser (null);
        localStorage.removeItem ('user');
        localStorage.removeItem ('token');
        setIsAuthenticated (false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
