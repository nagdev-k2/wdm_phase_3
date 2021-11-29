import { showAllEmployees } from "./actions"
import baseURL from "../../Utils/baseUrl"
import { loginAction } from "../Users/actions"

export const addEmployeeOperation = (param) => {
  return () => {
    const url = new URL(baseURL + "/admin/register_personnel.php"),
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

export const showAllEmployeesOperation = () => {
  return (dispatch) => {
    const url = new URL(baseURL + "/admin/get_employee_list.php"),
      params = {}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          return response.error;
        } else {
          dispatch(showAllEmployees(response));
          return response;
        }
      })
      .catch((err) => {
        return err;
      });
  }
}


export const updateEmployeeOperation = (param) => {
  return (dispatch) => {
    const url = new URL(baseURL + "/admin/update_employee.php"),
      params = param
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0 && response[0].id) {
          if (param.isProfileUpdate)
            dispatch(loginAction(response[0]));
          else return true;
        }
      })
      .catch((err) => {
        return err;
      });
  }
}

export const deleteEmployeeOperation = (param) => {
  return () => {
    const url = new URL(baseURL + "/admin/delete_employee.php"),
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