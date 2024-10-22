// components/BidComponent.js
import React, { useEffect, useRef, useState } from 'react';
import api from '../api';
import './BidComponent.css'; // CSS for modal styling

const BidComponent = ({ auctionId, currentBid, minimumBid, showModal, handleClose }) => {
    const [straightBid, setStraightBid] = useState('');
    const [maximumBid, setMaximumBid] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const timeOutRef = useRef(null);

    useEffect(() => {
        return ()=> {
            if(timeOutRef.current) clearTimeout(timeOutRef.current);
        }
    }, [])

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        const straightBidValue = parseFloat(straightBid);
        const maximumBidValue = parseFloat(maximumBid);

        // Validation for straight bid
        if (isNaN(straightBidValue) || straightBidValue < minimumBid) {
            setErrorMessage(`Straight bid must be at least $${minimumBid}`);
            return;
        }

        try {
            // Send bid to the server
            await api.post('/bids', { auctionId, straightBid: straightBidValue, maximumBid: maximumBidValue });

            // Handle response
            setSuccessMessage('Bid placed successfully!');
            setErrorMessage('');
            setStraightBid('');
            setMaximumBid('');
            timeOutRef.current = setTimeout(() => {
                handleClose();
                setSuccessMessage('');
                setErrorMessage('');
            }, 2000)

            // Close modal on success
        } catch (error) {
            console.error(error);
            setErrorMessage('Error placing bid. Please try again.');
        }
    };

    if (!showModal) return null; // Hide modal when showModal is false

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <form onSubmit={handleBidSubmit}>
                    <h4>Current Bid: ${currentBid}</h4>
                    <h4>Minimum Bid: ${minimumBid}</h4>
                    <div>
                        <label>
                            Straight Bid:
                            <input
                                type="number"
                                value={straightBid}
                                onChange={(e) => setStraightBid(e.target.value)}
                                placeholder="Enter your straight bid"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Maximum Bid:
                            <input
                                type="number"
                                value={maximumBid}
                                onChange={(e) => setMaximumBid(e.target.value)}
                                placeholder="Enter your maximum bid"
                            />
                        </label>
                    </div>
                    <button type="submit">Place Bid</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
};

export default BidComponent;
