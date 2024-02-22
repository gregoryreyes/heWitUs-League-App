import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../features/isUserAuthSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://127.0.0.1:4523/api/users/signin', {
        email,
        password
      });

      console.log( 'signin res --> ', res.data );
      dispatch( setUser(res.data) );
      navigate('/')

    } catch (error) {
      console.log( error );
    }
  }

  return(
    <div className="loginSection">

      <div className="hwuWrap">
        
        <div className="loginContent">
          <div className="loginCard">

            <div className="loginCardContent">
              <div className='loginCardTitle'>
                <h1>Sign In</h1>
              </div>

              <div className="signupFormWrap">
                <form onSubmit={handleLogin}>
                  <input
                    id='loginEmail'
                    className='signupInput'
                    type='email'
                    placeholder='Email'
                    maxLength="30"
                    autoComplete="on"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    required
                  />

                  <br />

                  <input
                    id='signupPassword'
                    className='signupInput'
                    type='password'
                    placeholder='Password'
                    maxLength="30"
                    autoComplete="on"
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    required
                  />

                  <div>
                    <button className='hwuSubmitButton' type='submit'>Log In</button>
                  </div>

                </form>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}