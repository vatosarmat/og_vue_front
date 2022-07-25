<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title>
          <span class="text-h5">New todo</span>
        </v-card-title>
        <v-card-text>
          <v-container class="pa-0">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Todo text"
                  v-model.trim="todoText"
                  required
                  :rules="todoTextRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  label="Project"
                  v-model="projectSelected"
                  :items="[
                    { text: 'New project', value: 'NEW_PROJECT' },
                    { header: 'Created projects' },
                    ...Object.values(projects).map(p => ({
                      text: p.title,
                      value: p.id,
                    })),
                  ]"
                  required
                  :rules="projectSelectedRules"
                ></v-autocomplete>
              </v-col>
              <v-col v-if="projectSelected === 'NEW_PROJECT'" cols="12">
                <v-text-field
                  label="Project title"
                  v-model.trim="projectTitle"
                  required
                  :rules="todoTextRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="primary" :disabled="!valid" @click="onOk()">OK</v-btn>
          <v-btn depressed @click="onCancel()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import type { Project } from '@/store'
export default {
  name: 'NewTodoDialog',
  data() {
    return {
      dialog: false,

      todoTextRules: [(v: string) => /\S/.test(v) || 'Todo text is required'],
      projectSelectedRules: [
        (v: number | 'NEW_PROJECT') => !!v || 'Project must be selected',
      ],
      projectTitleRules: [(v: string) => /\S/.test(v) || 'Project title is required'],
      valid: false,

      todoText: '',
      projectSelected: undefined,
      projectTitle: '',
    }
  },
  computed: {
    ...mapGetters(['projects']),
  },
  methods: {
    ...mapActions(['addProject', 'addTodo']),
    async onOk() {
      if (this.projectSelected) {
        if (this.projectSelected === 'NEW_PROJECT') {
          const newProject: Project = await this.addProject(this.projectTitle)
          if (newProject) {
            await this.addTodoResetDialog(newProject.id)
          }
        } else {
          await this.addTodoResetDialog(this.projects[this.projectSelected].id)
        }
      }
    },
    async addTodoResetDialog(projectId: number) {
      await this.addTodo({
        project: projectId,
        text: this.todoText,
      })
      this.dialog = false
      this.reset()
    },
    onCancel() {
      this.dialog = false
    },
    reset() {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(this.$refs.form as any).reset()
    },
  },
  // mounted() {
  // },
  // watch: {
  //   dialog() {
  //     console.log(this.projects)
  //   },
  // },
}
</script>
