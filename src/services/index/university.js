import axios from "axios";

export const getAllUniversities = async (searchKeyword = "", page = 1, limit = 10) => {
  try {
    const { data, headers } = await axios.get(`https://psicovercel-front-8ec8.vercel.apphttps://psicovercel-front-8ec8.vercel.app/api/universities?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`);
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};


export const getSingleUniversity = async (slug) => {
  try {
    const { data, headers } = await axios.get(`https://psicovercel-front-8ec8.vercel.apphttps://psicovercel-front-8ec8.vercel.app/api/universities/slug/${slug}`);
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};


export const deleteUniversity = async ({ id, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`https://psicovercel-front-8ec8.vercel.app/api/universities/${id}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateUniversity = async ({ updatedData, id, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`https://psicovercel-front-8ec8.vercel.app/api/universities/${id}`, updatedData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createUniversity = async ({ newUniversityData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`https://psicovercel-front-8ec8.vercel.app/api/universities`, newUniversityData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
