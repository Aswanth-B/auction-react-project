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
        const fetchAuctionById = async () => {
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
        auction && auction.auctionDetails &&

        <div className='auctionContainer'>
            <div className='auctionItem'>
                <div className="bid-card">
                    <div className='bid-container'>
                        <img src={auction.auctionDetails.image} alt={auction.auctionDetails.title} className="bid-image" />
                        <div className='bid-content'>
                            <h3>{auction.auctionDetails.title}</h3>
                            <p>Current Bid: ${auction.auctionDetails.currentBid}</p>
                            <p>Minimum Bid: ${auction.auctionDetails.minimumBid}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='auctionContent'>
                <h6>Description</h6>
                <p>{auction.auctionDetails.description}</p>
            </div>
            <div className='auctionBid'>
                {auction.bids && auction.bids.length > 0 &&
                    <ul>
                        {auction.bids.map(b => b.bidderUserid === auction.auctionDetails.UserId ? 
                            <li>Your Bid ${b.bidAmount}</li> :
                            <li>${b.bidAmount}</li>
                        )}
                    </ul>
                }
                <button onClick={handleOpenModal}>Place a Bid</button>
            </div>
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
