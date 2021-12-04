import { showAllOrders } from './actions';
import baseURL from '../../Utils/baseUrl';

export const addOrderOperation = (param) => {
    return () => {
        const url = new URL(baseURL + "/orders/create_new_order.php"),
            // const url = new URL("http://localhost:8000/api/create_new_order.php"),
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


export const showAllOrdersOperation = (param) => {
    return (dispatch) => {
        const url = new URL(baseURL + "/orders/show_all_orders.php"),
            // const url = new URL("http://localhost:8000/api/show_all_orders.php"),
            params = param
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        return fetch(url)
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    return response.error;
                } else {
                    dispatch(showAllOrders(response));
                    return response;
                }
            })
            .catch((err) => {
                return err;
            });
    }
}


export const updateOrderOperation = (param) => {
    return () => {
        const url = new URL(baseURL + "/orders/update_order.php"),
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

export const deleteOrderOperation = (param) => {
    return () => {
        const url = new URL(baseURL + "/orders/delete_order.php"),
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


export const getServiceTypes = () => {
    return () => {
        const url = new URL(baseURL + "/orders/service_types.php"),
            params = {}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        return fetch(url)
            .then((res) => res.json())
            .then((response) => {
                return response;
            })
            .catch((err) => {

                return err;
            });
    }
}