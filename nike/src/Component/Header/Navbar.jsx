import React, { useState } from 'react';
import { FaRegHeart, FaBars } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import Dropdown from './Dropdown';
import {Lists} from './navlist'


const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Left section with logos */}
                <div className="flex items-center space-x-4">
                    <img
                        src="https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo-1971-now.png"
                        alt="Nike Logo"
                        className="h-10 w-10"
                    />
                </div>

                {/* Center navigation */}
                <nav className="hidden md:flex space-x-4 lg:space-x-6">
                    {Lists?.map((el,index)=>
                    <>
                    <div
                        className="relative text-gray-800 cursor-pointer hover:text-gray-500 transition duration-150"
                        onMouseEnter={() => setOpenDropdown(el?.name)}
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        {el?.name}
                    </div>
                        {openDropdown === el?.name && <Dropdown sections={el?.dropdownList}/>}
                        </>
                 )}
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
            <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} px-6 pb-4`}>
                <nav className="space-y-2">
                    {['New & Featured', 'Men', 'Women', 'Kids', 'Sale', 'Customise', 'SNKRS'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="block text-gray-800 hover:text-gray-500 transition duration-150"
                        >
                            {item}
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
        </header>
    );
}

export default Navbar;
