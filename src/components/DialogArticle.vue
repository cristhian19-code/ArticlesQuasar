<template>
  <q-dialog
    v-model="dialog"
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-grey-2 text-white">
      <q-bar>
        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h4 text-black q-mb-md">{{ articulo.title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none" v-html="articulo.description">
      </q-card-section>

      <q-card-section class="row justify-center">
        <q-img class="img-dialog-article" :src="articulo.url" width="400px" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { inject } from "@vue/composition-api";

export default {
  setup() {
    const dialog = inject("dialog");
    const articulo = inject("article");
    return {
      dialog,
      articulo,
    };
  },
};
</script>

<style>
.img-dialog-article {
  border-radius: 5px;
}
</style>