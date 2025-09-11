<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const items = computed(() => {
    const segments = route.path.split('/').filter(Boolean)
    // Validar si la ruta tiene parametro id
    const arrayParams = route.params ? Object.keys(route.params) : []
    const hasId = arrayParams.length > 0 ? true : false
    if (hasId) {
        segments.pop()
    }
    const breadcrumbs = []

    let fullPath = ''
    breadcrumbs.push({ label: 'inicio', to: '/' })

    segments.forEach((segment, index) => {
        fullPath += `/${segment}`
        breadcrumbs.push({
            label: segment.replace('_', ' '),
            to: index === segments.length - 1 ? null : fullPath
        })
    })

    return breadcrumbs
})
</script>

<template>
    <nav class="text-sm text-gray-700" aria-label="Breadcrumb">
        <span v-for="(item, index) in items" :key="index" class="inline-flex items-center">
            <template v-if="index !== 0">
                <span class="mx-1 color-span"> > </span>
            </template>

            <router-link v-if="item.to" :to="item.to" class="color-link">
                {{ item.label }}
            </router-link>

            <span v-else class="color-span">
                {{ item.label }}
            </span>
        </span>
    </nav>
    <h2>{{ route.name }}</h2>
</template>
<style scoped>
.color-link {
    text-decoration: none;
    color: #00e676;
}

.color-span {
    color: #212121;

}
</style>