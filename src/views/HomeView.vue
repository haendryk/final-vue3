<template>
  <div class="home" style="text-align: center;">
    <img alt="Vue logo" src="../assets/logo.png" style="padding-top: 5em;">
    <HelloWorld :finalValue="dataValue"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  data() {
        return {
            dataValue:{
              title: 'Final Vue 3', 
              names: 'Osmar Hammel Peñaranda Iporre',
              github: '#', 
              titlegit: 'Projecto GitHub'}
        }
},
components: {
    HelloWorld
  },
}
</script>
