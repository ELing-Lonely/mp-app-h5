import { mpLogin, Login, getUserInfo } from "@/api/user.js"

const state = {
    /**用户信息 */
    userinfo: {},
    /**账号密码 */
    user: {
        name: "",
        password: "",
        tel: "",
        code: ""
    },
    token: uni.getStorageSync('token')
}

const mutations = {
    SET_USERINFO(state, userinfo) {
        state.userinfo = userinfo
    },
    CLEAR_USERINFO(state) {
        state.userinfo = {}
    },
    SET_TOKEN(state, token) {
        state.token = token
    },
    CLEAR_TOKEN(state) {
        uni.removeStorageSync('token')
        state.token = null
    },
    SET_USER(state, user) {
        state.user = user
    },
    CLEAR_USER(state) {
        state.user = {}
    },
}

const actions = {
    setToken({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            let code = null
            uni.login({
                success(res) {
                    code = res.code
                    console.log(code)
                    mpLogin({
                        code: code
                    }).then(res => {
                        console.log(res)
                        const token = res.data.data.token
                        commit('SET_TOKEN', 'Bearer ' + token)
                        uni.setStorageSync('token', 'Bearer ' + token)
                        resolve(res.data.data)
                    }).catch(err => {
                        resolve(err)
                    })
                }
            })
        })
    },
    _setToken({ commit, state }) {
        return new Promise((resolve, reject) => {
            Login(state.user).then(res => {
                console.log(res)
                const token = res.data.data.token
                commit('SET_TOKEN', 'Bearer ' + token)
                uni.setStorageSync('token', 'Bearer ' + token)
                resolve(res.data.data)
            }).catch(err => {
                resolve(err)
            })
        })
    },
    setUserInfo({
        commit,
        state
    }) {
        if (Object.keys(state.userinfo).length == 0) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    console.log(res.data.data)
                    commit('SET_USERINFO', res.data.data)
                    resolve(res)
                }).catch(err => {
                    resolve(err)
                })
            })
        }

    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
