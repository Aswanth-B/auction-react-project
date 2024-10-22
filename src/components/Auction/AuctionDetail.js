// components/AuctionDetail.js
import { useState, useEffect } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import BidComponent from '../BidComponent';
import api from '../../api';
import "./AuctionDetail.css";

const AuctionDetail = () => {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const fetchAuctionById= async () => {
            try {
                const response = await api.get(`/auctions/${id}`);
                setAuction(response.data);
            } catch (error) {
                console.error('Error fetching auctions', error);
            }
        };

        fetchAuctionById();
    }, [id, showModal]);

    return (
        auction && 
            
            <div className='auctionDetail'>
                <h1>{auction.title}</h1>
                <p>{auction.description}</p>
                <p>Current Bid: ${auction.auctionDetails.currentBid}</p>
                <p>Minimum Bid: ${auction.auctionDetails.minimumBid}</p>
                <button onClick={handleOpenModal}>Place a Bid</button>
                <BidComponent
                    auctionId={auction.auctionDetails.id}
                    currentBid={auction.auctionDetails.currentBid}
                    minimumBid={auction.auctionDetails.minimumBid}
                    showModal={showModal}
                    handleClose={handleCloseModal}
                />
            </div>
        
    );
};

export default AuctionDetail;
