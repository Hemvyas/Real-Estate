import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({ baseURL: "http://localhost:5000/api" });

export const getAllProperties = async () => {
  try {
    const res = await api.get(`/property/getAllProperty`, {
      timeout: 10 * 1000,
    });
    return res.data;
  } catch (error) {
    toast.error("Error al obtener las propiedades");
    console.log(error);
  }
};

export const getProperty = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/property/${id}`, {
      timeout: 10 * 1000,
    });
    return res.data;
  } catch (error) {
    toast.error("Error al obtener las propiedades");
    console.log(error);
  }
};

export const createUser = async (email, token) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/register",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    toast.error("Error al obtener las propiedades");
    console.log(error);
  }
};

export const bookVisit = async (propertyId, email, date, token) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/user/bookVisit/${propertyId}`,
      {
        email: email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Error al obtener las propiedades");
    console.log(error);
  }
};

export const getAllBooking = async (email) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/user/allBooking?email=${email}`,
      {
        timeout: 10 * 1000,
      }
    );
    return res.data;
  } catch (error) {
    toast.error("Error al obtener las propiedades");
    console.log(error);
  }
};

export const cancelBooking = async (email, id, token) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/user/removeBook/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Error al obtener las propiedades");
    console.log(error);
  }
};

export const addLike = async (id, token, email) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/user/addFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Error al obtener las propiedades");
    console.log(error);
  }
};

export const getLike = async (email) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/user/allFav?email=${email}`,
      {
        timeout: 10 * 1000,
      }
    );
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Network response was not ok.");
    }
    return res.data;
  } catch (error) {
    toast.error("Error al obtener las propiedades");
    console.log(error);
  }
};

export const createResidency = async (data, token) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/property/create`,
      data,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
