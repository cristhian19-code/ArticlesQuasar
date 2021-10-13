<template>
  <q-page class="flex flex-start">
    <!-- seccion de la portada -->
    <q-img
      src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      style="width: 100%; height: 30rem"
      native-context-menu
    >
      <div
        class="
          absolute-bottom
          text-h5 text-weight-light text-center text-capitalize
        "
      >
        Articulos
      </div>
    </q-img>
    <!-- seccion de busqueda -->
    <div
      class="row wrap items-center justify-around q-my-md"
      style="width: 100%"
    >
      <q-input
        class="col-5 col-md-5"
        outlined
        v-model="text"
        label="Nombre Articulo"
      />
      <q-select
        class="col-6 col-md-4"
        outlined
        label="Categorias de los Articulos"
        v-model="selecteds"
        multiple
        :options="category"
      />
      <q-btn
        class="col-6 col-md-2"
        color="primary"
        push
        icon-right="search"
        label="Buscar"
      />
    </div>

    <div
      v-if="articles"
      class="row wrap justify-center container-articles q-py-md"
    >
      <p>{{ article.id }}</p>
      <CardArticlesVue
        v-for="article in articles"
        :key="article.data.name"
        :url="article.data.url"
        :title="article.data.title"
        :author="article.data.author"
        :article="article.data"
      />
    </div>
    <DialogArticleVue />
  </q-page>
</template>

<script>
import CardArticlesVue from "../components/CardArticles.vue";
import { mapActions, mapState } from "vuex";
import DialogArticleVue from "../components/DialogArticle.vue";
import { provide, ref } from "@vue/composition-api";

export default {
  name: "Articulos",
  setup() {
    const dialog = ref(false);
    const article = ref({});

    provide("dialog", dialog);
    provide("article", article);

    return {
      dialog,
      article,
    };
  },
  data() {
    return {
      selecteds: [],
      category: [
        "Informatica",
        "Belleza",
        "Informativo",
        "Reflexion",
        "Investigacion",
        "Revision",
      ],
      text: "",
    };
  },
  components: {
    CardArticlesVue,
    DialogArticleVue,
  },
  methods: {
    ...mapActions("Article", ["GetArticles"]),
  },
  computed: {
    ...mapState("Article", ["articles"]),
  },
  created() {
    this.GetArticles({ mode: "all" });
  },
};
</script>
<style scoped>
.container-articles {
  width: 100%;
  grid-gap: 20px;
}
</style>
