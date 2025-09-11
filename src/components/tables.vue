<script setup>
import { ref, computed } from 'vue'
import { icons } from '@/utils/icons.js'
const props = defineProps({
    datos: {
        type: Array,
        required: true
    },
    headers: {
        type: Array,
        required: true
    },
    tipo: {
        type: String,
    },
    ruta: {
        type: String,
    },
    acciones: {
        type: Object,
        required: false
    },
    showAlta: {
        type: Boolean,
        default: true
    }
})

const currentPage = ref(1)
const rowsPerPage = ref(10)
const search = ref('')
const sortKey = ref('')
const sortAsc = ref(true)

// Filtrado global
const filteredData = computed(() => {
    if (!search.value) return props.datos
    return props.datos.filter(row =>
        Object.values(row).some(val =>
            String(val).toLowerCase().includes(search.value.toLowerCase())
        )
    )
})

// Ordenamiento
const sortedData = computed(() => {
    if (!sortKey.value) return filteredData.value
    return [...filteredData.value].sort((a, b) => {
        const valA = a[sortKey.value]
        const valB = b[sortKey.value]
        if (typeof valA === 'number' && typeof valB === 'number') {
            return sortAsc.value ? valA - valB : valB - valA
        }
        return sortAsc.value
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA))
    })
})

// Paginación
const totalPages = computed(() =>
    Math.ceil(sortedData.value.length / rowsPerPage.value)
)

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value
    return sortedData.value.slice(start, start + rowsPerPage.value)
})

function sortBy(key) {
    if (sortKey.value === key) {
        sortAsc.value = !sortAsc.value
    } else {
        sortKey.value = key
        sortAsc.value = true
    }
}
const getValue = (data, key) => {
    if (!data || typeof data !== 'object') return ''
    if (key.includes('.')) {
        const keys = key.split('.')
        return keys.reduce((o, i) => (o && o[i] != null ? o[i] : ''), data)
    }
    return data[key] != null ? data[key] : ''
}

</script>

<template>
    <div class="table-container">
        <div class="top-bar">
            <input v-model="search" placeholder="Buscar..." class="search-input" />
            <router-link v-if="tipo && ruta && showAlta" :to="ruta" class="alta-button">
                Alta de {{ tipo }}
            </router-link>
        </div>
        <div class="">

            <table class="table">
                <thead>
                    <tr>
                        <th v-for="header in headers" :key="header.key" @click="sortBy(header.key)" class="sortable">
                            {{ header.label }}
                            <span v-if="sortKey === header.key">
                                <span v-if="sortAsc">
                                    <span v-html="icons('arrow-up', 20, 20, '#00e676')"></span>
                                </span>
                                <span v-else>
                                    <span v-html="icons('arrow-down', 20, 20, '#00e676')"></span>
                                </span>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in paginatedData" :key="data.id">
                        <td v-for="header in headers" :key="header.key">
                            <div v-if="header.key === 'acciones'" class="row">
                                <div v-for="accion in data.acciones" :key="accion.accion" class="col-4">
                                    <button @click="acciones[accion.accion](data.id)" class="buttonAccion">
                                        <span v-html="accion.icon"></span>
                                    </button>
                                </div>
                            </div>
                            <div v-else>
                                {{ getValue(data, header.key) }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination">
            <button @click="currentPage--" :disabled="currentPage === 1">Anterior</button>
            <span>Página {{ currentPage }} de {{ totalPages }}</span>
            <button @click="currentPage++" :disabled="totalPages === 0 || currentPage === totalPages">Siguiente</button>
        </div>
    </div>
</template>

<style scoped>
.table-container {
    width: 100%;
    overflow-x: auto;
    margin-top: 30px;
}

.search-input {
    padding: 8px;
    margin-bottom: 10px;
    width: 100%;
    max-width: 300px;
    border: 1px solid #00e676;
    border-radius: 6px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
}

th,
td {
    padding: 10px;
    text-align: left;
    border: 1px solid #e0e0e0;
}

th {
    background-color: #212121;
    color: #00e676;
}

td {
    background-color: #f5f5f5;
}

.sortable:hover {
    background-color: #212121;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
}

button {
    padding: 5px 12px;
    border: none;
    background-color: #d9d9d9;
    cursor: pointer;
    border-radius: 4px;
    font-weight: bold;
}

button:disabled {
    background-color: #bbb;
    cursor: not-allowed;
}


.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 10px;
}

.search-input {
    padding: 8px;
    border: 1px solid #00e676;
    border-radius: 6px;
    min-width: 200px;
    max-width: 400px;
    flex: 1;
}

.alta-button {
    background-color: #00e676;
    color: #212121;
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
}
</style>
