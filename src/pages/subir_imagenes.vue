<script setup>
import { onMounted, ref } from 'vue'
import publicidad_service from '@/services/publicidades'
import producto_service from '@/services/productos'
import evento_service from '@/services/eventos'
import imagenes_service from '@/services/imagenes'
import Swal from 'sweetalert2'
import router from '@/router'
import loader from '@/components/loader.vue'

const showLoader = ref(false)
const DATA_PUBLICIDAD = ref([])
const DATA_PRODUCTO = ref([])
const DATA_EVENTO = ref([])
const tipo_entidad = ref([])
const data = ref({
    imagen: [],
    tipo_entidad: null,
    id_entidad: null,
    orden: null,
})

onMounted(async () => {
    await getData()
})

async function getData() {
    try {
        showLoader.value = true

        const [publicidades, productos, eventos] = await Promise.all([
            publicidad_service.get(),
            producto_service.get(),
            evento_service.get()
        ])

        if (publicidades?.tipo === 'error' || productos?.tipo === 'error' || eventos?.tipo === 'error') {
            return router.push('/')
        }

        DATA_PUBLICIDAD.value = publicidades.message?.data || []
        DATA_PRODUCTO.value = productos.message?.data || []
        DATA_EVENTO.value = eventos.message?.data || []
        if (DATA_PUBLICIDAD.value.length > 0) tipo_entidad.value.push('publicidad')
        if (DATA_PRODUCTO.value.length > 0) tipo_entidad.value.push('producto')
        if (DATA_EVENTO.value.length > 0) tipo_entidad.value.push('evento')
    } catch (error) {
        console.error("Error cargando datos:", error)
        Swal.fire("Error", "No se pudieron cargar los datos", "error")
        router.push('/')
    } finally {
        showLoader.value = false
    }
}

function onChange(e) {
    const files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    data.value.imagen = Array.from(files)
}

async function subirImagen() {
    if (!data.value.imagen.length && data.value.imagen.length > 1) {
        return Swal.fire("Error", "Debes seleccionar una imagen", "warning")
    }
    if (data.value.imagen[0].size > 2000000) {
        return Swal.fire("Error", "El tamaño de la imagen no puede ser mayor a 2mb", "warning")
    }
    if (data.value.tipo_entidad == null || data.value.tipo_entidad === '') {
        return Swal.fire("Error", "Debes seleccionar un tipo", "warning")
    }
    if (data.value.id_entidad == null || data.value.id_entidad === '') {
        let tipo = ''
        if (data.value.tipo_entidad === 'PRODUCTO') tipo = 'un producto'
        if (data.value.tipo_entidad === 'EVENTO') tipo = 'un evento'
        if (data.value.tipo_entidad === 'PUBLICIDAD') tipo = 'una publicidad'
        return Swal.fire("Error", `Debes seleccionar ${tipo}`, "warning")
    }
    showLoader.value = true
    const formData = new FormData()
    formData.append('imagen', data.value.imagen[0])
    formData.append('tipo_entidad', data.value.tipo_entidad)
    formData.append('id_entidad', data.value.id_entidad)

    if (data.value.orden) {
        formData.append('orden', data.value.orden)
    }
    const response = await imagenes_service.subirImagen(formData)
    showLoader.value = false
    if (response.tipo === 'success') {
        Swal.fire({
            title: 'Éxito',
            text: 'La imagen se ha subido correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
        })
        data.value.imagen = []
        data.value.id_entidad = null
        data.value.tipo_entidad = null
        data.value.orden = null
        document.getElementById('image').value = ''
    } else {
        Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
    }
}
</script>

<template>
    <loader :visible="showLoader" />
    <div class="row">
        <div class="col-12">
            <input type="file" name="image" id="image" accept="image/*" class="CamposForms" @change="onChange" />
        </div>
        <div class="col-4">
            <label for="tipo_entidad">Tipo</label>
            <select name="tipo_entidad" id="tipo_entidad" v-model="data.tipo_entidad" class="CamposForms">
                <option :value="null" selected disabled>Selecciona una opción</option>
                <option v-for="entidad in tipo_entidad" :key="entidad" :value="entidad">
                    {{ entidad }}
                </option>
            </select>
        </div>
        <div class="col-4" v-if="data.tipo_entidad === 'producto'">
            <label for="">Productos</label>
            <select name="id_entidad" id="id_entidad" v-model="data.id_entidad" class="CamposForms">
                <option :value="null" selected disabled>Selecciona una opción</option>
                <option v-for="producto in DATA_PRODUCTO" :key="producto.id_producto" :value="producto.id_producto">
                    {{ producto.nombre }}
                </option>
            </select>
        </div>
        <div class="col-4" v-if="data.tipo_entidad === 'evento'">
            <label for="">Eventos</label>
            <select name="id_entidad" id="id_entidad" v-model="data.id_entidad" class="CamposForms">
                <option :value="null" selected disabled>Selecciona una opción</option>
                <option v-for="evento in DATA_EVENTO" :key="evento.id_evento" :value="evento.id_evento">
                    {{ evento.nombre }}
                </option>
            </select>
        </div>
        <div class="col-4" v-if="data.tipo_entidad === 'publicidad'">
            <label for="">Publicidades</label>
            <select name="id_entidad" id="id_entidad" v-model="data.id_entidad" class="CamposForms">
                <option :value="null" selected disabled>Selecciona una opción</option>
                <option v-for="publicidad in DATA_PUBLICIDAD" :key="publicidad.id_publicidad"
                    :value="publicidad.id_publicidad">
                    {{ publicidad.nombre }}
                </option>
            </select>
        </div>
        <div class="col-4 offset-8 mt-2">
            <button class="button" @click="subirImagen">Subir Imagen</button>
        </div>
    </div>
</template>
