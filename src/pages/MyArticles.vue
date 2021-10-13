<template>
  <div class="q-pa-md">
    <q-table
      title="Mis Articulos"
      :data="articles"
      :columns="columns"
      row-key="title"
      no-data-label="No tienes ningun articulo"
      dark
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="title" :props="props">
            {{ props.row.title }}
          </q-td>
          <q-td key="author" :props="props">
            <div class="text-pre-wrap">{{ props.row.author }}</div>
          </q-td>
          <q-td key="date" :props="props">
            <div class="text-pre-wrap">{{ props.row.date }}</div>
          </q-td>
          <q-td key="options" :props="props">
            <q-btn
              class="q-mx-sm"
              color="green"
              icon="edit"
              label="Editar"
              size="sm"
              no-caps
            ></q-btn>
            <q-btn
              @click="RemoveArticles(props.row.id)"
              :loading="loading"
              class="q-mx-sm"
              icon="delete"
              color="red"
              label="Eliminar"
              size="sm"
              no-caps
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      columns: [
        {
          name: "id",
          align: "center",
          label: "Id",
          field: "id",
          sortable: true,
        },
        {
          name: "title",
          align: "center",
          label: "Titulo",
          field: "title",
          sortable: true,
        },
        {
          name: "author",
          align: "center",
          label: "Autor",
          field: "author",
          sortable: true,
        },
        {
          name: "date",
          align: "center",
          label: "Fecha de Publcacion",
          field: "date",
          sortable: true,
        },
        {
          name: "options",
          align: "center",
          label: "Opciones",
          field: "options",
        },
      ],
    };
  },
  methods: {
    ...mapActions("Article", ["GetArticles", "EditArticles", "RemoveArticles"]),
  },
  computed: {
    ...mapState("Article", ["articles", "user", "loading"]),
  },
  watch: {
    user(newUser, oldUser) {
      this.GetArticles({ mode: "my-articles", email: newUser.email });
    },
  },
  created() {
    if (this.user) {
      this.GetArticles({ mode: "my-articles", email: this.user.email });
    }
  },
};
</script>

<style>
</style>