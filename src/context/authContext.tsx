import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { Dispatch, SetStateAction } from "react";

interface userState {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  signUp: (email: string, password: string) => Promise<UserCredential> | void;
  signIn: (email: string, password: string) => Promise<UserCredential> | void;
  signInGoogle: () => Promise<UserCredential> | void;
  signOut: () => Promise<void> | void;
}

const initialUserState: userState = {
  user: null,
  setUser: () => {},
  loading: true,
  setLoading: () => {},
  signUp: (_: string, __: string) => {},
  signIn: (_: string, __: string) => {},
  signInGoogle: () => {},
  signOut: () => {},
};

export const AuthContext = createContext(initialUserState);

export const useAuth = (): userState => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("No existe proveedor para autenticación");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  });

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);
  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);
  const signInGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  const signOut = () => firebaseSignOut(auth);

  return {
    user,
    setUser,
    loading,
    setLoading,
    signInGoogle,
    signUp,
    signIn,
    signOut,
  };
};
