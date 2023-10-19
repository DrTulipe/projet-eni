import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiPost } from "../Framework/useApi/useApiPost";
import { InputForwarded } from "../Framework/Input/InputRef";
const token = localStorage.getItem("token");

export let isLogged: boolean = false;

export function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [apiResponse, setApiResponse] = useState<{ result: any; error: any }>({
    result: null,
    error: null,
  });

  useEffect(() => {
    if (!apiResponse.result) return;
    if (apiResponse.error) {
      window.confirm("une erreur est survenue");
    }
    if (apiResponse.result.token) {
      localStorage.setItem("token", apiResponse.result.token);
      isLogged = true;
      navigate("/"); // Redirige vers la page d'accueil
    }
  }, [apiResponse, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current) {
      console.error("Les références ne sont pas encore prêtes.");
      return;
    }

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    const response = await ApiPost("https://127.0.0.1:8000/api/login_check", {
      email: emailValue,
      password: passwordValue,
    });

    setApiResponse(response);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              E-mail
            </label>
            <InputForwarded type="email" name="email" ref={emailRef} required />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <InputForwarded
              type="password"
              name="password"
              ref={passwordRef}
              required
            />
          </div>
          <button type="submit" className="w-full btn btn-primary">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

// Fonction pour vérifier la connexion
export function useCheckConnection() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error, result } = await ApiPost(
          "https://127.0.0.1:8000/api/login_check",
          {
            token: token,
          }
        );

        if (!result.token || error) {
          console.log("Connection KO!");
          isLogged = false;
          navigate("/login");
        } else {
          console.log("Connection OK!");
          isLogged = true;
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la connexion:", error);
      }
    };

    checkConnection();

    const intervalId = setInterval(checkConnection, 10000); // 10000ms = 10s

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);
}
