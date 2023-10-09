import React, { useState, useEffect, useContext } from "react";
import { Card, Badge } from "reactstrap";
import {
  DataTableHead,
  DataTableRow,
  DataTableItem,
  UserAvatar,
  PaginationComponent,
  PreviewAltCard,
} from "../../../Component";
import { getCampaignList } from "../../../../utils/Api";
import { AuthContext } from "../../../../context/AuthContext";
import { Block } from "../../../Component";
const PastCampaign = () => {
  const auth = useContext(AuthContext);
  const [campaignData, setCampaignData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  useEffect(() => {
    getCampaignList(auth?.token).then((res) => {
      if (res) {
        setCampaignData([...res?.data?.campaignList]);
      }
    });
  }, [auth?.token]);

  //   console.log("recent data", recentOrderData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = campaignData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ marginTop: "65px" }}>
      <Block className="m-4 p-4">
        <Card className="card-full mt-4">
          <div className="card-inner">
            <div className="card-title-group">
              <div className="card-title">
                <h6 className="title">Previous Campaigns</h6>
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
            {currentItems.map((item, idx) => (
              <DataTableItem key={item.jobNumber}>
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
        <PreviewAltCard>
          {campaignData?.length > 0 ? (
            <PaginationComponent
              itemPerPage={itemsPerPage}
              totalItems={campaignData?.length}
              paginate={setCurrentPage}
              currentPage={currentPage}
            />
          ) : (
            <div className="text-center">
              <span className="text-silent">No data found</span>
            </div>
          )}
        </PreviewAltCard>
      </Block>
    </div>
  );
};
export default PastCampaign;
