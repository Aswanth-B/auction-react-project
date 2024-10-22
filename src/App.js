import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AuctionList from './components/Auction/AuctionList';
import AuctionDetail from './components/Auction/AuctionDetail';
import AuctionEdit from './components/Auction/AuctionEdit';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from "./components/Navbar";

const App = () => {

  return (
    <AuthProvider>
      <Router>
      <Navbar/>
        <Routes>
          
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AuctionList />} />
            <Route path="/myauctions" element={<AuctionList isMyAuction={true}/>} />
            <Route path="/auctions/new" element={<AuctionEdit />} />
            <Route path="/auctions/:id" element={<AuctionDetail />} />
            <Route path="/auctions/:id/edit" element={<AuctionEdit />} />
            <Route path='*' element={<Navigate to="/" replace/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
