<template>
  <v-main>
    <ul class="project-list">
      <li class="project-item" v-for="id in projectIds" :key="id">
        <ProjectCard :id="id"></ProjectCard>
      </li>
    </ul>
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

<style>
.project-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 48px;
  padding: 48px;
}

.project-item {
  list-style-type: none;
  min-width: 240px;
}

.project-list::after {
  content: '';
  flex: 1;
}
</style>
