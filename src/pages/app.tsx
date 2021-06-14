import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import LoggedOutUser from "../components/loggedOutUser";

const App = () => {
  // const { user } = useIdentity();

  return (
    <Layout>
      <SEO title="Dashboard" />
      {/* {user ? <TodosDashboard /> : <LoggedOutUser />} */}
      <LoggedOutUser />
    </Layout>
  );
};

export default App;
