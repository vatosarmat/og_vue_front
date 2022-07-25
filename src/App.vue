<template>
  <v-app>
    <TopBar></TopBar>

    <MainContent></MainContent>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="error" icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import MainContent from '@/components/MainContent.vue'
import TopBar from '@/components/TopBar.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',

  components: {
    MainContent,
    TopBar,
  },

  data: () => ({
    snackbar: false,
    timeout: 2000,
  }),

  computed: {
    ...mapGetters(['message']),
  },

  methods: {
    ...mapActions(['fetchProjects']),
    ...mapMutations(['setMessage']),
  },

  created() {
    this.fetchProjects()
  },

  watch: {
    message(n) {
      if (n) {
        this.snackbar = true
      }
    },

    snackbar(n) {
      if (!n) {
        this.setMessage('')
      }
    },
  },
}
</script>
