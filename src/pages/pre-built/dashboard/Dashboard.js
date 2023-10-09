import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import React, { useState } from "react";
import RecentOrders from "../../../components/partials/default/recent-orders/RecentOrders";
import { useNavigate } from "react-router";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
} from "../../../components/Component";

const Dashboard = () => {
  const [sm, updateSm] = useState(false);
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <Button
                        color="primary"
                        onClick={() => {
                          navigate("/past-campaigns");
                        }}
                      >
                        <Icon name="reports" />
                        <span>View past campaigns</span>
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        color="primary"
                        onClick={() => {
                          navigate("/create-campaign");
                        }}
                      >
                        <Icon name="reports" />
                        <span>Create Campaign</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col xxl="12">
              <RecentOrders />
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Dashboard;
