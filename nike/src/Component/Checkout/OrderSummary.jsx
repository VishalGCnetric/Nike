import React from 'react';

const cardClass = "w-half p-4 bg-white shadow-md rounded-md";
const flexClass = "flex justify-between";
const itemClass = "text-sm";

const OrderSummary = () => {
    return (
        <div className={cardClass}>
            <h2 className="text-lg font-semibold text-zinc-800">Order Summary</h2>
            <div className="mt-4">
                <p className={flexClass}><span>Subtotal</span><span>₹ 46,990.00</span></p>
                <p className={flexClass}><span>Delivery/Shipping</span><span>₹ 1,250.00</span></p>
                <hr className="my-2" />
                <p className={`${flexClass} font-bold`}><span>Total</span><span>₹ 48,240.00</span></p>
            </div>
            <p className={`${itemClass} mt-1`}>(The total reflects the price of your order, including all duties and taxes)</p>
            <h3 className="mt-4 font-semibold">Arrives Tue, 13 Aug - Fri, 16 Aug</h3>
            <div className="flex items-start mt-4 space-x-4">
                <img aria-hidden="true" alt="Nike Alphafly 3 Electric Women's Road Racing Shoes (UK Size 3.5)" src="https://static.nike.com/a/images/t_PDP_1728_v1/w_592,f_auto,q_auto:eco,b_rgb:f5f5f5/19cd86fb-51c7-4daa-b9a9-69ad8b6bc9f5/alphafly-3-electric-road-racing-shoes-nXnRWH.png" className="w-32 h-32 object-cover rounded-md" />
                <div>
                    <h4 className="font-medium">Nike Alphafly 3 Electric Women's Road Racing Shoes</h4>
                    <p className={itemClass}>Qty 1</p>
                    <p className={itemClass}>Size UK 3.5</p>
                    <p className="font-bold">₹ 23,495.00</p>
                </div>
            </div>
            <div className="flex items-start mt-4 space-x-4">
                <img aria-hidden="true" alt="Nike Alphafly 3 Electric Women's Road Racing Shoes (UK Size 4)" src="https://static.nike.com/a/images/t_PDP_1728_v1/w_592,f_auto,q_auto:eco,b_rgb:f5f5f5/19cd86fb-51c7-4daa-b9a9-69ad8b6bc9f5/alphafly-3-electric-road-racing-shoes-nXnRWH.png" className="w-32 h-32 object-cover rounded-md" />
                <div>
                    <h4 className="font-medium">Nike Alphafly 3 Electric Women's Road Racing Shoes</h4>
                    <p className={itemClass}>Qty 1</p>
                    <p className={itemClass}>Size UK 4</p>
                    <p className="font-bold">₹ 23,495.00</p>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
