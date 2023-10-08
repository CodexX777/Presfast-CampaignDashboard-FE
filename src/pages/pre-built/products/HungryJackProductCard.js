import React, { useContext, useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import Dropzone from "react-dropzone";
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
import { productCardData } from "./ProductData";
import { uploadHungryJackProduct, getAllHungryJackProducts } from "../../../utils/Api";
import { AuthContext } from "../../../context/AuthContext";

const HungryJackProductCard = () => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllHungryJackProducts(auth.token);
      console.log("hungry products", res.data.products);
      setData([...res.data.products]);
    };

    fetchData();
  }, [auth.token, refetch]);

  const [sm, updateSm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    img: null,
    description: "",
    unitPrice: 0,
    category: "",
  });
  const [view, setView] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [files, setFiles] = useState([]);

  const resetForm = () => {
    setFormData({
      name: "",
      img: null,
      description: "",
      unitPrice: 0,
      category: "",
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
    console.log(form, files);
    const newProductData = new FormData();
    newProductData.append("prodName", form.name);
    newProductData.append("prodDesc", form.description);
    newProductData.append("prodCategory", form.category);
    console.log("files", newProductData);

    files.forEach((file, index) => {
      newProductData.append("prodImages", file);
    });
    const res = await uploadHungryJackProduct(auth.token, newProductData);
    console.log(res);
    resetForm();
    setFiles([]);
    setView(false);
    setRefetch((p) => p + 1);
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
              <BlockTitle>Hungry Jack's Products</BlockTitle>
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
                          <img
                            className="card-img-top"
                            src={item?.prodImages?.length > 0 ? item.prodImages[0] : ""}
                            alt={item?.prodName}
                            height={"250px"}
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
                          <Link to={`/product-details/${item.id}`}>{item.prodName}</Link>
                        </h5>
                        <div className="product-price text-primary h5"></div>
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
                itemPerPage={itemsPerPage}
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
export default HungryJackProductCard;
