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
import EditProject from './components/EditProjectPage/EditProject';
import ProjectDetailsShow from './components/Projects/ProjectDetailsShow';



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
        path: "profile/:id",
        element: <Profile/>
      },
      {
        path: "createProject",
        element: <ProtectedRoute component={CreateProject}/>
      },
      {
        path: "community",
        element: <CommunityPage/>
      },
      {
        path: "edit-project/:projectId",
        element: <ProtectedRoute component={EditProject}/>
      },
      {
        path: "projectDetails/:projectId",
        element: <ProjectDetailsShow/>
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
