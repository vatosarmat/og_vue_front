<template>
  <v-app-bar app dark color="primary" elevation="1">
    <v-spacer></v-spacer>
    <v-toolbar-title class="text-no-wrap">My tasks</v-toolbar-title>
    <v-spacer></v-spacer>
    <NewTodoDialog></NewTodoDialog>
  </v-app-bar>
</template>
<script lang="ts">
import NewTodoDialog from '@/components/NewTodoDialog.vue'

export default {
  name: 'TopBar',
  components: { NewTodoDialog },
}
</script>
