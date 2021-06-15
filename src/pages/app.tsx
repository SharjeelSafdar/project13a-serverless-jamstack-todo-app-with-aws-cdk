import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import LoggedOutUser from "../components/loggedOutUser";
import TodosDashboard from "../components/todosDashboard";
import { useAuth } from "../context/authContext";

const App = () => {
  const { isSignedIn } = useAuth();

  return (
    <Layout>
      <SEO title="Dashboard" />
      {isSignedIn() ? <TodosDashboard /> : <LoggedOutUser />}
    </Layout>
  );
};

export default App;
