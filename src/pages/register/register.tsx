import React, { useState } from "react";
import { useNavigateSearch } from "../../app/hooks";
import { useAuth } from "../../services/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "../../components/UI/button/button";

import s from "./register.module.scss";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [catchError, setError] = useState<boolean | string>();
  const navigate = useNavigateSearch();
  const { createUser } = useAuth();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(false);
    try {
      createUser(email, password).then((userCredential) => {
        navigate("/account", { id: userCredential.user.uid });
      });
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className={s.register__wrapper}>
      <div className="container">
        <div className={s.register__form}>
          <div className="row">
            <h6 className="center-align col s4 offset-s4">
              Sign up for a free account
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
                <label htmlFor="email">E-mail</label>
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
                  <div style={{ color: "red" }}>Wrong email or password</div>
                )}
              </div>

              <div className="col s4 offset-s4 center-align mt-15">
                <p className="">
                  Already have an account?{" "}
                  <Link to="/login" className="center-align">
                    Sign in.
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
