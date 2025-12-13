import React, { useEffect } from 'react';
import { useBlogStore } from '../store/useBlogStore';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';


const Sidebar = () => {
  const {
    fetchBlogs,
    categories,
    selectedCategory,
    setSelectedCategory,
    adminSection,
    setAdminSection,
    fetchCategories,
    filteredBlogs
  } = useBlogStore();

  const {
    logout,
  } = useAuthStore()

  useEffect(() => {
  fetchCategories(); 
}, []);

  useEffect(()=>{
    filteredBlogs(selectedCategory?.id ?? '' )
  },[selectedCategory])

  const navigate = useNavigate();

  return (
    <div
      style={{
        width: '280px',
        backgroundColor: '#1e293b',
        color: '#e2e8f0',
        padding: '24px',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      {/* Section 1: Category Filter */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '600', opacity: 0.9 }}>
          Filter by Category
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {/* All Blogs */}
          {/* Categories List */}
          <select
              value={selectedCategory ? selectedCategory.id : ''}
              onChange={(e) => {
                const selected = categories.find(cat => cat.id === parseInt(e.target.value));
                setSelectedCategory(selected);
              }}
              style={{
                width: '275px',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#1e293b',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
        </ul>
      </div>

      <hr style={{ borderColor: '#334155', margin: '20px 0' }} />

     
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '600', opacity: 0.9 }}>
          Admin Panel
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
              onClick={() => {
                fetchBlogs()
                setAdminSection('blogs');
                navigate('/'); 
              }}
            style={{
              padding: '12px 16px',
              backgroundColor: adminSection === 'blogs' ? '#3b82f6' : '#334155',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: adminSection === 'blogs' ? '600' : '500',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => adminSection !== 'blogs' && (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => adminSection !== 'blogs' && (e.currentTarget.style.backgroundColor = '#334155')}
          >
            📄 All Blogs
          </button>

          <button
             onClick={() => {
              setAdminSection('create');
              navigate('/create-blog');
            }}
            style={{
              padding: '12px 16px',
              backgroundColor: adminSection === 'create' ? '#3b82f6' : '#334155',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: adminSection === 'create' ? '600' : '500',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => adminSection !== 'create' && (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => adminSection !== 'create' && (e.currentTarget.style.backgroundColor = '#334155')}
          >
            ✍️ Create Blog
          </button>

          <button
            onClick={() => {
              setAdminSection('categories');
              navigate('/categories');
            }}
            style={{
              padding: '12px 16px',
              backgroundColor: adminSection === 'categories' ? '#3b82f6' : '#334155',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: adminSection === 'categories' ? '600' : '500',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => adminSection !== 'categories' && (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => adminSection !== 'categories' && (e.currentTarget.style.backgroundColor = '#334155')}
          >
            🏷️ Manage Categories
          </button>

          <div
            style={{
              position: 'absolute',
              bottom: '100px',
              left: '24px',
              right: '24px',
              paddingTop: '20px',
              borderTop: '1px solid #334155',
            }}
          >
            <button
              onClick={logout} 
              style={{
                width: '100%',
                padding: '14px 20px',
                background: 'linear-gradient(to right, #ce80ecff, #9c5ee2ff)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #1e14a0ff, #421a81ff)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #6524a1ff, #8425afff)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '20px' }}>🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;