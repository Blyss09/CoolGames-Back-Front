import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./logIn.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password
      },
    })
      .then((res) => {
        if (res.data.errors) {
          setErrorMessage(res.data.errors);
        } else {
          navigate("/games");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      });
  };

  return (
    <div className="login">
      <div className="blur-overlay">
        <div className="content">
          <div className="login-box">
            <p>Connexion</p>
            <form id="login-form" onSubmit={handleLogin}>
              <div className="user-box">
                <input
                  id="login-email"
                  required
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email</label>
              </div>
              <div className="user-box">
                <input
                  id="login-password"
                  required
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Mot de passe</label>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="buttons-menu">
                <button type="submit" className="styled-button">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Entrer
                </button>
                <button
                  type="button"
                  className="styled-button"
                  onClick={() => navigate("/")}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Quitter
                </button>
              </div>
            </form>
            <p>
              Toujours pas de compte ?{" "}
              <a onClick={() => navigate("/register")} className="a2">
                S'inscrire !
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
