<template>
  <q-page class="row">
    <div class="group-inputs col-12 q-py-md q-px-md">
      <!-- Titulo del articulo -->
      <p>Titulo:</p>
      <q-input outlined v-model="title" />

      <!-- Descripcion o  cuerpo del articulo con estilos -->
      <p class="q-mt-md">Descripcion:</p>
      <q-editor
        v-model="description"
        :dense="$q.screen.lt.md"
        toolbar-text-color="white"
        toolbar-toggle-color="primary"
        toolbar-bg="dark"
        :toolbar="[
          [
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              options: ['left', 'center', 'right', 'justify'],
            },
          ],
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'link', 'custom_btn'],
          ['print', 'fullscreen'],
          [
            {
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
            },
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7',
              ],
            },
            {
              label: $q.lang.editor.defaultFont,
              icon: $q.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana',
              ],
            },
            'removeFormat',
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

          ['undo', 'redo'],
          ['viewsource'],
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana',
        }"
      />

      <p class="q-mt-md">Foto del Articulo:</p>
      <!-- Input para subir iamgenes para el articulo -->
      <q-file outlined bottom-slots v-model="file" label="Subir Imagen" counter>
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop="file = null"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:hint> Presione </template>
      </q-file>
    </div>
    <div v-if="file" class="section row justify-center q-py-md q-px-md">
      <q-img
        v-if="file"
        :key="'cover'"
        :src="ViewImage"
        class="q-mt-md rounded-borders"
        style="width: 300px"
        :fit="'cover'"
      />
    </div>
    <div class="section row justify-center items-center q-my-md">
      <q-btn
        :loading="loading"
        @click="
          AddArticle({
            title,
            description,
            file,
          })
        "
        class="rounded-borders"
        size="md"
        color="primary"
        text-color="white"
        label="Subir"
        icon-right="upload"
      />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      title: "",
      description: "",
      file: null,
      url: "",
    };
  },
  computed: {
    ViewImage: function () {
      if (this.file) {
        const reader = new FileReader();

        reader.readAsDataURL(this.file);
        reader.onload = (e) => {
          this.url = e.target.result;
        };

        return this.url;
      }
      return "";
    },
    ...mapState("Article", ["user", "loading"]),
  },
  methods: {
    ...mapActions("Article", ["AddArticle"]),
  },
};
</script>

<style scoped>
.section {
  width: 100%;
}
</style>