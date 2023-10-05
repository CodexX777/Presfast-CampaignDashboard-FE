import React, { useContext, useEffect, useState } from "react";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from "reactstrap";
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
// let userList = [
//   {
//     id: 1,
//     avatarBg: "purple",
//     name: "Abu Bin Ishtiyak",
//     displayName: "Ishtiak",
//     dob: "10 Aug, 1980",
//     role: "Customer",
//     checked: false,
//     email: "info@softnio.com",
//     phone: "818474958",
//     lastLogin: "10 Feb 2020",
//     status: "Active",
//     designation: "UI/UX Designer",
//   },
//   {
//     id: 2,
//     avatarBg: "purple",
//     image:
//       "data:image/jpeg;base64,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",
//     name: "Ashley Lawson",
//     dob: "10 Sept, 1990",
//     role: "Investor",
//     email: "ashley@softnio.com",
//     balance: "580.00",
//     checked: false,
//     phone: "1243941787",
//     emailStatus: "success",
//     kycStatus: "pending",
//     lastLogin: "07 Feb 2020",
//     status: "Pending",
//     country: "United States",
//     designation: "UI/UX Designer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 3,
//     avatarBg: "info",
//     name: "Joe Larson",
//     dob: "19 Jan, 1985",
//     role: "Customer",
//     email: "larson@example.com",
//     balance: "32000.34",
//     checked: false,
//     phone: "1686032320",
//     emailStatus: "success",
//     kycStatus: "success",
//     lastLogin: "04 Feb 2020",
//     status: "Active",
//     country: "England",
//     designation: "UI/UX Designer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 4,
//     avatarBg: "danger",
//     name: "Jane Montgomery",
//     dob: "24 April, 1985",
//     role: "Subscriber",
//     email: "jane84@example.com",
//     balance: "0.00",
//     checked: false,
//     phone: "4392715360",
//     emailStatus: "alert",
//     kycStatus: "alert",
//     lastLogin: "01 Feb 2020",
//     status: "Suspend",
//     country: "United States",
//     designation: "UI/UX Designer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 5,
//     avatarBg: "purple",
//     name: "Frances Burns",
//     dob: "30 May, 2000",
//     role: "Manager",
//     image:
//       "data:image/jpeg;base64,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",
//     email: "frances@example.com",
//     balance: "42.50",
//     checked: false,
//     phone: "6391303150",
//     emailStatus: "pending",
//     kycStatus: "error",
//     lastLogin: "31 Jan 2020",
//     status: "Active",
//     country: "Bangladesh",
//     designation: "UI/UX Designer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 6,
//     avatarBg: "primary",
//     name: "Alan Butler",
//     dob: "10 Feb, 1997",
//     role: "Investor",
//     image:
//       "data:image/jpeg;base64,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",
//     email: "butler@example.com",
//     balance: "440.34",
//     checked: false,
//     phone: "9633091706",
//     emailStatus: "pending",
//     kycStatus: "warning",
//     lastLogin: "18 Jan 2020",
//     status: "Inactive",
//     country: "India",
//     designation: "UI/UX Designer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 7,
//     avatarBg: "warning",
//     name: "Victoria Lynch",
//     dob: "02 May, 1993",
//     role: "Investor",
//     email: "victoria@example.com",
//     balance: "59400.68",
//     checked: false,
//     phone: "8119854846",
//     emailStatus: "success",
//     kycStatus: "success",
//     lastLogin: "15 Jan 2020",
//     status: "Active",
//     country: "China",
//     designation: "UI/UX Designer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 8,
//     avatarBg: "success",
//     name: "Patrick Newman",
//     dob: "15 Feb, 1997",
//     role: "Customer",
//     email: "patrick@example.com",
//     balance: "30.00",
//     checked: false,
//     phone: "9422384474",
//     emailStatus: "success",
//     kycStatus: "pending",
//     lastLogin: "08 Jan 2020",
//     status: "Active",
//     country: "India",
//     designation: "UI/UX Designer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 9,
//     avatarBg: "purple",
//     name: "Jane Harris",
//     dob: "28 Feb, 1985",
//     role: "Customer",
//     image:
//       "data:image/jpeg;base64,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",
//     email: "harris@example.com",
//     balance: "5530.23",
//     checked: false,
//     phone: "1234472384",
//     emailStatus: "pending",
//     kycStatus: "pending",
//     lastLogin: "02 Jan 2020",
//     status: "Pending",
//     country: "Vietnam",
//     designation: "UI/UX Designer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 10,
//     avatarBg: "purple",
//     name: "Emma Walker",
//     dob: "30 Dec, 1998",
//     role: "Investor",
//     email: "walker@example.com",
//     balance: "55.00",
//     checked: false,
//     phone: "4634717173",
//     emailStatus: "success",
//     kycStatus: "success",
//     lastLogin: "25 Dec 2019",
//     status: "Active",
//     country: "United States",
//     designation: "UI/UX Designer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 11,
//     avatarBg: "pink",
//     name: "Lilja Peltola",
//     dob: "30 Dec, 1998",
//     role: "Investor",
//     email: "lilja@example.com",
//     balance: "105.00",
//     checked: false,
//     phone: "4634717173",
//     emailStatus: "success",
//     kycStatus: "pending",
//     lastLogin: "25 Dec 2019",
//     status: "Active",
//     country: "Canada",
//     designation: "Web Developer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 12,
//     avatarBg: "secondary",
//     name: "Annette Hunter",
//     dob: "30 Dec, 1998",
//     role: "Investor",
//     email: "hunter@example.com",
//     balance: "55.00",
//     checked: false,
//     phone: "4634717173",
//     emailStatus: "success",
//     kycStatus: "success",
//     lastLogin: "25 Dec 2019",
//     status: "Pending",
//     country: "United States",
//     designation: "UI/UX Designer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 13,
//     avatarBg: "pink",
//     name: "Sara Koivisto",
//     dob: "30 Dec, 1998",
//     role: "Customer",
//     email: "sara@example.com",
//     balance: "165.00",
//     checked: false,
//     phone: "4634717173",
//     emailStatus: "rejected",
//     kycStatus: "pending",
//     lastLogin: "25 Dec 2019",
//     status: "Active",
//     country: "Russia",
//     designation: "Web Developer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 14,
//     avatarBg: "blue",
//     name: "Kianna Pham",
//     dob: "30 Dec, 1998",
//     role: "Admin",
//     email: "kiana@example.com",
//     balance: "55.00",
//     checked: false,
//     phone: "4634717173",
//     emailStatus: "success",
//     kycStatus: "rejected",
//     lastLogin: "25 Dec 2019",
//     status: "Suspend",
//     country: "South Korea",
//     designation: "Accountant",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 15,
//     avatarBg: "pink",
//     name: "Raymond Atkins",
//     dob: "30 Dec, 1998",
//     role: "Customer",
//     image:
//       "data:image/jpeg;base64,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",
//     email: "sara@example.com",
//     balance: "165.00",
//     checked: false,
//     phone: "4634717173",
//     emailStatus: "rejected",
//     kycStatus: "pending",
//     lastLogin: "25 Dec 2019",
//     status: "Active",
//     country: "Russia",
//     designation: "Web Developer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 16,
//     avatarBg: "blue",
//     name: "Amira Talley",
//     dob: "30 Dec, 1998",
//     role: "Admin",
//     email: "amira@example.com",
//     balance: "55.00",
//     checked: false,
//     phone: "4634717173",
//     emailStatus: "pending",
//     kycStatus: "rejected",
//     lastLogin: "25 Dec 2019",
//     status: "Active",
//     country: "Saudi Arabia",
//     designation: "Lecturer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 17,
//     avatarBg: "secondary",
//     name: "Lana Steiner",
//     dob: "30 Dec, 1998",
//     role: "Admin",
//     email: "steinar@example.com",
//     balance: "55.00",
//     checked: false,
//     phone: "4634717173",
//     emailStatus: "pending",
//     kycStatus: "rejected",
//     lastLogin: "25 Dec 2019",
//     status: "Pending",
//     country: "Latvia",
//     designation: "Accountant",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 18,
//     avatarBg: "warning",
//     name: "Joshua Mcnair",
//     dob: "30 Dec, 1998",
//     image:
//       "data:image/jpeg;base64,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",
//     role: "Admin",
//     email: "joshua@example.com",
//     balance: "55.00",
//     checked: false,
//     phone: "4634717173",
//     emailStatus: "pending",
//     kycStatus: "rejected",
//     lastLogin: "25 Dec 2019",
//     status: "Suspend",
//     country: "Ireland",
//     designation: "Web Developer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 19,
//     avatarBg: "secondary",
//     name: "Asiya Wolff",
//     dob: "30 Dec, 1998",
//     role: "Customer",
//     email: "asia@example.com",
//     balance: "55.00",
//     checked: false,
//     phone: "4634717173",
//     emailStatus: "success",
//     kycStatus: "success",
//     lastLogin: "25 Dec 2019",
//     status: "Active",
//     country: "Latvia",
//     designation: "Accountant",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
//   {
//     id: 20,
//     avatarBg: "warning",
//     name: "Fox Mccloud",
//     dob: "30 Dec, 1998",
//     role: "Admin",
//     email: "fox@example.com",
//     balance: "55.00",
//     checked: false,
//     phone: "4634717173",
//     emailStatus: "pending",
//     kycStatus: "rejected",
//     lastLogin: "25 Dec 2019",
//     status: "Suspend",
//     country: "Ireland",
//     designation: "Web Developer",
//     projects: "213",
//     performed: "87.5",
//     tasks: "587",
//   },
// ];

const UserListDefaultPage = () => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [userCount,setUserCount]=useState(0);
  const fetchUsers = async () => {
    try {
      const res = await getUsers(auth.token);
      console.log(res.data.data);
      setData([...res.data.data.userList]);
      setUserCount(res.data.data.totalUsers)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchUsers();
    }
  },[]);
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
      <ToastContainer />
      <Head title="User List - Default"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
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
                          <UserAvatar theme={item.avatarBg} text={findUpper(item.userName)} ></UserAvatar>
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
