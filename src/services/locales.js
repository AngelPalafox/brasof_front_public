import axios from './axios';

class LocalesService {
    async get() {
        try {
            const response = await axios.get('locales');
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
            const response = await axios.get(`locales/${id}`);
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
            const response = await axios.post('locales', data);
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
            const response = await axios.put(`locales/${id}`, data);
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
            const response = await axios.delete(`locales/${id}`);
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

export default new LocalesService();