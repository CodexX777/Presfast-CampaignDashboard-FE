import React, { useEffect, useState } from "react";
import { Form } from "reactstrap";
import { Icon, Col, Button, RSelect } from "../../../components/Component";
import { useForm } from "react-hook-form";
import { filterStatus } from "./UserData";

const roleOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Campaign Manager", value: "Campaign Manager" },
  { label: "Marketing Manager", value: "Marketing Manager" },
  { label: "Distribution Team Member", value: "Distribution Team Member" },
];

const AddModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    status: "",
    password: "",
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle the form submission here.
    console.log(formData); // You can replace this with your actual submission logic.

    // Optionally, you can reset the form after successful submission.
    reset({
      name: "",
      email: "",
      role: "",
      phone: "",
      status: "",
      password: "",
    });
  };

  const handleStatusChange = (selectedOption) => {
    setFormData({ ...formData, status: selectedOption.value });
  };

  const handleRoleChange = (selectedOption) => {
    setFormData({ ...formData, role: selectedOption.value });
  };

  return (
    <div className="p-2">
      <h5 className="title">Add User</h5>
      <div className="mt-4">
        <Form className="row gy-4 p-4" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                type="text"
                {...register("name", { required: "This field is required" })}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
              />
              {errors.name && <span className="invalid">{errors.name.message}</span>}
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Email </label>
              <input
                className="form-control"
                type="text"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
              {errors.email && <span className="invalid">{errors.email.message}</span>}
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                type="number"
                {...register("phone", { required: "This field is required" })}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              {errors.phone && <span className="invalid">{errors.phone.message}</span>}
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Status</label>
              {/* {register("status", { required: "This field is required" })} */}
              <div className="form-control-wrap">
                <RSelect
                  options={filterStatus}
                  value={{
                    value: formData.status,
                    label: formData.status,
                  }}
                  onChange={handleStatusChange}
                />
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">User Role</label>
              {/* {register("role", { required: "This field is required" })} */}
              <div className="form-control-wrap">
                <RSelect
                  options={roleOptions}
                  value={{
                    value: formData.role,
                    label: formData.role,
                  }}
                  onChange={handleRoleChange}
                />
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                {...register("password", { required: "This field is required" })}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              {errors.password && <span className="invalid">{errors.password.message}</span>}
            </div>
          </Col>
          {/* ... (Repeat similar code for other form fields) */}
          <Col size="12">
            <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
              <li>
                <Button color="primary" size="md" type="submit">
                  Add User
                </Button>
              </li>
              {/* <li>
                <a
                  href="#cancel"
                  onClick={(ev) => {
                    ev.preventDefault();
                    // Handle cancel action here (e.g., navigate back to a different page).
                  }}
                  className="link link-light"
                >
                  Cancel
                </a>
              </li> */}
            </ul>
          </Col>
        </Form>
      </div>
    </div>
  );
};

export default AddModal;
