import VueRouter from 'vue-router'

const routes = [{
  path: '/1',
  component: require('../pages/home/first.vue').default,
  name: 'first',
  alias: '/'
}, {
  path: '/2',
  component: require('../pages/home/second.vue').default,
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
