<script setup>
import Tables from '@/components/tables.vue'
import Publicidades_services from '@/services/publicidades'
import loader from '@/components/loader.vue'
import { icons } from '@/utils/icons'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import router from '@/router'
const datos = ref([])
const headers = [
    { label: 'Nombre', key: 'nombre' },
    { label: 'Producto', key: 'producto.nombre' },
    { label: 'Descripción', key: 'descripcion' },
    { label: 'Evento', key: 'evento.nombre' },
    { label: 'Oferta', key: 'oferta' },
    { label: 'Precio', key: 'precio' },
    { label: 'Perfil', key: 'rol_destino' },
    { label: 'Status', key: 'status' },
    { label: 'Acciones', key: 'acciones' }
]
const showLoader = ref(true)
onMounted(async () => {
    const publicidades = await Publicidades_services.get()
    showLoader.value = false
    const data = publicidades.message.data
    if (publicidades.tipo === 'error') {
        router.push('/')
    }
    const new_data = data.map(publicidad => {
        return {
            acciones: [{
                accion: 'eliminar',
                icon: icons('eliminar', 20, 20, '#00e676'),
            },
            {
                accion: 'editar',
                icon: icons('editar', 20, 20, '#00e676')
            }],
            id: btoa(publicidad.id_publicidad),
            ...publicidad
        }
    })
    datos.value = new_data
})
const eliminar = async (id) => {
    const CONFIRMAR = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
    if (!CONFIRMAR.isConfirmed) {
        return Swal.fire({
            title: 'Acción cancelada',
            icon: 'info',
            confirmButtonText: 'Aceptar',
        })
    }
    showLoader.value = true
    const publicidad = await Publicidades_services.delete(atob(id))

    showLoader.value = false
    const message = publicidad.message.message ? publicidad.message.message : publicidad.message
    Swal.fire({
        title: '',
        text: message,
        icon: publicidad.tipo
    })
    if (publicidad.tipo === 'success') {
        datos.value = datos.value.filter(publicidad => publicidad.id !== id)
    }
}
const editar = (id) => {
    showLoader.value = true
    router.push(`/publicidad/editar_publicidad/${id}`).finally(() => {
        showLoader.value = false
    })
}
</script>
<template>
    <loader :visible="showLoader" />
    <Tables :datos="datos" :headers="headers" :tipo="'Publicidad'" :ruta="'/publicidad/nueva_publicidad'"
        :acciones="{ eliminar, editar }" />
</template>
