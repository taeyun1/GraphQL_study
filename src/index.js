import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import client from "./client";
import { ApolloProvider } from "@apollo/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// Provide는 기본적으로 애플리케이션(<App/>) 안의 모두가 이 Client에 접근할 수 있게해줌
