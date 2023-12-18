import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          {/* <Link to={'/tweets'}>All Tweets</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/tweets/new'}>Write a Tweet</Link> */}
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  };

  return (
    <div className='whole-navbar'>
      <Link className='project-name-NB'> 
        <img className='nav-logo' src="https://media.istockphoto.com/id/673584626/vector/wizard.jpg?s=612x612&w=0&k=20&c=byLcsx_78OpIzs7dH6hbV7_K7aR60rmP7IZ3KHwW8-U=" alt="" />
        Project Name
      </Link>

       {!loggedIn ? 
        <div className='right-navlinks-logged-out'>
           <Link to={'/login'}>Log In</Link>
           <Link to={'/signup'}>Get Started</Link>       
        </div>
       : 
       <>
       <div className='right-navlinks-logged-in'>
          <Link to={'/howitworks'}>How It Works</Link>
          <Link to={'/community'}>Community</Link> 
       </div>
       <div className='left-navlinks-logged-in'>
          <Link to={'/createProject'}>create project</Link>
          <Link to={'/signup'}>Log Out</Link> 
       </div>   
      </>
      }     
    </div>
  );
}

export default NavBar;
