import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Groups from "./pages/Groups/Groups";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateGroup from "./pages/Groups/CreateGroup";
import Friends from "./pages/Profile/Friends";
import Progress from "./pages/Progress/Progress";
import './App.css'

// Simple mock auth (replace with real auth later)
const getAuth = () => localStorage.getItem("isAuthenticated") === "true";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = getAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function App() {
  // Used to trigger rerender on login/logout
  const [, setAuth] = useState(getAuth());

  useEffect(() => {
    const handler = () => setAuth(getAuth());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setAuth(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/groups/create" element={<CreateGroup />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/friends" element={<Friends />} />
                </Routes>
                <ToastContainer position="bottom-right" autoClose={3000} />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
