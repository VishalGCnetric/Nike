import React from 'react';
import DeliveryInformation from './DeliveryInformation';

const sharedClasses = {
    textZinc: 'text-zinc-600 dark:text-zinc-400',
    textBoldZinc: 'text-lg font-bold text-zinc-900 dark:text-zinc-100',
    borderZinc: 'border rounded-md border-zinc-300 dark:border-zinc-600',
    button: 'w-full bg-black text-white p-2 rounded-lg hover:bg-zinc-800',
};

const OrderDetails = () => {
    return (
        <div className="p-6 bg-white dark:bg-background rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                When would you like to get your order?
            </h2>
            <div className={sharedClasses.borderZinc}>
                <p className="p-4 text-zinc-700 dark:text-zinc-300">
                    Arrives Tue, 13 Aug - Fri, 16 Aug
                </p>
                <p className={sharedClasses.textBoldZinc}>₹ 1,250.00</p>
            </div>
            <div className="mt-6">
                <h3 className="text-md font-semibold text-zinc-800 dark:text-zinc-200">
                    Arrives Tue, 13 Aug - Fri, 16 Aug
                </h3>
                <img className="w-full mt-2" src="https://placehold.co/400x200?text=Sneakers" alt="sneaker image" />
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    This is an international shipment requiring customs clearance.
                </p>
            </div>
            <button className={sharedClasses.button}>Continue</button>
            {/* <DeliveryInformation /> */}
            <ShippingInformation />
            <BillingInformation />
            <PaymentInformation />
        </div>
    );
};



 export const ShippingInformation = () => {
    return (
        <div className="mt-6 border-t border-zinc-300 dark:border-zinc-600 pt-4">
            <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200">Shipping</h4>
            <p className={sharedClasses.textZinc}>Your shipping information goes here.</p>
        </div>
    );
};

export const BillingInformation = () => {
    return (
        <div className="mt-6 border-t border-zinc-300 dark:border-zinc-600 pt-4">
            <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200">Billing</h4>
            {/* <p className={sharedClasses.textZinc}>Your billing information goes here.</p> */}
        </div>
    );
};

export const PaymentInformation = () => {
    return (
        <div className="mt-6 border-t border-zinc-300 dark:border-zinc-600 pt-4">
            <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200">Payment</h4>
            {/* <p className={sharedClasses.textZinc}>Your payment information goes here.</p> */}
        </div>
    );
};

export default OrderDetails;
