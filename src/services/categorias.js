import axios from './axios';

class CategoriasService {
    async get() {
        try {
            const response = await axios.get('categorias');
            return {
                message: response.data,
                tipo: 'success'
            }
        } catch (error) {
            console.error(error);
            return {
                message: error.response.data.message,
                tipo: 'error'
            }
        }
    }
    async getById(id) {
        try {
            const response = await axios.get(`categorias/${id}`);
            return {
                message: response.data,
                tipo: 'success'
            }
        } catch (error) {
            console.error(error);
            return {
                message: error.response.data.message,
                tipo: 'error'
            }
        }

    }
    async create(data) {
        try {
            const response = await axios.post('categorias', data);
            return {
                message: response.data,
                tipo: 'success'
            }
        } catch (error) {
            console.error(error);
            return {
                message: error.response.data.message,
                tipo: 'error'
            }
        }
    }
    async update(id, data) {
        try {
            const response = await axios.put(`categorias/${id}`, data);
            return {
                message: response.data,
                tipo: 'success'
            }
        } catch (error) {
            console.error(error);
            return {
                message: error.response.data.message,
                tipo: 'error'
            }
        }
    }
    async delete(id) {
        try {
            const response = await axios.delete(`categorias/${id}`);
            return {
                message: response.data,
                tipo: 'success'
            }
        } catch (error) {
            console.error(error);
            return {
                message: error.response.data.message,
                tipo: 'error'
            }
        }
    }
}

export default new CategoriasService();