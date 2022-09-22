import { useState } from "react";
import { useNavigateSearch } from "../../app/hooks";
import { useAuth } from "../../services/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "../../components/UI/button/button";

import s from "./login.module.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [catchError, setError] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigateSearch();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(false);
    try {
      await signIn(email, password).then((userCredential) => {
        const user = userCredential.user;
        navigate("/account", { id: user.uid });
      });
    } catch (error) {
      setError(true);
      const errorMessage = (error as Error).message;
      setErrorMessage(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <div className={s.login__wrapper}>
      <div className="container">
        <div className={s.login__form}>
          <div className="row">
            <h6 className="center-align col s4 offset-s4">
              Enter your email address to sign in to HibernatioN
            </h6>
            <form className="col s12" onSubmit={handleSubmit}>
              <div className="input-field col s4 offset-s4">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className={s.login__form_label} htmlFor="email">
                  E-mail
                </label>
              </div>
              <div className="input-field col s4 offset-s4">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                {catchError && (
                  <div style={{ color: "red" }}>{errorMessage?.slice(10)}</div>
                )}
              </div>

              <div className="col s4 offset-s4 center-align mt-15">
                <p className="">
                  Don't have an account yet?{" "}
                  <Link to="/register" className="center-align">
                    Sign up for free.
                  </Link>
                </p>
                <Button color={"brown darken-3"} text={"Submit"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
