import React from "react";
import PriceCard from "./PriceCard";

function PriceTable(props) {
  const {handleStandard, handlePro, standardTitle, proTitle} = props

  return (
    <section className="container mt-28 text-center">
      <h3 className="text-[32px] font-bold">Demo Plans</h3>
      <p className="font-extrabold"> Easy Cancellation </p>
      <div className="mt-11 grid gap-12 md:gap-12 md:grid-cols-3 lg:gap-12 xl:gap-12 justify-center">
        <PriceCard
          title="Standard"
          description="1st Month Free Trial"
          price="4.99"
          priceAction= {handleStandard}
          buttonTitle = {standardTitle}
          cardFeatures = {[
            "Small Bunny Show",
          ]}        
        />
        <PriceCard
          title="Premium"
          description="1st Month Free Trial"
          price="19.99"
          priceAction={handlePro}
          buttonTitle = {proTitle}
          buttonStyle = "primary-button mt-9 mb-8 group-even:primary-button group-even:border-white "
          cardFeatures = {[
            "Medium Bunny Show",
          ]}
        />
        <PriceCard
          title="Pro"
          description="1st Month Free Trial"
          price="29.99"
          priceAction={handlePro}
          buttonTitle = {proTitle}
          buttonStyle = "primary-button mt-9 mb-8 group-even:primary-button group-even:border-white "
          cardFeatures = {[
            "Big Bunny Show",
          ]}
        />
      </div>
    </section>
  );
}

export default PriceTable;
