import React, {useEffect, useState} from 'react'
import { useFileManager, useFileManagerUpdate } from "../components/Context";
import { Block, Icon, UserAvatar } from "../../../../components/Component";
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane,  Card, Button, Badge, Modal  } from "reactstrap";
import data from "../Data"
import { findUpper } from "../../../../utils/Utils";
import ProfileUpdate from "../modals/ProfileUpdate";
import classnames from 'classnames';

const Settings = () => {
  
  const urlParams = new URLSearchParams(window.location.search);
  let tabValue = urlParams.get('tab') === null ? "general" : urlParams.get('tab').toString();

  const [activeTab, setActiveTab] = useState(tabValue);
  const {fileManager} = useFileManager();
  const {fileManagerUpdate} = useFileManagerUpdate();

  useEffect(() => {
    setActiveTab(tabValue);
  }, [tabValue]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "Abu Bin Ishtiak",
    displayName: "Ishtiak",
    email: "info@softnio.com",
    phone: "",
    dob: "1980-08-10",
    language: data.languageOptions[0].value,
    dateFormat: data.dateFormat[0].value,
    timezone: data.timezoneFormat[0].value,
  });

  return (
    <>
      <Nav tabs className="nk-nav">
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === "general" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle("general");
            }}
          >
            General
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === "billing" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle("billing");
            }}
          >
            Billing
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="mt-0" activeTab={activeTab}>
        <TabPane tabId="general">
          <Block size="xs" className="pt-0">
            <div className="user-card user-card-md py-md-5 py-4">
              <UserAvatar size="md" text={findUpper(formData.name)}>
                <a href="#edit" onClick={(ev) => ev.preventDefault()} className="edit edit-upload">
                  <Icon name="img"></Icon>
                </a>
              </UserAvatar>
              <div className="user-info">
                <span className="lead-text">
                  {formData.displayName}
                  <a
                    href="#edit"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setModal(true);
                    }}
                    className="edit"
                  >
                    <Icon name="pen2"></Icon>
                  </a>
                </span>
                <span className="sub-text">
                  {formData.email}
                  <a
                    href="#edit"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setModal(true);
                    }}
                    className="edit"
                  >
                    <Icon name="pen2"></Icon>
                  </a>
                </span>
              </div>
            </div>
            <div className="user-plan-wrap">
              <div className="nk-block-subhead">
                <h6 className="overline-title">Subscription Plan</h6>
              </div>
              <div className="user-plan">
                <div className="user-plan-info">
                  <div className="user-plan-title">
                    <Icon name="hard-drive"></Icon> <span>{fileManager.data.plans.find((item) => item.id === fileManager.currentPlan).title} plan</span>
                  </div>
                  <div className="user-plan-status">
                  12.47 GB / {fileManager.data.plans.find((item) => item.id === fileManager.currentPlan).memory} GB
                  </div>
                </div>
                <div className="user-plan-actions">
                  <ul className="btn-toolbar align-center g-4">
                    <li className="order-2 order-sm-1">
                      <a href="#" className="link link-primary" 
                      onClick={(ev) => {
                        ev.preventDefault();
                        toggle("billing");
                      }} >
                        See all plans
                      </a>
                    </li>
                    <li className="order-1 order-sm-2">
                      <a href="#" className="btn btn-sm btn-primary"
                      onClick={(ev) => {
                        ev.preventDefault();
                        toggle("billing");
                      }} >
                        Upgrade
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="user-plan-progress">
                  <div className="progress progress-md bg-light">
                    <div
                      className="progress-bar"
                      style={{ width: `${1200 / fileManager.data.plans.find((item) => item.id === fileManager.currentPlan).memory}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nk-data data-list">
              <div className="data-head">
                <h6 className="overline-title">Personal Basic</h6>
              </div>
              <div className="data-item">
                <div className="data-col">
                  <span className="data-label">Recovery Email</span>
                  <span className="data-value">{formData.email}</span>
                </div>
                <div className="data-col data-col-end">
                  <a
                    href="#edit"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setModal(true);
                    }}
                    className="link link-primary"
                  >
                    Edit
                  </a>
                </div>
              </div>
              <div className="data-item">
                <div className="data-col">
                  <span className="data-label">Phone Number</span>
                  <span className="data-value">{formData.phone}</span>
                </div>
                <div className="data-col data-col-end">
                  <a
                    href="#edit"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setModal(true);
                    }}
                    className="link link-primary"
                  >
                    Add number
                  </a>
                </div>
              </div>
              <div className="data-item">
                <div className="data-col">
                  <span className="data-label">Date of birth</span>
                  <span className="data-value">{formData.dob}</span>
                </div>
                <div className="data-col data-col-end">
                  <a
                    href="#edit"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setModal(true);
                    }}
                    className="link link-primary"
                  >
                    Change
                  </a>
                </div>
              </div>
            </div>
            <div className="nk-data data-list">
              <div className="data-head">
                <h6 className="overline-title">Preferences</h6>
              </div>
              <div className="data-item">
                <div className="data-col">
                  <span className="data-label">Language</span>
                  <span className="data-value">{formData.language}</span>
                </div>
                <div className="data-col data-col-end">
                  <a
                    href="#edit"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setModal(true);
                    }}
                    className="link link-primary"
                  >
                    Change Language
                  </a>
                </div>
              </div>
              <div className="data-item">
                <div className="data-col">
                  <span className="data-label">Date Format</span>
                  <span className="data-value">{formData.dateFormat}</span>
                </div>
                <div className="data-col data-col-end">
                  <a
                    href="#edit"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setModal(true);
                    }}
                    className="link link-primary"
                  >
                    Change
                  </a>
                </div>
              </div>
              <div className="data-item">
                <div className="data-col">
                  <span className="data-label">Timezone</span>
                  <span className="data-value">{formData.timezone}</span>
                </div>
                <div className="data-col data-col-end">
                  <a
                    href="#edit"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setModal(true);
                    }}
                    className="link link-primary"
                  >
                    Change
                  </a>
                </div>
              </div>
            </div>
          </Block>
        </TabPane>
        <TabPane tabId="billing">
          <Block size="xs" className="pt-5">
            <Row className="g-gs">
              {fileManager.data.plans.map((item) => {
                return (
                  <Col md={6} xxl={3} key={item.id}>
                    <Card
                      className={`card-bordered pricing text-center ${item.tags ? "recommend" : ""} ${
                        fileManager.currentPlan === item.id ? "border-primary" : ""
                      }`}
                    >
                      {fileManager.currentPlan === item.id && (
                        <Badge color="primary" className="pricing-badge">
                          Current Plan
                        </Badge>
                      )}
                      <div className="pricing-body">
                        <div className="pricing-media">
                          <img src={item.logo} alt="" />
                        </div>
                        <div className="pricing-title w-max-220px mx-auto">
                          <h5 className="title">{item.title}</h5>
                          <span className="sub-text">{item.desc}</span>
                        </div>
                        <div className="pricing-amount">
                          <div className="amount">
                            ${item.amount} <span>/yr</span>
                          </div>
                          <span className="bill">{item.userNumber} User, Billed Yearly</span>
                        </div>
                        <div className="pricing-action">
                          {fileManager.currentPlan === item.id ? (
                            <Button color="primary">Plan Selected</Button>
                          ) : (
                            <Button color="light" onClick={(ev) => {
                              ev.preventDefault();
                              fileManagerUpdate.currentPlan(item.id);
                            }}>
                              Choose Plan
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Block>
        </TabPane>
      </TabContent>
      <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
        <ProfileUpdate formData={formData} setFormData={setFormData} setModal={setModal}></ProfileUpdate>
      </Modal>
    </>
  )
}

export default Settings