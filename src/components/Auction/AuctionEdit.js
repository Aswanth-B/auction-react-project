// src/components/AuctionEdit.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import AuctionForm from '../AuctionForm';

const AuctionEdit = () => {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);

    useEffect(() => {

        const fetchAuction = async () => {
            if (id) {
                try {
                    const response = await api.get(`/auctions/${id}`);
                    setAuction(response.data.auctionDetails);
                }
                catch (err) {

                }
            }

        };
        fetchAuction();
    }, [id]);





    return (
            <AuctionForm auction={auction} />
    );
};

export default AuctionEdit;
