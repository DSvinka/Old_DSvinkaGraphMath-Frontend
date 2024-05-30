<template>
  <v-container>
    <v-row no-gutters class="mt-5" justify-content="center" justify="center" align-content="center" align="center">
      <v-col cols="12" class="d-flex justify-center">
        <v-avatar
            :size="$vuetify.display.smAndUp ? 50 + 'vh' : 30 + 'vh'"
            color="grey-darken-3"
            :image="getImageUrl()"
        />
      </v-col>

      <v-col cols="12" class="mt-5 d-flex justify-center text-center">
        <span class="py-0">
          <v-card-title class="text-white text-h4 text-sm-h3 py-0">DSvinka Projects - Math</v-card-title>
          <v-card-subtitle class="text-subtitle-1 text-sm-h6" color="text-grey">Даже морские свинки понимают математику</v-card-subtitle>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
function getImageUrl() {
  return new URL(`../assets/logo-full.jpg`, import.meta.url).href
}
</script>

<style scoped>

</style>