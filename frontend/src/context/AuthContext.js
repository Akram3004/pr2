import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create AuthContext
const AuthContext = createContext();

// Custom Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component that wraps around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data when the component mounts (to check if the user is already logged in)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/user/');
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login/', {
        email,
        password,
      });
      setUser(response.data.user);
      navigate('/dashboard');  // Navigate to the dashboard after successful login
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  // Register function
  const register = async (email, password, name) => {
    try {
      const response = await axios.post('/api/auth/register/', {
        email,
        password,
        name,
      });
      setUser(response.data.user);
      navigate('/dashboard');  // Navigate to the dashboard after successful registration
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout/');
      setUser(null);
      navigate('/login');  // Navigate to the login page after logout
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  // Value to be provided to all components
  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user, // Boolean indicating if the user is logged in
  };

  // Only render children when loading is done
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
