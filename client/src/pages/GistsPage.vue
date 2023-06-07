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
        <button type="button" @click="postCall(item.files,item.html_url, item)">
          {{ item.buttonText ?  'Gist added to favourite': 'Add to favourite'  }}
        </button>
        </div>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { onMounted, ref } from 'vue';
import type { GistApiInterface } from './ApiInterfaces';
import axios from 'axios';

export default {
  name: 'GistsPage',
  setup(){
    let repoData = ref<GistApiInterface[]>([]);

    onMounted(async () => {
      let allReposURI = 'http://localhost:9500/myGists';
      let repoAPI = await axios.get<GistApiInterface[]>(allReposURI);
      console.log(repoAPI.status);
      
      if (repoAPI.status == 200) {
        repoData.value = repoAPI.data;
        console.log(repoData.value);
        console.log(repoData);
      }
    });

    const postCall = async (name: string, URL: string, itemButton: any) => {
        const data = {
          name: name,
          URL: URL
        };
        if(!itemButton.buttonText){
          axios.post('http://localhost:9500/favgists', data)
          .then(() => {
            itemButton.buttonText  = ! itemButton.buttonText ;
            console.log(!itemButton);
          })
          .catch(error => {
            console.error(error);
          });
        }
        
    }




    return {
      repoData,
      postCall
    };
  }
};
</script>