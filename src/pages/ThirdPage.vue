<template>
 <div class="name-list">
  <h2 class="name-list-title">List of all my repos</h2>
    <ul>
      <li v-for="(name, index) in names" :key="index" class="name-item">
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ThirdPage',

  data() {
    return {
      names: ['Albums mobile app', 'Employee manager', 'Information stack app', 'Cryptotracker', 'Password manager','Vaccination web app','Birthday App'],
    };
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.name-list {
  padding: 20px;
}

.name-item {
  font-size: 1.2rem;
  margin-bottom: 10px;
}
</style>
