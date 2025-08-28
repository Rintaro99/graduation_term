import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import App from './App.tsx'
import { queryClient } from "./lib/react-query";
import UserList from './components/UserList';
import QuizPlay from "./pages/QuizPlay";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import UserNew from "./pages/UserNew";
import UserShow from "./pages/UserShow";
import UserEdit from "./pages/UserEdit"; 
import ResetPassword from "./pages/ResetPassword";
import PasswordResetRequestForm from "./pages/PasswordResetRequestForm";
import ResultPage from "./pages/ResultPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/users" replace /> },
      { path: "/quiz", element: <QuizPlay /> },
      { path: "/result", element: <ResultPage /> },
      { path: "/login", element: <Login /> },
      { path: "/users", element: <UsersList /> },
      { path: "/users/new", element: <UserNew /> },
      { path: "/users/:id", element: <UserShow /> },
      { path: "/users/:id/edit", element: <UserEdit /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "/forgot-password", element:<PasswordResetRequestForm /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
