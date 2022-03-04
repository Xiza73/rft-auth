import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { errorHandler } from "../config/firebase";
import { useAuth } from "../context/authContext";
import { Alert } from "../components/Alert";

export function Login() {
  const { user: currentUser, signIn, signInGoogle } = useAuth();
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
      await signIn(user.email, user.password);
      setError("");
      navigate("/");
    } catch (err: any) {
      setError(errorHandler(err.code));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInGoogle();
      setError("");
      navigate("/");
    } catch (err: any) {
      setError(errorHandler(err.code));
    }
  };

  if (currentUser) return <Navigate to={"/"} />;

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-1"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Correo
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="correo@ejemplo.cos"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            className="shadow appearance-none border rounded w-full py-2 px-3 
              text-gray-700 leading-tight focus:outline-none focus:shadow-md"
            required
            onChange={handleChange}
          />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold 
            py-2 px-4 rounded focus:outline-none focus:shadow-md"
        >
          Ingresar
        </button>
      </form>
      <div className="w-full text-center font-medium mb-1">También Puede</div>
      <button
        onClick={handleGoogleLogin}
        className="bg-slate-50 hover:bg-slate-200 text-black shadow-sm 
          rounded-md border-2 border-gray-300 py-2 px-4 w-full"
      >
        Ingresar con Google
      </button>
    </div>
  );
}
