import axios from './axios';

class EventosService {
    async get() {
        try {
            const response = await axios.get('eventos');
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
export default new EventosService();