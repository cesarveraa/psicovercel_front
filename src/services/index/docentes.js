import axios from "axios";

export const getAllDocentes = async (searchKeyword = "", page = 1, limit = 10) => {
  try {
    // Asegúrate de que la URL base coincide con la configuración de tu servidor
    const { data, headers } = await axios.get(`https://psicovercel-front-8ec8.vercel.apphttps://psicovercel-front-8ec8.vercel.app/api/docente?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`);
    console.log(data); // Opcional, para depuración
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};



export const getDocente = async (id) => {
  try {
    const { data } = await axios.get(`https://psicovercel-front-8ec8.vercel.app/api/docente/${id}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteDocente = async ({ id, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`https://psicovercel-front-8ec8.vercel.app/api/docentes/${id}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateDocente = async ({ updatedData, id, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`https://psicovercel-front-8ec8.vercel.app/api/docentes/${id}`, updatedData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createDocente = async ({ docenteData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`https://psicovercel-front-8ec8.vercel.app/api/docentes`, docenteData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
