import axios from "axios";

// Actualizar un detalle de "About Us"
export const updateAbout = async (slug, updatedData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    };

    const { data } = await axios.put(`https://psicovercel-front-8ec8.vercel.app/api/about/${slug}`, updatedData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

// Obtener un solo detalle de "About Us"
export const getSingleAbout = async (slug) => {
  try {
    const { data } = await axios.get(`https://psicovercel-front-8ec8.vercel.app/api/about/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
