// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';

// Components
import Login from './components/login/Login';
import Dashboard from './components/Dashboard';
import BlogList from './components/blog/BlogList';
import BlogForm from './components/blog/BlogForm';
import CategoryManager from './components/category/CategoryManager';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { init, isAuthenticated } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<BlogList />} />
              <Route path="create-blog" element={<BlogForm />} />
              <Route path="edit-blog/:id" element={<BlogForm />} />
              <Route path="categories" element={<CategoryManager />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;