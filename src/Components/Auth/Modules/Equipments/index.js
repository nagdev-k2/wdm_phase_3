import { isEqual, map } from 'lodash';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Edit from '../../../../Assets/edit.png';
import Delete from '../../../../Assets/delete.png';
import { showAllEquipmentsOperation, addEquipmentOperation, deleteEquipmentOperation, updateEquipmentOperation } from '../../../../State/Equipments/operations';
import '../style.css';
import FormModal from './formModal';

const tableHead = ['Euip. Id', 'Date', 'Brand', 'Model Number', 'Status', 'Type', 'Edit', 'Delete'];

const Equipments = ({ actions, allEquipments }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedEquipment, setEquipment] = useState({ date: '', company: '', modelNo: '', type: '', money: '' });
  const [allEquipmentsState, setAllEquipments] = useState(allEquipments);


  const editEquipment = (data) => {
    setEquipment(data)
    setShowFormModal(true);
  }

  const deleteEquipmentAlert = (data) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      actions.deleteEquipmentOperation(data)
        .then(() => {
          actions.showAllEquipmentsOperation({})
            .then((res) => {
              setAllEquipments(res);
            })
        })

      // actions.deleteEquipment(data);
    }
  }

  useEffect(() => {
    actions.showAllEquipmentsOperation({})
      .then(res => {
        setAllEquipments(res);
      })
  }, [])

  const checkOutOfService = (data) => {
    if (isEqual(data.status, 'Out of Service'))
      return true;
    else return false;
  }

  return (
    <>
      <div className="customer-header">
        <h4 className="content-title left mb-0">All Equipments</h4>
        <Button
          variant="transparent"
          className="round-btn"
          onClick={() => setShowFormModal(true)}
        >Add New Equipment</Button>
      </div>
      <table className="data-table" border="1">
        <tbody>
          <tr>
            {map(tableHead, (label, index) => (
              <th key={`${index}-head-customer`}>{label}</th>
            ))}
          </tr>
          {map(allEquipmentsState, (data, index) => (
            <tr key={`${index}-table-entries-customer`} className={`${checkOutOfService(data) ? 'danger' : ''}`}>
              <td>{data.id}</td>
              <td>{data.date}</td>
              <td>{data.brand}</td>
              <td>{data.model_no}</td>
              <td>{data.status}</td>
              <td>{data.type}</td>
              <td>
                <Button variant="transparent" onClick={() => editEquipment(data)}>
                  <img src={Edit} alt="edit-data" className="table-btn-icon" />
                </Button>
              </td>
              <td>
                <Button variant="transparent" onClick={() => deleteEquipmentAlert(data)}>
                  <img src={Delete} alt="delete-data" className="table-btn-icon" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        equipmentData={selectedEquipment}
        addEquipmentAction={actions.addEquipmentOperation}
        updateEquipmentAction={actions.updateEquipmentOperation}
        setEditEquipmentData={setEquipment}
        showAllEquipmentsOperation={actions.showAllEquipmentsOperation}
        setAllEquipments={setAllEquipments}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  allEquipments: state.Equipments.allEquipments,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    showAllEquipmentsOperation,
    addEquipmentOperation,
    updateEquipmentOperation,
    deleteEquipmentOperation
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Equipments);
