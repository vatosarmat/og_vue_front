import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const apiUrl = process.env.VUE_APP_API_URL
const headers = {
  'Content-Type': 'application/json',
}

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
  message: string
  count: number
}

type TodoUpdate = Omit<Todo, 'text'>

export default new Vuex.Store<State>({
  state: {
    count: 0,
    projects: {},
    message: '',
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
    setTodoIsCompleted(state, todoUpdate: TodoUpdate) {
      const todo = state.projects[todoUpdate.project].todos.find(
        todo => todo.id === todoUpdate.id
      )
      if (todo) {
        todo.isCompleted = todoUpdate.isCompleted
      }
    },
    addProject(state, project: Project) {
      state.projects = { ...state.projects, [project.id]: project }
    },
    addTodo(state, todo: Todo) {
      const todos = state.projects[todo.project].todos
      state.projects[todo.project].todos = [...todos, todo]
    },
    setMessage(state, message?: string) {
      state.message = message ?? ''
    },
  },
  getters: {
    message: state => state.message,
    projects: state => state.projects,
    projectsList: state => Object.values(state.projects),
    projectIds: state =>
      Object.values(state.projects)
        .map(project => project.id)
        .sort(),
    projectById: state => (id: number) => state.projects[id],
    projectTodos: state => (id: number) =>
      state.projects[id].todos.sort((a, b) => b.id - a.id),
  },
  actions: {
    async fetchProjects({ commit }) {
      try {
        const response = await fetch(`${apiUrl}/projects`, { headers })
        const data: Project[] = await response.json()
        commit('setProjects', data)
        return true
      } catch (err: unknown) {
        console.log(err as Error)
        return false
      }
    },
    async patchTodo({ commit }, todoUpdate: TodoUpdate) {
      try {
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await fetch(
          `${apiUrl}/projects/${todoUpdate.project}/todos/${todoUpdate.id}`,
          {
            method: 'PATCH',
            headers,
            body: JSON.stringify(todoUpdate),
          }
        )

        commit('setTodoIsCompleted', todoUpdate)
        return true
      } catch (err: unknown) {
        // console.log(err as Error)
        commit('setMessage', 'patchTodo failed')
        return false
      }
    },
    async addProject({ commit }, title: string) {
      try {
        const body = { title }
        const response = await fetch(`${apiUrl}/projects`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        })
        const project: Project = await response.json()

        commit('addProject', project)
        return project
      } catch (err: unknown) {
        // console.log(err as Error)
        commit('setMessage', 'addProject failed')
        return false
      }
    },
    async addTodo({ commit }, { text, project }: { text: string; project: number }) {
      try {
        const body = { project, text }
        const response = await fetch(`${apiUrl}/todos`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        })
        const todo: Todo = await response.json()

        commit('addTodo', todo)
        return todo
      } catch (err: unknown) {
        // console.log(err as Error)
        commit('setMessage', 'addTodo failed')
        return false
      }
    },
  },
  modules: {},
  strict: process.env.NODE_ENV !== 'production',
})
