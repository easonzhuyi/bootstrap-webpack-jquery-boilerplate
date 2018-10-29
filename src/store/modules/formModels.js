import debounce from 'lodash.debounce'
import * as assistant from '@/utils/assistant'
import Vue from 'vue'

function isValid (errorBag, field) {
  for (let i = 0; i < errorBag.length; i += 1) {
    if (errorBag[i].name === field) {
      return false
    }
  }
  return true
}

const validate = debounce(({
  state,
  commit,
  data,
  page,
  field
}) => {
  const fields = typeof field === 'string' ? [field] : field
  assistant.bind(state.models, data, page)

  fields.forEach(element => {
    // 判断当前元素的输入值是否合法
    if (!isValid(data.errorBag, element)) {
      // 校验错误，已填写的置空
      const fillers = assistant.fill({
        page,
        form: data.name,
        name: element
      }, true)
      commit('fill', fillers)
      return
    }
    // 联动显示隐藏
    const displayers = assistant.display({
      page,
      form: data.name,
      name: element
    })
    if (displayers && displayers.length > 0) {
      displayers.forEach(d => {
        commit('changeFormType', d)
      })
    }
    assistant.validate(state.formModels, {
      page,
      form: data.name,
      name: element
    }).then(result => {
      if (result.pass) {
        // 自动填写
        const fillers = assistant.fill({
          page,
          form: data.name,
          name: element
        })
        commit('fill', fillers)
      } else {
        // 联动校验错误，调用vformer报错
        if (result.reason) {
          commit('error', {
            name: `${page}-${data.name}-${element}`,
            msg: result.reason
          })
          return
        }
        commit('error', {
          name: `${page}-${data.name}-${element}`,
          msg: '联动错误'
        })
      }
    })
  })
}, 500)

const formModels = {
  state: {
    models: {},
    bus: null,
    membersList: null,
    membersModels: [],
    profileList: [],
    insuranceForm: null,
    insurance: null
  },

  mutations: {
    setBus (state, bus) {
      state.bus = bus
    },

    initialize (state, { models, bus }) {
      state.models = Object.assign({}, state.models, models)
    },

    fill (state, results) {
      (results || []).forEach(item => {
        state.bus.$emit('fill', {
          name: item.name,
          value: item.value
        })
      })
    },

    error (state, error) {
      state.bus.$emit('error', error)
    },

    insert (state, { page, form, body }) {
      Vue.set(state.models[page], form, JSON.parse(body))
    },

    delete (state, { page, form }) {
      Vue.delete(state.models[page], form)
    },

    changeFormType (state, { name, value }) {
      const names = name.split('-')
      const element = state.models[names[0]][names[1]][names[2]]
      Object.keys(value).forEach(key => {
        element.rules[key] = value[key]
      })
    }
  },

  actions: {
    insert ({ commit, state }, { page, form }) {
      const body = JSON.stringify(state.models[page][form])
      let newFormName = ''
      const forms = Object.keys(state.models[page]).filter(v => v.includes(form))
      let i = 1

      forms.forEach(v => {
        if (v === form + i) {
          i += 1
        }
        newFormName = form + i
      })

      commit('insert', { page, form: newFormName, body })
      assistant.update(state.models, page, newFormName)
    },

    delete ({ commit, state }, { page, form }) {
      assistant.del(state.models, page, form)
      commit('delete', { page, form })
    },

    setFormModels ({ commit, state }, { data }) {
      commit('initialize', {
        models: data
      })
      const templates = {} // 模板，暂无
      assistant.initialize(data, templates, state.bus)
    },

    update ({ commit, state }, { data, page, field }) {
      validate({
        state,
        commit,
        data,
        page,
        field
      })
    },

    setBus ({ commit }, { bus }) {
      commit('setBus', bus)
    }
  }

}
export default formModels

// app.axios.get(GETDEMOCONFIG).then(({data}) => {
//   app.$store.dispatch('initialize', {
//       config: data.value,
//       vux: app.$vux,
//       bus: app.$bus,
//   })
// })
