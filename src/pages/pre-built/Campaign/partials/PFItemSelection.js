import React, { useEffect, useState, useContext } from "react";

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
import { AuthContext } from "../../../../context/AuthContext";
import { getAllPresfastProducts } from "../../../../utils/Api";
const PFItemSelection = ({ prevData, setPrevData, setStep }) => {
  const [selectedProducts, setSelectedProducts] = useState(
    prevData?.selectedProducts.map((product) => ({
      ...product,
      presfastItems: product.presfastItems?.length > 0 ? [...product.presfastItems] : [], // Initialize presfastItems as an empty array if it is undefined
    }))
  );
  const [presfastItems, setPresfastItems] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllPresfastProducts(auth.token);
      console.log(res.data.products);
      if (res.status === 200) {
        const fetchedProducts = res?.data?.products;
        console.log("fetchedProducts",fetchedProducts);
        const newProducts = fetchedProducts.map((product) => {
          return {
            value: product._id,
            label: product.prodName,
            image: product.prodImages[0],
            itemInitials: product.prodInitials,
          };
        });
        setPresfastItems([...newProducts]);
      }
    };
    fetchProducts();
  }, []);
  console.log("selectedProducts", selectedProducts);
  const auth = useContext(AuthContext);
  console.log("presfastItems", presfastItems);
  return (
    <div className="p-4">
      <button
        onClick={() => {
          setStep(2);
        }}
      >
        back
      </button>
      <h6>Select Campaign Items for your products</h6>
      <div className="nk-tb-list is-separate is-medium mb-3">
        <DataTableHead className="nk-tb-item">
          <DataTableRow>
            <span className="sub-text">Product name</span>
          </DataTableRow>

          {/* <DataTableRow size="md">
            <span className="sub-text">Category</span>
          </DataTableRow> */}
          <DataTableRow size="md">
            <span className="sub-text">Campaign Item</span>
          </DataTableRow>
        </DataTableHead>

        {selectedProducts?.length > 0
          ? selectedProducts?.map((item) => (
              <DataTableItem key={item._id}>
                <DataTableRow>
                  <div className="user-card">
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
                <DataTableRow>
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <RSelect
                        isMulti={true}
                        options={presfastItems}
                        value={item.presfastItems.map((item) => {
                          return {
                            value: item.value,
                            label: item.label,
                          };
                        })}
                        onChange={(selectedOptions, actionMeta) => {
                          console.log("onChange", selectedOptions, "action", actionMeta);
                          // Update selectedProducts state based on the action type
                          if (actionMeta.action === "select-option") {
                            // When an item is selected, update the presfastItems array of the corresponding product
                            setSelectedProducts((prevSelectedProducts) => {
                              const index = prevSelectedProducts.findIndex((product) => product._id === item._id);
                              const updatedProducts = [...prevSelectedProducts];
                              updatedProducts[index].presfastItems.push(actionMeta?.option);
                              console.log("updated", updatedProducts);
                              return updatedProducts;
                            });
                          } else if (actionMeta.action === "remove-value") {
                            // When an item is removed, update the presfastItems array of the corresponding product
                            setSelectedProducts((prevSelectedProducts) => {
                              const index = prevSelectedProducts.findIndex((product) => product._id === item._id);
                              const updatedProducts = [...prevSelectedProducts];
                              const newPresfastList = updatedProducts[index].presfastItems.filter(
                                (product) => product.value !== actionMeta?.removedValue?.value
                              );
                              updatedProducts[index].presfastItems = newPresfastList;
                              console.log("updated", updatedProducts);
                              return updatedProducts;
                            });
                          }
                        }}
                        formatOptionLabel={(option) => (
                          <div>
                            {option.image && (
                              <img src={option.image} alt={option.label} width={"40px"} height={"40px"} />
                            )}
                            <span style={{ marginLeft: "10px" }}>{option.label}</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </DataTableRow>
              </DataTableItem>
            ))
          : null}
      </div>
      <Button
        color="primary"
        size="md"
        onClick={() => {
          setPrevData({ ...prevData, selectedProducts: [...selectedProducts] });
          setStep(4);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default PFItemSelection;
