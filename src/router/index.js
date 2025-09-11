import { createRouter, createWebHistory } from 'vue-router'

import { EXIST_TOKEN, VALID_LOGIN } from './guards.js'
const routes = [
  {
    path: '/',
    component: () => import('@/pages/dashboard.vue'),
    name: 'Inicio',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
    name: 'Login',
    beforeEnter: VALID_LOGIN,
    meta: {
      dark_body: true
    }
  },
  {
    path: '/publicidad',
    component: () => import('@/pages/publicidad.vue'),
    name: 'Publicidad',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/publicidad/nueva_publicidad',
    component: () => import('@/views/alta_publicidad.vue'),
    name: 'Nueva Publicidad',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/publicidad/editar_publicidad/:id',
    component: () => import('@/views/alta_publicidad.vue'),
    name: 'Editar Publicidad',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/locales',
    component: () => import('@/pages/locales.vue'),
    name: 'Locales',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/locales/nuevo_local',
    component: () => import('@/views/alta_local.vue'),
    name: 'Nuevo Local',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/locales/editar_local/:id',
    component: () => import('@/views/alta_local.vue'),
    name: 'Editar Local',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/productos',
    component: () => import('@/pages/productos.vue'),
    name: 'Productos',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/productos/nuevo_producto',
    component: () => import('@/views/alta_producto.vue'),
    name: 'Nuevo Producto',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/productos/editar_producto/:id',
    component: () => import('@/views/alta_producto.vue'),
    name: 'Editar Producto',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/categorias',
    component: () => import('@/pages/categorias.vue'),
    name: 'Categorias',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/categorias/nueva_categoria',
    component: () => import('@/views/alta_categorias.vue'),
    name: 'Nueva Categoria',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/categorias/editar_categoria/:id',
    component: () => import('@/views/alta_categorias.vue'),
    name: 'Editar Categoria',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/eventos',
    component: () => import('@/pages/eventos.vue'),
    name: 'Eventos',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/subir_imagenes',
    component: () => import('@/pages/subir_imagenes.vue'),
    name: 'Subir Imágenes',
    beforeEnter: EXIST_TOKEN,
    meta: {
      requiresAuth: true
    }
  }
  ,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/notFound.vue'),
    beforeEnter: EXIST_TOKEN,
    meta: {
      dark_body: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
