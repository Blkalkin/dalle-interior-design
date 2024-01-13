import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForms.css';
import { login, signup } from '../../store/session';
import { clearSessionErrors } from '../../store/errorReducer/SessionError';

function SignupForm () {
  const loggedIn = useSelector(state => !!state.session.user);
  const currUser = useSelector(state => state.session.user)
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user));
  }

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: "demo@email.com", password: "password" }));
  }

  if(loggedIn) return <Navigate to={`/profile/${currUser._id}`} replace={true}/>

  return (
    <div className='session-page'>
      <form className="session-form" onSubmit={handleSubmit} >
        <h2 className='text'>Sign Up Form</h2>
        <div className="errors text">{errors?.email}</div>
        <label>
          <span className='text'>Email</span>
          <input type="text"
            className='text'
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </label>
        <div className="errors">{errors?.username}</div>
        <label>
          <span className='text'>Username</span>
          <input type="text"
          className='text'
            value={username}
            onChange={update('username')}
            placeholder="Username"
          />
        </label>
        <div className="errors text">{errors?.password}</div>
        <label>
          <span className='text'>Password</span>
          <input type="password"
            className='text'
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </label>
        <div className="errors text">
          {password !== password2 && 'Confirm Password field must match'}
        </div>
        <label>
          <span className='text'>Confirm Password</span>
          <input type="password"
            value={password2}
            onChange={update('password2')}
            placeholder="Confirm Password"
          />
        </label>
        <input
          type="submit"
          className='text'
          value="Sign Up"
        />
        <input
          type="submit"
          className='text'
          value="Sign in as Demo"
          onClick={handleDemoSubmit}
        />
          <div className="links-auth text">
            <Link to={'/login'}>Already have and account? Login</Link>
          </div>
      </form>
    </div>
  );
}

export default SignupForm;
