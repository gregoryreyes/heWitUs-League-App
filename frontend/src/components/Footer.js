import { Link } from 'react-router-dom';
// import Tos from '../components/Tos';

export default function Footer() {
  return(
    <div>
      
      <div className="hwuFooterContent">
        <div>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div>
          <Link to='/tos'>
            Terms Of Service
          </Link>
        </div>
      </div>
      
    </div>
  );
}