import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { customerIsLogin } from "@/features/actions/authActions";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(customerIsLogin());
  }, [dispatch]);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
