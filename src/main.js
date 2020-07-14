import Vue from 'vue'
import App from './App.vue'
import dayjs from 'dayjs'

const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const objectSupport = require('dayjs/plugin/objectSupport')
dayjs.extend(objectSupport)

const localeRu = require('dayjs/locale/ru')
dayjs.locale(localeRu)

Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
