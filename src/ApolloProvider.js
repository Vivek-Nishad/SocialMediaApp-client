import React from "react";
import App from "./App";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  // uri: "http://localhost:5000",
  uri: "https://social-media-vk.herokuapp.com/", //heroku
});

const authLink = setContext(() => {
  const token = localStorage.getItem("SMA-jwtToken");
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
