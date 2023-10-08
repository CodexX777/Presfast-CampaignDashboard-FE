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

const StoreTypeSelection = ({ prevData, setPrevData, setStep }) => {
  const auth = useContext(AuthContext);
  const [selectedProducts, setSelectedProducts] = useState([...prevData?.selectedProducts]);

  const [transformedProducts, setTransformedProducts] = useState([...prevData?.regionSelectionData]);

  console.log("selectedProducts", selectedProducts);
  useEffect(() => {
    const postData = prevData?.regionSelectionData.map((item) => {
      return {
        keyNumber: item.keyNumber,
        regions: [...item.regions],
      };
    });

    const fetchStoreTypeOptions = async () => {
      const response = await getStoreTypeOptions(auth?.token, postData);
      console.log("store type options", response.data);
      if (response.status === 200) {
        const fetchedStoreTypeOptions = response.data.storeTypeOptions;
        const updatedTransformedProducts = transformedProducts.map((product) => {
          const storeTypes = fetchedStoreTypeOptions.find((item) => item.keyNumber === product.keyNumber);
          return {
            ...product,
            selectedStoreTypes: [],
            storeTypes: storeTypes?.storeTypeOptions?.map((item) => {
              return {
                value: item,
                label: item,
              };
            }),
          };
        });
        console.log("updatedTransformedProducts", updatedTransformedProducts);
        setTransformedProducts(updatedTransformedProducts);
      }
    };

    fetchStoreTypeOptions();

    console.log(postData);
  }, []);

  console.log(transformedProducts);

  return (
    <div className="p-4">
      <button
        onClick={() => {
          setStep(4);
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
        </DataTableHead>

        {transformedProducts?.length > 0
          ? transformedProducts?.map((item) => (
              <DataTableItem key={item._id + item.presfastItem?.value}>
                <DataTableRow>
                  <div className="user-card" style={{ width: "300px" }}>
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
                      style={{ width: "200px", display: "flex", gap: "0.7rem", flexWrap: "wrap" }}
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
                    <div className="form-control-wrap" style={{ width: "300px" }}>
                      <RSelect
                        isMulti={true}
                        options={item.storeTypes}
                        value={item?.selectedStoreTypes?.map((item) => {
                          return {
                            value: item.value,
                            label: item.label,
                          };
                        })}
                        onChange={(selectedOptions, actionMeta) => {
                          const updatedTransformedProducts = transformedProducts.map((product) => {
                            if (product.keyNumber === item.keyNumber) {
                              return {
                                ...product,
                                selectedStoreTypes: selectedOptions,
                              };
                            } else {
                              return product;
                            }
                          });
                          setTransformedProducts(updatedTransformedProducts);
                        }}
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
          setPrevData({ ...prevData, regionSelectionData: [...transformedProducts] });
          setStep(6);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default StoreTypeSelection;
