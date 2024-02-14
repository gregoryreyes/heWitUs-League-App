import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

// Import isUserAuth slice here
import { selectIsUserAuth, loginStatus } from './isUserAuthSlice';


export default function IsUserAuth() {
  // Global state: reading isUserAuth state 
  const isAuth = useSelector(selectIsUserAuth);

  // Local state
  const [userAuth, setUserAuth] = useState( true );

  const dispatch = useDispatch();

  dispatch( loginStatus( userAuth ) );

  return(
    <div>
      <h1>User Authentication is: { isAuth }</h1>
      <h3>Local state ( userAuth ): { userAuth }</h3>
      <h3>Update to local state: ( setUserAuth ): { setUserAuth( true ) }</h3>
    </div>
  )
}