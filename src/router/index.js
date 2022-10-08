import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/database',
    name: 'database',
    component: () => import( /* webpackChunkName: "database" */ '../views/database.vue')
  },
  {
    path: '/',
    name: 'listenNow',
    component: () => import( /* webpackChunkName: "listenNow" */ '../views/listenNow.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import( /* webpackChunkName: "search" */ '../views/search.vue')
  },
  {
    path: '/radioBroadcast',
    name: 'radioBroadcast',
    component: () => import( /* webpackChunkName: "radioBroadcast" */ '../views/radioBroadcast.vue')
  },
  {
    path: '/listSongs',
    name: 'listSongs',
    component: () => import( /* webpackChunkName: "listSongs" */ '../views/listSongs.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router