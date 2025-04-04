import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../contexts/userContexts.jsx';
import axios from "axios";
import "./logIn.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost/cool_games/public/login.php', {
        email,
        password,
      });

      console.log('Réponse complète du serveur:', response.data);

      if (response.data.status === 'success') {
        console.log('Utilisateur:', response.data.user);
        setUser(response.data.user);
        navigate('/games');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('Aucun compte ne correspond, veuillez réessayez ou inscrivez-vous.');
    }
  };

  return (
    <div className="login">
      <div className="blur-overlay">
        <div className="content">
          <div className="login-box">
            <p>Connexion</p>
            <form id="login-form" onSubmit={handleSubmit}>
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
