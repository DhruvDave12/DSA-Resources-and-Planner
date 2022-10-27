import React from 'react';
import axiosInstance from '../services/axios_instance';

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

      const {user} = res.data;
      setUser (user);
      localStorage.setItem('user', JSON.stringify(user._id));
      setIsAuthenticated (true);
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        handleRegister,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
