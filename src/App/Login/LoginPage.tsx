import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { InputForwarded } from "../../Framework/Input/InputRef";

export function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const isLogged = localStorage.getItem("isLogged");
  useEffect(() => {
    if (isLogged === "true") navigate("/");
  }, [isLogged]);

  const [apiResponse, setApiResponse] = useState<{ result: any; error: any }>({
    result: null,
    error: null,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current) {
      console.error("Les références ne sont pas encore prêtes.");
      return;
    }

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    const response = await ApiPost("/api/login_check", {
      email: emailValue,
      password: passwordValue,
    });
    setApiResponse(response);

    if (response.result && response.result.token) {
      localStorage.setItem("token", response.result.token);
      const isConnectionOK = await checkConnection();
      if (isConnectionOK) {
        localStorage.setItem("isLogged", "true");
        navigate("/");
      } else {
        alert("Une erreur est survenue lors de la connexion");
      }
    } else {
      alert("Une erreur est survenue lors de la connexion");
    }
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
export function useCheckConnection(loginStart?: boolean) {
  const isLogged = localStorage.getItem("isLogged");

  const navigate = useNavigate();
  useEffect(() => {
    checkConnection();
    if (!loginStart) {
      const intervalId = setInterval(checkConnection, 60000);
      return () => clearInterval(intervalId);
    } // 10000ms = 10s
  }, []);
}

// Fonction pour vérifier la connexion
async function checkConnection() {
  try {
    const { error, result } = await ApiPost("/api/validate/token");

    if (result === null || !result.valid || result.valid !== true || error) {
      console.log("Connection KO!");
      localStorage.setItem("isLogged", "false");
      return false;
    } else {
      localStorage.setItem("isLogged", "true");
      localStorage.setItem("user", result.user);
      console.log("Connection OK!");
      return true;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de la connexion:", error);
    return false;
  }
}

//... (reste du code de useCheckConnection)
