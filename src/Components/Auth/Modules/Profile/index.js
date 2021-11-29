import React, {useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { isEmpty, isEqual } from 'lodash';

import Name from '../../../../Assets/name.png';
import Calendar from '../../../../Assets/calendar.png';
import Phone from '../../../../Assets/phone.png';
import Category from '../../../../Assets/categories.png';
import Address from '../../../../Assets/address.png';
import Email from '../../../../Assets/email.png';
import SSN from '../../../../Assets/identity-card.png';
import { updateCustomerOperation } from '../../../../State/Customers/operations';
import { updateEmployeeOperation } from '../../../../State/Employees/operations';
import { loginAction } from '../../../../State/Users/actions';
import baseURL from '../../../../Utils/baseUrl';

const Profile = ({ currentUser, actions, isManager }) => {
  const [user, setUserDetails] = useState(currentUser);
  const [img, setImg] = useState({});
  const [isLoading, setLoading] = useState(false);

  const setData = (e) => {
    const target = e.target.ariaLabel;
    if (isEqual(target, 'mobile_no') && isEqual(e.target.value.length, 11))
      return;
    setUserDetails({
      ...user,
      [target]: e.target.value,
    });
  }

  const uploadProfileImage = (e) => {
    const file = e.target.files[0];
    setImg(file);
  }

  const uploadImg = () => {
    const formData = new FormData();
    formData.append('img',img);
    setLoading(true);
    fetch(baseURL+"/api.php", {
      method: 'POST',
      body: formData
    })
    .then((res) => res.json() )
    .then((resp) => {
      setLoading(false);
      if (user.email.includes('@iw.com')) {
        actions.updateEmployeeOperation({...user, img: resp.url, isProfileUpdate: true})
        .then((response) => {
          loginAction(response);
        })
      } else {
        actions.updateCustomerOperation({...user, img: resp.url, isProfileUpdate: true})
        .then((response) => {
          loginAction(response);
        })
      }
    })
  }

  const updateProfileDetails = () => {
    if (isEmpty(img.name)) {
      if (user.email.includes('@iw.com')) {
        actions.updateEmployeeOperation({...user, isProfileUpdate: true})
      } else {
        actions.updateCustomerOperation({...user, isProfileUpdate: true})
      }
    } else
      uploadImg();
  }
  return (
    <Row className='profile-container'>
      <Col sm={3}>
        <Form.Group controlId="formFile" className="mb-3">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>              
              <label className="profile-image-container">
                <input type="file" accept="image/*"  onChange={uploadProfileImage}/>
                <img src={currentUser.img} alt="profile" className="profile-img" />
                <span className="hide">Change Picture</span>
              </label>
            </>
          )}
        </Form.Group>
      </Col>
      <Col sm={7}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Name} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="ID"
              aria-describedby="basic-addon1"
              value={user.id}
              onChange={() => {}}
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Email} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Email"
              aria-describedby="basic-addon1"
              value={user.email}
              onChange={() => {}}
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Calendar} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Date of Joining"
              aria-describedby="basic-addon1"
              value={user.doj}
              onChange={() => {}}
              type="date"
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Name} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Name"
              aria-describedby="basic-addon1"
              value={user.name}
              onChange={() => {}}
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Category} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Designation"
              aria-describedby="basic-addon1"
              value={user.type.toUpperCase()}
              onChange={() => {}}
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Phone} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Mobile No"
              aria-label="mobile_no"
              aria-describedby="basic-addon1"
              value={user.mobile_no}
              onChange={setData}
              type="number"
              max={10}
              min={10}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Address} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Address"
              aria_label="address"
              aria-describedby="basic-addon1"
              value={user.address}
              onChange={setData}
            />
          </Col>
        </Form.Group>
        {isManager && (
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1" id="basic-addon1">
              <img src={SSN} alt="Key" className="icon" />
            </Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder="SSN"
                aria_label="ssn"
                aria-describedby="basic-addon1"
                value={`***-**-${user.ssn}`}
                onChange={() => {}}
                disabled
              />
            </Col>
          </Form.Group>
        )}
        <Button onClick={updateProfileDetails} >Update Details</Button>
      </Col>
    </Row> 
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.Users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    updateCustomerOperation,
    updateEmployeeOperation,
    loginAction,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
