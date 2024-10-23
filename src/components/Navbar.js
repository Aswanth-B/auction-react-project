import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout(); // Call the logout function from the context
    };

    return (


        <nav className="navbar">
            <div className="navbar-left">
                <Link className="navbar-logo" to="/"><img src='/assets/images/Vector.png' alt="Logo"/></Link>
                <span className="navbar-text">Genix Auctions</span>
            </div>
            <div className="navbar-right">
                {isAuthenticated ?
                    <>
                        <Link className='navbar-button2' to="/auctions/new">Create Auction</Link>
                        <Link className='navbar-button2' to="/myauctions">My Auctions</Link>
                        <button className='navbar-button1' onClick={handleLogout}>Logout</button>
                    </>
                    :
                    <>
                        <Link className='navbar-button1' to="/login">Login</Link>
                        <Link className='navbar-button2' to="/register">Get Started</Link>
                    </>

                }
            </div>
        </nav>

    );
};

export default Navbar;
