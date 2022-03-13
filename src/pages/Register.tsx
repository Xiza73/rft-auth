import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { errorHandler } from "../config/firebaseAuth";
import { useAuth } from "../context/authContext";
import { Alert } from '../components/Alert';

export function Register() {
  const { user: currentUser, signUp } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signUp(user.email, user.password);
      setError("");
      navigate("/");
    } catch (err: any) {
      setError(errorHandler(err.code));
    }
  };

  if (currentUser) return <Navigate to={"/"} />;

  return (
    <>
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit} className="text-black">
        <label htmlFor="email">Correo</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="correo@ejemplo.cos"
          required
          onChange={handleChange}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="******"
          required
          onChange={handleChange}
        />

        <button>Registrar</button>
      </form>
    </>
  );
}
