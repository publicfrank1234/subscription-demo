import React from "react";

function PriceCard({ title, description, price, buttonTitle, priceAction, buttonStyle,  cardFeatures=[] }) {

  const features = [
    ...cardFeatures
  ];
  
  return (
    <div className="border min-w-[80vw] sm:min-w-[400px] md:min-w-full group even:bg-primary even:text-white flex flex-col items-center shadow-borderShadow">
      <h4 className="mt-6 font-bold text-2xl">{title}</h4>
      <p className="mt-2">{description}</p>

      <div className="mt-6 flex items-center">
        <p className="text-5xl text-primary group-even:text-white font-bold">{price}</p>
        <div className="ml-2 flex flex-col items-start">
          <p className="text-primary group-even:text-white font-bold text-2xl">$</p>
          <p className="text-[#AFAFAF] group-even:text-[#E0E0E0] -mt-1">Per / mo</p>
        </div>
      </div>

      <div className="mt-5">
        {features.map((feature) => (
          <p key={feature} className="mt-4">{feature}</p>
        ))}
      </div>

      <button className={buttonStyle ? buttonStyle : "primary-button mt-9 mb-8 rounded-lg"} onClick={priceAction}>{buttonTitle} </button>
    </div>
  );
}

export default PriceCard;
