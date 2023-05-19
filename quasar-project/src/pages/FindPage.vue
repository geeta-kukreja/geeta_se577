<template>
  <p>Search using the following Criteria:</p>
  <input
    type="radio"
    id="repoId"
    name="repos"
    value="repoId"
    v-model="queryOption"
  />
  <label for="courseId">Repo ID</label><br />
  <input
    type="radio"
    id="repoName"
    name="repos"
    value="RepoName"
    v-model="queryOption"
  />
  <label for="css">Repo Name</label><br />

  <input
    type="text"
    v-model="queryValue"
    @keypress="queryChanged"
    @keyup.delete="queryChanged"
  />

  <p>
    <button type="button" @click="fetchRepoInfo()" :disabled="shouldDisable">
      Get repositories Info
    </button>
  </p>
  <div class="list" v-if="repoData.length > 0 && !queryIsDirty">
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
         
        </div>
      </li>
    </ul>
  </div>
  <p class="error-text" v-if="apiErrorInfo.isError && !queryIsDirty">
    Unable to locate Repo by ID, code = {{ apiErrorInfo.errorCode }}
  </p>
</template>

<script lang="ts">
export default {
  name: 'FindPage',
};
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { RepoApiInterface, ApiErrorInterface } from './ApiInterfaces';
import axios, { AxiosError } from 'axios';

const queryOption = ref('repoId');
const queryValue = ref('');
const queryIsDirty = ref(false);
const apiErrorInfo = ref<ApiErrorInterface>({
  isError: false,
  errorCode: 0,
  errorMessage: '',
});

let repoData = ref<RepoApiInterface[]>([]);

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

//This is a computed property that will change when the studentID property
//changes it is used to enable and disable the button
const shouldDisable = computed(() => {
  return queryValue.value.length > 0 ? false : true;
});

let queryByIdPrefix = 'http://localhost:9500/search?id=';
let queryByNamePrefix = 'http://localhost:9500/search?name=';

const fetchRepoInfo = async () => {
  queryIsDirty.value = false;
  console.log(queryOption.value);
  const apiPrefix =
    queryOption.value == 'repoId' ? queryByIdPrefix : queryByNamePrefix;
  let num: number = parseInt(queryValue.value);
  const apiURL =
    queryOption.value == 'repoId'
      ? apiPrefix + num
      : apiPrefix + queryValue.value;
  console.log(apiURL);
  try {
    let repoAPI = await axios.get<RepoApiInterface[]>(apiURL);

    if (repoAPI.status == 200) {
      console.log(repoAPI);
      apiErrorInfo.value.isError = false;
      apiErrorInfo.value.errorCode = repoAPI.status;
      apiErrorInfo.value.errorMessage = repoAPI.statusText;
      repoData.value = repoAPI.data;
      console.log(repoData.value);
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
.name-list {
  padding: 20px;
}

.name-item {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.error-text {
  color: red;
}

.happy-text {
  color: green;
}
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
