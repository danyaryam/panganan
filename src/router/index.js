import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Foods from '@/views/Foods.vue'
import Keranjang from '@/views/Keranjang.vue'
import FoodsDetail from '@/views/FoodsDetail.vue'
import PesananSukses from '@/views/PesananSukses.vue'
import AdminPesanan from '@/views/AdminPesanan.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/foods',
    name: 'foods',
    component: Foods
  },
  {
    path: '/foods/:id',
    name: 'FoodDetail',
    component: FoodsDetail
  },
  {
    path: '/keranjang',
    name: 'keranjang',
    component: Keranjang
  },
  {
    path: '/pesanan-sukses',
    name: 'PesananSukses',
    component: PesananSukses
  },
  {
    path: '/admin-pesanan',
    name: 'AdminPesanan',
    component: AdminPesanan
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
