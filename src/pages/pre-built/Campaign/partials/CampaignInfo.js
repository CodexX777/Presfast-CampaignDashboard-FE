import React from "react";
import { useEffect, useState } from "react";
import { Col, Button } from "../../../../components/Component";
import { useNavigate } from "react-router";
const CampaignInfo = ({ prevData, setPrevData, setStep }) => {
  const [formData, setFormData] = useState({
    promotionName: "",
    projectLead: "",
    jobNumber: "",
    campaignLiveDate: "",
    dueDate: new Date().toISOString().slice(0, 10),
  });

  const twoDaysAhead = new Date();
  twoDaysAhead.setDate(twoDaysAhead.getDate() + 2);
  const [artworkDueDate, setArtworkDueDate] = useState(twoDaysAhead.toISOString().slice(0, 10));

  const navigate = useNavigate();
  useEffect(() => {
    setFormData({ ...prevData.campaignInfo });
  }, [prevData]);

  const handleSubmit = () => {
    console.log("formdata", formData);
    if (
      formData.promotionName === "" ||
      formData.projectLead === "" ||
      formData.jobNumber === "" ||
      formData.campaignLiveDate === "" ||
      formData.dueDate === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    setPrevData({ ...prevData, campaignInfo: { ...formData, dueDate: artworkDueDate } });
    setStep((prev) => prev + 1);
  };

  return (
    <div className="mt-4 p-4 row gy-4">
      <Col md="6">
        <div className="form-group">
          <label className="form-label">Campaign Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Campaign name"
            value={formData.promotionName}
            onChange={(e) => {
              setFormData({ ...formData, promotionName: e.target.value });
            }}
          />
        </div>
      </Col>
      <Col md="6">
        <div className="form-group">
          <label className="form-label">Project Lead</label>
          <input
            className="form-control"
            type="text"
            placeholder="Project lead name"
            value={formData.projectLead}
            onChange={(e) => {
              setFormData({ ...formData, projectLead: e.target.value });
            }}
          />
        </div>
      </Col>
      <Col md="6">
        <div className="form-group">
          <label className="form-label">Job Number</label>
          <input
            className="form-control"
            type="text"
            placeholder="Job number"
            value={formData.jobNumber}
            onChange={(e) => {
              setFormData({ ...formData, jobNumber: e.target.value });
            }}
          />
        </div>
      </Col>
      <Col md="6">
        <div className="form-group">
          <label className="form-label">Campaign Live Date</label>
          <input
            className="form-control"
            type="date"
            placeholder="Live date"
            value={formData.campaignLiveDate}
            onChange={(e) => {
              setFormData({ ...formData, campaignLiveDate: e.target.value });
            }}
          />
        </div>
      </Col>
      <Col md="6">
        <div className="form-group">
          <label className="form-label">Artwork Due Date</label>
          <input className="form-control" type="date" placeholder="Due date" value={artworkDueDate} disabled />
        </div>
      </Col>
      <Col size="12">
        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
          <li>
            <Button
              color="primary"
              size="md"
              onClick={() => {
                //save data
                navigate("/");
              }}
            >
              Back
            </Button>
          </li>
          <li>
            <Button color="primary" size="md" onClick={handleSubmit}>
              Next
            </Button>
          </li>
        </ul>
      </Col>
    </div>
  );
};

export default CampaignInfo;
