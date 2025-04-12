// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Sidebar from '../components/siderbar/Sidebar';
import './MainSection.css'; // optional

const MainSection = () => {
  return (
    <div className="layout-container">
      <Header />
      
        <Sidebar />
        <main className="content-area">
          <Outlet />
        </main>
    
    </div>
  );
};

export default MainSection;
