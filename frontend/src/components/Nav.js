import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../features/isUserAuthSlice';

export default function Nav() {
  console.log( 'setUser --> ', setUser );
  const user = useSelector( selectUser );
  console.log( '45 user --> ', user );
  return(
    <nav>
      <div className="navWrap">
        
        <div className="navLogoWrap">
          <Link to="/">
            <h1>heWitUs 🏀</h1>
          </Link>
        </div>

        <div className="navContentSection">
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/leagues">Leagues</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="navLoginSection">
          { user ? (
            <>
              <span>
                <Link to="/profile">{ user.username }</Link>
              </span> / <span>
                <Link to="/">Log Out</Link>
              </span>
            </>
            ) : (
            <>
            <span className="login">
              <Link to="/login">Login</Link>
            </span> / <span className="signup">
              <Link to="/signup">Sign Up</Link>
            </span>
            </>
          )}
        </div>

      </div>

    </nav>
  )
}