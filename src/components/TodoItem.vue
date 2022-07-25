<template>
  <v-checkbox v-model="isCompletedValue" :label="text"></v-checkbox>
</template>

<script lang="ts">
import { mapActions } from 'vuex'

export default {
  name: 'TodoItem',

  data() {
    return {
      isCompletedValue: this.isCompleted,
      isFallback: false,
      isAwaiting: false,
    }
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    project: {
      type: Number,
      required: true,
    },
  },

  computed: {},

  watch: {
    async isCompletedValue(newValue: boolean, prevValue: boolean) {
      if (this.isFallback) {
        this.isFallback = false
      } else if (!this.isAwaiting) {
        this.isAwaiting = true
        if (
          !(await this.patchTodo({
            id: this.id,
            isCompleted: newValue,
            project: this.project,
          }))
        ) {
          this.isFallback = true
          this.isCompletedValue = prevValue
        }
        this.isAwaiting = false
      }
    },
  },

  methods: {
    ...mapActions(['patchTodo']),
  },
  //
  // computed: { ...mapState(['count']), ...mapGetters({ projects: 'projectsList' }) },

  // mounted() {
  //   fetch()
  // }
}
</script>
