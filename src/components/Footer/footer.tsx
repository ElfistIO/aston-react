import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    // заготовка. переработать на компоненты
    <footer className="page-footer brown darken-3">
      <div className="container">
        <div className="row">
          <div className="col l4 s12">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">
              Some information about the project
            </p>
          </div>
          <div className="col l2 offset-l4 s6">
            <h5 className="white-text">Cards</h5>
            <ul>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Advanced Search
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Syntax Guide
                </a>
              </li>
              <li>
                <Link to="/sets" className="grey-text text-lighten-3">
                  All sets
                </Link>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Random card
                </a>
              </li>
            </ul>
          </div>
          <div className="col l2 s6">
            <h5 className="white-text">Account</h5>
            <ul>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Your Account
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Register
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Privacy & Security
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright brown darken-2">
        <div className="container">
          © 2022 HibernatioN
          <a className="grey-text text-lighten-4 right" href="#!">
            Social Links?
          </a>
        </div>
      </div>
    </footer>
  );
};
