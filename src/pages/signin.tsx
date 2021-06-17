import React, { FC } from "react";
import {
  Typography,
  Container,
  makeStyles,
  createStyles,
} from "@material-ui/core";

import { useAuth } from "../context/authContext";
import Layout from "../components/layout";
import SEO from "../components/seo";
import EmailSignIn from "../components/emailSignIn";
import ChangeFormType from "../components/changeFormType";

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "80vh",
      alignItems: "center",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      maxWidth: "450px",
    },
    heading: {
      marginBottom: theme.spacing(5),
    },
  })
);

const SignIn: FC = () => {
  const classes = useStyles();
  const { isSignInForm, isSignedIn } = useAuth();

  if (isSignedIn()) {
    return (
      <Layout>
        <Typography variant="h5">You are signed in.</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="Sign In Page" />
      <Container className={classes.container}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          className={classes.heading}
        >
          {isSignInForm() ? "Sign In" : "Sign Up"}
        </Typography>
        <EmailSignIn />
        <ChangeFormType />
      </Container>
    </Layout>
  );
};

export default SignIn;
