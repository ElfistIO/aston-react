import { Link } from "react-router-dom";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <nav className="brown darken-3">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo">
          MtG Collection
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
