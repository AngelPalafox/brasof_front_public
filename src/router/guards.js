import axios from "axios"

export const EXIST_TOKEN = async (to, from, next) => {

    const token = localStorage.getItem('token')
    validColorBody(to)
    if (!token) {
        next('/login')
    }
    next()
    const validSession = await validarSesion(token)
    if (!validSession) {
        localStorage.clear()
        window.location.href = '/login'
    }
}

export const VALID_LOGIN = async (to, from, next) => {
    const token = localStorage.getItem('token')
    validColorBody(to)
    if (token) {
        next('/')
    }
    else {
        next()
    }
}


function validColorBody(to) {
    const DARK_BODY = to.meta.dark_body ? true : false
    if (DARK_BODY) {
        document.body.style.backgroundColor = '#212121'
    }
    else {
        document.body.style.backgroundColor = '#f5f5f5'
    }
    return true
}

async function validarSesion(token) {
    try {
        const response = await axios.get(import.meta.env.VITE_OAUTH_SERVER + 'token/validate', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data.success) {
            return true
        }
        else {
            return false
        }

    } catch (error) {
        console.error(error)
        return false
    }
}