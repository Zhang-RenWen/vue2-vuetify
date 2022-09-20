import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// Fetch sibling files
const requireModuleFiles = require.context('.', true, /\b(?!index\.js)[\w-]+\.js$/)
const modules = requireModuleFiles.keys().reduce((modules, path) => {
  const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
  const moduleFile = requireModuleFiles(path)
  modules[moduleName] = {
    ...moduleFile.default
  }
  return modules
}, {})
console.log(modules)
const state = {}
const getters = {}
const actions = {}
const mutations = {}
const plugins = []
// Initialize Vuex
export default new Vuex.Store({
  modules,
  state,
  getters,
  actions,
  mutations,
  plugins,
  strict: process.env.NODE_ENV !== 'production'
})
