import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../lib/auth";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  return auth.getToken() ? <>{children}</> : (
    <Navigate to="/login" replace state={{ from: useLocation() }} />
  );
}
