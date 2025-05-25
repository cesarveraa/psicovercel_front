import axios from 'axios';

// Configuración común para las solicitudes
const config = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});

// Crear un nuevo comentario
export const createComment = async (comentario, token) => {
    try {
        const { data } = await axios.post('https://psicovercel-front-8ec8.vercel.app/api/pulpi/comentarios', { comentario }, config(token));
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

// Obtener todos los comentarios
export const getAllComments = async () => {
    try {
        const { data } = await axios.get('https://psicovercel-front-8ec8.vercel.app/api/pulpi/comentarios');
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

// Obtener un comentario por su ID
export const getCommentById = async (id) => {
    try {
        const { data } = await axios.get(`https://psicovercel-front-8ec8.vercel.app/api/pulpi/comentarios/${id}`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

// Editar un comentario existente
export const updateComment = async (id, comentario, token) => {
    try {
        const { data } = await axios.put(`https://psicovercel-front-8ec8.vercel.app/api/pulpi/comentarios/${id}`, { comentario }, config(token));
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

// Eliminar un comentario
export const deleteComment = async (id, token) => {
    try {
        const { data } = await axios.delete(`https://psicovercel-front-8ec8.vercel.app/api/pulpi/comentarios/${id}`, config(token));
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw Error(error.message);
    }
};
