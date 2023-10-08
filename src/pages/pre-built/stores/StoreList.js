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
import { filterStatus } from "../user-manage/UserData";
import { findUpper } from "../../../utils/Utils";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import EditModal from "../user-manage/EditModal";
import AddModal from "../user-manage/AddModal";
import { getUsers } from "../../../utils/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllStores } from "../../../utils/Api";
import { useNavigate } from "react-router-dom";
const StoreList = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [storeCount, setStoreCount] = useState(0);
  //fetch all he stores
  const fetchStores = async () => {
    try {
      const res = await getAllStores(auth.token);
      console.log(res.data.data);
      setData([...res.data.data.storeData]);
      setStoreCount(res.data.data.storeCount);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchStores();
    }
  }, []);
  //   const [sm, updateSm] = useState(false);
  const [onSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data?.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log("data", data);

  return (
    <React.Fragment>
      {/* <ToastContainer /> */}
      <Head title="User List - Default"></Head>
      <Content style={{ marginTop: "10rem" }}>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Hungry Jack's Stores
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>You have total {storeCount} stores.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button className={`btn-icon btn-trigger toggle-expand me-n1`} onClick={() => {}}>
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: "block" }}>
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      <Button
                        color="primary"
                        className="btn-icon"
                        style={{ paddingLeft: "0.8rem", paddingRight: "0.5rem" }}
                        onClick={() => {
                          navigate("/add-store");
                        }}
                      >
                        Add Store <Icon name="plus"></Icon>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              <DataTableRow>
                <span className="sub-text">Store No.</span>
              </DataTableRow>

              <DataTableRow size="md">
                <span className="sub-text">Store Name</span>
              </DataTableRow>

              <DataTableRow size="lg">
                <span className="sub-text">Store Type</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">State</span>
              </DataTableRow>
            </DataTableHead>
            {/*Head*/}
            {currentItems?.length > 0
              ? currentItems?.map((item) => (
                  <DataTableItem key={item._id}>
                    <DataTableRow>
                      <Link to={`${process.env.PUBLIC_URL}/user-details-regular/${item._id}`}>
                        <div className="user-card">
                          <div className="user-info">
                            <span className="tb-lead">
                              {item.storeNumber} <span className="dot dot-success d-md-none ms-1"></span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>{item.storeName}</span>
                    </DataTableRow>
                    <DataTableRow size="lg">
                      <span>{item.storeType}</span>
                    </DataTableRow>
                    <DataTableRow size="lg">
                      <span>{item.storeRegion}</span>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>
          <PreviewAltCard>
            {data?.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemsPerPage}
                totalItems={data?.length}
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
      </Content>
    </React.Fragment>
  );
};
export default StoreList;
