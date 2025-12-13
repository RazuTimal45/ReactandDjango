import React, { useState, useEffect, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom'; 
import { useBlogStore } from '../../store/useBlogStore';

const BlogForm = () => {
  const { categories, addBlog,fetchCategories } = useBlogStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);

  const titleInputRef = useRef(null);

  // Auto-focus title on mount
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

    useEffect(() => {
        fetchCategories();
      }, [fetchCategories]);

  // Update category when categories change (e.g., after adding new one)
 useEffect(() => {
  if (categories.length > 0 && !selectedCategory) {
    setSelectedCategory(categories[0]);
  }
}, [categories]);

  // Show success message briefly
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);


    const formData = new FormData();
    formData.append('title',title.trim());
    formData.append('content',content.trim());
    formData.append('category_id',selectedCategory?.id);
    formData.append('author',1);
    if(image){
      formData.append('image',image);
    }

    await addBlog(formData);
  
    // Reset form
    setTitle('');
    setContent('');
    setImage(null);
    setSelectedCategory(categories[0] || '');
    setIsSubmitting(false);
    setShowSuccess(true);

    // Refocus title
    titleInputRef.current?.focus();
  };

  return (
    <div
      style={{
        maxWidth: '100vw',
        margin: '0 auto',
        padding: '40px 20px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px 0' }}>
          Create New Blog
        </h1>
        <p style={{ color: '#64748b', margin: 0 }}>
          Share your thoughts with the world.
        </p>
      </div>

     
      {showSuccess && (
        <div
          style={{
            backgroundColor: '#dcfce7',
            color: '#166534',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #bbf7d0',
            marginBottom: '24px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '20px' }}>✅</span>
          Blog created successfully!
        </div>
      )}

      {/* Form Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
          padding: '32px',
          border: '1px solid #e2e8f0',
        }}
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Title Field */}
          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="title"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '14px',
              }}
            >
              Blog Title
            </label>
            <input
              ref={titleInputRef}
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a catchy title..."
              required
              style={{
                width: '95%',
                padding: '14px 16px',
                fontSize: '16px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
              onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
            />
          </div>
           {/* ✅ Image Upload */}
            <label
              htmlFor="title"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '14px',
              }}
            >
              Blog Image
            </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginBottom: '20px' }}
          />

          {/* Preview */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: '200px', marginBottom: '20px', borderRadius: '8px' }}
            />
          )}

          {/* Content Field */}
          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="content"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '14px',
              }}
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post here..."
              required
              rows="10"
              style={{
                width: '95%',
                padding: '14px 16px',
                fontSize: '16px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
              onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
            />
          </div>

          {/* Category Field */}
          <div style={{ marginBottom: '32px' }}>
            <label
              htmlFor="category"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '14px',
              }}
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory?.id || ''}
              onChange={(e) => {
                const cat = categories.find(c => c.id === parseInt(e.target.value));
                setSelectedCategory(cat || null);
              }}
              style={{
                width: '97%',
                padding: '14px 16px',
                fontSize: '16px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                outline: 'none',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
              onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              style={{
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: '600',
                backgroundColor:
                  isSubmitting || !title.trim() || !content.trim()
                    ? '#083169ff'
                    : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor:
                  isSubmitting || !title.trim() || !content.trim()
                    ? 'not-allowed'
                    : 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) =>
                !(isSubmitting || !title.trim() || !content.trim()) &&
                (e.currentTarget.style.backgroundColor = '#2563eb')
              }
              onMouseLeave={(e) =>
                !(isSubmitting || !title.trim() || !content.trim()) &&
                (e.currentTarget.style.backgroundColor = '#3b82f6')
              }
            >
              {isSubmitting ? 'Creating...' : 'Create Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;