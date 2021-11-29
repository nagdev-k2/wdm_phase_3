import { loginAction, registerAction } from './actions';
import baseURL from '../../Utils/baseUrl';

export const loginOperation = ({ username, password }) => {
  return (dispatch) => {
    const url = new URL(baseURL + "/login.php"),
      params = { username, password }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response && response.id) {
          dispatch(loginAction(response));
          return response;
        }
        else {
          return { errMsg: "user credentials are invalid" };
        }
      })
      .catch((err) => {

        return err;
      });
  }
}

export const registerOperation = (user) => {
  return (dispatch) => {
    const url = new URL(baseURL + "/register.php"),
      // const url = new URL("http://localhost:8000/api/register"), // checking API built in laravel
      params = user
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "false") {
          return response;
        } else {
          return response;
        }
      })
      .catch((err) => {
        return err;
      });
  }
}