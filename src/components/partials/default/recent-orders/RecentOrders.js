import React, { useState, useEffect, useContext } from "react";
import { Card, Badge } from "reactstrap";
import { DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../../Component";
import { getRecentCampaignList } from "../../../../utils/Api";
import { AuthContext } from "../../../../context/AuthContext";
const RecentOrders = () => {
  const auth = useContext(AuthContext);
  const [recentOrderData, setRecentOrderData] = useState([]);
  useEffect(() => {
    getRecentCampaignList(auth?.token).then((res) => {
      if (res) {
        setRecentOrderData([...res?.data?.campaignList]);
      }
    });
  }, [auth?.token]);

  console.log("recent data", recentOrderData);
  return (
    <Card className="card-full">
      <div className="card-inner">
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Recent Campaigns</h6>
          </div>
        </div>
      </div>
      <div className="nk-tb-list mt-n2">
        <DataTableHead>
          <DataTableRow>
            <span>Job No.</span>
          </DataTableRow>
          <DataTableRow size="sm">
            <span>Promotion Name</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span>Due Date</span>
          </DataTableRow>
          <DataTableRow>
            <span>Project Lead</span>
          </DataTableRow>
          <DataTableRow>
            <span className="d-none d-sm-inline">Status</span>
          </DataTableRow>
        </DataTableHead>
        {recentOrderData.map((item, idx) => (
          <DataTableItem key={idx}>
            <DataTableRow>
              <span className="tb-lead">
                <a href="#order" onClick={(ev) => ev.preventDefault()}>
                  #{item.jobNumber}
                </a>
              </span>
            </DataTableRow>
            <DataTableRow size="sm">
              <div className="user-name">
                {/* <UserAvatar className="sm" theme={item.theme} text={item.initial} image={item.img}></UserAvatar> */}
                {/* <div className="user-name"> */}
                <span className="tb-lead">{item.promotionName}</span>
                {/* </div> */}
              </div>
            </DataTableRow>
            <DataTableRow size="md">
              <span className="tb-sub">{item.campaignLiveDate}</span>
            </DataTableRow>
            <DataTableRow>
              <span className="tb-sub tb-amount">{item.projectLead}</span>
            </DataTableRow>
            <DataTableRow>
              <Badge
                className="badge-dot badge-dot-xs"
                color={item.status === "Paid" ? "success" : item.status === "Pending" ? "warning" : "danger"}
              >
                {item.status}
              </Badge>
            </DataTableRow>
          </DataTableItem>
        ))}
      </div>
    </Card>
  );
};
export default RecentOrders;
