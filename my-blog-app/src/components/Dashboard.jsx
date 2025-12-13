// src/components/Dashboard.jsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';


const Dashboard = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Content Area */}
    <div
        style={{
          flex: 1,                   
          marginLeft: '330px',        
          backgroundColor: '#f8fafc',
          minHeight: '100vh',
          overflowX: 'hidden',        
        }}
      >
           <DashboardHeader />
          <main style={{ padding: '32px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;