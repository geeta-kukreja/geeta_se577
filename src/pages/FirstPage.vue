<template>
  <div id="app">
    <!-- <div id="alert"><b>Login Goes here (currently not functional)</b></div> -->
    <p class="vs"></p>
    <form name="login-form" >
          <div class="mb-3">
            <label for="username">Username: </label>
            <input id="username" type="text" />
          </div><p class="vs"></p>
          <div class="mb-3">
            <label for="password">Password: </label>
            <input id="password" type="password" />
          </div><p class="vs"></p>
          <button class="btn btn-outline-dark" type="submit">
            Login
          </button>
        </form>


  </div>



</template>

<script lang="ts">
export default {
  name: 'FirstPage',
};
</script>

<script setup lang="ts">
//Most code goes here
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.vs {
  padding-right: 10px;
  /* padding-left: 10px; */
}</style>
