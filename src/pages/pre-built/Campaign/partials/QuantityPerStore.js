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
import { Badge } from "reactstrap";
import { AuthContext } from "../../../../context/AuthContext";
import { getStoreTypeOptions } from "../../../../utils/Api";

const QuantityPerStore = ({ prevData, setPrevData, setStep }) => {
  const auth = useContext(AuthContext);
  const [selectedProducts, setSelectedProducts] = useState([...prevData?.selectedProducts]);

  const [transformedProducts, setTransformedProducts] = useState([...prevData?.regionSelectionData]);

  console.log("selectedProducts", selectedProducts);
  useEffect(() => {
    //initialize quantityPerStore to 0 and extraQuantityPerStore to 0
    const updatedTransformedProducts = transformedProducts.map((product) => {
      return {
        ...product,
        quantityPerStore: product.quantityPerStore ? product.quantityPerStore : 0,
        extraQuantityPerStore: product.extraQuantityPerStore ? product.extraQuantityPerStore : 0,
      };
    });
    setTransformedProducts(updatedTransformedProducts);
  }, []);

  const handleSubmit = async () => {
    console.log("finalData", prevData);
    console.log(transformedProducts, "prevData", prevData);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => {
          setStep(5);
        }}
      >
        back
      </button>
      <h6>Select campaign regions for each material</h6>
      <div className="nk-tb-list is-separate is-medium mb-3">
        <DataTableHead className="nk-tb-item">
          <DataTableRow>
            <span className="sub-text">Material</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Key Number</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Campaign Region</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Store Type</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Quantity Per Store</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Extra Quantity Per Store</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Art-work due date </span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="sub-text">Upload Artwork</span>
          </DataTableRow>
        </DataTableHead>

        {transformedProducts?.length > 0
          ? transformedProducts?.map((item) => (
              <DataTableItem key={item._id + item.presfastItem?.value}>
                <DataTableRow>
                  <div className="user-card" style={{ width: "180px" }}>
                    <img
                      src={item?.prodImages?.length > 0 ? item?.prodImages[0] : ""}
                      alt={item.prodName}
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="user-info" style={{ marginLeft: "10px" }}>
                      <span className="tb-lead">
                        {item.prodName} <span className="dot dot-success d-md-none ms-1"></span>
                      </span>
                      <span>{item.presfastItem?.label}</span>
                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">
                    <div className="form-control-wrap" style={{ maxWidth: "100px", wordWrap: "break-word" }}>
                      {item.keyNumber}
                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">
                    <div
                      className="form-control-wrap"
                      style={{ width: "120px", display: "flex", gap: "0.7rem", flexWrap: "wrap" }}
                    >
                      {item.regions.map((region) => (
                        <Badge pill color="outline-secondary">
                          {region.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">
                    <div
                      className="form-control-wrap"
                      style={{ width: "120px", display: "flex", gap: "0.7rem", flexWrap: "wrap" }}
                    >
                      {item.selectedStoreTypes.map((type) => (
                        <Badge pill color="outline-secondary">
                          {type.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Quantity"
                      value={item.quantityPerStore}
                      onChange={(e) => {
                        const newTransformedProducts = transformedProducts.map((product) => {
                          if (product.keyNumber === item.keyNumber) {
                            return {
                              ...product,
                              quantityPerStore: e.target.value,
                            };
                          } else {
                            return product;
                          }
                        });
                        console.log("newTransformedProducts", newTransformedProducts);
                        setTransformedProducts(newTransformedProducts);
                      }}
                    />
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Quantity"
                      value={item.extraQuantityPerStore}
                      onChange={(e) => {
                        const newTransformedProducts = transformedProducts.map((product) => {
                          if (product.keyNumber === item.keyNumber) {
                            return {
                              ...product,
                              extraQuantityPerStore: e.target.value,
                            };
                          } else {
                            return product;
                          }
                        });
                        console.log("newTransformedProducts", newTransformedProducts);
                        setTransformedProducts(newTransformedProducts);
                      }}
                    />
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group">22/7/2023</div>
                </DataTableRow>
                <DataTableRow>
                  <div className="form-group"></div>
                </DataTableRow>
              </DataTableItem>
            ))
          : null}
      </div>
      <Button
        color="primary"
        size="md"
        onClick={() => {
          const newData = { ...prevData, regionSelectionData: [...transformedProducts] };
          setPrevData(newData);
          handleSubmit(newData);
          //   setStep(7);
        }}
      >
        Schedule Campaign
      </Button>
    </div>
  );
};

export default QuantityPerStore;
