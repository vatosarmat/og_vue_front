<template>
  <v-card class="project-card">
    <v-card-title class="project-card-title">{{ project.title }}</v-card-title>
    <v-card-text>
      <TodoItem v-for="todo of todos" :key="todo.id" v-bind="todo"></TodoItem>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import TodoItem from '@/components/TodoItem.vue'
// import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ProjectCard',

  components: { TodoItem },

  data: () => ({}),

  props: {
    id: { type: Number, required: true },
  },

  // methods: {
  //   ...mapMutations(['increment', 'decrement']),
  // },
  //
  computed: {
    project() {
      return this.$store.getters.projectById(this.id)
    },
    todos() {
      return this.$store.getters.projectTodos(this.id)
    },
  },

  // mounted() {
  //   fetch()
  // }
}
</script>

<style>
.project-card-title {
  border-bottom: 1px solid #eee;
}
</style>
