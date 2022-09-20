const state = {
  sideMenuOpen: window.innerWidth >= 1024
}

const getters = {
  sideMenuOpen(state) {
    // 真的有傳store進來不要刪
    return state.sideMenuOpen
  }
}

const actions = {
  toggleSideMenuOpen({ commit }, stateValue) {
    commit('setSideMenuOpen', stateValue)
  }
}

const mutations = {
  // eslint-disable-next-line
  setSideMenuOpen(state, stateValue) {
    // 真的有傳store進來不要刪
    state.sideMenuOpen = stateValue
  }
}

export default { namespaced: true, state, getters, actions, mutations }
