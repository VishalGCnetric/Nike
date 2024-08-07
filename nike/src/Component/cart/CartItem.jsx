import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b-2">
      <img src={item.imageUrl} alt={item.name} className="w-48 h-48 object-cover mr-4" />
      <div className="flex-1 space-y-1 text-left">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">{item.type}</p>
        <p className="text-gray-600">{item.color}</p>
        <p className="text-gray-600">Size: {item.size}</p>
        <p className="text-gray-600">
            Quantity: 
            <select name="quantity" value={item.quantity} id="quantity" className="ml-2">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
</select>

        </p>
        
        <div className="flex space-x-4">
        <button className="text-gray-600 hover:text-black">❤️</button>
        <button className="text-gray-600 hover:text-black">🗑️</button>
      </div>
      </div>
      <div className="flex space-x-4">
      <p className="font-semibold">MRP: ₹ {item.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CartItem;
