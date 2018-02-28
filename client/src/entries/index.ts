/**
 * Created by bangbang93 on 16/9/30.
 */
'use strict';
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '../pages/index.vue'
import VueRouter from 'vue-router'
import VueFetch from 'vue-fetch'
import {router} from './router'

require('es6-promise').polyfill();

Vue.use(Element);
Vue.use(VueRouter);
Vue.use(VueFetch);

const app = new Vue({
  router,
  render: (h)=>h(App),
}).$mount('app');
