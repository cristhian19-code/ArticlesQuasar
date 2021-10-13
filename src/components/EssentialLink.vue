<template>
  <div>
    <router-link v-if="!funct" class="router-link" :to="link">
      <q-item
        clickable
        tag="a"
        target="_blank"
      >
          <q-item-section
            v-if="icon"
            avatar
          >
            <q-icon :name="icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ title }}</q-item-label>
            
          </q-item-section>
      </q-item>
    </router-link>
    <q-item
        v-if="user && funct"
        @click="Signout()"
        clickable
        tag="a"
        target="_blank"
      >
          <q-item-section
            v-if="icon"
            avatar
          >
            <q-icon :name="icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ title }}</q-item-label>
            
          </q-item-section>
      </q-item>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'

export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },
    funct:{
      type: Boolean
    }
  },
  methods: {
    ...mapActions('Article',['Signout'])
  },
  computed:{
    ...mapState('Article',['user'])
  }
}
</script>

<style>
.router-link{
  text-decoration: none;
  color: black;
}
</style>