import React, { useState } from "react";
import Stepper from "react-stepper-horizontal";
import CampaignInfo from "./partials/CampaignInfo";
import PFItemSelection from "./partials/PFItemSelection";
import ProductSelection from "./partials/ProductSelection";
import RegionSelection from "./partials/RegionSelection";
import StoreTypeSelection from "./partials/StoreTypeSelection";
import QuantityPerStore from "./partials/QuantityPerStore";

const steps = [
  "Campaign Info",
  "Product Selection",
  "PF Item Selection",
  "Region Selection",
  "Store Type Selection",
  "Quantity Per Store",
];

const CreateCampaign = () => {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    campaignInfo: {
      promotionName: "",
      projectLead: "",
      jobNumber: "",
      campaignLiveDate: "",
      dueDate: "",
    },
    selectedProducts: [],
    regionSelectionData: [],
  });

  return (
    <div className="p-4" style={{ marginTop: "65px" }}>
      <h4>Create Campaign</h4>
      <div>
        <Stepper
          steps={[
            { title: "Campaign Info" },
            { title: "Product Selection" },
            { title: "Presfast Item selection" },
            { title: "Select Region" },
            { title: "Select Store Type" },
            { title: "Select Quantity" },
          ]}
          activeStep={step-1}
          activeColor="#ffb671"
          completeColor="#f68922"
        />
      </div>
      {/* Render your form components based on the current step */}
      {step === 1 && <CampaignInfo prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />}
      {step === 2 && <ProductSelection prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />}
      {step === 3 && <PFItemSelection prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />}
      {step === 4 && <RegionSelection prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />}
      {step === 5 && <StoreTypeSelection prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />}
      {step === 6 && <QuantityPerStore prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />}
    </div>
  );
};

export default CreateCampaign;
