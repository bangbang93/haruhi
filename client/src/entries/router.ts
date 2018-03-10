import VueRouter from 'vue-router'

const routes = [{
  path: '/1',
  component: () => import('../pages/home/first.vue'),
  name: 'first',
  alias: '/'
}, {
  path: '/2',
  component: () => import('../pages/home/second.vue'),
  name: 'second'
}, {
  path: '*',
  redirect: '/1'
}];

export const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/',
});
