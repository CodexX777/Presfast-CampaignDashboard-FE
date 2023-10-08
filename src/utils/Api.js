import axios from "axios";

const api = axios.create({
  baseURL: "https://kind-gold-camel-cap.cyclic.app/api",
});

const login = async (email, password, token) => {
  try {
    const response = await api.post(
      "/auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getUsers = async (token) => {
  let response;
  try {
    response = await api.get("/admin/get-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // withCredentials:true
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const uploadPresfastProduct = async (token, data) => {
  let response;
  try {
    response = await api.post("/admin/add-presfast-product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const uploadHungryJackProduct = async (token, data) => {
  let response;
  try {
    response = await api.post("/admin/add-hungryjack-product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getAllPresfastProducts = async (token) => {
  let response;
  try {
    response = await api.get("/items/all-presfast-products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // withCredentials:true
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getAllHungryJackProducts = async (token) => {
  let response;
  try {
    response = await api.get("/items/all-hungryjack-products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // withCredentials:true
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const addUser = async (token, data) => {
  let response;
  try {
    response = await api.post("/admin/add-user", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addStore = async (token, data) => {
  try {
    const response = await api.post("/admin/add-store", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllStores = async (token) => {
  try {
    const response = await api.get("/admin/get-stores", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getStoreTypeOptions = async (token, data) => {
  try {
    const response = await api.post(
      "/items/get-store-type-options",
      { regionList: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createCampaign = async (token, data) => {
  try {
    const response = await api.post("/items/schedule-campaign", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  login,
  getUsers,
  addUser,
  addStore,
  createCampaign,
  getAllStores,
  uploadPresfastProduct,
  getAllPresfastProducts,
  uploadHungryJackProduct,
  getStoreTypeOptions,
  getAllHungryJackProducts,
};
