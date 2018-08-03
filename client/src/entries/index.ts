/**
 * Created by bangbang93 on 16/9/30.
 */
'use strict'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as Es6Promise from 'es6-promise'
import Vue from 'vue'
import VueFetch from 'vue-fetch'
import VueRouter from 'vue-router'
import App from '../pages/index.vue'
import {router} from './router'

Es6Promise.polyfill()

Vue.use(Element)
Vue.use(VueRouter)
Vue.use(VueFetch)

const app = new Vue({
  router,
  render: (h) => h(App),
}).$mount('app')
