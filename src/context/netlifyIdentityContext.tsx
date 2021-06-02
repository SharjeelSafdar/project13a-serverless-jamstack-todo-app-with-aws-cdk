import React, {
  createContext,
  FC,
  useEffect,
  useContext,
  useState,
} from "react";
import netlifyIdentity, { User } from "netlify-identity-widget";
import { apolloClient } from "./apolloClient";
import { navigate } from "gatsby";

interface IdentityContextType {
  user: User | null;
}

export const IdentityContext = createContext<IdentityContextType>({
  user: null,
});

export const useIdentity = () => useContext(IdentityContext);

export const IdentityProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    netlifyIdentity.init({});
  });
  netlifyIdentity.on("login", user => {
    setUser(user);
    netlifyIdentity.close();
  });
  netlifyIdentity.on("logout", () => {
    setUser(null);
    apolloClient.resetStore();
    navigate("/");
    netlifyIdentity.close();
  });

  return (
    <IdentityContext.Provider value={{ user }}>
      {children}
    </IdentityContext.Provider>
  );
};
