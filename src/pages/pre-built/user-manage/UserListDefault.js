import React, { useContext, useEffect, useState } from "react";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem, Spinner } from "reactstrap";
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
} from "../../../components/Component";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { filterStatus } from "./UserData";
import { findUpper } from "../../../utils/Utils";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import { getUsers } from "../../../utils/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserListDefaultPage = () => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const fetchUsers = async () => {
    try {
      const res = await getUsers(auth.token);
      console.log(res.data.data);
      setData([...res.data.data.userList]);
      setUserCount(res.data.data.totalUsers);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUsers();
  }, []);
  const [sm, updateSm] = useState(false);
  const [onSearchText] = useState("");

  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    balance: 0,
    phone: "",
    status: "Active",
    role: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    balance: 0,
    phone: "",
    status: "",
    role: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  // unselects the data on mount
  useEffect(() => {
    let newData;
    if (data) {
      newData = data.map((item) => {
        item.checked = false;
        return item;
      });
      setData([...newData]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.email.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      // setData([...filteredObject]);
    } else {
      // setData([...userData]);
    }
  }, [onSearchText, setData]);

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item._id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
    console.log("newData", newData);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      balance: 0,
      phone: "",
      status: "Active",
      role: "",
    });
  };

  const closeModal = () => {
    setModal({ add: false });
    resetForm();
  };

  const closeEditModal = () => {
    setModal({ edit: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    const { name, email, balance, phone } = submitData;
    let submittedData = {
      id: data.length + 1,
      avatarBg: "purple",
      name: name,
      role: "Customer",
      email: email,
      balance: balance,
      phone: phone,
      emailStatus: "success",
      kycStatus: "alert",
      lastLogin: "10 Feb 2020",
      status: formData.status,
      country: "Bangladesh",
    };
    setData([submittedData, ...data]);
    resetForm();
    setModal({ edit: false }, { add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (submitData) => {
    const { name, email, phone } = submitData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item._id === editId) {
        submittedData = {
          _id: item._id,
          avatarBg: item.avatarBg,
          name: name,
          role: editFormData.role,
          email: email,
          phone: phone,
          status: editFormData.status,
        };
      }
    });
    let index = newitems.findIndex((item) => item._id === editId);
    newitems[index] = submittedData;
    setModal({ edit: false });
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item._id === id) {
        setEditFormData({
          name: item.userName,
          email: item.email,
          status: item.status,
          phone: item.phoneNo,
          role: item.role,
        });
        setModal({ edit: true }, { add: false });
        setEditedId(id);
      }
    });
  };

  // function to change to suspend property for an item
  const suspendUser = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item._id === id);
    newData[index].status = "Suspend";
    setData([...newData]);
  };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data?.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // function to delete the seletected item
  const selectorDeleteUser = () => {
    let newData;
    newData = data.filter((item) => item.checked !== true);
    setData([...newData]);
  };

  // function to change the complete property of an item
  //Change this function to activate or deactivate user status
  const selectorSuspendUser = () => {
    let newData;
    newData = data?.map((item) => {
      if (item.checked === true) item.status = "Suspend";
      return item;
    });
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  //const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log("data", data);

  return (
    <React.Fragment>
      {/* <ToastContainer /> */}
      <Head title="User List - Default"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent style={{ marginTop: "65px" }}>
              <BlockTitle tag="h3" page>
                Users Lists
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>You have total {userCount} users.</p>
              </BlockDes>
            </BlockHeadContent>
            {/* <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <Button color="light" outline className="btn-white">
                        <Icon name="download-cloud"></Icon>
                        <span>Export</span>
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                        <Icon name="plus"></Icon>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent> */}
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              <DataTableRow className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                  <input type="checkbox" className="custom-control-input" onChange={(e) => selectorCheck(e)} id="uid" />
                  <label className="custom-control-label" htmlFor="uid"></label>
                </div>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">User</span>
              </DataTableRow>
              {/* <DataTableRow size="mb">
                <span className="sub-text">Ordered</span>
              </DataTableRow> */}
              <DataTableRow size="md">
                <span className="sub-text">Phone</span>
              </DataTableRow>
              {/* <DataTableRow size="lg">
                <span className="sub-text">Country</span>
              </DataTableRow> */}
              <DataTableRow size="lg">
                <span className="sub-text">Role</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Status</span>
              </DataTableRow>
              <DataTableRow className="nk-tb-col-tools text-end">
                <UncontrolledDropdown>
                  <DropdownToggle color="tranparent" className="dropdown-toggle btn btn-icon btn-trigger me-n1">
                    <Icon name="more-h"></Icon>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <ul className="link-list-opt no-bdr">
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#"
                          onClick={(ev) => {
                            ev.preventDefault();
                            selectorDeleteUser();
                          }}
                        >
                          <Icon name="na"></Icon>
                          <span>Remove Selected</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#"
                          onClick={(ev) => {
                            ev.preventDefault();
                            selectorSuspendUser();
                          }}
                        >
                          <Icon name="trash"></Icon>
                          <span>Suspend Selected</span>
                        </DropdownItem>
                      </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </DataTableRow>
            </DataTableHead>
            {/*Head*/}
            {data?.length > 0
              ? data?.map((item) => (
                  <DataTableItem key={item._id}>
                    <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          defaultChecked={item.checked}
                          id={item._id + "uid1"}
                          key={Math.random()}
                          onChange={(e) => onSelectChange(e, item._id)}
                        />
                        <label className="custom-control-label" htmlFor={item._id + "uid1"}></label>
                      </div>
                    </DataTableRow>
                    <DataTableRow>
                      <Link to={`${process.env.PUBLIC_URL}/user-details-regular/${item._id}`}>
                        <div className="user-card">
                          <UserAvatar theme={item.avatarBg} text={findUpper(item.userName)}></UserAvatar>
                          <div className="user-info">
                            <span className="tb-lead">
                              {item.userName} <span className="dot dot-success d-md-none ms-1"></span>
                            </span>
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </Link>
                    </DataTableRow>
                    {/* <DataTableRow size="mb">
                      <span className="tb-amount">
                        {item.balance} <span className="currency">USD</span>
                      </span>
                    </DataTableRow> */}
                    <DataTableRow size="md">
                      <span>{item.phoneNo}</span>
                    </DataTableRow>
                    {/* <DataTableRow size="lg">
                      <span>{item.country}</span>
                    </DataTableRow> */}
                    <DataTableRow size="lg">
                      <span>{item.role}</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span
                        className={`tb-status text-${
                          item.status === "activated" ? "success" : item.status === "deactivated" ? "warning" : "danger"
                        }`}
                      >
                        {item.status}
                      </span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1">
                        <li className="nk-tb-action-hidden" onClick={() => onEditClick(item._id)}>
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"edit" + item._id}
                            icon="edit-alt-fill"
                            direction="top"
                            text="Edit"
                          />
                        </li>
                        {item.status !== "Suspend" && (
                          <React.Fragment>
                            <li className="nk-tb-action-hidden" onClick={() => suspendUser(item._id)}>
                              <TooltipComponent
                                tag="a"
                                containerClassName="btn btn-trigger btn-icon"
                                id={"suspend" + item._id}
                                icon="user-cross-fill"
                                direction="top"
                                text="Suspend"
                              />
                            </li>
                          </React.Fragment>
                        )}
                        <li>
                          <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu end>
                              <ul className="link-list-opt no-bdr">
                                <li onClick={() => onEditClick(item._id)}>
                                  <DropdownItem
                                    tag="a"
                                    href="#edit"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                    }}
                                  >
                                    <Icon name="edit"></Icon>
                                    <span>Edit</span>
                                  </DropdownItem>
                                </li>
                                {item.status !== "Suspend" && (
                                  <React.Fragment>
                                    <li className="divider"></li>
                                    <li onClick={() => suspendUser(item._id)}>
                                      <DropdownItem
                                        tag="a"
                                        href="#suspend"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="na"></Icon>
                                        <span>Suspend User</span>
                                      </DropdownItem>
                                    </li>
                                  </React.Fragment>
                                )}
                              </ul>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                      </ul>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>
          <PreviewAltCard>
            {data?.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data?.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : isLoading ? (
              <div className="text-center">
                <Spinner type="grow" />
              </div>
            ) : (
              <div className="text-center">
                <span className="text-silent">No data found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        {/* <AddModal
          modal={modal.add}
          formData={formData}
          setFormData={setFormData}
          closeModal={closeModal}
          onSubmit={onFormSubmit}
          filterStatus={filterStatus}
        /> */}
        <EditModal
          modal={modal.edit}
          formData={editFormData}
          setFormData={setEditFormData}
          closeModal={closeEditModal}
          onSubmit={onEditSubmit}
          filterStatus={filterStatus}
        />
      </Content>
    </React.Fragment>
  );
};
export default UserListDefaultPage;
