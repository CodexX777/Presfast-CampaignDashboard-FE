import React from "react";
import { Icon, RSelect } from "../../../../components/Component";
import { Button } from "reactstrap";
import data from "../Data"

const CreateFolder = ({ toggle }) => {

  return (
    <React.Fragment>
      <a
        href="#close"
        onClick={(ev) => {
          ev.preventDefault();
          toggle();
        }}
        className="close"
      >
        <Icon name="cross-sm"></Icon>
      </a>
      <div className="modal-body modal-body-md">
        <div className="nk-upload-form mb-0">
          <h5 className="title mb-3">Create Folder</h5>
          <form>
            <div className="form-group">
              <label className="form-label">Folder Name</label>
              <input type="text" className="form-control"></input>
            </div>
            <div className="form-group">
              <label className="form-label">Folder Type</label>
              <RSelect
                options={data.folderTypes}
                defaultValue={data.folderTypes[0]}
              />
            </div>
            <ul className="btn-toolbar g-4 align-center justify-end">
              <li>
                <a
                  href="#"
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggle();
                  }}
                  className="link link-primary"
                >
                  Cancel
                </a>
              </li>
              <li>
                <Button color="primary" type="submit" onClick={(ev) => {
                    ev.preventDefault();
                    toggle();
                  }}>
                  Create
                </Button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateFolder;
