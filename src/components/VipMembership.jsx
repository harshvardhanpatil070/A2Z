import React from 'react';

const FreeVipMembershipTrial = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900">
        Free VIP Membership Trial
        <br />
        <span className="text-3xl text-emerald-600">
          Up to 40% Off on all products
        </span>
      </h1>
      <p className="text-xl text-gray-600">
        Instant Delivery with No Fees. No Minimum Order Required!
      </p>
      <div className="flex justify-center space-x-4 mt-4">
        <button className="w-40">
          <img 
            src="https://via.placeholder.com/150x50?text=App+Store" 
            alt="App Store" 
            className="w-full h-auto"
          />
        </button>
        <button className="w-40">
          <img 
            src="https://via.placeholder.com/150x50?text=Google+Play" 
            alt="Google Play" 
            className="w-full h-auto"
          />
        </button>
      </div>
    </div>
  );
};

export default FreeVipMembershipTrial;