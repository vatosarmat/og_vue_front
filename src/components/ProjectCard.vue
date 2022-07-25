<template>
  <v-card class="project-card">
    <v-card-title>{{ project.title }}</v-card-title>
    <v-card-text>
      <TodoItem v-for="todo of project.todos" :key="todo.id" v-bind="todo"></TodoItem>
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
  },

  // mounted() {
  //   fetch()
  // }
}
</script>
