import React, { useState, useContext } from "react";
import CampaignInfo from "./partials/CampaignInfo";
import PFItemSelection from "./partials/PFItemSelection";
import ProductSelection from "./partials/ProductSelection";
import { Progress } from "../../../components/Component";
import RegionSelection from "./partials/RegionSelection";
import StoreTypeSelection from "./partials/StoreTypeSelection";
import QuantityPerStore from "./partials/QuantityPerStore";
const CreateCampaign = () => {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    campaignInfo: {
      promotionName: "",
      projectLead: "",
      jobNumber: "",
      campaignLiveData: "",
      dueDate: "",
    },
    selectedProducts: [],
    regionSelectionData: [],
  });

  console.log("current form step", step);
  return (
    <div className="p-4" style={{ marginTop: "65px" }}>
      <h4>Create Campaign</h4>
      {/* <Progress value={10} /> */}
      {step === 1 ? (
        <CampaignInfo prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />
      ) : step === 2 ? (
        <ProductSelection prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />
      ) : step === 3 ? (
        <PFItemSelection prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />
      ) : step === 4 ? (
        <RegionSelection prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />
      ) : step === 5 ? (
        <StoreTypeSelection prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />
      ) : (
        <QuantityPerStore prevData={campaignData} setPrevData={setCampaignData} setStep={setStep} />
      )}
    </div>
  );
};

export default CreateCampaign;
