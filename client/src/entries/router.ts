import VueRouter from 'vue-router'

const routes = [{
  alias: '/',
  component: async () => import('../pages/home/first.vue'),
  name: 'first',
  path: '/1',
}, {
  component: async () => import('../pages/home/second.vue'),
  name: 'second',
  path: '/2',
}, {
  path: '*',
  redirect: '/1',
}]

export const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
})
