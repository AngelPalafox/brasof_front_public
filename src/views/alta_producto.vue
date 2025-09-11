<script setup>
import { onMounted, ref } from 'vue';
import productos_service from '@/services/productos'
import categorias_service from '@/services/categorias'
import locales_service from '@/services/locales'
import Swal from 'sweetalert2';
import router from '@/router';
import loader from '@/components/loader.vue';
const showLoader = ref(false)
const datos = ref({
    nombre: '',
    id_categoria: null,
    existencia: 0,
    id_local: null
})
const categorias = ref([])
const locales = ref([])
const ID = ref(null)
onMounted(async () => {
    await getService()

    ID.value = router.currentRoute.value.params.id ? atob(router.currentRoute.value.params.id) : null
    if (ID.value) {
        showLoader.value = true
        const producto = await productos_service.getById(ID.value)
        showLoader.value = false
        if (producto.tipo === 'error') {
            const message = producto.message.message ? producto.message.message : producto.message
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error',
                confirmButtonText: 'Aceptar',
            }).finally(() => {
                router.push('/productos')
            })
        }
        const data = producto.message.data
        datos.value.nombre = data.nombre
        datos.value.id_categoria = data.id_categoria
        datos.value.existencia = data.existencia
        datos.value.id_local = data.id_local
    }


})
const getService = async () => {
    showLoader.value = true
    const categorias_data = await categorias_service.get()
    const locales_data = await locales_service.get()
    categorias.value = categorias_data.message.data
    locales.value = locales_data.message.data
    showLoader.value = false
}
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
    if (!datos.value.existencia) {
        return Swal.fire({
            title: 'Error',
            text: 'El campo Existencia no debe estar vacío ingrese un valor mayor o igual a 0',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
    }
    if (datos.value.existencia < 0) {
        return Swal.fire({
            title: 'Error',
            text: 'El campo Existencia no puede ser negativo',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
    }
    guardar()

}
const guardar = async () => {
    showLoader.value = true
    let producto
    if (ID.value) {
        producto = await productos_service.update(ID.value, datos.value)
    }
    else {
        producto = await productos_service.create(datos.value)
    }
    showLoader.value = false
    const message = producto.message.message ? producto.message.message : producto.message
    Swal.fire({
        title: '',
        text: message,
        icon: producto.tipo
    }).finally(() => {
        if (producto.tipo === 'success') {
            router.push('/productos')
        }
    })

}
</script>
<template>
    <loader :visible="showLoader" />
    <div class="row">
        <div class="col-6">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" v-model="datos.nombre" placeholder="Ingrese nombre del producto" required
                class="CamposForms" :maxlength="100">
        </div>
        <div class="col-2">
            <label for="existencia">Existencia</label>
            <input type="number" name="existencia" v-model="datos.existencia"
                placeholder="Ingrese existencia del producto" class="CamposForms">
        </div>
        <div class="col-4">
            <label for="id_local">Local</label>
            <select name="id_local" v-model="datos.id_local" class="CamposForms">
                <option :value="null" selected disabled>Seleccione local</option>
                <option v-for="local in locales" :key="local.id_local" :value="local.id_local">
                    {{ local.nombre }}
                </option>
            </select>
        </div>
        <div class="col-4">
            <label for="id_categoria">Categoría</label>
            <select name="id_categoria" v-model="datos.id_categoria" class="CamposForms">
                <option :value="null" selected disabled>Seleccione categoría</option>
                <option v-for="categoria in categorias" :key="categoria.id_categoria" :value="categoria.id_categoria">
                    {{ categoria.nombre }}
                </option>
            </select>
        </div>
        <div class="col-4 offset-8">
            <button @click="validarEntrada" class="button">Guardar</button>
        </div>
    </div>
</template>