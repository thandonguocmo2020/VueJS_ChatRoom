import Vue from 'vue'
import Vuex from 'vuex'
import {default as authModule} from './modules/Auth.js'
import {default as conversationsModule} from './modules/Conversations.js'
import createChatSocketPlugin from './plugins/ChatSocketPlugin.js'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const chatSocketPlugin = createChatSocketPlugin()

export default new Vuex.Store({
  modules: {
    auth: authModule,
    conversations: conversationsModule
  },
  plugins: [chatSocketPlugin,
    createPersistedState({
      paths: ['auth.token'],
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 30 })
    })]
})
