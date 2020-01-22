import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMoment from 'vue-moment'

Vue.use(VueAxios, axios, VueMoment)

// Vue.use(VueMoment, {
//     moment,
// })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app-catalog')
