<template>
  <v-app>
    <TopBar></TopBar>

    <MainContent></MainContent>
  </v-app>
</template>

<script lang="ts">
import MainContent from '@/components/MainContent.vue'
import TopBar from '@/components/TopBar.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    MainContent,
    TopBar,
  },

  data: () => ({
    //
  }),

  methods: {
    ...mapActions(['fetchProjects']),
  },

  created() {
    this.fetchProjects()
  },
}
</script>
