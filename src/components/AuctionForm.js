// components/AuctionForm.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatter';

const AuctionForm = ({ auction }) => {
    const [title, setTitle] = useState(auction?.title || '');
    const [description, setDescription] = useState(auction?.description || '');
    const [minimumBid, setMinimumBid] = useState(auction?.minimumBid || '');
    const [maximumBid, setMaximumBid] = useState(auction?.maximumBid || '');
    const [endDate, setEndDate] = useState(formatDate(auction?.endDate) || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (auction) {
            // If auction object changes (e.g., when loaded for edit), update state
            setTitle(auction.title);
            setDescription(auction.description);
            setMinimumBid(auction.minimumBid);
            setMaximumBid(auction.maximumBid);
            setEndDate(formatDate(auction?.endDate));
        }
    }, [auction]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (auction) {
                // Edit auction
                await api.put(`/auctions/${auction.id}`, {
                    title,
                    description,
                    minimumBid,
                    maximumBid,
                    endDate,
                });
                navigate('/');
            } else {
                // Create auction
                await api.post('/auctions', {
                    title,
                    description,
                    minimumBid,
                    maximumBid,
                    endDate,
                });
                navigate('/');
            }
            // Redirect or update state as needed
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className='formContainer' onSubmit={handleSubmit}>
            <label>Title<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required /></label>
            <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required /></label>
            <label>Minimum Bid<input type="number" value={minimumBid} onChange={(e) => setMinimumBid(e.target.value)} placeholder="Minimum Bid" required /></label>
            <label>Maximum Bid<input type="number" value={maximumBid} onChange={(e) => setMaximumBid(e.target.value)} placeholder="Maximum Bid" /></label>
            <label>End Date<input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required /></label>
            <button type="submit">{auction ? 'Edit Auction' : 'Create Auction'}</button>
        </form>
    );
};

export default AuctionForm;
