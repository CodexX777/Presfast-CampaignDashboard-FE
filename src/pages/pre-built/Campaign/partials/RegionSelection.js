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

const regionOptions = [
  { label: "ACT", value: "ACT" },
  { label: "KESWICK", value: "KESWICK" },
  { label: "NSW", value: "NSW" },
  { label: "NT", value: "NT" },
  { label: "QLD Nth", value: "QLD Nth" },
  { label: "QLD STH", value: "QLD STH" },
  { label: "SA", value: "SA" },
  { label: "VIC", value: "VIC" },
  { label: "TAS", value: "TAS" },
  { label: "WA", value: "WA" },
];

const RegionSelection = ({ prevData, setPrevData, setStep }) => {
  const [selectedProducts, setSelectedProducts] = useState([...prevData?.selectedProducts]);

  const [transformedProducts, setTransformedProducts] = useState(
    prevData?.regionSelectionData?.length > 0 ? [...prevData?.regionSelectionData] : []
  );
  useEffect(() => {
    // Iterate through selectedProducts and presfastItems to create 1-to-1 relation
    const transformedData = [];
    let i = 1;
    for (const product of selectedProducts) {
      //replace spaces with underscore in product.prodName
      const prodName = product.prodName.replace(/\s/g, "_");

      for (const item of product.presfastItems) {
        // Create a new object for each combination of product and item
        const transformedProduct = {
          ...product, // Spread the product properties
          presfastItem: { ...item },
          keyNumber: `${prevData.campaignInfo.jobNumber}_${i}_${item.itemInitials}_${prodName}`,
          regions: [],
        };
        i++;
        // Add the transformed object to the transformedData array
        transformedData.push(transformedProduct);
      }
    }
    console.log(transformedData);
    // Update the state with the transformed 1-to-1 relation array
    setTransformedProducts(transformedData);
  }, [selectedProducts]);

  console.log("selectedProducts", selectedProducts);
  const auth = useContext(AuthContext);

  return (
    <div className="p-4">
      <button
        onClick={() => {
          setStep(3);
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
            <span className="sub-text">Region</span>
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
                    <div className="form-control-wrap" style={{ width: "300px" }}>
                      <RSelect
                        isMulti={true}
                        value={item.regions.map((item) => {
                          return {
                            value: item.value,
                            label: item.label,
                          };
                        })}
                        onChange={(selectedOptions, actionMeta) => {
                          const newTransformedProducts = transformedProducts.map((product) => {
                            if (product.keyNumber === item.keyNumber) {
                              return {
                                ...product,
                                regions: selectedOptions,
                              };
                            } else {
                              return product;
                            }
                          });
                          console.log("newTransformedProducts", newTransformedProducts);
                          setTransformedProducts(newTransformedProducts);
                        }}
                        options={regionOptions}
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
          setStep(5);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default RegionSelection;
