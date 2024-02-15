import { useSelector } from 'react-redux';
import { selectUser, setUser, reset, selectReset } from '../features/isUserAuthSlice';

// `http://127.0.0.1:4523/api/user-profiles/${userInfo.user_id}`

export default function Profile() {
  const user = useSelector( selectUser );

  if ( user ) {
    // console.log( 'user from profile page ----> ', user );
    // console.log( 'user id from profile page ----> ', user._id );
    
    const isPlayer = user.player;
    const isScoreKeeper = user.score_keeper;
    const isCommisioner = user.commissioner;

    const userInfo = {
      username: user.username,
      user_id: user._id,
      user_email: user.email
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:4523/api/user-profiles/${userInfo.user_id}`);
        const profile = await res.json();
        console.log( 'profile ----> ', profile );

        Object.keys(profile).map( ( keyName, i ) => {
          userInfo[keyName] = profile[keyName];
          return console.log( profile[keyName] );
        })

        userInfo.fname = profile.fname;
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

    return(
      <div className='hwuDivContentWrap hwuProfileWrap'>
        <div className='hwuDivContent'>
          <h3>Profile</h3>
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>email:</strong> {userInfo.user_email}</p>
        </div>
      </div>
    );
  } else {
    console.log( 'user not found, redirect to home page or give a 404 error.')
  }
  
}