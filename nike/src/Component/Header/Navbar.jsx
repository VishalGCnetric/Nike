import React, { useState } from 'react';
import { FaRegHeart, FaBars, FaRegUser, FaUser } from "react-icons/fa";

import { BsCart } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import Dropdown from './Dropdown';
import { Lists } from './navlist';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate()

    
    const token = sessionStorage.getItem('token');

    console.log(token)
   
    const handleLogout = () => {
        // Clear localStorage
        localStorage.clear();
    
        // Clear sessionStorage
        sessionStorage.clear();
    
        // Clear cookies
        document.cookie.split(";").forEach((cookie) => {
            document.cookie = cookie
                .split("=")[0]
                .trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        });
    };
    
    
    return (
        <header className="bg-white shadow-sm">

            <nav className="flex justify-between border-b-gray-100 items-center p-1 bg-background">
                <div></div>
                {/* <img
                    aria-hidden="true"
                    alt="logo"
                    src="https://openui.fly.dev/openui/24x24.svg?text=👟"
                    className="h-8"
                /> */}
                <div className="space-x-4">
                    <Link className="text-muted-foreground hover:text-primary">Find a Store</Link>
                    <Link className="text-muted-foreground hover:text-primary">Help</Link>
                    <Link className="text-muted-foreground hover:text-primary">Join Us</Link>
                   {token?<Link onClick={handleLogout}  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded">Logout</Link>:<Link to='/auth/signin' className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded">Sign In</Link>} 
                </div>
            </nav>
            <div className="container mx-auto h-20 flex items-center justify-between px-2 lg:px-2">
                {/* Left section with logo */}
                <div onClick={() => navigate('/')} className="flex items-center cursor-pointer space-x-4">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
                        alt="Nike Logo"
                        className="h-10 w-10"
                    />
                </div>

                {/* Center navigation for large screens */}
                <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    {Lists.map((el, index) => (
                        <div key={index} className="relative">
                            <div
                                className="text-gray-800 cursor-pointer hover:text-gray-500 transition duration-150"
                                onMouseEnter={() => setOpenDropdown(el.name)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {el.name}
                            </div>
                            {openDropdown === el.name && (
                                <div className="absolute z-50 bg-white mt-2 rounded-lg shadow-lg w-48 right-0">
                                    <Dropdown sections={el.dropdownList} />
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right section with icons and search */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            className="border rounded-full py-1 px-4 pl-8 text-gray-800 focus:outline-none focus:border-gray-500 transition duration-150"
                            placeholder="Search"
                        />
                        <GoSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                    <FaRegHeart className="h-6 w-6 text-gray-800 cursor-pointer" />
                    <BsCart onClick={()=>navigate('/cart')} className="h-6 w-6 text-gray-800 cursor-pointer" />
                    <FaUser onClick={() => navigate('/profile')} className="h-6 w-6 text-gray-800 cursor-pointer" />
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button
                        type="button"
                        className="text-gray-800 focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <FaBars className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-50 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
                            alt="Nike Logo"
                            className="h-10 w-10"
                        />
                        <button
                            type="button"
                            className="text-gray-800 focus:outline-none"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="text-2xl">&times;</span>
                        </button>
                    </div>
                    <nav className="space-y-4">
                        {Lists.map((item, index) => (
                            <div key={index}>
                                <a
                                    href="#"
                                    className="block text-gray-800 hover:text-gray-500 transition duration-150"
                                >
                                    {item.name}
                                </a>
                            </div>
                        ))}
                    </nav>
                    <div className="mt-4">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full border rounded-full py-1 px-4 pl-8 text-gray-800 focus:outline-none focus:border-gray-500 transition duration-150"
                                placeholder="Search"
                            />
                            <GoSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
