<template>
  <q-layout view="lHh Lpr lFf">
    <q-header dark elevated class="bg-grey-10 q-py-sm">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          show-if-above
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Articulos App </q-toolbar-title>
        <q-btn
          v-if="!user"
          flat
          dense
          label="Iniciar Sesion"
          icon="login"
          @click="alert = !alert"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
      show-if-above
      :width="280"
      :breakpoint="400"
    >
      <q-img
        class="absolute-top"
        src="https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        style="height: 180px"
      >
        <div v-if="user" class="absolute-bottom bg-transparent">
          <q-avatar size="60px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ user.nombre }}</div>
          <div>{{ user.email }}</div>
        </div>
      </q-img>
      <q-scroll-area
        style="
          height: calc(100% - 180px);
          margin-top: 180px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <ModalSessionVue :active="alert" />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import ModalSessionVue from "../components/ModalSession.vue";
import { provide, ref } from "@vue/composition-api";
import { mapState } from "vuex";

const linksData = [
  {
    title: "Inicio",
    icon: "home",
    link: "/",
    funct: false,
  },
  {
    title: "Articulos",
    icon: "notes",
    link: "/articulos",
    funct: false,
  },
  {
    title: "Favoritos",
    icon: "star",
    link: "/favoritos",
    funct: false,
  },
  {
    title: "Agregar Articulos",
    icon: "note_add",
    link: "/agregar",
    funct: false,
  },
  {
    title: "Mis Articulos",
    icon: "description",
    link: "/mis-articulos",
    funct: false,
  },
  {
    title: "Cerra Sesion",
    icon: "logout",
    link: "#",
    funct: true,
  },
];

export default {
  name: "MainLayout",
  components: { EssentialLink, ModalSessionVue },
  setup(props) {
    const alert = ref(false);

    provide("alert", alert);

    return {
      leftDrawerOpen: false,
      alert,
      essentialLinks: linksData,
    };
  },
  computed: {
    ...mapState("Article", ["user"]),
  },
};
</script>

<style>
.q-avatar__content {
  border: 3px solid white;
}
</style>
