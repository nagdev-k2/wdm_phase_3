import { showAllEquipments } from "./actions"
import baseURL from "../../Utils/baseUrl"

export const addEquipmentOperation = (param) => {
    return () => {
        const url = new URL(baseURL + "/equipments/register_equipment.php"),
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

export const showAllEquipmentsOperation = () => {
    return (dispatch) => {
        const url = new URL(baseURL + "/equipments/get_equipment_list.php"),
            params = {}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        return fetch(url)
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    return response.error;
                } else {
                    dispatch(showAllEquipments(response));
                    return response;
                }
            })
            .catch((err) => {
                return err;
            });
    }
}


export const updateEquipmentOperation = (param) => {
    return () => {
        const url = new URL(baseURL + "/equipments/update_equipment.php"),
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

export const deleteEquipmentOperation = (param) => {
    return () => {
        const url = new URL(baseURL + "/equipments/delete_equipment.php"),
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