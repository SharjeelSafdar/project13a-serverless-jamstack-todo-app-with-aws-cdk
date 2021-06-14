import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { Auth } from "aws-amplify";
import { navigate } from "gatsby";

type FormTypes = "SIGN_IN" | "SIGN_UP";

type ContextType = {
  isSignedIn: () => boolean;
  user: any | null;
  formType: FormTypes;
  setFormType: React.Dispatch<React.SetStateAction<FormTypes>>;
  isSignInForm: () => boolean;
  signUp: (username: string, email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
};

const initialValue: ContextType = {
  isSignedIn: () => false,
  user: null,
  formType: "SIGN_IN",
  setFormType: () => {},
  isSignInForm: () => true,
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<ContextType>(initialValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<null | any>(null);
  const [formType, setFormType] = useState<FormTypes>("SIGN_IN");
  const [authUpdated, updateAuthUpdated] = useState(0);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user);
      })
      .catch(err => {
        setUser(null);
        console.log("Error: ", err);
      });
  }, [authUpdated]);

  const isSignInForm = () => formType === "SIGN_IN";

  const signUp = async (username: string, email: string, password: string) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      updateAuthUpdated(prev => ++prev);
      navigate("/");
      console.log({ error: false, message: "Successfully, signed up." });
    } catch (err) {
      console.log({ error: true, message: err.message });
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      await Auth.signIn({ username, password });
      updateAuthUpdated(prev => ++prev);
      navigate("/");
      console.log({ error: false, message: "Successfully, signed in." });
    } catch (err) {
      console.log({ error: true, message: err.message });
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      updateAuthUpdated(prev => ++prev);
      navigate("/signin");
      console.log({ error: false, message: "Successfully, signed out." });
    } catch (err) {
      console.log({ error: true, message: err.message });
    }
  };

  const isSignedIn = () => !!user;

  const value: ContextType = {
    ...initialValue,
    isSignedIn,
    user,
    formType,
    setFormType,
    isSignInForm,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
