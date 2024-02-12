import { Link } from "react-router-dom"

export default function Nav() {
  return(
    <nav>
      <div className="navWrap">
        
        <div className="navLogoWrap">
          <Link to="/">
            <h1>heWitUs</h1>
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
          <span className="login">
            <Link to="/login">Login</Link>
          </span> / <span className="signup">
            <Link to="/signup">Sign Up</Link>
          </span>
        </div>

      </div>

    </nav>
  )
}