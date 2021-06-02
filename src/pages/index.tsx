import React, { FC } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { useIdentity } from "../context/netlifyIdentityContext";

const IndexPage: FC = () => {
  const { user } = useIdentity();

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to our Serverless JAMstack Todo App.</p>
      <p>
        {user ? (
          <span>
            Your are logged in as{" "}
            <strong>{user.user_metadata.full_name}</strong>
          </span>
        ) : (
          <span>You are currently not logged in.</span>
        )}
      </p>
      {user && (
        <Link to="/app">
          <p>Visit the Todos App here.</p>
        </Link>
      )}
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
    </Layout>
  );
};

export default IndexPage;
