// src/components/Dashboard.jsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from './Sidebar';


const Dashboard = () => {
  return (
    <div style={{ display: 'flex',maxWidth:'100vw', minHeight: '100vh' }}>
      
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Content Area */}
      <div
        style={{
          marginLeft: '100px',  
          padding: '20px',
          width: '100%',
          backgroundColor: '#f8fafc',
        }}
      >
        <Outlet />  
      </div>
    </div>
  );
};

export default Dashboard;