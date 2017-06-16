<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <sample></sample>
  </div>
</template>

<script>
import Sample from './sample';

export default {
  name: 'hello',
  components: {
    Sample,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
