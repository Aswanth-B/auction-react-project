import React, { useEffect, useState, useContext } from 'react';
import api from '../../api';
import './AuctionList.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AuctionList = ({ isMyAuction }) => {
    const { isAuthenticated, userName } = useContext(AuthContext);
    const [auctions, setAuctions] = useState([]);
    const [timeLeft, setTimeLeft] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await api.get(isMyAuction ? '/my-auctions' : '/auctions');
                setAuctions(response.data);
            } catch (error) {
                console.error('Error fetching auctions', error);
            }
        };

        fetchAuctions();
    }, [isMyAuction]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeLeft = {};
            auctions.forEach(bid => {
                const timeRemaining = new Date(bid.endDate) - new Date();
                newTimeLeft[bid.id] = timeRemaining > 0 ? timeRemaining : 0;
            });
            setTimeLeft(newTimeLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, [auctions]);

    const formatTime = (time) => {
        if (isNaN(time)) return ''
        if (time <= 0) return 'Auction ended'
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    const routeToAuctionDetails = (id) => {
        isAuthenticated ? navigate(`/auctions/${id}`) : navigate('/login');
    }

    const routeToAuctionEdit = (id) => {
        navigate(`/auctions/${id}/edit`)
    }

    return (
        <div className='auctionList'>
            {!isAuthenticated ? <div className='homeImage'>
                <img src='/assets/images/HomeImage.png' alt='homeimage'/>
                <div className='auctionHeader'><h1>Explore <span>Auctions</span></h1></div>
            </div>
            :
            <h2>Welcome <span>{userName}!</span></h2>
            }
            {auctions && auctions.length > 0 &&
                <div className="bidding-page">
                    {auctions.map(auction => (
                        <div className="bid-card" key={auction.id}>
                            <div className='bid-container'>
                                <img src={auction.image} alt={auction.title} className="bid-image" />
                                <div className='bid-content'>
                                    <h3>{auction.title}</h3>
                                    <p>Current Bid: ${auction.currentBid}</p>
                                    <p>Minimum Bid: ${auction.minimumBid}</p>
                                    <p>Ends in: {formatTime(timeLeft[auction.id])}</p>
                                </div>
                            </div>
                            {isMyAuction ?
                                <button className="bid-button" onClick={() => routeToAuctionEdit(auction.id)}>Edit Auction</button>
                                : <button className="bid-button" onClick={() => routeToAuctionDetails(auction.id)}>Place Bid</button>}
                        </div>

                    ))}
                </div>
            }
        </div>
    );
};

export default AuctionList;
