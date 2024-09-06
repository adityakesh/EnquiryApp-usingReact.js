//import logo from './logo.svg';
import "./App.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
/* eslint-disable eqeqeq */

function App() {
  let [formData, setFormData] = useState({
    uname: "",
    uemail: "",
    uphone: "",
    umessage: "",
    index: "",
  });

  let getValue = (event) => {
    let oldData = { ...formData };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  let [userData, setUserData] = useState([]);

  let handleSubmit = (event) => {
    let currentUserFormdata = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      umessage: formData.umessage,
    };
    if (formData.index == "") {
      let checkFilterUser = userData.filter(
        (v) => v.uemail == formData.uemail || v.uphone == formData.uphone
      );

      if (checkFilterUser.length == 1) {
        toast.error("Email or Phone Number already Exist...");
      } else {
        let oldUserData = [...userData, currentUserFormdata];
        setUserData(oldUserData);
        setFormData({
          uname: "",
          uemail: "",
          uphone: "",
          umessage: "",
          index: "",
        });
      }
    } else {
      let editIndex = formData.index;
      let oldData = userData;

      let checkFilterUser = userData.filter(
        (v, i) =>
          (v.uemail === formData.uemail || v.uphone === formData.uphone) &&
          i !== editIndex
      );

      if (checkFilterUser == 0) {
        oldData[editIndex]["uname"] = formData.uname;
        oldData[editIndex]["uemail"] = formData.uemail;
        oldData[editIndex]["uphone"] = formData.uphone;
        oldData[editIndex]["umessage"] = formData.umessage;
        setUserData(oldData);

        setFormData({
          uname: "",
          uemail: "",
          uphone: "",
          umessage: "",
          index: "",
        });
      } else {
        toast.error("Email or Phone Number already Exist...");
      }
    }
    event.preventDefault();
  };

  let deleteRow = (indexNumber) => {
    let filterDatafterDelete = userData.filter((v, i) => i !== indexNumber);
    toast.success("Data Delete");
    setUserData(filterDatafterDelete);
  };

  let editRow = (indexNumber) => {
    let editData = userData.filter((v, i) => i === indexNumber)[0];
    editData["index"] = indexNumber;
    setFormData(editData);
  };

  return (
    <Container fluid>
      <ToastContainer />
      <Container>
        <Row>
          <Col className="text-center py-5">
            <h1>Enquiry Now</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <form onSubmit={handleSubmit}>
              <div className="pb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  onChange={getValue}
                  value={formData.uname}
                  name="uname"
                  className="form-control"
                />
              </div>
              <div className="pb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  onChange={getValue}
                  value={formData.uemail}
                  name="uemail"
                  className="form-control"
                />
              </div>
              <div className="pb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  onChange={getValue}
                  value={formData.uphone}
                  name="uphone"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="" className="form-label">
                  Message
                </label>
                <textarea
                  class="form-control"
                  onChange={getValue}
                  value={formData.umessage}
                  name="umessage"
                  id=""
                  rows="3"
                />
              </div>
              <button className="btn btn-primary">
                {formData.index !== "" ? "Update" : "Save"}
              </button>
            </form>
          </Col>
          <Col lg={7}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length >= 1 ? (
                  userData.map((obj, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{obj.uname}</td>
                        <td>{obj.uemail}</td>
                        <td>{obj.uphone}</td>
                        <td>{obj.umessage}</td>
                        <td>
                          <button onClick={() => deleteRow(index)}>
                            Delete
                          </button>
                          <button onClick={() => editRow(index)}>Edit</button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>No Data Found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
