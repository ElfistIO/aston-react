import { FooterItem } from "./footerItem";

import s from "./footer.module.scss";

const footerList1 = [
  { link: "advanced", text: "Advanced Search" },
  { link: "syntax", text: "Syntax Guide" },
  { link: "sets", text: "All sets" },
  { link: "card", text: "Random card" },
];
const footerList2 = [
  { link: "account", text: "Your Account" },
  { link: "register", text: "Register" },
  { link: "terms", text: "Terms of Service" },
  { link: "contact", text: "Contact Us" },
  { link: "privacy", text: "Privacy & Security" },
];

export const Footer = () => {
  return (
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
                {footerList1.map((footerItem, index) => (
                  <FooterItem
                    link={footerItem.link}
                    text={footerItem.text}
                    key={index}
                  />
                ))}
              </ul>
            </div>
            <div className="col l2 s6">
              <h5 className="white-text">Account</h5>
              <ul>
                {footerList2.map((footerItem, index) => (
                  <FooterItem
                    link={footerItem.link}
                    text={footerItem.text}
                    key={index}
                  />
                ))}
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
