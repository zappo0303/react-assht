import React from "react";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

interface PrivateRouterProps {
  children: React.ReactNode;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if(!token){
    return <Navigate to="/signin" />;
  }
  if (!storedUser) {
    return <Navigate to="/signin" />;
  }
  try {
    const user = JSON.parse(storedUser);
    if (user.role !== "admin") {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRouter;
