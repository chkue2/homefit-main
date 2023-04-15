<template>
  <v-sheet color="grey lighten-4" class="pa-3">
    <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    <v-skeleton-loader
      v-bind="attrs"
      class="mx-auto"
      type="date-picker"
    ></v-skeleton-loader>
    <v-skeleton-loader
      v-bind="attrs"
      type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
    ></v-skeleton-loader>
  </v-sheet>
</template>
<script>
export default {
  name: 'LoadingContainer',
  data: () => ({
    attrs: {
      class: 'mb-6',
      elevation: 2,
    },
  }),
}
</script>
