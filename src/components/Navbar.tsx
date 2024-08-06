import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="flex space-x-4">
                    <Link to="/" className="text-white">
                        <Logo />
                    </Link>
                    <Link to="/movies" className="text-white leading-10">
                        My Collection
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;