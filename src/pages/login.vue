<script setup>
import { ref } from 'vue'
import { OAUTH_CONFIG, generateState } from '@/config/oauth';
import Swal from 'sweetalert2';
import router from '@/router';
import axios from 'axios';
import loader from '@/components/loader.vue';
const isLoader = ref(false)
const login = () => {
    const state = generateState();
    const authUrl =
        `${OAUTH_CONFIG.oauth_server}login?` +
        `client_id=${OAUTH_CONFIG.client_id}&` +
        `redirect_uri=${encodeURIComponent(
            OAUTH_CONFIG.redirect_uri
        )}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(OAUTH_CONFIG.scope)}&` +
        `state=${state}&` +
        `popup=true`;
    localStorage.setItem('state', state);
    const popup = window.open(
        authUrl,
        "oauth_authorization",
        "width=500,height=600,scrollbars=yes,resizable=yes"
    );

    // Escuchar mensajes del popup
    const messageHandler = (event) => {
        if (event.data.type === "OAUTH_SUCCESS") {
            handleAuthorizationResponse(event.data.data);
            popup.close();
            window.removeEventListener("message", messageHandler);
        } else if (event.data.type === "OAUTH_ERROR") {
            Swal.fire({
                title: 'Error',
                text: event.data.error_description,
                icon: 'error',
                confirmButtonText: 'Aceptar',
            })
            popup.close();
            window.removeEventListener("message", messageHandler);
        }
    };

    window.addEventListener("message", messageHandler);
}

async function handleAuthorizationResponse(data) {
    isLoader.value = true
    if (data.code) {
        const authorizationCode = data.code;
        // Verificar state para seguridad
        const savedState = localStorage.getItem("state");
        if (data.state !== savedState) {
            isLoader.value = false
            return Swal.fire({
                title: 'Error',
                text: 'Los parámetros de autorización no coinciden, inténtalo de nuevo',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
            });
        }
        exchangeCodeForToken(authorizationCode);

    } else if (data.error) {
        isLoader.value = false
        Swal.fire({
            title: 'Error',
            text: `${data.error} - ${data.error_description}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
    }
}


async function exchangeCodeForToken(authorizationCode) {
    if (!authorizationCode) {
        isLoader.value = false
        return Swal.fire({
            title: 'Error',
            text: 'No hay código de autorización disponible',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
    }
    try {
        const response = await axios.post(
            `${OAUTH_CONFIG.oauth_server}token`,
            {
                grant_type: 'authorization_code',
                client_id: OAUTH_CONFIG.client_id,
                client_secret: OAUTH_CONFIG.client_secret,
                redirect_uri: OAUTH_CONFIG.redirect_uri,
                code: authorizationCode
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            }
        );

        const data = await response.data;
        if (!data || !data.access_token) {
            isLoader.value = false
            return Swal.fire({
                title: 'Error',
                text: 'No se ha obtenido el token, inténtelo de nuevo',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            })
        }
        localStorage.setItem('token', data.access_token);
        localStorage.removeItem('state');
        isLoader.value = false
        return Swal.fire({
            title: 'Success',
            text: 'Sesión iniciada con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            allowEscapeKey: false,
            allowOutsideClick: false,
        }).then(() => {
           window.location.href = '/'
        })
    } catch (error) {
        console.error(error);
        isLoader.value = false
        return Swal.fire({
            title: 'Error',
            text: `${error.message}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
    }
}
</script>

<template>
    <div class="form">
        <loader v-if="isLoader" />
        <div class="logo">
            <img src="../assets/logo.png" alt="logo" />
        </div>
        <div class="">
            <button class="button button-form" @click="login">Iniciar sesión</button>
        </div>
    </div>
</template>

<style>
img {
    width: 200px;
}

.footer p {
    color: #f5f5f5;
}

.form-login {
    margin-top: 50px;
}
</style>
