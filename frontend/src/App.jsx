import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';


import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';


import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Profile from './components/Profile/Profile';
import CommunityPage from './components/Community/CommunityPage';

import { getCurrentUser } from './store/session';
import CreateProject from './components/Projects/CreateProject';
import CommentIndex from './components/Comments/CommentIndex';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "login",
        element: <LoginForm />
      },
      {
        path: "signup",
        element: <SignupForm />
      },
      {
        path: "profile/:id",
        element: <Profile />
      },
      {
        path: "createProject",
        element: <CreateProject/>
      },
      {
        path: "community",
        element: <CommunityPage />
      },
      {
        path: "comments",
        element: <CommentIndex/>
      }
    ]
  }
]);

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).finally(() => setLoaded(true));
  }, [dispatch]);

  return loaded && <RouterProvider router={router} />;
}

export default App;
