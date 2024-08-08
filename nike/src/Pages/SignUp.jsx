// import React from 'react';

// const inputClasses = "border rounded p-2 w-full";
// const textClasses = "text-muted-foreground";
// const linkClasses = "text-primary";
// const bgClasses = "bg-background";
// const buttonClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded w-full";
// const flexClasses = "flex";
// const mbClasses = "mb-4";

// const NikeSignupForm = () => {
//   return (
//     <div className={`flex flex-col p-5 ${bgClasses} rounded-lg shadow-md max-w-md mx-auto`}>
//       {/* <img src="https://openui.fly.dev/openui/24x24.svg?text=🪄" alt="Nike Logo" className="mb-4" /> */}
//       <img
//                 src="https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo-1971-now.png"
//                 alt="Nike Logo"
//                 className="h-10 w-10"
//             />
//       <h2 className="text-lg font-semibold text-foreground mb-2">Now let's make you a Nike Member.</h2>
//       <p className={`${textClasses} ${mbClasses}`}>We've sent a code to vishalgiri197@gmail.com <a href="#" className={linkClasses}>Edit</a></p>
      
//       <form>
//         <div className={mbClasses}>
//           <label className={`block ${textClasses}`}>Code*</label>
//           <input type="text" className={inputClasses} placeholder="Enter Code" required />
//           <span className={`${textClasses} cursor-pointer`}>Resend code in 1s</span>
//         </div>
        
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className={`block ${textClasses}`}>First Name*</label>
//             <input type="text" className={inputClasses} placeholder="First Name" required />
//           </div>
//           <div>
//             <label className={`block ${textClasses}`}>Last Name*</label>
//             <input type="text" className={inputClasses} placeholder="Last Name" required />
//           </div>
//         </div>
        
//         <div className={mbClasses}>
//           <label className={`block ${textClasses}`}>Password*</label>
//           <input type="password" className={inputClasses} placeholder="Password" required />
//           <p className={`${textClasses} text-sm`}>Minimum of 8 characters</p>
//           <p className={`${textClasses} text-sm`}>Uppercase, lowercase letters, and one number</p>
//         </div>
        
//         <div className={mbClasses}>
//           <label className={`block ${textClasses}`}>Shopping Preference*</label>
//           <select className={inputClasses} required>
//             <option value="">Select Preference</option>
//             <option value="online">Online</option>
//             <option value="in-store">In-Store</option>
//           </select>
//         </div>
        
//         <div className={mbClasses}>
//           <label className={`block ${textClasses}`}>Date of Birth*</label>
//           <input type="date" className={inputClasses} required />
//           <p className={textClasses}>Get a Nike Member Reward on your birthday.</p>
//         </div>
        
//         <div className={flexClasses}>
//           <input type="checkbox" className="mr-2" />
//           <label className={textClasses}>Sign up for emails to get updates from Nike on products, offers, and your Member benefits.</label>
//         </div>
        
//         <div className={flexClasses}>
//           <input type="checkbox" className="mr-2" required />
//           <label className={textClasses}>I agree to Nike's <a href="#" className={linkClasses}>Privacy Policy</a> and <a href="#" className={linkClasses}>Terms of Use</a>.</label>
//         </div>
//         <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">Create Account</button>
//       </form>
//     </div>
//   );
// }

// export default NikeSignupForm;
import React from 'react';

const NikeSignUpForm = () => {
  return (
    <div className="max-w-md mx-auto p-6 font-sans">
       <div className=" w-[100%] flex items-center justify-center space-x-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
          alt="Nike Logo"
          className="h-6 "
        />
        <img
          src="https://th.bing.com/th?id=OIP.TWDOn4eq1Zipw770Qken7gHaG6&w=258&h=241&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          alt="Jordan Logo"
          className="h-8 mr-72 "
        />
      </div>
      <h2 className="text-2xl font-bold mb-2">Now let's make you a Nike Member.</h2>
      <p className="text-sm text-gray-700 mb-4">
        We've sent a code to <span className="font-bold">vishalgiri197@gmail.com</span> <span className="text-blue-600 cursor-pointer">Edit</span>
      </p>

      <form>
        <div className="mb-4 relative">
          <input type="text" placeholder="Code*" required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <span className="absolute right-2 top-3 text-sm text-gray-500">Resend code in 1s</span>
        </div>

        <div className="flex space-x-4 mb-4">
          <input type="text" placeholder="First Name*" required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Last Name*" required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <input type="password" placeholder="Password*" required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p className="text-xs text-gray-500 mt-2">
            Minimum of 8 characters
            <br />
            Uppercase, lowercase letters, and one number
          </p>
        </div>

        <div className="mb-4">
          <select required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled selected>Select Shopping Preference*</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="mb-4">
          <input type="date" required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p className="text-xs text-gray-500 mt-2">Get a Nike Member Reward on your birthday.</p>
        </div>

        <div className="mb-4 flex items-start space-x-2">
          <input type="checkbox" id="emailUpdates" className="mt-1" />
          <label htmlFor="emailUpdates" className="text-sm">Sign up for emails to get updates from Nike on products, offers and your Member benefits.</label>
        </div>

        <div className="mb-6 flex items-start space-x-2">
          <input type="checkbox" id="agreeTerms" required className="mt-1" />
          <label htmlFor="agreeTerms" className="text-sm">I agree to Nike's <span className="text-blue-600 cursor-pointer">Privacy Policy</span> and <span className="text-blue-600 cursor-pointer">Terms of Use</span>.</label>
        </div>

        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg text-center font-semibold hover:bg-gray-800 transition duration-200">Create Account</button>
      </form>
    </div>
  );
}

export default NikeSignUpForm;
