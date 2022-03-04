import { IProps } from "../utils/types";
import { AuthContext, useAuth } from "./authContext";

export function AuthProvider({ children }: IProps) {
  const {
    user,
    setUser,
    loading,
    setLoading,
    signUp,
    signIn,
    signInGoogle,
    signOut,
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        signUp,
        signIn,
        signInGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
