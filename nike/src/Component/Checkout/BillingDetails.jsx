import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryInformation from './DeliveryInformation';

// Shared Tailwind CSS classes
const twClasses = {
  container: 'p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md',
  header: 'text-lg font-semibold text-zinc-800 dark:text-zinc-200',
  checkboxLabel: 'text-zinc-700 dark:text-zinc-300',
  button: 'bg-primary text-primary-foreground rounded-full px-4 py-2 mb-4',
  border: 'border-t border-zinc-300 dark:border-zinc-700',
  subHeader: 'font-medium text-zinc-800 dark:text-zinc-200',
  content: 'text-zinc-700 dark:text-zinc-300',
  editButton: 'text-blue-600 hover:underline'
};

const BillingComponent = () => {
                  const navigate=useNavigate();

  return (
    <div className={twClasses.container}>
      <h2 className={twClasses.header}>What's your billing address?</h2>
      <div className='flex items-center my-4'>
        <input type='checkbox' id='billingMatches' className='mr-2' defaultChecked />
        <label htmlFor='billingMatches' className={twClasses.checkboxLabel}>Billing matches shipping address</label>
      </div>
      <button                  onClick={()=>{navigate("/checkout/payment")}}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
      >Continue</button>
      <div className={twClasses.border}></div>
      <div>
        {/* <h3 className={twClasses.subHeader}>Delivery</h3>
        <p className={twClasses.content}>Vishal Giri</p>
        <p className={twClasses.content}>At post Irla</p>
        <p className={twClasses.content}>vishal@centric.com</p>
        <p className={twClasses.content}>097671 76108</p>
        <p className={twClasses.content}>PAN</p>
        <button className={twClasses.editButton}>Edit</button> */}
        <DeliveryInformation/>
      </div>
      <div className={twClasses.border}></div>
      <div>
        <h3 className={twClasses.subHeader}>Shipping</h3>
        <p className={twClasses.content}>₹ 1,250.00 Shipping</p>
        <p className={twClasses.content}>Shipment One</p>
        <p className={twClasses.content}>Arrives Tue, 13 Aug - Fri, 16 Aug</p>
        <button className={twClasses.editButton}>Edit</button>
      </div>
      <div className={twClasses.border}></div>
      <div>
        <h3 className={twClasses.subHeader}>Billing</h3>
        <p className={twClasses.content}>Details here...</p>
      </div>
      <div className={twClasses.border}></div>
      <div>
        <h3 className={twClasses.subHeader}>Payment</h3>
        <p className={twClasses.content}>Details here...</p>
      </div>
    </div>
  );
};

export default BillingComponent;
