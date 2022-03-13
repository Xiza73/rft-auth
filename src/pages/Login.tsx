import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { errorHandler } from "../config/firebaseAuth";
import { useAuth } from "../context/authContext";
import { Alert } from "../components/Alert";
import Form from "../components/Form";

export function Login() {
  const { user: currentUser, signIn, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>();

  const formFields = [
    {
      label: {
        name: "Correo",
        for: "email",
      },
      input: {
        type: "email",
        name: "email",
        id: "email",
        placeholder: "correo@ejemplo.cos",
        required: true,
      },
    },
    {
      label: {
        name: "Contraseña",
        for: "password",
      },
      input: {
        type: "password",
        name: "password",
        id: "password",
        placeholder: "******",
        required: true,
      },
    },
  ];

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signIn(user.email, user.password);
      setError("");
      navigate("/");
    } catch (err: any) {
      setError(errorHandler(err.code));
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInGoogle();
      setError("");
      navigate("/");
    } catch (err: any) {
      setError(errorHandler(err.code));
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  if (currentUser) return <Navigate to={"/"} />;

  return (
    <Form
      error={error}
      errorMessage={error ? <Alert message={error} /> : <></>}
      handleSubmit={handleSubmit}
      fields={formFields}
      handleChange={handleChange}
      successButton="Ingresar"
      extra={
        <>
          <div className="w-full text-center font-medium mb-3">
            También Puede
          </div>
          <button
            onClick={handleGoogleLogin}
            className="button-lg"
          >
            Ingresar con Google
          </button>
        </>
      }
    />
  );
}
