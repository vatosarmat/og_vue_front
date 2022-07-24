<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col v-for="id in projectIds" :key="id">
          <ProjectCard :id="id"></ProjectCard>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import ProjectCard from '@/components/ProjectCard.vue'

export default {
  name: 'MainContent',

  components: { ProjectCard },

  data: () => ({}),

  computed: { ...mapGetters(['projectIds']) },
}
</script>
