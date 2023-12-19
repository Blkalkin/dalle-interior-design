import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForms.css';
import { login } from '../../store/session';
import { clearSessionErrors } from '../../store/errorReducer/SessionError';

function LoginForm () {
  const loggedIn = useSelector(state => !!state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.session.user)

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: "demo@graphic.com", password: "demoword" }));
  }

  if(loggedIn) return <Navigate to={`/profile/${currUser._id}`} replace={true}/>

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Log In Form</h2>
      <div className="errors text">{errors?.email}</div>
      <label>
        <span>Email</span>
        <input type="text"
         className='text'
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      </label>
      <div className="errors text">{errors?.password}</div>
      <label>
        <span>Password</span>
        <input type="password"
         className='text'
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      </label>
      <input
        type="submit"
        className='text'
        value="Log In"
      />
       <input
        type="submit"
        className='text'
        value="Log In As Demo"
        onClick={handleDemoSubmit}
      />
        <div className="links-auth text">
          <Link to={'/signup'}>Don't have an account? Signup</Link>
        </div>
    </form>
  );
}

export default LoginForm;
