import React from 'react';
import Pricing from './pricing';

const packages = [
  {
    name: 'Basic',
    price: 10,
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    name: 'Standard',
    price: 20,
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
  },
  {
    name: 'Premium',
    price: 30,
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
  },
];

const PricingProps: React.FC = () => {
  return (
    <div className="App">
      <Pricing packages={packages} />
    </div>
  );
};

export default PricingProps;
