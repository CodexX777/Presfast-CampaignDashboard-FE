import React, { useEffect, useState, useContext } from "react";

import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
  PreviewAltCard,
} from "../../../../components/Component";
import { Badge } from "reactstrap";
import { AuthContext } from "../../../../context/AuthContext";
import { getCampaignData } from "../../../../utils/Api";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
const OrderDetails = () => {
  const campaignId = useParams().id;
  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState({});
  //   console.log("selectedProducts", selectedProducts);

  useEffect(() => {
    if (campaignId) {
      const fetchOrderDetails = async () => {
        const response = await getCampaignData(auth?.token, campaignId);
        console.log("order details", response.data.campaignData[0]);
        setCampaignData(response.data.campaignData[0]);
      };
      fetchOrderDetails();
    }
  }, [campaignId]);

  return (
    <div className="p-4 mt-4">
      <div className="nk-tb-list is-separate is-medium mb-3" style={{ marginTop: "55px" }}>
        <div>
          <h6>Campaign Name</h6>
          <div>
            <p>Campaign Name: {campaignData.promotionName}</p>
          </div>
          <div>
            <p>Job Number: {campaignData.jobNumber}</p>
          </div>
          <div>
            <p>Campaign Live Date: {campaignData.campaignLiveDate}</p>
          </div>
          <div>
            <p>Project Lead: {campaignData.projectLead}</p>
          </div>
          <div>
            <p>Status: {campaignData.status}</p>
          </div>
        </div>
        <h6 style={{marginTop:"20px"}}>Campaign Summary</h6>
        <DataTableHead className="nk-tb-item">
          <DataTableRow>
            <span className="sub-text">Material</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Key Number</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Campaign Region</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Store Type</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Quantity Per Store</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Extra Quantity Per Store</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Art-work due date </span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Upload Artwork</span>
          </DataTableRow>
        </DataTableHead>

        {campaignData.orderData?.length > 0
          ? campaignData.orderData?.map((item) => (
              <DataTableItem key={item._id + item.presfastItem?._id}>
                <DataTableRow>
                  <div className="user-card" style={{ width: "180px" }}>
                    {/* <img
                      src={item?.prodImages?.length > 0 ? item?.prodImages[0] : ""}
                      alt={item.prodName}
                      style={{ width: "50px", height: "50px" }}
                    /> */}
                    <div className="user-info" style={{ marginLeft: "10px" }}>
                      <span className="tb-lead">
                        {item.hjProduct?.prodName} <span className="dot dot-success d-md-none ms-1"></span>
                      </span>
                      <span>{item.presfastItem?.prodName}</span>
                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">
                    <div className="form-control-wrap" style={{ maxWidth: "100px", wordWrap: "break-word" }}>
                      {item.keyNumber}
                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">
                    <div
                      className="form-control-wrap"
                      style={{ width: "120px", display: "flex", gap: "0.7rem", flexWrap: "wrap" }}
                    >
                      {item.selectedRegions.map((region) => (
                        <Badge pill color="outline-secondary">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">
                    <div
                      className="form-control-wrap"
                      style={{ width: "120px", display: "flex", gap: "0.7rem", flexWrap: "wrap" }}
                    >
                      {item.selectedStoreTypes.map((type) => (
                        <Badge pill color="outline-secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">{item.quantityPerStore}</div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">{item.extraQuantityPerStore}</div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">{campaignData.dueDate}</div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group"></div>
                </DataTableRow>
              </DataTableItem>
            ))
          : null}
      </div>
    </div>
  );
};

export default OrderDetails;
