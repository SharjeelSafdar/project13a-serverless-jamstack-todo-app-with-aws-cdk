import React, { FC } from "react";
import { Link, navigate } from "gatsby";
import { Button } from "@material-ui/core";

import { useAuth } from "../../context/authContext";
import { useStyles } from "./styles";

interface HeaderProps {
  siteTitle: string;
}

const Header: FC<HeaderProps> = ({ siteTitle }) => {
  const classes = useStyles();
  const { isSignedIn, signOut } = useAuth();

  return (
    <header className={classes.container}>
      <div className={classes.innerContainer}>
        <h1 className={classes.heading}>
          <Link to="/" className={classes.link}>
            {siteTitle}
          </Link>
        </h1>
        <nav className={classes.nav}>
          <Link to="/app" className={classes.link}>
            <Button className={classes.button}>App</Button>
          </Link>
          <Button
            onClick={() => (isSignedIn() ? signOut() : navigate("/signin"))}
            className={classes.button}
          >
            {isSignedIn() ? "Logout" : "Login"}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
