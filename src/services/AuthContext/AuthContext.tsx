import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
  User,
} from "firebase/auth";
import { auth } from "../firestore";

export interface AuthContextProps {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  user: User | null;
}

const initialState: AuthContextProps = {
  createUser: (email, password) => new Promise<UserCredential>(() => {}),
  signIn: (email, password) => new Promise<UserCredential>(() => {}),
  logout: () => new Promise(() => {}),
  user: null,
};

const AuthContext = createContext<AuthContextProps>(initialState);

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const providerValue = { createUser, user, logout, signIn };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
