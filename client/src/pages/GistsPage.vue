<template>

  <div class="list" v-if="repoData.length > 0">
    <h3 class="name-list-title">Gists by geeta-kukreja</h3>
    <ul>
      <li class="list-item" v-for="item in repoData" :key="item.id">
        <div class="list-item-right">
          <h4 class="list-item-title">{{ item.files }}</h4>
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
            {{ item.updated_at }}
          </p>
          <!-- <button type="button" @click="fetchRepoCommitInfo(item.name)">
      Show All commits
    </button> -->
    
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

export default {
  name: 'GistsPage',

};

</script>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import type { GistApiInterface, ApiErrorInterface } from './ApiInterfaces';
import axios, { AxiosError } from 'axios';


//Most code goes here
let repoData = ref<GistApiInterface[]>([]);

onMounted(async () => {
  let allReposURI = 'http://localhost:9500/myGists';
  console.log('he');
  
  let repoAPI = await axios.get<GistApiInterface[]>(allReposURI);
    console.log(repoAPI.status);
  if (repoAPI.status == 200) {
    repoData.value = repoAPI.data;
    console.log(repoData.value);
    console.log(repoData);
  }
});



</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
