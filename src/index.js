import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./redux/configureStore";
import {
  ApolloProvider,
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
} from "./config/actionTypes";

const store = configureStore();

const httpLink = new HttpLink({
  uri: "https://production.suggestic.com/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add authorization Bearer token or other headers here
  operation.setContext({
    headers: {
      authorization: "Token d53d5b23572f90d865e87f6df35fbc51e5e998f5",
      "sg-user": "9e615390-d0ca-48ba-a715-5f8f010580a9",
    },
  });

  return forward(operation);
});

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

const options = {
  // passing the client secret obtained from the server
  clientSecret: STRIPE_SECRET_KEY,
};

// options={options}
const renderApp = () =>
  ReactDOM.render(
    <Elements stripe={stripePromise} >
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ApolloProvider> 
    </Elements>,
    document.getElementById("root")
  );

renderApp();

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./App", renderApp);
}
