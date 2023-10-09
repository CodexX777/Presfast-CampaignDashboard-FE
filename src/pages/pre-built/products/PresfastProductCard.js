import React, { useContext, useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import Dropzone from "react-dropzone";
import ProductH from "../../../images/product/h.png";
import ProductLGB from "../../../images/product/lg-b.jpg";
import ProductLGC from "../../../images/product/lg-c.jpg";
import ProductLGD from "../../../images/product/lg-d.jpg";
import ProductLGE from "../../../images/product/lg-e.jpg";
import ProductLGF from "../../../images/product/lg-f.jpg";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import {
  BlockHead,
  BlockDes,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
  Icon,
  Button,
  Block,
  Row,
  Col,
  PaginationComponent,
} from "../../../components/Component";
import { useForm } from "react-hook-form";
import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge } from "reactstrap";
import { AuthContext } from "../../../context/AuthContext";
import { productCardData } from "./ProductData";
import { uploadPresfastProduct } from "../../../utils/Api";
import { getAllPresfastProducts } from "../../../utils/Api";

const PresfastProductCard = () => {
  //const { contextData } = useContext(ProductContext);
  const auth = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [fetch, setRefetch] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllPresfastProducts(auth.token);
        console.log(res?.data?.products);
        setData(res?.data?.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [auth.token, fetch]);

  const [qtyBreak1, setQtyBreak1] = useState(500);
  const [qtyBreak2, setQtyBreak2] = useState(1500);
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);

  const [setUpCost, setSetUpCost] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [sm, updateSm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    img: null,
    description: "",
    unitPrice: 0,
    category: "",
    prodInitials: "",
  });
  const [view, setView] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(6);
  const [files, setFiles] = useState([]);

  const resetForm = () => {
    setFormData({
      name: "",
      img: null,
      description: "",
      unitPrice: 0,
      category: "",
      prodInitials: "",
    });
    reset({});
  };

  //scroll off when sidebar shows
  useEffect(() => {
    view ? document.body.classList.add("toggle-shown") : document.body.classList.remove("toggle-shown");
  }, [view]);

  // Changing state value when searching name
  useEffect(() => {
    if (filter !== "") {
      const filteredObject = productCardData.filter((item) => {
        return item.name.toLowerCase().includes(filter.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...productCardData]);
    }
  }, [filter, setData]);

  const toggle = () => {
    setView(!view);
  };

  const onFormSubmit = async (form) => {
    // const { name, title, prevPrice, newPrice, type } = form;
    // let submittedData = {
    //   id: data.length,
    //   name: name,
    //   title: title,
    //   img: files.length > 0 ? files[0].preview : ProductLGE,
    //   prevPrice: prevPrice,
    //   newPrice: newPrice,
    //   type: type,
    //   new: true,
    //   hot: false,
    //   like: false,
    //   cart: false,
    //   slider: [
    //     { id: 0, img: files.length > 0 ? files[0].preview : ProductLGE },
    //     { id: 1, img: ProductLGB },
    //     { id: 2, img: ProductLGC },
    //     { id: 3, img: ProductLGD },
    //     { id: 4, img: ProductLGE },
    //     { id: 5, img: ProductLGF },
    //   ],
    // };
    // setData([submittedData, ...data]);
    // setView(false);
    // setFiles([]);
    // resetForm();

    //prepare all the images in files array to be sent as data to the backend using formdata
    // const newFiles=files.map((file)=>{

    // })

    const newProductData = new FormData();
    newProductData.append("prodName", form.name);
    newProductData.append("prodDesc", form.description);
    newProductData.append("unitPrice", form.unitPrice);
    newProductData.append("prodInitials", form.prodInitials);
    newProductData.append("category", form.category);
    // newProductData.append("prodImages", files);
    console.log("files", newProductData);

    files.forEach((file, index) => {
      newProductData.append("prodImages", file);
    });
    const res = await uploadPresfastProduct(auth.token, newProductData);
    console.log(res);
    resetForm();
    setFiles([]);
    setView(false);
    setRefetch((p) => p + 1);
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  //for cost calculation
  useEffect(() => {
    if (qtyBreak1 && qtyBreak2 && price1 && price2) {
      let setupcost = price1 - ((price2 - price1) / (qtyBreak2 - qtyBreak1)) * qtyBreak1;
      let unitCost = (price2 - price1) / (qtyBreak2 - qtyBreak1);
      setupcost = setupcost.toFixed(2);
      unitCost = unitCost.toFixed(2);
      setSetUpCost(setupcost);
      setUnitPrice(unitCost);
      setFormData({ ...formData, unitPrice: unitCost });
    }
  }, [qtyBreak1, qtyBreak2, price1, price2]);

  // filter text
  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  };

  //handles the image removal from image list
  const removeImageHandler = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <React.Fragment>
      <Head title="Product List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Presfast Products</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          onChange={onFilterChange}
                          placeholder="Quick search by name"
                        />
                      </div>
                    </li>

                    <li className="nk-block-tools-opt">
                      <Button className="toggle btn-icon d-md-none" color="primary" onClick={toggle}>
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button className="toggle d-none d-md-inline-flex" color="primary" onClick={toggle}>
                        <Icon name="plus"></Icon>
                        <span>Add Product</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            {currentItems.length > 0 ? (
              currentItems.map((item) => {
                return (
                  <Col xxl={3} lg={4} sm={6} key={item._id}>
                    <Card className="product-card">
                      <div className="product-thumb">
                        <Link to={`/product-details/${item._id}`}>
                          {console.log("image url", item.prodImages)}
                          <img
                            className="card-img-top"
                            src={item?.prodImages?.length > 0 ? item.prodImages[0] : ""}
                            alt="item.prodName"
                            height={"308px"}
                            width={"308px"}
                          />
                        </Link>
                      </div>
                      <div className="card-inner text-center">
                        <ul className="product-tags">
                          <li>
                            <Link to={`/product-details/${item._id}`}>{item.prodCategory}</Link>
                          </li>
                        </ul>
                        <h5 className="product-title">
                          <Link to={`/product-details/${item._id}`}>{item.prodName}</Link>
                        </h5>
                        <div className="product-price text-primary h5">$ {item.unitPrice}</div>
                      </div>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <div className="ms-2">No product found</div>
            )}
          </Row>
          {currentItems.length > 0 && (
            <div className="mt-3">
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          )}
        </Block>

        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${view ? "content-active" : ""}`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Product</BlockTitle>
              <BlockDes>
                <p>Add new information for a product.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Product Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        {...register("name", { required: "Name field is required" })}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-control"
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Category
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        {...register("category", { required: "Category field is required" })}
                        className="form-control"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                      {errors.category && <span className="invalid">{errors.category.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Product Initials
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        {...register("prodInitials", { required: "Product Initials field is required" })}
                        className="form-control"
                        value={formData.prodInitials}
                        onChange={(e) => setFormData({ ...formData, prodInitials: e.target.value })}
                      />
                      {errors.prodInitials && <span className="invalid">{errors.prodInitials.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Description
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        {...register("description", { required: "Description field is required" })}
                        className="form-control"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                      {errors.category && <span className="invalid">{errors.category.message}</span>}
                    </div>
                  </div>
                </Col>
                <h5>Cost Calculator</h5>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sale-price">
                      Quantity 1
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        value={qtyBreak1}
                        onChange={(e) => setQtyBreak1(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sale-price">
                      Quantity 2
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        value={qtyBreak2}
                        onChange={(e) => setQtyBreak2(e.target.value)}
                        className="form-control"
                      />
                      {errors.prevPrice && <span className="invalid">{errors.prevPrice.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sale-price">
                      Price 1
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        value={price1}
                        onChange={(e) => setPrice1(e.target.value)}
                        className="form-control"
                      />
                      {errors.prevPrice && <span className="invalid">{errors.prevPrice.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sale-price">
                      Price 2
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        value={price2}
                        onChange={(e) => setPrice2(e.target.value)}
                        className="form-control"
                      />
                      {errors.prevPrice && <span className="invalid">{errors.prevPrice.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sale-price">
                      Setup Cost
                    </label>
                    <div className="form-control-wrap">
                      <input type="number" value={setUpCost} disabled className="form-control" />
                      {errors.prevPrice && <span className="invalid">{errors.prevPrice.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sale-price">
                      Unit Price
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        {...register("unitPrice", { required: "This field is required" })}
                        value={unitPrice}
                        disabled
                        className="form-control"
                      />
                      {errors.prevPrice && <span className="invalid">{errors.prevPrice.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone upload-zone small bg-lighter my-2 dz-clickable">
                          <input {...getInputProps()} />
                          {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                          {files.map((file, index) => (
                            <div
                              key={file.name}
                              className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                            >
                              <span
                                style={{ position: "absolute", zIndex: "100", left: "6.2rem", top: "-8px" }}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  removeImageHandler(index);
                                }}
                              >
                                <Icon name="delete" style={{ fontSize: "1.6rem", color: "black" }}></Icon>
                              </span>
                              <div className="dz-image">
                                <img src={file.preview} alt="preview" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </Col>
                <Col size="12">
                  <Button color="primary">
                    <Icon className="plus"></Icon>
                    <span>Add Product</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>
        {view && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment>
  );
};
export default PresfastProductCard;
