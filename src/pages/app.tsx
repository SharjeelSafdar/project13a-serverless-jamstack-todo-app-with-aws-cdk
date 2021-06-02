import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import LoggedOutUser from "../components/loggedOutUser";
import TodosDashboard from "../components/todosDashboard";
import { useIdentity } from "../context/netlifyIdentityContext";

const App = () => {
  const { user } = useIdentity();

  return (
    <Layout>
      <SEO title="Dashboard" />
      {user ? <TodosDashboard /> : <LoggedOutUser />}
    </Layout>
  );
};

export default App;
