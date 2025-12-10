// src/components/AdminView.jsx
import React from 'react';
import { useBlogStore } from '../store/useBlogStore';
import BlogList from './blog/BlogList';
import BlogForm from './blog/BlogForm';
import CategoryManager from './category/CategoryManager';

const AdminView = () => {
  const { adminSection, selectedCategory } = useBlogStore();

 
  const contentStyle = {
    marginLeft: '350px',
    padding: '40px',
    minHeight: '100vh',
    minWidth: '100%'
  };

  if (adminSection === 'create') {
    return (
      <div style={contentStyle}>
        <BlogForm />
      </div>
    );
  }

  if (adminSection === 'categories') {
    return (
      <div style={contentStyle}>
        <CategoryManager />
      </div>
    );
  }

  // Default: Show filtered blog list
  return (
    <div style={contentStyle}>
      <h1>{selectedCategory ? `${selectedCategory} Blogs` : 'All Blogs'}</h1>
      <BlogList />
    </div>
  );
};

export default AdminView;