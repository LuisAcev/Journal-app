import React from "react";
import { HashRouter } from "react-router-dom";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import AuthRouter from "./AuthRouter";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { useState } from "react";
import PrivateRouter from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { startLoadingNotes } from "../actions/notes";

const AppRouter = () => {
  const dispatch = useDispatch();

  const [isLoggIn, setIsLoggIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggIn(true);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggIn(false);
      }
    });
  }, [dispatch, setIsLoggIn]);

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route
            path="/auth/*"
            element={
              <PublicRouter isAuthenticated={isLoggIn}>
                <AuthRouter />
              </PublicRouter>
            }
          />

          <Route
            path="/"
            element={
              <PrivateRouter isAuthenticated={isLoggIn}>
                <JournalScreen />
              </PrivateRouter>
            }
          />

          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default AppRouter;
