import { isEqual, map } from 'lodash';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showAllIncidentsOperation, addIncidentOperation, resolveIncidentOperation, updateIncidentOperation, deleteIncidentOperation } from '../../../../State/Incidents/operations';
import '../style.css';
import Edit from '../../../../Assets/edit.png';
import Delete from '../../../../Assets/delete.png';
import FormModal from './formModal';

const Incidents = ({ actions, allIncidents, isManager, currentUser }) => {
  const managerOptions = isManager ? ['Resolve'] : ['Edit', 'Delete']
  const tableHead = ['Inc. Id.', 'Date', 'Order Id', 'Issue', 'Status', ...managerOptions];
  const [incident, setIncident] = useState({ date: '', customerId: '', issue: '' });
  const [showFormModal, setShowFormModal] = useState(false);
  const [allIncidentsState, setAllIncidents] = useState(allIncidents);

  const resolveIncidentF = (data) => {
    actions.resolveIncidentOperation(data)
      .then(() => {
        actions.showAllIncidentsOperation({ customerId: currentUser.id, manager: isManager })
          .then((res) => {
            setAllIncidents(res);
          })
      })
  }

  const editIncident = (data) => {
    setIncident(data)
    setShowFormModal(true);
  }

  const deleteIncidentAlert = (data) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      actions.deleteIncidentOperation(data)
        .then(() => {
          actions.showAllIncidentsOperation({ customerId: currentUser.id })
            .then((res) => {
              setAllIncidents(res);
            })
        })
    }
  }

  useEffect(() => {
    actions.showAllIncidentsOperation({ customerId: currentUser.id, manager: isManager })
      .then(res => {
        setAllIncidents(res);
      })
  }, [])

  return (
    <>
      <div className="customer-header">
        <h4 className="content-title left mb-0">All Incidents</h4>
        {!isManager && (<Button
          variant="transparent"
          className="round-btn"
          onClick={() => setShowFormModal(true)}
        >Add New Incident</Button>)}
      </div>
      <table className="data-table" border="1">
        <tbody>
          <tr>
            {map(tableHead, (label, index) => (
              <th key={`${index}-head-customer`}>{label}</th>
            ))}
          </tr>
          {map(allIncidentsState, (data, index) => (
            <tr key={`${index}-table-entries-customer`}>
              <td>{data.id}</td>
              <td>{data.date}</td>
              <td>{data.order_id}</td>
              <td>{data.description}</td>
              <td>{data.status}</td>
              {isManager ? (
                <td>
                  {isEqual(data.status, 'unresolved') ?
                    <Button
                      variant={isEqual(data.status, 'resolved') ? 'info' : 'success'}
                      onClick={() => resolveIncidentF(data)}>
                      {isEqual(data.status, 'resolved') ? 'Resolved' : 'Resolve'}
                    </Button>
                    :
                    data.status}
                </td>
              ) : (
                <>
                  <td>
                    <Button
                      variant="transparent"
                      onClick={() => editIncident(data)}>
                      <img src={Edit} alt="edit-icon" className="table-btn-icon" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="transparent"
                      onClick={() => deleteIncidentAlert(data)}>
                      <img src={Delete} alt="edit-icon" className="table-btn-icon" />
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <FormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        incidentData={incident}
        addIncidentAction={actions.addIncidentOperation}
        updateIncidentAction={actions.updateIncidentOperation}
        setEditIncidentData={setIncident}
        userId={currentUser.id}
        showAllIncidentsOperation={actions.showAllIncidentsOperation}
        setAllIncidents={setAllIncidents}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  allIncidents: state.Incidents.allIncidents,
  currentUser: state.Users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    showAllIncidentsOperation,
    resolveIncidentOperation,
    updateIncidentOperation,
    deleteIncidentOperation,
    addIncidentOperation
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Incidents);
