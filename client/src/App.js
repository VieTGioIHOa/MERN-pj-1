import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './components/layout/Landing'
import AuthForm from './views/AuthForm'
import AuthContextProvider from './contexts/AuthContext';
import PostContextprovider from './contexts/PostContext';
import Dashboard from './views/Dashboard';
import React from 'react';

function App() {
  return (
    <AuthContextProvider>
      <PostContextprovider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<AuthForm authRoute='login' />} />
            <Route path="/register" element={<AuthForm authRoute='register' />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </PostContextprovider>
    </AuthContextProvider>
  );
}

export default App;
