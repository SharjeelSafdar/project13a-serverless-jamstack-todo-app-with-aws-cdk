import React, { FC } from "react";
import { Link } from "gatsby";
import { Button } from "@material-ui/core";
import netlifyIdentity from "netlify-identity-widget";

import { useIdentity } from "../../context/netlifyIdentityContext";
import { useStyles } from "./styles";

interface HeaderProps {
  siteTitle: string;
}

const Header: FC<HeaderProps> = ({ siteTitle }) => {
  const classes = useStyles();
  const { user } = useIdentity();

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
            onClick={() => netlifyIdentity.open()}
            className={classes.button}
          >
            {user ? "Logout" : "Login"}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
