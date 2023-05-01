
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";

interface UserType {
  email: string | null;
  uid: string | null;
  profilePicture: string;
  tenantId: string;
  displayName: string;
}

type AuthContextType = {
  user: UserType;
  signUp: (email: string, password: string, tenant_id?: string) => Promise<UserCredential>;
  logIn: (email: string, password: string, tenant_id?: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  signInWithGoogle: (tenant_id?: string) => Promise<UserCredential>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext<AuthContextType>(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null, profilePicture: '', tenantId: '', displayName: '' });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
          profilePicture: user.photoURL || '',
          tenantId: user.tenantId || '',
          displayName: user.displayName || '',
        });
      } else {
        setUser({ email: null, uid: null, profilePicture: '', tenantId: '', displayName: '' });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = (email: string, password: string, tenant_id?: string) => {
    if (tenant_id) {
      auth.tenantId = tenant_id;
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = (tenant_id?: string) => {
    if (tenant_id) {
      auth.tenantId = tenant_id;
    }
    return signInWithPopup(auth, new GoogleAuthProvider());
  }

  const logIn = (email: string, password: string, tenant_id?: string) => {
    if (tenant_id) {
      auth.tenantId = tenant_id;
    }
    return signInWithEmailAndPassword(auth, email, password);
  };


  const logOut = async () => {
    setUser({ email: null, uid: null, profilePicture: '', tenantId: '', displayName: '' });
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, signInWithGoogle }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
