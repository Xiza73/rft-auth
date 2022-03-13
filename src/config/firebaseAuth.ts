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

export const errorHandler = (code: string) => {
  switch (code) {
    case "auth/internal-error":
      return "Correo inválido";
    case "auth/weak-password":
      return "La contraseña debe contener al menos 6 caracteres";
    case "auth/email-already-in-use":
      return "El correo ya se encuentra registrado";
    case "auth/user-not-found":
      return "Usuario no registrado";
    case "auth/wrong-password":
      return "Contraseña incorrecta";
    case "auth/too-many-requests":
      return "Demasiados intentos para este usuario. Por favor intente más tarde";
    default:
      return "Error en el proveedor";
  }
};
