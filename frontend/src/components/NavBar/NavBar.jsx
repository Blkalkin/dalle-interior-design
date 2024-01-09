import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import CreateProjectModal from '../Projects/CreateProjectModal';


function NavBar () {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const loggedIn = useSelector(state => !!state.session.user);
  const currUser = useSelector(state => state.session.user)
  const [searchInput, setSearchInput] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  const handleButton = e => {
    const button = e.target.value
    switch (button) {
      case "create project":
        setModalOpen(true)
        break;
      case "sign-up":
        navigate('/signup')
        break
      default:
        break;
    }
  }

  const handleSearch = e => {
    e.preventDefault()
    navigate(`/community/${searchInput}`)
    setSearchInput("")
  }

  const logoutUser = () => {
      dispatch(logout());
  };

  return (
    <div className='whole-navbar'>
      <div className='navbar-left'>
        <Link className='MERN-title'>
          <img className='nav-logo' src="https://media.istockphoto.com/id/673584626/vector/wizard.jpg?s=612x612&w=0&k=20&c=byLcsx_78OpIzs7dH6hbV7_K7aR60rmP7IZ3KHwW8-U=" alt="" />
          Roominate
        </Link>
        <div className='navbar-left-links'>
          {!loggedIn ? 
            <div className='left-navlinks-logged-out'>
              <Link to={'/community'} className='text community-LO'>Community Feed</Link>
              <Link to={'/meetTheTeam'} className='text team-LO'>Meet the Team</Link>
            </div>
          : 
            <div className='left-navlinks-logged-in'>
              <Link to={`/profile/${currUser._id}`} className='text projects'>Your Projects</Link>
              <Link to={'/community'} className='text community'>Community</Link>
              <Link to={'/meetTheTeam'} className='text team'>Meet the Team</Link>
            </div>
          }
        </div>
          <div>
            <form className='navbar-search' onSubmit={handleSearch}>
              <button ><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
              <input 
              type="text" 
              onChange={e => setSearchInput(e.target.value)} 
              value={searchInput}
              placeholder='Search Roominate'
              />
            </form>
          </div>
      </div>

      {/* <div className='navbar-middle' >
      </div> */}

      <div className='navbar-right'>
       {!loggedIn ?
          <div className='right-navlinks-logged-out'>
            <Link to={'/login'} className='text log-in'>Log In</Link>
            <button className='text get-started' onClick={handleButton} value="sign-up">Get Started</button>
          </div>
       :
        <div className='right-navlinks-logged-in'>
            <button className='text create-project' onClick={handleButton} value="create project">Create Project</button>
            <Link to={'/'} onClick={logoutUser} className='text log-out'>Log Out</Link>
        </div>
        }
      </div>
      {modalOpen && <CreateProjectModal setOpenModal={setModalOpen} authorId={currUser._id}/>}
    </div>
  );
}

export default NavBar;
