import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.session.user)


  const logoutUser = e => {
      dispatch(logout());
  };

  return (
    <div className='whole-navbar'>
      <Link className='project-name-NB'>
        <img className='nav-logo' src="https://media.istockphoto.com/id/673584626/vector/wizard.jpg?s=612x612&w=0&k=20&c=byLcsx_78OpIzs7dH6hbV7_K7aR60rmP7IZ3KHwW8-U=" alt="" />
        Roominate
      </Link>

       {!loggedIn ?
       <>
          <div className='right-navlinks-logged-in'>
            <Link to={'/community'} className='text'>Community Feed</Link>
          </div>
          <div className='right-navlinks-logged-out'>
            <Link to={'/login'} className='text log-in'>Log In</Link>
            <Link to={'/signup'} className='text get-started'>Get Started</Link>
          </div>
       </>
       :
       <>
        <div className='right-navlinks-logged-in'>
            <Link to={'/howitworks'} className='text'>How It Works</Link>
            <Link to={`/profile/${currUser._id}`} className='text'>Your Projects</Link>
            <Link to={'/community'} className='text'>Community</Link>
        </div>
        <div className='left-navlinks-logged-in'>
            <Link to={'/createProject'} className='text get-started'>create project</Link>
            <Link to={'/'} onClick={logoutUser} className='text'>Log Out</Link>
        </div>
      </>
      }
    </div>
  );
}

export default NavBar;
