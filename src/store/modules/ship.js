const state = {
  status_data: {}
}



const mutations = {
  SET_status_data: (state, data) => {
    state.status_data = data
  }

}

export default {
  namespaced: true,
  state,
  mutations,

}

