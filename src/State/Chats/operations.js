import { chatBaseURL } from "../../Utils/baseUrl";

export const getConversationOperation = (param) => {
  return () => {
    const url = new URL(chatBaseURL+"/conversations"),
      params = param
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.id) {
          return response;
        }
      })
      .catch((err) => {
        return err;
      });
  }
}

export const getAllMessagesOperations= (param) => {
  return () => {
    const url = new URL(chatBaseURL+"/messages"),
      params = param
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response && response.length >= 0) {
          return response;
        }
      })
      .catch((err) => {
        return err;
      });
  }
}

export const saveMessageOperations= (param) => {
  return () => {
    const url = new URL(chatBaseURL+"/messages/newMessage"),
      params = param
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          return true;
        }
      })
      .catch((err) => {
        return err;
      });
  }
}