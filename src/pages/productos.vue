<script setup>
import Tables from '@/components/tables.vue'
import Productos_services from '@/services/productos'
import loader from '@/components/loader.vue'
import { icons } from '@/utils/icons'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import router from '@/router'
const datos = ref([])
const headers = [
    { label: 'Nombre', key: 'nombre' },
    { label: 'Existencia', key: 'existencia' },
    { label: 'Local', key: 'local.nombre' },
    { label: 'Categoría', key: 'categoria.nombre' },
    { label: 'Acciones', key: 'acciones' }
]
const showLoader = ref(true)
onMounted(async () => {
    const productos = await Productos_services.get()
    showLoader.value = false
    const data = productos.message.data
    if (productos.tipo === 'error') {
        router.push('/')
    }
    const new_data = data.map(local => {
        return {
            acciones: [{
                accion: 'eliminar',
                icon: icons('eliminar', 20, 20, '#00e676'),
            },
            {
                accion: 'editar',
                icon: icons('editar', 20, 20, '#00e676')
            }],
            id: btoa(local.id_producto),
            ...local
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
    const productos = await Productos_services.delete(atob(id))
    showLoader.value = false
    const message = productos.message.message ? productos.message.message : productos.message
    Swal.fire({
        title: '',
        text: message,
        icon: productos.tipo
    })
    if (productos.tipo === 'success') {
        datos.value = datos.value.filter(producto => producto.id !== id)
    }
}
const editar = (id) => {
    showLoader.value = true
    router.push(`/productos/editar_producto/${id}`).finally(() => {
        showLoader.value = false
    })
}
</script>
<template>
    <loader :visible="showLoader" />
    <Tables :datos="datos" :headers="headers" :tipo="'Producto'" :ruta="'/productos/nuevo_producto'"
        :acciones="{ eliminar, editar }" />
</template>
