import React from 'react';
import CartItem from './CartItem'; // Adjust the path as necessary
const cartItems = [
  {
    id: 1,
    name: "Nike Alphafly 3 Electric",
    type: "Women's Road Racing Shoes",
    color: "Multi-Colour/Multi-Colour",
    size: 4,
    quantity: 1,
    price: 23495,
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/w_592,f_auto,q_auto:eco,b_rgb:f5f5f5/19cd86fb-51c7-4daa-b9a9-69ad8b6bc9f5/alphafly-3-electric-road-racing-shoes-nXnRWH.png", 
  },
  {
    id: 2,
    name: "Nike Alphafly 3 Electric",
    type: "Women's Road Racing Shoes",
    color: "Multi-Colour/Multi-Colour",
    size: 3.5,
    quantity: 3,
    price: 23495,
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/w_592,f_auto,q_auto:eco,b_rgb:f5f5f5/19cd86fb-51c7-4daa-b9a9-69ad8b6bc9f5/alphafly-3-electric-road-racing-shoes-nXnRWH.png", 
  },
];

const CartPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Bag</h2>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="w-full lg:w-1/3 lg:pl-6 mt-8 lg:mt-0">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹ 46,990.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Estimated Delivery & Handling:</span>
              <span>₹ 1,250.00</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total:</span>
              <span>₹ 48,240.00</span>
            </div>
            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
              Member Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
