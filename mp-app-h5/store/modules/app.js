

const state = {
  /**设备信息 */
  systeminfo: {

  }
}

const mutations = {
  SET_SYSTEM_INFO(state, systeminfo) {
    state.systeminfo = systeminfo
  },
  CLEAR_SYSTEM_INFO(state) {
    state.systeminfo = {}
  }
}

const actions = {
  getSystemInfo({ commit }) {
    return new Promise((resolve, reject) => {
      uni.getSystemInfoSync(
        {
          success: function (res) {
            console.log(res.appName)
            commit('SET_SYSTEM_INFO', res)
            resolve(res)
          },
          fail: function (err) {
            reject(err)
            console.log(err)
          }
        }
      )
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
