// src/components/blog/BlogList.jsx
import React, { useEffect, useState } from 'react';
import { useBlogStore } from '../../store/useBlogStore';
import { Link } from 'react-router-dom';
import Dialog from '../dialog/Dialog';

const BlogList = () => {
  const {
    blogs,
    fetchBlogs,
    deleteBlog,
    selectedCategory,
    loading,
    error,
  } = useBlogStore();

  // Track the currently selected blog and dialog type
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [dialogType, setDialogType] = useState(null); // 'view', 'edit', 'delete'

  // Helper functions
  const openDialog = (type, blog) => {
    setSelectedBlog(blog);
    setDialogType(type);
  };

  const closeDialog = () => {
    setSelectedBlog(null);
    setDialogType(null);
  };

  const confirmDelete = () => {
    if (selectedBlog) {
      deleteBlog(selectedBlog.id);
      closeDialog();
      fetchBlogs();
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#991b1b' }}>
        <p>Error loading blogs: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px 0' }}>
            {selectedCategory?.name || 'All'} Blogs
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>
            Total: <strong>{blogs.length}</strong> {blogs.length === 1 ? 'blog' : 'blogs'}
          </p>
        </div>
        <Link
          to="/create-blog"
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
        >
          + Create New Blog
        </Link>
      </div>

      {/* Empty State */}
      {blogs.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          backgroundColor: '#f8fafc',
          borderRadius: '16px',
          border: '2px dashed #cbd5e1',
          color: '#64748b',
        }}>
          <p style={{ fontSize: '20px', margin: '0 0 16px 0' }}>No blogs yet</p>
          <p style={{ margin: 0, fontSize: '16px' }}>
            Be the first to share your thoughts!{' '}
            <Link to="/create-blog" style={{ color: '#3b82f6', fontWeight: '600' }}>
              Create a blog
            </Link>
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        }}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 35px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
              }}
            >
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1e293b',
                margin: '0 0 12px 0',
              }}>
                {blog.title}
              </h3>
              <p style={{
                color: '#475569',
                margin: '0 0 16px 0',
                lineHeight: '1.6',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {blog.content}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <span style={{
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600',
                }}>
                  {blog.category?.name || 'Uncategorized'}
                </span>
                <small style={{ color: '#94a3b8' }}>
                  {new Date(blog.created_at).toLocaleDateString()}
                </small>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
              }}>
                <button
                  onClick={() => openDialog('view', blog)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                  View
                </button>

                <button
                  onClick={() => openDialog('edit', blog)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                >
                  Edit
                </button>

                <button
                  onClick={() => openDialog('delete', blog)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === DIALOGS - Now outside the map and dynamic === */}

      {/* View Dialog */}
      <Dialog
        isOpen={dialogType === 'view'}
        onClose={closeDialog}
        title="Blog Details"
        primaryAction={{
          label: 'Close',
          onClick: closeDialog,
          danger:true
        }}
      >
        {selectedBlog && (
          <div style={{ lineHeight: '1.8', color: '#1e293b' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: '700' }}>
              {selectedBlog.title}
            </h3>
            <p style={{ margin: '0 0 20px 0', whiteSpace: 'pre-wrap', fontSize: '16px' }}>
              {selectedBlog.content}
            </p>
            <div style={{ fontSize: '14px', color: '#64748b', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
               <strong>Category:</strong>
                <span style={{
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginLeft:'10px'
                }}>
                  {selectedBlog.category?.name || 'Uncategorized'}
                </span> <br />
              {/* <strong>Author:</strong> {selectedBlog.author?.username || 'Unknown'}<br /> */}
              <strong>Created:</strong> {new Date(selectedBlog.created_at).toLocaleDateString()}
            </div>
          </div>
        )}
      </Dialog>

      {/* Edit Dialog - Placeholder (you'll replace with BlogForm later) */}
      <Dialog
        isOpen={dialogType === 'edit'}
        onClose={closeDialog}
        title="Edit Blog"
        primaryAction={{
          label: 'Save Changes',
          onClick: () => {
            // You'll implement updateBlog(selectedBlog.id, formData) later
            alert('Edit functionality coming soon!');
            closeDialog();
          },
          success: true,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: closeDialog,
        }}
      >
        <p>Edit form will go here (use BlogForm with pre-filled data)</p>
        {selectedBlog && <p><strong>Editing:</strong> {selectedBlog.title}</p>}
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        isOpen={dialogType === 'delete'}
        onClose={closeDialog}
        title="Delete Blog"
        primaryAction={{
          label: 'Delete blog',
          onClick: confirmDelete,
          danger: true,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: closeDialog,
        }}
      >
        {selectedBlog && (
          <p>
            Are you sure you want to delete "<strong>{selectedBlog.title}</strong>"?
            <br /><br />
            This action <strong>cannot be undone</strong>.
          </p>
        )}
      </Dialog>
    </div>
  );
};

export default BlogList;