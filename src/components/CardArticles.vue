 <template>
  <q-card class="my-card">
    <img :src="url" height="300" width="100%" />
    <q-card-section>
      <div class="text-h6 q-mb-xs">{{ title }}</div>
      <div class="row no-wrap items-center">
        <q-rating size="18px" v-model="stars" :max="5" color="warning" />
        <span class="text-caption text-grey q-ml-sm">4.2 (551)</span>
        <q-btn
          fab
          color="red"
          icon="favorite"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        />
      </div>
      <div class="row q-mt-md">
        <q-btn
          @click="
            () => {
              dialog = !dialog;
              articulo = article;
            }
          "
          flat
          color="primary"
          label="Ver mas"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { inject } from "@vue/composition-api";
export default {
  setup(props) {
    const dialog = inject("dialog");
    const articulo = inject("article");
    return {
      dialog,
      articulo,
    };
  },
  props: {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    quantication: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
    },
    article: {
      type: Object,
    },
  },
  data() {
    return {
      stars: 0,
    };
  },
};
</script>

<style>
.my-card {
  width: 300px;
}
</style>