import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';

function NavBar () {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const loggedIn = useSelector(state => !!state.session.user);
  const currUser = useSelector(state => state.session.user)

  const handleButton = e => {
    const button = e.target.value
    switch (button) {
      case "create project":
        navigate('/createProject')
        break;
      case "sign-up":
        navigate('/signup')
        break
      default:
        break;
    }
  }

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
          <Link to={'/community'} className='text community-LO'>Community Feed</Link>
          <div className='right-navlinks-logged-out'>
            <Link to={'/login'} className='text log-in'>Log In</Link>
            {/* <Link to={'/signup'} className='text get-started'>Get Started</Link> */}
            <button className='text get-started' onClick={handleButton} value="sign-up">Get Started</button>
          </div>
       </>
       :
       <>
        <div className='left-navlinks-logged-in'>
            <Link to={`/profile/${currUser._id}`} className='text projects'>Your Projects</Link>
            <Link to={'/community'} className='text community'>Community</Link>
        </div>
        <div className='right-navlinks-logged-in'>
            {/* <Link to={'/createProject'} className='text create-project'>create project</Link> */}
            <button className='text create-project' onClick={handleButton} value="create project">Create Project</button>
            <Link to={'/'} onClick={logoutUser} className='text log-out'>Log Out</Link>
        </div>
      </>
      }
    </div>
  );
}

export default NavBar;
