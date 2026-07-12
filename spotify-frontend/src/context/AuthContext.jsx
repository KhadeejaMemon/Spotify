import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // Load token from localStorage
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(false);

  // ================= LOGIN =================
  const login = async (data) => {
    try {
      setLoading(true);

      const res = await loginUser(data);

      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.token);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      return res.data;
    } catch (error) {
      return error.response?.data;
    } finally {
      setLoading(false);
    }
  };

  // ================= REGISTER =================
  const register = async (data) => {
    try {
      setLoading(true);

      const res = await registerUser(data);

      return res.data;
    } catch (error) {
      return error.response?.data;
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};