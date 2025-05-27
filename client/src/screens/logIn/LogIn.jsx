import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../contexts/userContexts";
import "./logIn.css";

const Login = () => {
  const navigate = useNavigate();
  const { fetchUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        await fetchUser();
        navigate("/games");
      }
    } catch (err) {
      console.error(err);
      setErrors({ email: "", password: "Combinaison email/mot de passe incorrecte" });
    }
  };

  return (
    <div className="login">
      <div className="blur-overlay">
        <div className="content">
          <div className="login-box">
            <p>Connexion</p>
            <form onSubmit={handleLogin}>
              <div className="user-box">
                <input
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email</label>
              </div>
              <div className="user-box">
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Mot de passe</label>
              </div>
              {(errors.email || errors.password) && (
                <div className="error-message">
                  {errors.email && <p>{errors.email}</p>}
                  {errors.password && <p>{errors.password}</p>}
                </div>
              )}
              <div className="buttons-menu">
                <button type="submit" className="styled-button">Entrer</button>
                <button type="button" className="styled-button" onClick={() => navigate("/")}>Quitter</button>
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
