// src/components/common/Dialog.jsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Keyframes for smooth animations
const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
};

const slideUp = {
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
};

const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
  maxWidth = '520px',
}) => {
  const modalRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus modal on open
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'dialog-title' : undefined}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(245, 240, 240, 0.11)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: `${Object.entries(fadeIn).map(([k, v]) => `${k} ${v}`).join(', ')} 0.3s ease-out forwards`,
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex="-1"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border:'1px solid #ccc',
          boxShadow: '0 25px 70px rgba(133, 128, 128, 0.25)',
          maxWidth,
          width: '90%',
          maxHeight: '90vh',
          overflow: 'hidden',
          animation: `${Object.entries(slideUp).map(([k, v]) => `${k} ${v}`).join(', ')} 0.4s ease-out forwards`,
          outline: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '28px 32px 16px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2
            id="dialog-title"
            style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '700',
              color: '#1e293b',
              letterSpacing: '-0.3px',
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '32px',
              cursor: 'pointer',
              color: '#94a3b8',
              padding: '8px',
              borderRadius: '12px',
              transition: 'all 0.2s ease',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 32px', maxHeight: '60vh', overflowY: 'auto' }}>
          {children}
        </div>

        {/* Footer */}
        {(primaryAction || secondaryAction) && (
          <div style={{
            padding: '20px 32px 28px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '16px',
          }}>
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#f8fafc',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                style={{
                  padding: '12px 28px',
                  backgroundColor: primaryAction.danger ? '#ef4444' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = primaryAction.danger
                    ? '0 6px 16px rgba(239, 68, 68, 0.3)'
                    : '0 6px 16px rgba(59, 130, 246, 0.3)';
                }}
              >
                {primaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Dialog;