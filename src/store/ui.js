const state = {
  sideMenuOpen: window.innerWidth >= 1024,
  linearLoading: true,
  circularLoading: true,
  overlayLoading: false
}

const getters = {
  sideMenuOpen(state) {
    return state.sideMenuOpen
  },
  linearLoading(state) {
    return state.linearLoading
  },
  circularLoading(state) {
    return state.circularLoading
  },
  overlayLoading(state) {
    return state.overlayLoading
  }
}

const actions = {
  toggleSideMenuOpen({ commit }, stateValue) {
    commit('setSideMenuOpen', stateValue)
  },
  toggleLinearLoading({ commit }, stateValue) {
    commit('setLinearLoading', stateValue)
  },
  toggleCircularLoading({ commit }, stateValue) {
    commit('setCircularLoading', stateValue)
  },
  toggleLoading({ commit }, stateValue) {
    commit('setOverlayLoading', stateValue)
  }
}

const mutations = {
  // eslint-disable-next-line
  setSideMenuOpen(state, stateValue) {
    state.sideMenuOpen = stateValue
  },
  setLinearLoading(state, stateValue) {
    state.linearLoading = stateValue
  },
  setCircularLoading(state, stateValue) {
    state.circularLoading = stateValue
  },
  setOverlayLoading(state, stateValue) {
    state.overlayLoading = stateValue
  }
}

export default { namespaced: true, state, getters, actions, mutations }
