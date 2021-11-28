import { showAllCustomers } from "./actions"
import baseUrl from '../../Utils/baseUrl';
import { loginAction } from "../Users/actions";

export const addCustomerOperation = (param) => {
  return () => {
    const url = new URL(baseUrl+"/customers/add_customer.php"),
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

export const updateCustomerOperation = (param) => {
  return (dispatch) => {
    const url = new URL(baseUrl+"/customers/update_customer.php"),
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

export const deleteCustomerOperation = (param) => {
  return () => {
    const url = new URL(baseUrl+"/customers/delete_customer.php"),
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


export const showAllCustomersOperation = () => {
  return (dispatch) => {
    const url = new URL(baseUrl+"/admin/get_customer_list.php"),
      params = {}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          return response.error;
        } else {
          dispatch(showAllCustomers(response));
          return response;
        }
      })
      .catch((err) => {
        return err;
      });
  }
}