import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../services/AuthContext/AuthContext";

import s from "./account.module.scss";

export const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <div className={s.vault__wrapper}>
      <div className="container">
        <div className={s.vault__form}>
          <div className="">
            <h5 className="">Your account</h5>
            <p>Email: {user && user.email}</p>
            <p>Name: {user && user.displayName}</p>
            <button onClick={handleLogout} className="">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
