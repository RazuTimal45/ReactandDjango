import React from 'react';
import { useBlogStore } from '../store/useBlogStore';
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    adminSection,
    setAdminSection,
  } = useBlogStore();

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
          <li>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 12px',
                backgroundColor: selectedCategory === null ? '#334155' : 'transparent',
                color: selectedCategory === null ? '#fff' : '#cbd5e1',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: selectedCategory === null ? '600' : '400',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => selectedCategory !== null && (e.currentTarget.style.backgroundColor = '#2d3748')}
              onMouseLeave={(e) => selectedCategory !== null && (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              All Blogs
            </button>
          </li>

          {/* Categories List */}
          {categories.map((cat) => (
            <li key={cat} style={{ marginTop: '4px' }}>
              <button
                onClick={() => setSelectedCategory(cat)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 12px',
                  backgroundColor: selectedCategory === cat ? '#334155' : 'transparent',
                  color: selectedCategory === cat ? '#fff' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: selectedCategory === cat ? '600' : '400',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => selectedCategory !== cat && (e.currentTarget.style.backgroundColor = '#2d3748')}
                onMouseLeave={(e) => selectedCategory !== cat && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {cat}
              </button>
            </li>
          ))}
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;