import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Profile from './components/Profile/Profile';
import CommunityPage from './components/Community/CommunityPage';
import { getCurrentUser } from './store/session';
import EditProject from './components/EditProjectPage/EditProject';
import ProjectDetailsShow from './components/Projects/ProjectDetailsShow';
import MeetTheTeam from './components/MeetTheTeam/MeetTheTeam';




const Layout = () => {
  return (
    <>
      <NavBar />
      <div className='body'>
        <Outlet />
      </div>
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
        element: <AuthRoute component={LoginForm} />
      },
      {
        path: "signup",
        element: <AuthRoute component={SignupForm} />
      },
      {
        path: "profile/:userId",
        element: <Profile/>
      },
      {
        path: "community",
        children: [
          {
            index: true,
            element: <CommunityPage/>
          },
          {
            path: ":keyword",
            element: <CommunityPage/>
          }
        ]
      },
      {
        path: "edit-project/:projectId",
        element: <ProtectedRoute component={EditProject}/>
      },
      {
        path: "project-details/:projectId",
        element: <ProjectDetailsShow/>
      },
      {
        path: "meetTheTeam",
        element: <MeetTheTeam />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to={'/'}/>
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
