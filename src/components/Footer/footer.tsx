import { Link } from "react-router-dom";

import s from "./footer.module.scss";

export const Footer = () => {
  return (
    // заготовка. переработать на компоненты
    <div className={s.footer__wrapper}>
      <footer className="page-footer brown darken-3">
        <div className="container">
          <div className="row">
            <div className="col l4 s12">
              <h5 className="white-text">HibernatioN</h5>
              <p className="grey-text text-lighten-4">
                It's a powerful Magic the Gathering card search and network
                community of Magic players
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
                  <Link to="/account" className="grey-text text-lighten-3">
                    Your Account
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="grey-text text-lighten-3">
                    Register
                  </Link>
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
          <div className="container">© 2022 HibernatioN</div>
        </div>
      </footer>
    </div>
  );
};
