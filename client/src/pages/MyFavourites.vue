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
      <li class="list-item" v-for="item in repoData" :key="item.name">
        <div class="list-item-right">
          <h4 class="list-item-title">{{ item.name }}</h4>
         
          <a
            :href="item.url"
            class="list-item-description"
            style="color: dodgerblue"
            >{{ item.url }}
          </a>
          
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
  name: 'MyFavourites',
};
</script>

<script setup lang="ts">
//Most code goes here
import { onMounted, ref} from 'vue';
import type { FavouritesApiInterface} from './ApiInterfaces';
import axios from 'axios';


//Most code goes here
let repoData = ref<FavouritesApiInterface[]>([]);

onMounted(async () => {
  let allReposURI = 'http://localhost:9500/allFavGists';
  console.log('he');
  
  let repoAPI = await axios.get<FavouritesApiInterface[]>(allReposURI);
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
