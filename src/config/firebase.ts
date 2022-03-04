import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import _config from "./config";

const firebaseConfig = {
  apiKey: _config.API_KEY,
  authDomain: _config.AUTH_DOMAIN,
  projectId: _config.PROJECT_ID,
  storageBucket: _config.STORAGE_BUCKET,
  messagingSenderId: _config.MESSAGING_SENDER_ID,
  appId: _config.APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//Errors

export const errorHandler = (code: any) => {
  if (code === "auth/internal-error") return "Correo inválido";
  if (code === "auth/weak-password")
    return "La contraseña debe contener al menos 6 caracteres";
  if (code === "auth/email-already-in-use")
    return "El correo ya se encuentra registrado";
  if (code === "auth/user-not-found") return "Usuario no registrado";
  if (code === "auth/wrong-password") return "Contraseña incorrecta";
  if (code === "auth/too-many-requests")
    return "Demasiados intentos para este usuario. Por favor intente más tarde";
  return "Error en el proveedor";
};
