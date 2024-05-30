<template>
  <v-layout>
    <v-app-bar dense fixed app>
      <v-spacer  class="hidden-sm-and-down"/>

      <v-card-actions>
        <div class="w-100 ml-5">
          <v-row justify="start" align="center" align-content="center">
            <v-avatar
                size="56"
                color="grey-darken-3"
                :image="getImageUrl()"
            />

            <span class="py-0 ml-5">
              <v-card-title v-if="$vuetify.display.xs" class="text-white py-0">DSvinka - Math</v-card-title>
              <v-card-title v-else class="text-white py-0">DSvinka Projects - Math</v-card-title>

              <v-card-subtitle v-if="!$vuetify.display.xs" color="text-grey">Инструменты от Морских свинок для Морских свинок</v-card-subtitle>
            </span>
          </v-row>
        </div>
      </v-card-actions>

      <v-spacer></v-spacer>

      <v-card-actions class="hidden-sm-and-down">
        <span v-for="navButton in navButtons">
          <v-btn :to="navButton.url" :color="navButton.color" variant="outlined" size="large" class="px-5 mx-2">{{navButton.title}}</v-btn>
        </span>
      </v-card-actions>

      <v-spacer  class="hidden-sm-and-down"/>

      <v-app-bar-nav-icon class="hidden-md-and-up" variant="text" @click.stop="navDrawer = !navDrawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
        v-model="navDrawer"
        location="left"
        temporary
    >
      <v-list-item>
        <v-list-item-title class="text-white text-center">DSvinka Projects</v-list-item-title>
      </v-list-item>

      <v-list-item v-for="(navButton, key) in navButtons" :key="key">
        <v-btn variant="outlined" :color="navButton.color" block :to="navButton.url" flat>{{navButton.title}}</v-btn>
      </v-list-item>
    </v-navigation-drawer>

    <v-main style="position: relative;">
      <div style="min-height: calc(100vh - 4rem); padding-bottom: 4rem; ">
        <router-view></router-view>
      </div>

      <v-footer absolute border :style="{height: $vuetify.display.xs ? '12vh' : '5rem', bottom: '0', width: '100%'}">
        <v-row justify="center" no-gutters>
          <v-col class="text-center text-subtitle-1 text-body-1 my-auto" cols="12">
            Copyright &copy; {{ new Date().getFullYear() }} <strong class="text-primary">DSvinka Projects</strong>. Все права загрызаны
          </v-col>
          <v-divider class="my-2"/>
          <v-col class="text-center text-subtitle-2 text-body-2 my-auto" cols="12">
            Сайт разработан специально для Колледжа Программирования и Кибербезопасности "МИРЭА"
          </v-col>
        </v-row>
      </v-footer>
    </v-main>
  </v-layout>
</template>

<script setup>
import {reactive, ref} from "vue";

const navDrawer = ref(false);
const navButtons = ref([
  {title: "Главная", url: "/", color: "blue-lighten-3"},
  {title: "Графики", url: "/graph", color: "primary"}
])

function getImageUrl() {
  return new URL(`./assets/logo.png`, import.meta.url).href
}
</script>
