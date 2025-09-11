<script setup>
import { onMounted, ref } from 'vue';
import categorias_service from '@/services/categorias'
import Swal from 'sweetalert2';
import router from '@/router';
import loader from '@/components/loader.vue';
const showLoader = ref(false)
const datos = ref({
    nombre: '',
    descripcion: ''
})
const ID = ref(null)
onMounted(async () => {
    ID.value = router.currentRoute.value.params.id ? atob(router.currentRoute.value.params.id) : null
    if (ID.value) {
        showLoader.value = true
        const categoria = await categorias_service.getById(ID.value)
        showLoader.value = false
        if (categoria.tipo === 'error') {
            const message = categoria.message.message ? categoria.message.message : categoria.message
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error',
                confirmButtonText: 'Aceptar',
            }).finally(() => {
                router.push('/categorias')
            })
        }
        const data = categoria.message.data
        datos.value.nombre = data.nombre
        datos.value.descripcion = data.descripcion
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
    let categoria
    if (ID.value) {
        categoria = await categorias_service.update(ID.value, datos.value)
    }
    else {
        categoria = await categorias_service.create(datos.value)
    }
    const message = categoria.message.message ? categoria.message.message : categoria.message
    showLoader.value = false
    Swal.fire({
        title: '',
        text: message,
        icon: categoria.tipo
    }).finally(() => {
        if (categoria.tipo === 'success') {
            router.push('/categorias')
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
        <div class="col-12">
            <label for="descripcion">Descripción</label>
            <textarea name="descripcion" v-model="datos.descripcion"
                placeholder="Ingrese una descripción para la categoría" class="CamposForms"></textarea>
        </div>
        <div class="col-4 offset-8">
            <button @click="validarEntrada" class="button">Guardar</button>
        </div>
    </div>
</template>