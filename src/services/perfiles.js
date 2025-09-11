import axios from './axios';


const baseUrl = 'perfiles';

class PerfilesService {
    async get() {
        try {
            const response = await axios.get(baseUrl);
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
export default new PerfilesService();