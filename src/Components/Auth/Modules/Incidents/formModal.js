import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { isEmpty } from 'lodash';
import { Button, Form, Col, Row } from 'react-bootstrap';

import Issue from '../../../../Assets/issue.png';
import Date from '../../../../Assets/calendar.png';

const FormModal = ({
  userId,
  incidentData,
  addIncidentAction,
  updateIncidentAction,
  show,
  handleClose,
  setEditIncidentData,
  showAllIncidentsOperation,
  setAllIncidents,
}) => {
  const isEdit = !isEmpty(incidentData.description);
  const [incident, setIncident] = useState({});

  useEffect(() => {
    if (isEdit) setIncident(incidentData);
  }, [incidentData]);

  const setData = (e) => {
    const target = e.target.ariaLabel.charAt(0).toLowerCase() + e.target.ariaLabel.slice(1);
    setIncident({
      ...incident,
      [target]: e.target.value,
    });
  }

  const submitForm = () => {
    if (isEdit) {
      updateIncidentAction(incident)
      .then((res) => {
        if (res) {
          showAllIncidentsOperation({customerId: userId})
          .then((resp) => {
            setAllIncidents(resp);
          })
          alert('Entry Updated Successfully.')
        }
      })
    }
    else {
      addIncidentAction({ ...incident, customerId: userId })
      .then((res)=> {
        if (res) {
          showAllIncidentsOperation({customerId: userId})
          .then((resp) => {
            setAllIncidents(resp);
          })
          alert('New entry created successfully.')
        }
      })
    }
    closeModal();
  }

  const closeModal = () => {
    setIncident({});
    setEditIncidentData({ date: '', customerId: '', description: '' });
    handleClose();
  }

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Edit' : 'Add New'} Incident</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Issue} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Issue Description"
              aria-label="description"
              aria-describedby="basic-addon1"
              value={incident.description}
              onChange={setData}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1" id="basic-addon1">
            <img src={Date} alt="Key" className="icon" />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Order Id"
              aria-label="orderId"
              aria-describedby="basic-addon1"
              value={incident.order_id}
              onChange={setData}
              type="number"
              required
            />
          </Col>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button variant="success" onClick={submitForm}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;
