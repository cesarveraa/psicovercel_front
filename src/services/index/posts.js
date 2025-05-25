import axios from "axios";

export const getAllPosts = async (searchKeyword = "", page = 1, limit = 10, category = "") => {
  try {
    const { data, headers } = await axios.get(
      `https://psicovercel-front-8ec8.vercel.app/api/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}&category=${category}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`https://psicovercel-front-8ec8.vercel.app/api/posts/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message); 
    throw new Error(error.message);
  }
};

export const deletePost = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`https://psicovercel-front-8ec8.vercel.app/api/posts/${slug}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updatePost = async ({ updatedData, slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`https://psicovercel-front-8ec8.vercel.app/api/posts/${slug}`, updatedData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createPost = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`https://psicovercel-front-8ec8.vercel.app/api/posts`, {}, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const likePost = async (slug, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`https://psicovercel-front-8ec8.vercel.app/api/posts/${slug}/like`, {}, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const respondToEvent = async (slug, response, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`https://psicovercel-front-8ec8.vercel.app/api/posts/${slug}/respond`, { response }, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
