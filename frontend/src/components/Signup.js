import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../features/isUserAuthSlice';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:4523/api/users/signup', {
        username,
        email,
        password,
        fname,
        lname,
        phone,  
      });
      console.log( '111 signup page res.data --> ', res.data );
      console.log( '222 signup page res.data.profile.fname --> ', res.data.profile.fname );
      setUsername(res.data.profile.fname);

      dispatch( setUser(res.data.user) );

      navigate('/');

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
                <h1>Welcome</h1>
              </div>
              
              <div className="signupFormWrap">
                <form onSubmit={handleSignup}>
                  <input
                    id='signupUsername'
                    className='signupInput'
                    type='text'
                    placeholder='Username'
                    maxLength="20"
                    autoComplete="on"
                    value={username}
                    onChange={ (e) => setUsername(e.target.value)}
                    required
                  />
                  <br />

                  <input
                    id='signupEmail'
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

                  <br />

                  <input
                    id='signupFname'
                    className='signupInput'
                    type='text'
                    placeholder='First Name'
                    maxLength="30"
                    autoComplete="on"
                    value={fname}
                    onChange={ (e) => setFname(e.target.value)}
                    required
                  />

                  <br />

                  <input
                    id='signupLname'
                    className='signupInput'
                    type='text'
                    placeholder='Last Name'
                    maxLength="30"
                    autoComplete="on"
                    value={lname}
                    onChange={ (e) => setLname(e.target.value)}
                    required
                  />

                  <br />

                  <input
                    id='signupPhone'
                    className='signupInput'
                    type='tel'
                    placeholder='Phone Number'
                    value={phone}
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange={ (e) => setPhone(Number(e.target.value))}
                  />

                  <div>
                    <button className='hwuSubmitButton' type='submit'>Create Account</button>
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