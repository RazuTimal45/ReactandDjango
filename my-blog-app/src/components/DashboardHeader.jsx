// src/components/layout/DashboardHeader.jsx
import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

const DashboardHeader = () => {

  const { user } = useAuthStore();

  const displayName = user?.name || user?.username || 'User';
  const displayEmail = user?.email || '';

  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1,
      }}
    >
      {/* Left: Logo / Dashboard Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1e293b',
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          Blog Dashboard
        </h1>
      </div>

      {/* Right: User Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              margin: 0,
              fontWeight: '600',
              color: '#1e293b',
              fontSize: '16px',
            }}
          >
            {displayName}
          </p>
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: '14px',
              color: '#64748b',
            }}
          >
            {displayEmail}
          </p>
        </div>

        {/* Avatar with Initials */}
        <div
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: '700',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
          }}
        >
          {getInitials(displayName)}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;