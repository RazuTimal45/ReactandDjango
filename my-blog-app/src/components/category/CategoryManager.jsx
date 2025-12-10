import React, { useState, useEffect, useRef } from 'react';
import { useBlogStore } from '../../store/useBlogStore';

const CategoryManager = () => {
  const { categories,
          addCategory,
          loading: storeLoading,
          error: storeError,
          fetchCategories,
         } = useBlogStore();
  const [newCategory, setNewCategory] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [localError, setLocalError] = useState('');

  const inputRef = useRef(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Show success message briefly
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const trimmed = newCategory.trim();

    if (!trimmed) {
      setLocalError('Category name cannot be empty.');
      return;
    }

    if (categories.includes(trimmed)) {
      setLocalError('This category already exists.');
      return;
    }

    if (trimmed.length < 2) {
      setLocalError('Category name must be at least 2 characters.');
      return;
    }

    const exists = categories.some(
      (cat) => typeof cat === 'object'
        ? cat.name.toLowerCase() === trimmed.toLowerCase()
        : cat.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      setLocalError('This category already exists.');
      return;
    }
   try{
      setLocalError('');
      await addCategory(trimmed);
      setNewCategory('');
      setShowSuccess(true);
      inputRef.current?.focus();
      fetchCategories();
      }catch(err){
        console.error('Failed to add category: ', err)
      }
  };
  const isLoading = storeLoading;

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
          Manage Categories
        </h1>
        <p style={{ color: '#64748b', margin: 0 }}>
          Organize your blogs with meaningful categories.
        </p>
      </div>

      {/* Success Message */}
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
          Category added successfully!
        </div>
      )}

     {/* Error Message */}
      {(localError) && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          padding: '18px',
          borderRadius: '12px',
          border: '1px solid #fecaca',
          marginBottom: '32px',
          fontWeight: '500',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '24px' }}>⚠️</span>
          {localError || storeError}
        </div>
      )}

      {/* Add Category Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
          padding: '32px',
          border: '1px solid #e2e8f0',
          marginBottom: '40px',
        }}
      >
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', margin: '0 0 24px 0' }}>
          Add New Category
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="new-category"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '14px',
              }}
            >
              Category Name
            </label>
            <input
              ref={inputRef}
              id="new-category"
              type="text"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
                setLocalError('');
              }}
              placeholder="e.g., Design, Marketing, Personal"
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

          <button
            type="submit"
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              backgroundColor: '#21457eff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              minWidth: '140px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            Add Category
          </button>
        </form>
      </div>

     
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
          padding: '32px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', margin: '0 0 24px 0' }}>
          Existing Categories ({categories.length})
        </h2>
        {categories.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat}
                style={{
                  backgroundColor: '#f8fafc',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  fontWeight: '500',
                  color: '#475569',
                  fontSize: '16px',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
              >
                {cat}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', padding: '40px 0' }}>
            No categories yet. Add your first one above!
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;