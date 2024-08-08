import React from 'react';
import { motion } from 'framer-motion';


const Dropdown = ({sections}) => {
  return (
   <div className="absolute  left-0 z-50 bg-white mt-5 px-4 py-6 rounded-lg shadow-lg w-screen">
  <div className="overflow-x-hidden">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
          <ul className="list-disc list-inside text-gray-700">
            {section.items.map((item, idx) => (
              <li key={idx} className="mb-1">{item}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </div>
</div>


  );
};

export default Dropdown;
