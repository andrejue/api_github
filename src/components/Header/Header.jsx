import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className='header__container'>
      <h1>GitHub info</h1>
      <nav>
        <ul>
          <Link to='/'>
            <li>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li>
              About
            </li>
          </Link>
          <Link to='/contact'>
            <li>
              Contact
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  )
}
