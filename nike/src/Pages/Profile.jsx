import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const storedState = localStorage.getItem('state');
    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState);
        if (parsedState && parsedState.auth && parsedState.auth.user && parsedState.auth.user.user) {
          setData(parsedState.auth.user.user);
        }
      } catch (error) {
        console.error('Error parsing JSON from localStorage', error);
      }
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Navigation */}
     

      {/* Content */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 border p-4 mb-4 md:mb-0">
          <ul className="space-y-4">
            <li className="font-bold border-l-4 border-red-500 pl-2">My Account</li>
            <li>
              <Link to="/all-orders" className="hover:bg-gray-100 block p-2">My Orders</Link>
            </li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">My Wish List</li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">Address Book</li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">Store Credit & Refunds</li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">My RMA Requests</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 md:pl-6">
          <h2 className="text-2xl font-bold mb-6">MY ACCOUNT</h2>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Account Information</h3>
            <div>
              <p><b>Name:</b> {data?.name || 'N/A'}</p>
              <p><b>Email:</b> {data?.email || 'N/A'}</p>
              <p><b>Phone Number:</b> {data?.phoneNumber || 'N/A'}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Address Book</h3>
            <p><Link to="#" className="text-primary">Manage Addresses</Link></p>
          </div>

          <div className="flex justify-between">
            <div className="w-1/2 pr-4">
              <h3 className="text-xl font-bold mb-2">Default Billing Address</h3>
              <p>You have not set a default billing address.</p>
              <Link to="#" className="text-primary hover:underline">EDIT ADDRESS</Link>
            </div>
            <div className="w-1/2 pl-4">
              <h3 className="text-xl font-bold mb-2">Default Shipping Address</h3>
              <p>You have not set a default shipping address.</p>
              <Link to="#" className="text-primary hover:underline">EDIT ADDRESS</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="text-center text-muted-foreground mt-8">
        <p>You don't have any orders yet</p>
      </div>
    </div>
  );
};

export default ProfilePage;
