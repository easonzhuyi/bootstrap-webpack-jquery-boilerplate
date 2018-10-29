const widget = {
  state: {
    toast: {
      show: false,
      time: 2000,
      type: 'text',
      width: '16rem',
      'is-show-mask': true,
      text: '',
      position: 'middle'
    },
    loading: {
      show: false,
      text: '加载中...'
    },
    confirm: {
      title: '提示',
      text: '提示内容',
      onConfirm () {},
      onCancel () {},
      'show-cancel-button': true
    }
  },

  mutations: {
    setToastShow (state, config) {
      state.toast = Object.assign({}, state.toast, config)
      state.toast.show = true
    },
    setToastHidden (state) {
      state.toast.show = false
    },
    setLoading (state, config) {
      state.loading = Object.assign({}, state.loading, config)
    },
    setConfirm (state, config) {
      state.confirm = Object.assign({}, state.confirm, config)
    }
  },

  actions: {
    showToast ({ commit, state }, config) {
      return new Promise((resolve, reject) => {
        if (!config && !config.text) {
          console.error('请传入toast内容')
          return reject(new Error('请传入toast内容'))
        } else if (typeof config === 'string') {
          config = {
            text: config
          }
        }
        commit('setToastShow', config)
        setTimeout(() => {
          commit('setToastHidden')
          resolve()
        }, state.toast.time)
      })
    },
    showLoading ({ commit }, config) {
      const loadingConfig = { show: true }
      if (config && config.text) {
        loadingConfig['text'] = config.text
      }
      commit('setLoading', loadingConfig)
    },
    hideLoading ({ commit }, config) {
      const loadingConfig = { show: false }
      if (config && config.text) {
        loadingConfig['text'] = config.text
      }
      commit('setLoading', loadingConfig)
    },
    showConfirm ({ commit }, config) {
      if (config) {
        const confirmConfig = Object.assign({}, config, { show: true })
        commit('setConfirm', confirmConfig)
      } else {
        console.error('请传入confirm配置')
      }
    },
    hideConfirm ({ commit }) {
      const confirmConfig = { show: false }
      commit('setConfirm', confirmConfig)
    }
  }

}

export default widget
