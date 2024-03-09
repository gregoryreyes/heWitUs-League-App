import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import churchSquareImage from '../assets/church-square-snow.png'
import churchSquareMovie from '../assets/church-square-snow.mov'
import '../App.css';

export default function Main() {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/signup`;
    navigate( path );
  }

  return(
    <div>
      <video id="hwuBackgroundVideo" autoPlay loop muted poster={churchSquareImage}>
          <source src={churchSquareMovie} />
      </video>

      <div className='textOverlay'>
        <h6>A Basketball League App</h6>
        <h3>FOR THE CULTURE</h3>
        <button  className='hwuSubmitButton' onClick={ routeChange }>
          Join Now
        </button>
      </div>

        <div className='hwuMainContentWrap hwuRow'>
          <div className='hwuMainContent'>
            <div className='hwuMainContentTextWrap'>
              <p>
                HeWitUs is a league/tournament app that allows players to keep track of their season's scheduled games, view their team's standings, communicate with teammates, coach, and the commissioner of their league, view team and individual stats, view leader boards, scouting reports, etc...
              </p>
            </div>
              <button className='hwuSubmitButton'>
                <Link to='/street-ball-weather'>
                  Street Ball Forecast
                </Link>
              </button>
          </div>
        </div>
    </div>
  )
}