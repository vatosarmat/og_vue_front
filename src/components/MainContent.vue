<template>
  <v-main>
    <!-- <div> -->
    <!--   <p>Fuck you! {{ count }}</p> -->
    <!--   <v-btn @click="increment">+</v-btn> -->
    <!--   <v-btn @click="decrement">-</v-btn> -->
    <!-- </div> -->
    <v-container fluid>
      <v-row>
        <v-col v-for="project in projects" :key="project.id">
          <v-card>
            <v-card-title>{{ project.title }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MainContent',

  data: () => ({}),

  methods: {
    ...mapMutations(['increment', 'decrement']),
  },

  computed: { ...mapState(['count']), ...mapGetters({ projects: 'projectsList' }) },

  // mounted() {
  //   fetch()
  // }
}
</script>
