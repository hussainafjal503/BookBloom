import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, Navigate } from "react-router-dom";

function ProtectedAuth() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (
    !user &&
    (location.pathname === "/signup" || location.pathname === "/login")
  ) {
    return <Outlet />;
  }

  if (user && location.pathname === "/signup") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedAuth;
