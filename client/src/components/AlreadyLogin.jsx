import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AlreadyLogin = () => {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  return currentUser ? <Navigate to={"/"} /> : <Outlet />;
};

export default AlreadyLogin;
