import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Card, Modal, ModalBody, Badge } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Row,
  OverlineTitle,
  Sidebar,
  UserAvatar,
} from "../../../components/Component";
import { useNavigate } from "react-router-dom";
import { currentTime, findUpper, monthNames, todaysDate } from "../../../utils/Utils";

import { notes } from "../user-manage/UserData";
import { UserContext } from "../user-manage/UserContext";
import { getIndividualStore } from "../../../utils/Api";


const StoreDetailsPage = () => {

  const [sideBar, setSidebar] = useState(false);
  const [user, setUser] = useState();
  const [noteData, setNoteData] = useState(notes);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [addNoteText, setAddNoteText] = useState("");
  const [storeData, setStoreData] = useState(null);
  const navigate = useNavigate();

  let { storeId } = useParams();

  // grabs the id of the url and loads the corresponding data

    const fetchStore = async () => {
    try {
      const res = await getIndividualStore(storeId);
      setStoreData(res.data.data.storeData);
      
    } catch (error) {
      
    }
  };

  useEffect(() => {
      fetchStore();
  }, []);


  // function to toggle sidebar
  const toggle = () => {
    setSidebar(!sideBar);
  };

  useEffect(() => {
    sideBar ? document.body.classList.add("toggle-shown") : document.body.classList.remove("toggle-shown");
  }, [sideBar])

  // delete a note
  const deleteNote = (id) => {
    let defaultNote = noteData;
    defaultNote = defaultNote.filter((item) => item.id !== id);
    setNoteData(defaultNote);
  };

  const submitNote = () => {
    let submitData = {
      id: Math.random(),
      text: addNoteText,
      date: `${monthNames[todaysDate.getMonth()]} ${todaysDate.getDate()}, ${todaysDate.getFullYear()}`,
      time: `${currentTime()}`,
      company: "Softnio",
    };
    setNoteData([...noteData, submitData]);
    setAddNoteModal(false);
    setAddNoteText("");
  };


//   jacksCafe
// : 
// "No"
// storeAddress
// : 
// "9/441 Nudgee Rd"
// storeCity
// : 
// "HENDRA"
// storeLandmark
// : 
// ""
// storeName
// : 
// "Hungry Jacks HENDRA"
// storeNumber
// : 
// "1000"
// storePostCode
// : 
// "4011"
// storeRegion
// : 
// "QLD STH"
// storeType
// : 
// "1DT"

  return (
    <>
      <Head title="User Details - Regular"></Head>
      {storeData && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Stores / <strong className="text-primary small">{storeData.storeName?storeData.storeName:""}</strong>
                </BlockTitle>
                <BlockDes className="text-soft">
                  <ul className="list-inline">
                    <li>
                      Store Number: <span className="text-base">{storeData.storeNumber?storeData.storeNumber:""}</span>
                    </li>
                  </ul>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Button
                  color="light"
                  outline
                  className="bg-white d-none d-sm-inline-flex"
                  onClick={() => navigate(-1)}
                >
                  <Icon name="arrow-left"></Icon>
                  <span>Back</span>
                </Button>
                <a
                  href="#back"
                  onClick={(ev) => {
                    ev.preventDefault();
                    navigate(-1);
                  }}
                  className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"
                >
                  <Icon name="arrow-left"></Icon>
                </a>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <Card>
              <div className="card-aside-wrap" id="user-detail-block">
                <div className="card-content">
                

                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">Store Information</BlockTitle>
                        <p>Basic info of Store.</p>
                      </BlockHead>
                      <div className="profile-ud-list">
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Store Name</span>
                            <span className="profile-ud-value">{storeData.storeName?storeData.storeName:"-"}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Store Number</span>
                            <span className="profile-ud-value">{storeData.storeNumber?storeData.storeNumber:"-"}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Store Address</span>
                            <span className="profile-ud-value">{storeData.storeAddress?storeData.storeAddress:"-"}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">City</span>
                            <span className="profile-ud-value">{storeData.storeCity?storeData.storeCity:"-"}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Landmark</span>
                            <span className="profile-ud-value">{storeData.storeLandmark?storeData.storeLandmark:"-"}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Postal Code</span>
                            <span className="profile-ud-value">{storeData.storePostCode?storeData.storePostCode:"-"}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Region</span>
                            <span className="profile-ud-value">{storeData.storeRegion?storeData.storeRegion:"-"}</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Type</span>
                            <span className="profile-ud-value">{storeData.storeType?storeData.storeType:"-"}</span>
                          </div>
                        </div>
                      </div>
                    </Block>

                   

                   
                  </div>
                </div>

                <Modal
                  isOpen={addNoteModal}
                  toggle={() => setAddNoteModal(false)}
                  className="modal-dialog-centered"
                  size="lg"
                >
                  <ModalBody>
                    <a
                      href="#cancel"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setAddNoteModal(false);
                        setAddNoteText("");
                      }}
                      className="close"
                    >
                      <Icon name="cross-sm"></Icon>
                    </a>
                    <div className="p-2">
                      <h5 className="title">Add Admin Note</h5>
                      <div className="mt-4 mb-4">
                        <textarea
                          defaultValue={addNoteText}
                          className="form-control no-resize"
                          onChange={(e) => setAddNoteText(e.target.value)}
                        />
                      </div>
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                          <Button color="primary" size="md" type="submit" onClick={submitNote}>
                            Add Note
                          </Button>
                        </li>
                        <li>
                          <Button onClick={() => setAddNoteModal(false)} className="link link-light">
                            Cancel
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </ModalBody>
                </Modal>

                <Sidebar toggleState={sideBar}>
                  <div className="card-inner">
                    <div className="user-card user-card-s2 mt-5 mt-xxl-0">
                      <UserAvatar className="lg" theme="primary"  />
                      <div className="user-info">
                        <Badge color="outline-light" pill className="ucap"></Badge>
                        <h5>Name</h5>
                        <span className="sub-text">Email</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-inner card-inner-sm">
                    <ul className="btn-toolbar justify-center gx-1">
                      <li>
                        <Button
                          href="#tool"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="btn-trigger btn-icon"
                        >
                          <Icon name="shield-off"></Icon>
                        </Button>
                      </li>
                      <li>
                        <Button
                          href="#mail"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="btn-trigger btn-icon"
                        >
                          <Icon name="mail"></Icon>
                        </Button>
                      </li>
                      <li>
                        <Button
                          href="#download"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="btn-trigger btn-icon"
                        >
                          <Icon name="download-cloud"></Icon>
                        </Button>
                      </li>
                      <li>
                        <Button
                          href="#bookmark"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="btn-trigger btn-icon"
                        >
                          <Icon name="bookmark"></Icon>
                        </Button>
                      </li>
                      <li>
                        <Button
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="btn-trigger btn-icon text-danger"
                        >
                          <Icon name="na"></Icon>
                        </Button>
                      </li>
                    </ul>
                  </div>
                  <div className="card-inner">
                    <div className="overline-title-alt mb-2">In Account</div>
                    <div className="profile-balance">
                      <div className="profile-balance-group gx-4">
                        <div className="profile-balance-sub">
                          <div className="profile-balance-amount">
                            <div className="number">
                              2,500.00 <small className="currency currency-usd">USD</small>
                            </div>
                          </div>
                          <div className="profile-balance-subtitle">Invested Amount</div>
                        </div>
                        <div className="profile-balance-sub">
                          <span className="profile-balance-plus text-soft">
                            <Icon className="ni-plus"></Icon>
                          </span>
                          <div className="profile-balance-amount">
                            <div className="number">1,643.76</div>
                          </div>
                          <div className="profile-balance-subtitle">Profit Earned</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-inner">
                    <Row className="text-center">
                      <Col size="4">
                        <div className="profile-stats">
                          <span className="amount">user Task</span>
                          <span className="sub-text">Total Order</span>
                        </div>
                      </Col>
                      <Col size="4">
                        <div className="profile-stats">
                          <span className="amount">Projects</span>
                          <span className="sub-text">Complete</span>
                        </div>
                      </Col>
                      <Col size="4">
                        <div className="profile-stats">
                          <span className="amount">performed</span>
                          <span className="sub-text">Progress</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="card-inner">
                    <h6 className="overline-title-alt mb-2">Additional</h6>
                    <Row className="g-3">
                      <Col size="6">
                        <span className="sub-text">User ID:</span>
                        <span>UD003054</span>
                      </Col>
                      <Col size="6">
                        <span className="sub-text">Last Login:</span>
                        <span> 01:02 PM</span>
                      </Col>
                      <Col size="6">
                        <span className="sub-text">KYC Status:</span>
                        <span
                          className={`lead-text text-success`}
                        >
                          
                        </span>
                      </Col>
                      <Col size="6">
                        <span className="sub-text">Register At:</span>
                        <span>Nov 24, 2019</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="card-inner">
                    <OverlineTitle tag="h6" className="mb-3">
                      Groups
                    </OverlineTitle>
                    <ul className="g-1">
                      <li className="btn-group">
                        <Button
                          color="light"
                          size="xs"
                          className="btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          investor
                        </Button>
                        <Button
                          color="light"
                          size="xs"
                          className="btn-icon btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          <Icon className="ni-cross"></Icon>
                        </Button>
                      </li>
                      <li className="btn-group">
                        <Button
                          color="light"
                          size="xs"
                          className="btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          support
                        </Button>
                        <Button
                          color="light"
                          size="xs"
                          className="btn-icon btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          <Icon className="ni-cross"></Icon>
                        </Button>
                      </li>
                      <li className="btn-group">
                        <Button
                          color="light"
                          size="xs"
                          className="btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          another tag
                        </Button>
                        <Button
                          color="light"
                          size="xs"
                          className="btn-icon btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          <Icon className="ni-cross"></Icon>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </Sidebar>
                {sideBar && <div className="toggle-overlay" onClick={() => toggle()}></div>}
              </div>
            </Card>
          </Block>
        </Content>
   )}
    </>
  );
};
export default StoreDetailsPage;

