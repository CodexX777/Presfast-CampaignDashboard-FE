import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Col, Button, RSelect } from "../../../components/Component";
import { useForm } from "react-hook-form";
import { Form } from "reactstrap";
import { addStore } from "../../../utils/Api";
const AddStore = () => {
  const auth = useContext(AuthContext);
  const [formData, setFormData] = useState({
    storeNumber: "",
    storeName: "",
    storeType: "",
    jacksCafe: "No",
    storeAddress: "",
    storeCity: "",
    storeRegion: "",
    storePostCode: "",
    storeLandmark: "",
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let res;
    try {
      res = await addStore(auth.token, formData);
      if (res.status === 201) toast.success("User added successfully");
    //   else toast.error(res.response.data.message ? res.response.data.message : "Something went wrong");
    } catch (error) {
    //   toast.error("Something went wrong");
      console.log(error);
    }
    // Optionally, you can reset the form after successful submission.
    setFormData({
      storeNumber: "",
      storeName: "",
      storeType: "",
      jacksCafe: "",
      storeAddress: "",
      storeCity: "",
      storeRegion: "",
      storePostCode: "",
      storeLandmark: "",
    });
    reset({
      storeNumber: "",
      storeName: "",
      jacksCafe: "",
      storeAddress: "",
      storeCity: "",
      storeRegion: "",
      storePostCode: "",
      storeLandmark: "",
    });
  };

  //follow the design of the overall application
  return (
    <div className="p-4" style={{ marginTop: "65px" }}>
      <h5 className="title">Add Store</h5>
      <div className="mt-4">
        <Form className="row gy-4 p-4" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Store Name</label>
              <input
                className="form-control"
                type="text"
                {...register("storeName", { required: "This field is required" })}
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                placeholder="Store Name"
              />
              {errors.storeName && <span className="invalid">{errors.storeName.message}</span>}
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Store Number</label>
              <input
                className="form-control"
                type="text"
                {...register("storeNumber", { required: "This field is required" })}
                value={formData.storeNumber}
                onChange={(e) => setFormData({ ...formData, storeNumber: e.target.value })}
                placeholder="Store Number"
              />
              {errors.storeNumber && <span className="invalid">{errors.storeNumber.message}</span>}
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Store Address</label>
              <input
                className="form-control"
                type="text"
                {...register("storeAddress", { required: "This field is required" })}
                value={formData.storeAddress}
                onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
                placeholder="Store Address"
              />

              {errors.storeAddress && <span className="invalid">{errors.storeAddress.message}</span>}
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Store City</label>
              <input
                className="form-control"
                type="text"
                {...register("storeCity", { required: "This field is required" })}
                value={formData.storeCity}
                onChange={(e) => setFormData({ ...formData, storeCity: e.target.value })}
                placeholder="Store City"
              />

              {errors.storeCity && <span className="invalid">{errors.storeCity.message}</span>}
            </div>
          </Col>

          <Col md="6">
            <div className="form-group">
              <label className="form-label">Store Landmark</label>
              <input
                className="form-control"
                type="text"
                {...register("storeLandmark", { required: "This field is required" })}
                value={formData.storeLandmark}
                onChange={(e) => setFormData({ ...formData, storeLandmark: e.target.value })}
                placeholder="Store Landmark"
              />

              {errors.storeLandmark && <span className="invalid">{errors.storeLandmark.message}</span>}
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Store Type</label>
              <RSelect
                value={{
                  value: formData.storeType,
                  label: formData.storeType,
                }}
                onChange={(e) => {
                  //   console.log(e.value);
                  //   console.log(formData);
                  setFormData({ ...formData, storeType: e.value });
                }}
                options={[
                  { value: "0DT", label: "0DT" },
                  { value: "0DTD", label: "0DTD" },
                  { value: "1DT", label: "1DT" },
                  { value: "1DTD", label: "1DTD" },
                  { value: "1DTDD", label: "1DTDD" },
                  { value: "2DT", label: "2DT" },
                  { value: "2DTD", label: "2DTD" },
                  { value: "2DTDD", label: "2DTDD" },
                  { value: "POP UP", label: "POP UP" },
                  { value: "RSC", label: "RSC" },
                ]}
              />
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Store Region</label>
              <input
                className="form-control"
                type="text"
                {...register("storeRegion", { required: "This field is required" })}
                value={formData.storeRegion}
                onChange={(e) => setFormData({ ...formData, storeRegion: e.target.value })}
                placeholder="Store Region"
              />

              {errors.storeRegion && <span className="invalid">{errors.storeRegion.message}</span>}
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Store Post Code</label>
              <input
                className="form-control"
                type="text"
                {...register("storePostCode", { required: "This field is required" })}
                value={formData.storePostCode}
                onChange={(e) => setFormData({ ...formData, storePostCode: e.target.value })}
                placeholder="Store Post Code"
              />

              {errors.storePostCode && <span className="invalid">{errors.storePostCode.message}</span>}
            </div>
          </Col>
          <Col md="2" className={{ display: "flex" }}>
            <div className="form-group custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch2"
                onChange={(e) => {
                  setFormData({ ...formData, jacksCafe: e.target.checked ? "Yes" : "No" });
                  //   console.log(formData);
                }}
              />
              <label className="custom-control-label" htmlFor="customSwitch2">
                Jack's Cafe
              </label>
            </div>
          </Col>
          <Col size="12">
            <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
              <li>
                <Button color="primary" size="md" type="submit">
                  Add Store
                </Button>
              </li>
            </ul>
          </Col>
        </Form>
      </div>
    </div>
  );
};

export default AddStore;
