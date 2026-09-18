import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import UsersList from "./components/UsersList";
import UserDetail from "./components/UserDetail";
import UserForm from "./components/UserForm";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserForm />} />

        {/* 認証が必要な画面 */}
        <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
        <Route path="/users/new" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />
        <Route path="/users/:userId" element={<ProtectedRoute><UserDetail /></ProtectedRoute>} />
        <Route path="/users/edit/:userId" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </Router>
  );
}

export default App;