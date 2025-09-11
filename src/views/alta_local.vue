<script setup>
import { onMounted, ref } from 'vue';
import locales_service from '@/services/locales'
import Swal from 'sweetalert2';
import router from '@/router';
import loader from '@/components/loader.vue';
const showLoader = ref(false)
const datos = ref({
    nombre: '',
    giro_empresarial: '',
    correo_contacto: '',
})
const ID = ref(null)
onMounted(async () => {
    ID.value = router.currentRoute.value.params.id ? atob(router.currentRoute.value.params.id) : null
    if (ID.value) {
        showLoader.value = true
        const local = await locales_service.getById(ID.value)
        showLoader.value = false
        if (local.tipo === 'error') {
            const message = local.message.message ? local.message.message : local.message
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error',
                confirmButtonText: 'Aceptar',
            }).finally(() => {
                router.push('/locales')
            })
        }
        const data = local.message.data
        datos.value.nombre = data.nombre
        datos.value.giro_empresarial = data.giro_empresarial
        datos.value.correo_contacto = data.correo_contacto
    }

})
const validarEntrada = () => {
    if (datos.value.nombre === '') {
        return Swal.fire({
            title: 'Error',
            text: 'El campo Nombre es obligatorio',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
    }
    if (datos.value.nombre.length > 100) {
        return Swal.fire({
            title: 'Error',
            text: 'El campo Nombre no puede tener más de 100 caracteres',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
    }
    guardar()

}
const guardar = async () => {
    showLoader.value = true
    let local
    if (ID.value) {
        local = await locales_service.update(ID.value, datos.value)
    }
    else {
        local = await locales_service.create(datos.value)
    }
    showLoader.value = false
    const message = local.message.message ? local.message.message : local.message
    Swal.fire({
        title: '',
        text: message,
        icon: local.tipo
    }).finally(() => {
        if (local.tipo === 'success') {
            router.push('/locales')
        }
    })

}
</script>
<template>
    <loader :visible="showLoader" />
    <div class="row">
        <div class="col-6">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" v-model="datos.nombre" placeholder="Ingrese nombre de la categoría"
                required class="CamposForms" :maxlength="100">
        </div>
        <div class="col-6">
            <label for="giro_empresarial">Giro Empresarial</label>
            <input name="giro_empresarial" v-model="datos.giro_empresarial" placeholder="Ingrese el giro empresarial"
                class="CamposForms">
        </div>
        <div class="col-6">
            <label for="correo_contacto">Correo de Contacto</label>
            <input name="correo_contacto" v-model="datos.correo_contacto" placeholder="Ingrese el correo de contacto"
                class="CamposForms">
        </div>
        <div class="col-4 offset-8">
            <button @click="validarEntrada" class="button">Guardar</button>
        </div>
    </div>
</template>