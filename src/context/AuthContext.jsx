import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Load user from localStorage on first render
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error(`Failed to parse user from localStorage`, error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Login
  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });

      setUser(response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      toast.success('Login successful!');
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || 'Login failed';
      toast.error(message);
      return null; // prevent crash
    }
  };

  // 🔹 Register
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);

      setUser(response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      toast.success('Registration successful!');
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || 'Registration failed';
      toast.error(message);
      return null;
    }
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login'); // optional redirect
  };

  // 🔹 Update Profile
  const updateProfile = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);

      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));

      toast.success('Profile updated successfully!');
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || 'Update failed';
      toast.error(message);
      return null;
    }
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
