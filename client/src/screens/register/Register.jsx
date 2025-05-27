import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({ pseudo: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrors({ pseudo: "", email: "", password: "Le mot de passe doit faire 6 caractères minimum" });
      setErrorMessage("");
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ pseudo: "", email: "", password: "Les mots de passe ne correspondent pas." });
      setErrorMessage("");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          pseudo,
          email,
          password,
          confirmPassword,
        }
      );
      if (response.data.status === "error") {
        setErrorMessage(response.data.message);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(
        "Une erreur est survenue pendant la création du compte",
        error
      );
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ pseudo: "", email: "", password: "Erreur serveur. Veuillez réessayer." });
      }
    }
  };

  return (
    <div className="register">
      <div className="blur-overlay">
        <div className="content">
          <div className="login-box">
            <p>S'enregistrer</p>
            <form id="register-form" onSubmit={handleSubmit}>
              <div className="user-box">
                <input
                  id="signup-pseudo"
                  required="required"
                  name="pseudo"
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                />
                <label>Pseudo</label>
              </div>
              <div className="user-box">
                <input
                  id="signup-email"
                  required="required"
                  name="email"
                  type="email"
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email</label>
              </div>
              <div className="user-box">
                <input
                  id="signup-password"
                  required="required"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Mot de passe</label>
              </div>
              <div className="user-box">
                <input
                  id="signup-confirm-password"
                  required="required"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label>Confirmation Mot De Passe</label>
              </div>
              {(errors.pseudo || errors.email || errors.password || errorMessage) && (
                <div className="error-message">
                  {errors.pseudo && <p>{errors.pseudo}</p>}
                  {errors.email && <p>{errors.email}</p>}
                  {errors.password && <p>{errors.password}</p>}
                  {errorMessage && <p>{errorMessage}</p>}
                </div>
              )}
              <div className="buttons-menu">
                <button type="submit" className="styled-button">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  S'inscrire
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
              Déjà inscrit ?{" "}
              <a onClick={() => navigate("/login")} className="a2">
                Connecte toi !
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
