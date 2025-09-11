import axios from "axios"
const axiosImages = axios.create({
    baseURL: import.meta.env.VITE_API_SERVICE + `imagenes`,
    headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
})
class ImagenesService {
    async subirImagen(data) {
        try {
            const response = await axiosImages.post("", data);
            return {
                message: response.data,
                tipo: "success",
            };
        } catch (error) {
            if (error.response.status === 413) {
                return {
                    message: "El tamaño de la imagen no puede ser mayor a 2mb",
                    tipo: "error",
                };
            }
            console.error(error);
            return {
                message: error.response.data.message,
                tipo: "error",
            };
        }
    }
    async getImagen() {
        try {
            const response = await axiosImages.get(`/`);
            return {
                message: response.data,
                tipo: "success",
            };
        } catch (error) {
            console.error(error);
            return {
                message: error.response.data.message,
                tipo: "error",
            };
        }
    }
}
export default new ImagenesService();