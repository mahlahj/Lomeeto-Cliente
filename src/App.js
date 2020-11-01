import React, { useState, useEffect, useMemo } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";

import Navigation from "./routes/Navigation";
import { getToken, decodeToken, removeToken } from "./utils/token";

import AuthContext from "./context/AuthContext";

export default function App() {
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, []);

  const [auth, setAuth] = useState(undefined);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop
          hideProgressBar
          closeOnClick
          rtl={false}
          pauseOnHover
          pauseOnFocusLoss
          draggable
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
