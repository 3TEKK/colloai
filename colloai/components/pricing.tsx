import React from 'react';

interface Package {
  name: string;
  price: number;
  features: string[];
}

interface PricingProps {
  packages: Package[];
}

const Pricing: React.FC<PricingProps> = ({ packages }) => {
  return (
    <div>
        <h1 className='text-center text-4xl text-black font-extrabold mb-10'>Service Packages</h1>
        <div className="pricing grid grid-cols-3 gap-4">
        {packages.map((pkg, index) => (
        <div key={index} className="package bg-gradient-to-r from-blue-400 to-pink-grey-700 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">{pkg.name}</h2>
            <h3 className="text-3xl font-bold text-gray-800">${pkg.price}/month</h3>
            <ul className="mt-4">
            {pkg.features.map((feature, idx) => (
                <li key={idx} className="text-gray-600 mb-1">
                {feature}
                </li>
            ))}
            </ul>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded mx-auto">
            Choose
            </button>
        </div>
        ))}
  </div>
    </div>
    
  );
};

export default Pricing;
