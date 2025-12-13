// src/components/blog/BlogList.jsx
import React, { useEffect, useState } from 'react';
import { useBlogStore } from '../../store/useBlogStore';
import { Link } from 'react-router-dom';
import Dialog from '../dialog/Dialog';
import BlogForm from './BlogForm';

const BlogList = () => {
  const { blogs, fetchBlogs,showBlogDetail,deleteBlog,updateBlog,  selectedCategory, loading, error } = useBlogStore();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);


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
    <div style={{ padding: '32px', maxWidth: '100vw', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px 0' }}>
            {selectedCategory ? selectedCategory.name : 'All'} Blogs
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
            Be the first to share your thoughts! <Link to="/create-blog" style={{ color: '#3b82f6', fontWeight: '600' }}>Create a blog</Link>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
               <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end', // Align to right (or 'space-between' if needed)
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '50px',
                  }}
                >
                  {/* View Button - Primary Action */}
                  <button
                    onClick={()=>setIsViewOpen(true)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#3b82f6', // Blue
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#2563eb';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#3b82f6';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    👁️ View
                  </button>

                  {/* Edit Button - Secondary Action */}
                  <button
                   onClick={()=>setIsEditOpen(true)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#10b981', // Green
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#059669';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#10b981';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    ✏️ Edit
                  </button>

                  {/* Delete Button - Danger Action */}
                  <button
                    onClick={() => setIsDeleteOpen(true)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#ef4444', 
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ef4444';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
                {/* dialog delete component */}
                <Dialog
                  isOpen={isDeleteOpen}
                  onClose={() => setIsDeleteOpen(false)}
                  title="Delete Blog"
                  primaryAction={{
                    label: 'Delete',
                    onClick: () => {
                      deleteBlog(blog.id);
                    },
                    danger: true,
                  }}
                  secondaryAction={{
                    label: 'Cancel',
                    onClick: () => setIsDeleteOpen(false),
                  }}
                >
                  <p>Are you sure you want to delete this blog? This action cannot be undone.</p>
                </Dialog>
                 {/* dialog edit component */}
                <Dialog
                  isOpen={isEditOpen}
                  onClose={() => setIsEditOpen(false)}
                  title="Edit Blog"
                  primaryAction={{
                    label: 'Update',
                    onClick: () => {
                      updateBlog(blog.id, editedBlogData);
                    },
                    success: true,
                  }}
                  secondaryAction={{
                    label: 'Cancel',
                    onClick: () => setIsEditOpen(false),
                  }}
                >
                <p>This is edit</p>
                </Dialog>
                 {/* dialog view component */}
                 <Dialog
                  isOpen={isViewOpen}
                  onClose={() => setIsViewOpen(false)}
                  title="View Blog Detail"
                  primaryAction={{
                    label: 'View',
                    onClick: () => {
                      showBlogDetail()
                    },
                    danger: false,
                  }}
                  secondaryAction={{
                    label: 'Cancel',
                    onClick: () => setIsViewOpen(false),
                  }}
                >
                  {blog ? (
                      <div style={{ lineHeight: '1.8', color: '#1e293b' }}>
                        <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#1e293b' }}>
                          {blog.title}
                        </h3>
                        <p style={{ margin: '0 0 16px 0', whiteSpace: 'pre-wrap' }}>
                          {blog.content}
                        </p>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>
                          <strong>Category:</strong> {blog.category?.name || 'Uncategorized'}<br />
                          <strong>Created:</strong> {new Date(blog.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <p>Loading blog details...</p>
                    )}
                </Dialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;