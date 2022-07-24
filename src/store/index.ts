import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const apiUrl = process.env.VUE_APP_API_URL

export type Todo = {
  id: number
  text: string
  isCompleted: boolean
  project: number
}

export type Project = {
  id: number
  title: string
  todos: Todo[]
}

export type State = {
  projects: Record<number, Project>
  count: number
}

export default new Vuex.Store<State>({
  state: {
    count: 0,
    projects: {},
  },
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    setProjects(state, projects: Project[]) {
      state.projects = projects.reduce(
        (acc, project) => ({ ...acc, [project.id]: project }),
        {} as State['projects']
      )
    },
  },
  getters: {
    projectsList: state => Object.values(state.projects),
  },
  actions: {
    async fetchProjects({ commit }) {
      const response = await fetch(`${apiUrl}/projects`)
      const data: Project[] = await response.json()
      commit('setProjects', data)
    },
  },
  modules: {},
  strict: process.env.NODE_ENV !== 'production',
})
