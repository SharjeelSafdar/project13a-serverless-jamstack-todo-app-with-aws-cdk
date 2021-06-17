import React, { FC, useState } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomTextField from "../customTextField";
import { useAuth } from "../../context/authContext";
import { useStyles } from "./styles";

type SignInFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const EmailSignIn: FC = () => {
  const classes = useStyles();
  const { isSignInForm, signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const initialValues: SignInFormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const signUpFormSchema = Yup.object().shape({
    username: Yup.string()
      .required("Required")
      .min(3, "Must be atleast 3 characters long.")
      .max(15, "Must be less than 15 characters long."),
    email: isSignInForm()
      ? Yup.string()
      : Yup.string()
          .email("Please provide a valid email address (abc@xy.z)")
          .required("Required"),
    password: Yup.string().required('Without a password, "None shall pass!"'),
    confirmPassword: isSignInForm()
      ? Yup.string()
      : Yup.string()
          .oneOf([Yup.ref("password")], "Password must be the same.")
          .required("Required"),
  });

  const onSubmit = (data: SignInFormValues) => {
    setLoading(true);
    isSignInForm()
      ? signIn(data.username, data.password)
      : signUp(data.username, data.email, data.password);
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpFormSchema}
      onSubmit={onSubmit}
    >
      {({ isValid }) => (
        <Form>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={12}>
              <CustomTextField name="username" label="Username" fullWidth />
            </Grid>
            {!isSignInForm() && (
              <Grid item xs={12}>
                <CustomTextField name="email" label="Email" fullWidth />
              </Grid>
            )}
            <Grid item xs={12}>
              <CustomTextField
                name="password"
                label="Password"
                fullWidth
                type="password"
              />
            </Grid>
            {!isSignInForm() && (
              <Grid item xs={12}>
                <CustomTextField
                  name="confirmPassword"
                  label="Confirm Password"
                  fullWidth
                  type="password"
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                startIcon={
                  loading ? (
                    <CircularProgress
                      size="1rem"
                      className={classes.circular}
                    />
                  ) : null
                }
                disabled={!isValid}
              >
                {isSignInForm()
                  ? loading
                    ? "Signing In"
                    : "Sign In"
                  : loading
                  ? "Signing Up"
                  : "Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default EmailSignIn;
