<template>
  <Menu>
    <router-link to="/">Home</router-link>
    <router-link to="/login">Inicio de Sección</router-link>
    <router-link to="/cliente" v-if="canSee(['admin','secretaria','veterinario'])">Clientes</router-link>
    <router-link to="/mascota" v-if="canSee(['admin','veterinario'])">Mascotas</router-link>
    <router-link to="/cita" v-if="canSee(['admin','secretaria'])">Citas</router-link>
  </Menu>
  <router-view />
</template>

<script>
import {mapGetters } from 'vuex'
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    Menu
  },
  methods: {
    canSee(roles) {
      console.log('canSee', this.rol);
      return roles.includes(this.rol);
      // return true;
    }
  },
  computed: {
    ...mapGetters(['rol'])
  }
}
</script>

<style lang="scss"></style>
