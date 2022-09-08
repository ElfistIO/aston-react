import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="brown darken-3">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo">
          HibernatioN
        </Link>
        <ul id="nav-mobile" className="right">
          <li>
            <Link to="/login">SignIn/SignUp</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
