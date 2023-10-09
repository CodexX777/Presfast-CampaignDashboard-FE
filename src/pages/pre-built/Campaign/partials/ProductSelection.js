import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { getAllHungryJackProducts } from "../../../../utils/Api";
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
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";

const ProductSelection = ({ prevData, setPrevData, setStep }) => {
  const auth = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  //   const setPrevSelectedProducts = () => {
  //     if (prevData.selectedProducts.length > 0 && products.length > 0) {
  //       const updatedProducts = products?.map((product) => {
  //         // Check if the product is in prevData.selectedProducts
  //         const isSelected = prevData?.selectedProducts?.some((selectedProduct) => selectedProduct._id === product._id);
  //         return { ...product, checked: isSelected };
  //       });
  //       console.log("updatedProducts", updatedProducts, prevData.selectedProducts);
  //       setProducts([...updatedProducts]);
  //       setSelectedProducts(prevData.selectedProducts);
  //     }
  //   };

  //To fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllHungryJackProducts(auth.token);
      console.log(res.data.products);
      if (res.status === 200) {
        const fetchedProducts = res?.data?.products;
        // Check if there are previously selected products
        if (prevData.selectedProducts.length > 0) {
          const updatedProducts = fetchedProducts.map((product) => {
            // Check if the product is in prevData.selectedProducts
            const isSelected = prevData?.selectedProducts?.some(
              (selectedProduct) => selectedProduct._id === product._id
            );
            return { ...product, checked: isSelected };
          });
          setProducts(updatedProducts);
          setSelectedProducts(prevData.selectedProducts);
        } else {
          // If no previously selected products, set products without any changes
          setProducts(fetchedProducts);
        }
      }
    };
    fetchProducts();
  }, [auth.token, prevData.selectedProducts]);
  console.log("HJ poroducts", products);
  //to load selected Items from prevData

  //select and deselect all handler
  const selectorCheck = (e) => {
    let newData;
    newData = products?.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setProducts([...newData]);
    if (e.currentTarget.checked) {
      setSelectedProducts([...products]);
    } else {
      setSelectedProducts([]);
    }
  };

  useEffect(() => {
    let newData;
    if (prevData?.selectedProducts?.length === 0 && products) {
      newData = products.map((item) => {
        item.checked = false;
        return item;
      });
      setProducts([...newData]);
    }
  }, []);

  const onSelectChange = (e, productId) => {
    const isChecked = e.currentTarget.checked;
    console.log("inside onselectchange", isChecked);
    if (isChecked) {
      // If checkbox is checked, add the product to selectedProducts
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        products.find((product) => product._id === productId),
      ]);
      let newProductsData = [...products];
      let index = newProductsData.findIndex((item) => item._id === productId);
      newProductsData[index].checked = true;
      setProducts([...newProductsData]);
    } else {
      // If checkbox is unchecked, remove the product from selectedProducts
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((product) => product._id !== productId)
      );
      let newProductsData = [...products];
      let index = newProductsData.findIndex((item) => item._id === productId);
      newProductsData[index].checked = false;
      setProducts([...newProductsData]);
    }
  };

  const handleSubmit = () => {
    if (selectedProducts.length === 0) {
      alert("Please select atleast one product");
      return;
    }
    setPrevData({ ...prevData, selectedProducts: selectedProducts });
    setStep((prev) => prev + 1);
  };

  console.log("selectedProducts", selectedProducts);

  return (
    <React.Fragment>
      <Head title="Hungry Jack's Product List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent style={{ marginTop: "65px" }}>
              <BlockTitle tag="h6" page>
                Hungry Jack's Products
              </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          {/* <Button
            onClick={() => {
              setStep(1);
            }}
          >
            back
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </Button> */}
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              <DataTableRow className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                  <input type="checkbox" className="custom-control-input" onChange={(e) => selectorCheck(e)} id="uid" />
                  <label className="custom-control-label" htmlFor="uid"></label>
                </div>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Product name</span>
              </DataTableRow>

              <DataTableRow size="md">
                <span className="sub-text">Category</span>
              </DataTableRow>
            </DataTableHead>

            {products?.length > 0
              ? products?.map((item) => (
                  <DataTableItem key={item._id}>
                    <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          checked={item.checked}
                          id={item._id + "uid1"}
                          key={Math.random()}
                          onChange={(e) => onSelectChange(e, item._id)}
                        />
                        <label className="custom-control-label" htmlFor={item._id + "uid1"}></label>
                      </div>
                    </DataTableRow>
                    <DataTableRow>
                      <div className="user-card">
                        {/* <UserAvatar theme={item.avatarBg} text={findUpper(item.userName)}></UserAvatar> */}
                        <img
                          src={item?.prodImages?.length > 0 ? item?.prodImages[0] : ""}
                          alt={item.prodName}
                          style={{ width: "50px", height: "50px" }}
                        />
                        <div className="user-info" style={{ marginLeft: "10px" }}>
                          <span className="tb-lead">
                            {item.prodName} <span className="dot dot-success d-md-none ms-1"></span>
                          </span>
                          <span>{item.prodDesc}</span>
                        </div>
                      </div>
                    </DataTableRow>

                    <DataTableRow size="md">
                      <span>{item.prodCategory}</span>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
            <Col size="12" className="mt-4">
              <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                <li>
                  <Button
                    color="primary"
                    size="md"
                    onClick={() => {
                      //save data
                      setPrevData({ ...prevData, selectedProducts: selectedProducts });
                      setStep((prev) => prev - 1);
                    }}
                  >
                    Back
                  </Button>
                </li>
                <li>
                  <Button color="primary" size="md" onClick={handleSubmit}>
                    Next
                  </Button>
                </li>
              </ul>
            </Col>
          </div>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default ProductSelection;
