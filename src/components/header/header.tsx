import { Link } from "react-router-dom";
import { UserAuth } from "../../services/AuthContext/AuthContext";

export const Header = () => {
  const { user } = UserAuth();

  function isUser() {
    if (user) {
      return (
        <>
          <li>
            <Link to={{ pathname: "/collection", search: `id=${user.uid}` }}>
              <i className="material-icons" title="Your collection">
                import_contacts
              </i>
            </Link>
          </li>
          <li>
            <Link to={{ pathname: "/account", search: `id=${user.uid}` }}>
              <i className="material-icons" title="Your account">
                account_circle
              </i>
            </Link>
          </li>
        </>
      );
    } else {
      return <Link to="/login">SignIn/SignUp</Link>;
    }
  }

  return (
    <nav className="brown darken-3">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo">
          HibernatioN
        </Link>
        <ul id="nav-mobile" className="right">
          {isUser()}
        </ul>
      </div>
    </nav>
  );
};
