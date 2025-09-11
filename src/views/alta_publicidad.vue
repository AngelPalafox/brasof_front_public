<script setup>
import { onMounted, ref } from 'vue';
import publicidad_service from '@/services/publicidades'
import producto_service from '@/services/productos'
import evento_service from '@/services/eventos'
import perfiles_service from '@/services/perfiles'
import Swal from 'sweetalert2';
import router from '@/router';
import loader from '@/components/loader.vue';
const showLoader = ref(false)
const datos = ref({
    nombre: '',
    id_producto: null,
    descripcion: '',
    oferta: '',
    precio: 0,
    id_evento: null,
    rol_destino: null,
})
const data_productos = ref([])
const data_eventos = ref([])
const data_perfiles = ref([])
const ID = ref(null)
onMounted(async () => {
    await getService()
    ID.value = router.currentRoute.value.params.id ? atob(router.currentRoute.value.params.id) : null
    if (ID.value) {
        showLoader.value = true
        const publicidad = await publicidad_service.getById(ID.value)
        showLoader.value = false
        if (publicidad.tipo === 'error') {
            const message = publicidad.message.message ? publicidad.message.message : publicidad.message
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error',
                confirmButtonText: 'Aceptar',
            }).finally(() => {
                router.push('/publicidad')
            })
        }
        const data = publicidad.message.data
        datos.value.nombre = data.nombre
        datos.value.id_producto = data.producto.id_producto
        datos.value.descripcion = data.descripcion
        datos.value.oferta = data.oferta
        datos.value.precio = data.precio
        datos.value.id_evento = data.evento.id_evento
        datos.value.rol_destino = data?.rol_destino || null
    }

})
const getService = async () => {
    showLoader.value = true
    const productos_data = await producto_service.get()
    const eventos_data = await evento_service.get()
    const perfiles_data = await perfiles_service.get()
    showLoader.value = false
    if (productos_data.tipo === 'error') {
        const message = productos_data.message.message ? productos_data.message.message : productos_data.message
        Swal.fire({
            title: 'Error',
            text: message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        }).finally(() => {
            router.push('/')
        })
    }
    if (eventos_data.tipo === 'error') {
        const message = eventos_data.message.message ? eventos_data.message.message : eventos_data.message
        Swal.fire({
            title: 'Error',
            text: message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        }).finally(() => {
            router.push('/')
        })
    }
    if (perfiles_data.tipo === 'error') {
        const message = perfiles_data.message.message ? perfiles_data.message.message : perfiles_data.message
        Swal.fire({
            title: 'Error',
            text: message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        }).finally(() => {
            router.push('/')
        })
    }
    data_productos.value = productos_data.message.data
    data_eventos.value = eventos_data.message.data
    data_perfiles.value = perfiles_data.message.data
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
    guardar()

}
const guardar = async () => {
    showLoader.value = true
    let publicidad
    if (ID.value) {
        publicidad = await publicidad_service.update(ID.value, datos.value)
    }
    else {
        publicidad = await publicidad_service.create(datos.value)
    }
    showLoader.value = false
    const message = publicidad.message.message ? publicidad.message.message : publicidad.message
    Swal.fire({
        title: '',
        text: message,
        icon: publicidad.tipo
    }).finally(() => {
        if (publicidad.tipo === 'success') {
            router.push('/publicidad')
        }
    })

}
</script>
<template>
    <loader :visible="showLoader" />
    <div class="row">
        <div class="col-4">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" v-model="datos.nombre" placeholder="Ingrese nombre de la categoría"
                required class="CamposForms" :maxlength="100">
        </div>
        <div class="col-4">
            <label for="id_evento">Evento</label>
            <select name="id_evento" v-model="datos.id_evento" class="CamposForms">
                <option :value="null" selected disabled>Seleccione evento</option>
                <option v-for="evento in data_eventos" :key="evento.id_evento" :value="evento.id_evento">
                    {{ evento.nombre }}
                </option>
            </select>
        </div>
        <div class="col-4">
            <label for="rol_destino">Perfil</label>
            <select name="rol_destino" v-model="datos.rol_destino" class="CamposForms">
                <option :value="null" selected disabled>Seleccione perfil</option>
                <option v-for="perfil in data_perfiles" :key="perfil" :value="perfil">
                    {{ perfil }}
                </option>
            </select>
        </div>
        <div class="col-4">
            <label for="id_producto">Producto</label>
            <select name="id_producto" v-model="datos.id_producto" class="CamposForms">
                <option :value="null" selected disabled>Seleccione producto</option>
                <option v-for="producto in data_productos" :key="producto.id_producto" :value="producto.id_producto">
                    {{ producto.nombre }}
                </option>
            </select>
        </div>
        <div class="col-6">
            <label for="oferta">Oferta</label>
            <input type="text" name="oferta" v-model="datos.oferta" placeholder="Ingrese la oferta" required
                class="CamposForms" :maxlength="100">
        </div>
        <div class="col-6">
            <label for="precio">Precio</label>
            <input type="number" name="oferta" v-model="datos.precio" placeholder="Ingrese el precio" required
                class="CamposForms">
        </div>
        <div class="col-12">
            <label for="descripcion">Descripción</label>
            <textarea name="descripcion" v-model="datos.descripcion" placeholder="Ingrese la descripción"
                class="CamposForms"></textarea>
        </div>
        <div class="col-4 offset-8">
            <button @click="validarEntrada" class="button">Guardar</button>
        </div>
    </div>
</template>