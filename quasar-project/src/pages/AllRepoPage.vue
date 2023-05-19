<template>
  <!-- <div class="list" style="align-items: center">
    <select>
      <option disabled value="">Please select one</option>
      <option id="all">All</option>
      <option v-for="item in repoData" :value="item.repo" :key="item.id">
        {{ item.repo }}
      </option>
    </select>
  </div> -->
  <div class="list" v-if="repoData.length > 0">
    <h3 class="name-list-title">List of all my repos</h3>
    <ul>
      <li class="list-item" v-for="item in repoData" :key="item.id">
        <div class="list-item-right">
          <h4 class="list-item-title">{{ item.id }} {{ item.name }}</h4>
          <p class="list-item-description">
            {{ item.description }}
          </p>
          <a
            :href="item.html_url"
            class="list-item-description"
            style="color: dodgerblue"
            >{{ item.html_url }}
          </a>
          <p class="list-item-description">
            Last Updated:
            <!-- {{ item.last_update }} -->
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AllRepoPage',
};
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { RepoApiInterface } from './ApiInterfaces';
import axios from 'axios';

//Most code goes here
let repoData = ref<RepoApiInterface[]>([]);

onMounted(async () => {
  let allReposURI = 'http://localhost:9500/ghsecure/user/geeta-kukreja/repos';
  console.log('he');
  console.log(repoData.value);
  let repoAPI = await axios.get<RepoApiInterface[]>(allReposURI);
    console.log(repoAPI.status);
  if (repoAPI.status == 200) {
    repoData.value = repoAPI.data;
    console.log(repoData);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  padding: 20px;
}

.list-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.list-item-left {
  flex: 0 0 150px;
  height: 100%;
}

.list-item-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.list-item-right {
  flex: 1;
  padding: 10px;
}

.list-item-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.list-item-description {
  margin: 0;
  font-size: 1rem;
}
</style>
