// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated on initial load
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/user');
        setUser(response.data);
      } catch (error) {
        // Not authenticated
      }
    };

    checkAuth();
  }, []);

  const login = async credentials => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      setUser(response.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async userData => {
    try {
      await axios.post('/api/auth/register', userData);
      // You might automatically log in the user after registration or show a confirmation message.
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
