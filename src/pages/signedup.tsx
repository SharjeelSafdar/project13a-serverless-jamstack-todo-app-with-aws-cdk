import React, { FC } from "react";
import { Link } from "gatsby";
import {
  Container,
  Typography,
  Button,
  makeStyles,
  createStyles,
} from "@material-ui/core";

import Layout from "../components/layout";
import SEO from "../components/seo";

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
      marginBottom: theme.spacing(3),
    },
    link: {
      color: theme.palette.common.white,
      textDecoration: "none",
    },
  })
);

const SignIn: FC = () => {
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Sign In Page" />
      <Container className={classes.container}>
        <Typography
          variant="h6"
          component="h1"
          align="center"
          className={classes.heading}
        >
          Check your inbox to verify your email address. Then, sign in again.
        </Typography>
        <Button variant="contained" color="primary" fullWidth>
          <Link to="/signin" className={classes.link}>
            To sign in page
          </Link>
        </Button>
      </Container>
    </Layout>
  );
};

export default SignIn;
