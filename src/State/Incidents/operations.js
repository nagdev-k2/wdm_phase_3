import { showAllIncidents } from './actions';
import baseURL from '../../Utils/baseUrl';

export const addIncidentOperation = (param) => {
  return () => {
    const url = new URL(baseURL + "/incidents/register_incident.php"),
      params = param
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'true') {
          return "true";
        }
        if (response.status === 'false') {
          return response.msg;
        }
      })
      .catch((err) => {

        return err;
      });
  }
}

export const resolveIncidentOperation = (param) => {
  return () => {
    const url = new URL(baseURL + "/incidents/resolve_incident.php"),
      params = param
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'true') {
          return "true";
        }
        if (response.status === 'false') {
          return response.msg;
        }
      })
      .catch((err) => {

        return err;
      });
  }
}

export const updateIncidentOperation = (param) => {
  return () => {
    const url = new URL(baseURL + "/incidents/update_incident.php"),
      params = param
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'true') {
          return "true";
        }
        if (response.status === 'false') {
          return response.msg;
        }
      })
      .catch((err) => {

        return err;
      });
  }
}

export const deleteIncidentOperation = (param) => {
  return () => {
    const url = new URL(baseURL + "/incidents/delete_incident.php"),
      params = param
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'true') {
          return true;
        }
      })
      .catch((err) => {

        return err;
      });
  }
}


export const showAllIncidentsOperation = (param) => {
  return (dispatch) => {
    const url = new URL(baseURL + "/incidents/show_all_incidents.php"),
      params = param
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          return response.error;
        } else {
          dispatch(showAllIncidents(response));
          return response;
        }
      })
      .catch((err) => {
        return err;
      });
  }
}