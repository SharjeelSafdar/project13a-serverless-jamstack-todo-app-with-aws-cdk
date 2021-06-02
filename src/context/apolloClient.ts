import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import fetch from "cross-fetch";
import netlifyIdentity from "netlify-identity-widget";

const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentity.currentUser();
  const token = user?.token?.access_token;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "/.netlify/functions/graphql-fauna",
  fetch,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
