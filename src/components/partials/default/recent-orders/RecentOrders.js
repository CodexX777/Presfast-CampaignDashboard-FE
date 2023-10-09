import React, { useState, useEffect, useContext } from "react";
import { Card, Badge } from "reactstrap";
import { DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../../Component";
import { getRecentCampaignList } from "../../../../utils/Api";
import { AuthContext } from "../../../../context/AuthContext";
import { Spinner } from "reactstrap";
const RecentOrders = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [recentOrderData, setRecentOrderData] = useState([]);
  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const result = await getRecentCampaignList(auth?.token);
      if (result) {
        setRecentOrderData([...result?.data?.campaignList]);
      }
      setIsLoading(false);
    };
    fetchData();

    // getRecentCampaignList(auth?.token).then((res) => {
    //   if (res) {
    //     setRecentOrderData([...res?.data?.campaignList]);
    //   }
    //   setIsLoading(false);
    // });
  }, []);

  console.log("recent data", recentOrderData);
  return (
    <div>
      <Card className="card-full">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Recent Campaigns</h6>
              {/* {isLoading && (
                <div>
                  <Spinner
                    type="grow"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                    }}
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="text-center">
            <Spinner type="grow" />
          </div>
        )}
        {!isLoading && (
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

            {!isLoading &&
              recentOrderData.map((item, idx) => (
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
        )}
      </Card>
    </div>
  );
};
export default RecentOrders;
