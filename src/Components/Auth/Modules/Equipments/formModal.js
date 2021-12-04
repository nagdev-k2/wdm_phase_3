import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { isEmpty } from 'lodash';
import { Button, Form, Col, Row } from 'react-bootstrap';

import Name from '../../../../Assets/name.png';
import Tag from '../../../../Assets/price-tag.png';
import Categories from '../../../../Assets/categories.png';
import money from '../../../../Assets/money.png';

const FormModal = ({
  equipmentData,
  addEquipmentAction,
  updateEquipmentAction,
  show,
  handleClose,
  setEditEquipmentData,
  showAllEquipmentsOperation,
  setAllEquipments,
}) => {
  const isEdit = !isEmpty(equipmentData.brand);
  const [equipment, setEquipment] = useState({});
  const [responseError, setResponseErrorMsg] = useState('');

  useEffect(() => {
    if (isEdit) setEquipment(equipmentData);
  }, [equipmentData]);

  const setData = (e) => {
    const target = e.target.ariaLabel.charAt(0).toLowerCase() + e.target.ariaLabel.slice(1);
    setEquipment({
      ...equipment,
      [target]: e.target.value,
    });
  }

  const submitForm = () => {
    if (isEdit) {
      updateEquipmentAction(equipment)
        .then((res) => {
          if (res === "true") {
            showAllEquipmentsOperation()
              .then((resp) => {
                setAllEquipments(resp);
              })
            alert('Entry Updated Successfully.')
            closeModal();
          } else {
            showAllEquipmentsOperation()
              .then((resp) => {
                setAllEquipments(resp);
              })
            setResponseErrorMsg(res);
            alert('Entry not Updated Successfully.')
          }
        })
    }
    else {
      addEquipmentAction(equipment)
        .then((res) => {
          if (res === "true") {
            showAllEquipmentsOperation()
              .then((resp) => {
                setAllEquipments(resp);
              })
            alert('New entry created successfully.')
            closeModal();
          } else {
            showAllEquipmentsOperation()
              .then((resp) => {
                setAllEquipments(resp);
              })
            setResponseErrorMsg(res);
            alert('Entry not Updated Successfully.')

          }
        })
    }
  }

  const closeModal = () => {
    setEquipment({});
    setEditEquipmentData({ date: '', brand: '', model_no: '', type: '', price: '' });
    setResponseErrorMsg("");
    handleClose();
  }

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Edit' : 'Add New'} Equipment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Name} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Equipment's Company"
              aria-label="brand"
              aria-describedby="basic-addon1"
              value={equipment.brand}
              onChange={setData}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Tag} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Model No"
              aria-label="model_no"
              aria-describedby="basic-addon1"
              value={equipment.model_no}
              onChange={setData}
              required
              type="number"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Categories} alt="Key" className="icon" />
          </Form.Label>
          <select
            aria-label="type"
            className="form-select custom"
            value={equipment.type}
            onChange={setData}
          >
            <option>Select Equipment Type</option>
            <option value="Washing Machine">Washing Machine</option>
            <option value="Dryer">Dryer</option>
            <option value="Iron">Iron</option>
          </select>
        </Form.Group>

        {isEdit ?
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1" id="basic-addon1">
              <img src={Categories} alt="Key" className="icon" />
            </Form.Label>
            <select
              aria-label="status"
              className="form-select custom"
              value={equipment.status}
              onChange={setData}
            >
              <option>Equipment Status</option>
              <option value="In Use">In Use</option>
              <option value="Out of Service">Out of Service</option>
            </select>
          </Form.Group>
          :
          (<>
          </>)

        }
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={money} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Amount"
              aria-label="price"
              aria-describedby="basic-addon1"
              value={equipment.price}
              onChange={setData}
              type="number"
              required
            />
          </Col>
        </Form.Group>
        <span className="error-msg">{responseError}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button variant="success" onClick={submitForm}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;

