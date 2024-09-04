import React from 'react';

const INPUT_CLASS = 'input mb-4'; // Shared input class
const TEXT_CLASS = 'text-lg font-semibold'; // Shared text class
const TEXT_MUTED_CLASS = 'text-muted-foreground'; // Shared muted text class

const BillingInfo = () => {
    return (
        <div>
            <h2 className={TEXT_CLASS}>Billing</h2>
            <div className="flex justify-between items-center">
                <span className={TEXT_MUTED_CLASS}>Velvet Girl</span>
                <button className="text-primary">Edit</button>
            </div>
            <span className={TEXT_MUTED_CLASS}>12, Past St.</span>
            <span className={TEXT_MUTED_CLASS}>09/07/21 17:35</span>
        </div>
    );
};

const ShippingInfo = () => {
    return (
        <div>
            <h2 className={TEXT_CLASS}>Shipping</h2>
            <span className={TEXT_MUTED_CLASS}>₹ 2,240.00 Shipping</span>
            <span className={TEXT_MUTED_CLASS}>Shipper Name</span>
            <span className={TEXT_MUTED_CLASS}>Arrives Tue, 13 Aug - Fri, 16 Aug</span>
        </div>
    );
};

const PaymentInfo = () => {
    return (
        <div>
            <h2 className={TEXT_CLASS}>Payment</h2>
            <span className={TEXT_MUTED_CLASS}>₹ 2,240.00</span>
        </div>
    );
};

const PaymentForm = () => {
    return (
        <div className="max-w-lg mx-auto p-6 bg-card rounded-lg shadow-md">
            <h2 className={TEXT_CLASS}>Have a promo code?</h2>
            <input type="text" placeholder="Promo" className={INPUT_CLASS} />
            <h2 className={TEXT_CLASS}>How would you like to pay?</h2>
            <div className="flex items-center mb-4">
                <input type="radio" id="card" name="payment-method" className="mr-2" />
                <label for="card" className={TEXT_MUTED_CLASS}>Credit or Debit Card</label>
            </div>
            <div className="flex items-center mb-4">
                <input type="radio" id="paypal" name="payment-method" className="mr-2" />
                <label for="paypal" className={TEXT_MUTED_CLASS}>PayPal</label>
            </div>
            <h2 className={TEXT_CLASS}>Enter your payment details:</h2>
            <input type="text" placeholder="Name on card" className={INPUT_CLASS} />
            <input type="text" placeholder="Card number" className={INPUT_CLASS} />
            <div className="flex mb-4">
                <input type="text" placeholder="MM/YY" className="input w-1/2 mr-2" />
                <input type="text" placeholder="CVV" className="input w-1/2" />
            </div>
            <p className="text-xs text-muted-foreground mb-4">
                By clicking Place Order, you agree to the <a href="#" className="text-primary">Terms and Conditions</a>.
            </p>
            <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg w-full">Place Order</button>
            <ShippingInfo />
            <BillingInfo />
            <PaymentInfo />
        </div>
    );
};

export default PaymentForm;
