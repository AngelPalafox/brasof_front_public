import axios from './axios';

class ProductosService {
    async get() {
        try {
            const response = await axios.get('productos');
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
            const response = await axios.get(`productos/${id}`);
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
            const response = await axios.post('productos', data);
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
            const response = await axios.put(`productos/${id}`, data);
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
            const response = await axios.delete(`productos/${id}`);
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

export default new ProductosService();