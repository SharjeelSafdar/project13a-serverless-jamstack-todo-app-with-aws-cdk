import React, { FC } from "react";
import { Link } from "@material-ui/core";

import { useAuth } from "../../context/authContext";
import { useStyles } from "./styles";

const ChangeFormType: FC = () => {
  const classes = useStyles();
  const { setFormType, isSignInForm } = useAuth();

  return (
    <Link
      href={"#"}
      onClick={() => setFormType(isSignInForm() ? "SIGN_UP" : "SIGN_IN")}
      className={classes.link}
    >
      {isSignInForm()
        ? "Don't have an account? Sign up here."
        : "Already have an account? Sign in here."}
    </Link>
  );
};

export default ChangeFormType;
