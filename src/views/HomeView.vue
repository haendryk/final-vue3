<template>
  <div class="home" style="text-align: center;">
    <img alt="Vue logo" src="../assets/logo.png" style="padding-top: 5em;">
    <HelloWorld :finalValue="{title: String, manes: String, github: String, titlegit: String}"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
