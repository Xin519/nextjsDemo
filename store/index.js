// import Vue from 'vue'
// import Vuex from 'vuex'

// const cookieparser = process.server ? require('cookieparser') : undefined

// Vue.use(Vuex)
// export default () => {
//     return new Vuex.Store({
//         state: {
//             user: null  // 当前用户登录状态
//         },
//         mutations: {
//             setUser (state, user) {
//                state.user = user
//             }
//         },
//         actions: {
//             // nuxtServerInit 特殊的 actions 方法
//             // 服务端渲染时自动调用
//             // 作用 初始化容器数据 传递数据给客户端使用
//             nuxtServerInit ({ commit }, { req }) {
//                 let user = null
//                 if (req.headers.cookie) {
//                     // 将请求头中的 Cookie 字符串解析为一个对象
//                     const parsed = cookieparser.parse(req.headers.cookie)
//                     try {
//                         // 将 user 还原为 JavaScript 对象
//                         user = JSON.parse(parsed.user)
//                     } catch (err) {
//                         // No valid cookie found
//                     }
//                 }
//                 commit('setUser', user)
//             }
                
                
//         }
//     })
// }




const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法
  // 这个 action 会在服务端渲染期间自动调用
  // 作用：初始化容器数据，传递数据给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    let user = null

    // 如果请求头中有 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转为 JavaScript 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }

    // 提交 mutation 修改 state 状态
    commit('setUser', user)
  }
}























