import { Link } from 'react-router-dom';
// import Tos from '../components/Tos';

export default function Footer() {

  const year = new Date().getFullYear();
  console.log( 'year --> ',year );
  return(
    <div>
      
      <div className='hwuFooterContent'>
        <div>
          <Link to='/contact'>Contact Us</Link>
        </div>
        <div>
          <Link to='/tos'>
            Terms Of Service
          </Link>
        </div>
      </div>

      <div className='hwuFooterBottomWrap'>
        © {year} hewitus.com
      </div>
      
    </div>
  );
}