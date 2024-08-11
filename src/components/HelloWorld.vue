<template>
 <div></div>
  <div class="hello">
    <h1>{{ title }}</h1>
    <h3>INTEGRANTES</h3>
    <p>
      <ul>
        <li>
          {{ names }}
        </li>
      </ul>
      <a :href="github" target="_blank" rel="noopener">{{ titlegit }}</a>.
    </p>
    
   
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    finalValue: {
        title: String,
        manes: String,
        github: String,
        titlegit: String,
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
