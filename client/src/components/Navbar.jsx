import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">Appointment App</div>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/home">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/appointments">
                            All Appointments
                        </Link>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;
