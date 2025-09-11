import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import App from './App.tsx'
import { queryClient } from "./lib/react-query";
import QuizPlay from "./pages/QuizPlay";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import UserNew from "./pages/UserNew";
import UserShow from "./pages/UserShow";
import UserEdit from "./pages/UserEdit"; 
import ResetPassword from "./pages/ResetPassword";
import PasswordResetRequestForm from "./pages/PasswordResetRequestForm";
import ResultPage from "./pages/ResultPage";
import UserPage from "./pages/UserPage";
import UserUpdate from "./pages/UserUpdate";
import RankingPage from "./pages/RankingPage";
import TopPage from "./pages/TopPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ApiPostList from "./pages/ApiPostList";
import ApiPostShow from "./pages/ApiPostShow";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <TopPage /> },
      { path: "terms", element: <TermsPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "/login", element: <Login /> },
      { path: "/users/new", element: <UserNew /> },
      { path: "/quiz", element: <QuizPlay /> },
      { path: "/result", element: <ResultPage /> },
      { path: "/user", element: <UserPage /> },
      { path: "/user/edit", element: <UserUpdate /> },
      { path: "/users", element: <UsersList /> },
      { path: "/users/:id", element: <UserShow /> },
      { path: "/users/:id/edit", element: <UserEdit /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "/forgot-password", element:<PasswordResetRequestForm /> },
      { path: "/ranking", element:<RankingPage /> },
      { path: "/posts", element:<ApiPostList /> },
      { path: "/posts/:id", element: <ApiPostShow /> },
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
