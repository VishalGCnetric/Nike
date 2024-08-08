
import React from 'react';

const cardClasses = "max-w-md mx-auto p-4 bg-card rounded-lg shadow-md";
const primaryColorClasses = "bg-primary text-primary-foreground";
const secondaryColorClasses = "bg-secondary text-secondary-foreground";
const textMutedClasses = "text-muted-foreground";
const borderClasses = "border border-border";
const inputClasses = "mt-1 block w-full rounded-md p-2";

const AddressForm = () => {
    return (
        <div className={cardClasses} style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--card-foreground)' }}>How would you like to get your order?</h2>
            <p className={`${textMutedClasses} text-sm mb-4`}>
                Customs regulation for India require a copy of the recipient's KYC. The address on the KYC needs to match the shipping address...
                <a href="#" className="text-primary hover:underline">Learn More</a>
            </p>
            <button className={`${secondaryColorClasses} w-full p-2 rounded-lg hover:bg-secondary/80 mb-4`} style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>Deliver It</button>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--card-foreground)' }}>Enter your name and address:</h3>
            <form>
                <label className="block mb-2">
                    <span className={textMutedClasses}>First Name</span>
                    <input type="text" className={`${inputClasses} ${borderClasses}`} placeholder="Vishal" required />
                </label>
                <label className="block mb-2">
                    <span className={textMutedClasses}>Last Name</span>
                    <input type="text" className={`${inputClasses} ${borderClasses}`} placeholder="Giri" required />
                </label>
                <label className="block mb-2">
                    <span className={textMutedClasses}>Apt/House Number, Street Name</span>
                    <input type="text" className={`${inputClasses} ${borderClasses}`} placeholder="AT POST" required />
                </label>
                <label className="block mb-2">
                    <span className={textMutedClasses}>Address Line 2</span>
                    <input type="text" className={`${inputClasses} ${borderClasses}`} placeholder="vithal madir" />
                </label>
                <label className="block mb-2">
                    <span className={textMutedClasses}>Address Line 3</span>
                    <input type="text" className={`${inputClasses} ${borderClasses}`} placeholder="behind" />
                </label>
                <label className="block mb-2">
                    <span className={textMutedClasses}>Postal Code</span>
                    <input type="text" className={`${inputClasses} ${borderClasses}`} placeholder="412801" required />
                </label>
                <label className="block mb-2">
                    <span className={textMutedClasses}>Locality</span>
                    <input type="text" className={`${inputClasses} ${borderClasses}`} placeholder="Shirwal" required />
                </label>
                <label className="block mb-2">
                    <span className={textMutedClasses}>State/Territory</span>
                    <input type="text" className={`${inputClasses} ${borderClasses}`} placeholder="Maharashtra" required />
                </label>
                <label className="block mb-2">
                    <span className={textMutedClasses}>Country</span>
                    <input type="text" className={`${inputClasses} ${borderClasses}`} placeholder="India" required />
                </label>
                <div className="flex items-center mb-4">
                    <input type="checkbox" id="saveAddress" className="mr-2" required />
                    <label htmlFor="saveAddress" className={textMutedClasses}>Save this address to my profile</label>
                </div>
                <div className="flex items-center mb-4">
                    <input type="checkbox" id="preferAddress" className="mr-2" />
                    <label htmlFor="preferAddress" className={textMutedClasses}>Make this my preferred address</label>
                </div>
                <button type="submit" className={`${primaryColorClasses} w-full p-2 rounded-lg hover:bg-primary/80`} style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>Submit</button>
            </form>
        </div>
    );
};

export default AddressForm;
