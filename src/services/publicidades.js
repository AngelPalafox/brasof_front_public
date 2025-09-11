import axios from './axios';
class Publicidad_services {
    static async get() {
        try {
            const response = await axios.get('publicidad');
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

    static async getById(id) {
        try {
            const response = await axios.get(`publicidad/${id}`);
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

    static async create(data) {
        try {
            const response = await axios.post('publicidad', data);
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

    static async update(id, data) {
        try {
            const response = await axios.put(`publicidad/${id}`, data);
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

    static async delete(id) {
        try {
            const response = await axios.delete(`publicidad/${id}`);
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
export default Publicidad_services