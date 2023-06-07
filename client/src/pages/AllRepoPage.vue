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
            {{ item.updated_at }}
          </p>
          <button type="button" @click="fetchRepoCommitInfo(item.name)">
      Show All commits
    </button>
    
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
import { onMounted, ref, computed, watch } from 'vue';
import type { RepoApiInterface, ApiErrorInterface } from './ApiInterfaces';
import axios, { AxiosError } from 'axios';
import { QSlideItem } from 'quasar';

//Most code goes here
let repoData = ref<RepoApiInterface[]>([]);

onMounted(async () => {
  let allReposURI = 'http://localhost:9500/myData';
  console.log('he');
  
  let repoAPI = await axios.get<RepoApiInterface[]>(allReposURI);
    console.log(repoAPI.status);
  if (repoAPI.status == 200) {
    repoData.value = repoAPI.data;
    console.log(repoData.value);
    console.log(repoData);
  }
});

const queryOption = ref('repoId');
const queryValue = ref('');
const queryIsDirty = ref(false);
const apiErrorInfo = ref<ApiErrorInterface>({
  isError: false,
  errorCode: 0,
  errorMessage: '',
});


const queryChanged = (e: Event) => {
  queryIsDirty.value = true;
  repoData.value = [];
};

//When the radio button state changes we mark as dirty so we can manage the UI
//The main purpose of this is to show you watch functionality in that we can
//watch for state changes in vue
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const radioButtonChanged = watch(queryOption, () => {
  queryIsDirty.value = true;
  repoData.value = [];
});

//Not really using this but wanted to demo you can get the old and updated values
//as well in case that mattered to you
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const radioButtonChanged_NotUsed = watch(
  queryOption,
  (old: string, updated: string) => {
    console.log(`RADIO BUTTON CHANGED ${old} ${updated}`);
  }
);

let queryByNamePrefix = 'http://localhost:9500/commits?name=';

const fetchRepoCommitInfo = async (repoName: string) => {
  // queryIsDirty.value = false;
  // console.log(queryOption.value);
  // const apiPrefix =
  //   queryOption.value == 'repoId' ? queryByIdPrefix : queryByNamePrefix;
  // let num: number = parseInt(queryValue.value);
  const apiURL = queryByNamePrefix + repoName;
  console.log(apiURL);
  try {
    let repoAPI = await axios.get<RepoApiInterface[]>(apiURL);

    if (repoAPI.status == 200) {
      console.log(repoAPI);
      apiErrorInfo.value.isError = false;
      apiErrorInfo.value.errorCode = repoAPI.status;
      apiErrorInfo.value.errorMessage = repoAPI.statusText;
      repoData.value = repoAPI.data;
      console.log('succrss');
     
    } else {
      console.log('bad repo value');
    }
  } catch (err) {
    let e = err as AxiosError; //convert to axios error type
    if (e.response) {
      apiErrorInfo.value.isError = true;
      apiErrorInfo.value.errorCode = e.response.status;
      apiErrorInfo.value.errorMessage = e.request.statusText;
      console.log('Got Error Code ', e.response.status);
    } else {
      // Anything else
    }
  }
};


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
