import React, { useState } from 'react';
import { FaRegHeart, FaBars } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import Dropdown from './Dropdown';
import { Lists } from './navlist';

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm" style={{ height: '80px' }}>
            <div className="container mx-auto h-full flex items-center justify-between">

                {/* Left section with logos */}
                <div className="flex items-center space-x-4">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
                        alt="Nike Logo"
                        className="h-10 w-10"
                    />
                </div>

                {/* Center navigation */}
                <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                    {Lists.map((el, index) => (
                        <div key={index} className="relative h-full flex items-center">
                            <div
                                className="text-gray-800 cursor-pointer hover:text-gray-500 transition duration-150 flex items-center h-full"
                                onMouseEnter={() => setOpenDropdown(el.name)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {el.name}
                            </div>
                            {openDropdown === el.name && (
                                <div className="absolute z-50 bg-white mt-5 rounded-lg shadow-lg w-full  right-0 top-full">
                                    <Dropdown sections={el.dropdownList} />
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right section with icons */}
                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            className="border rounded-full py-1 px-4 pl-8 text-gray-800 focus:outline-none focus:border-gray-500 transition duration-150"
                            placeholder="Search"
                        />
                        <GoSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                    <FaRegHeart className="h-6 w-6 text-gray-800" />
                    <BsCart className="h-6 w-6 text-gray-800" />
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
                <div className="md:hidden px-6 pb-4">
                    <nav className="space-y-2">
                        {Lists.map((item, index) => (
                            <a
                                key={index}
                                href="#"
                                className="block text-gray-800 hover:text-gray-500 transition duration-150"
                            >
                                {item.name}
                            </a>
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
}

export default Navbar;
