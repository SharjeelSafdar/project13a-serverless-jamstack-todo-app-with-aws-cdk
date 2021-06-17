import React from "react";
import { Link } from "@material-ui/core";
// import netlifyIdentity from "netlify-identity-widget";

const LoggedOutUser = () => {
  return (
    <div>
      <p>
        Please,{" "}
        <Link href="#" onClick={() => {}}>
          login
        </Link>{" "}
        to view your todos dashboard.
      </p>
    </div>
  );
};

export default LoggedOutUser;
