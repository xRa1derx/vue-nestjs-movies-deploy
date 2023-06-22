<template>
  <div class="add-new-movie">
    <input type="text" placeholder="Title" v-model="title" />
    <input type="text" placeholder="Year" v-model="year" />
    <textarea
      placeholder="Description"
      name="description"
      id=""
      cols="30"
      rows="10"
      v-model="description"
    ></textarea>
    <input type="range" min="1" max="10" step="1" v-model="rating" />
    <input id="fileUpload" type="file" hidden @change="previewPoster" />
    <button @click="choosePoster()">Poster</button>
    <button @click="addMovie()">submit</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { server } from '../../src/utils/helper';
export default {
  setup() {
    const title = ref('');
    const year = ref('');
    const description = ref('');
    const rating = ref('1');
    const poster = ref(null);
    const choosePoster = () => {
      document.getElementById('fileUpload').click();
    };
    const addMovie = () => {
      const formData = new FormData();
      formData.append('poster', poster.value);
      formData.append('title', title.value);
      formData.append('description', description.value);
      formData.append('rating', rating.value);
      formData.append('year', year.value);
      axios
        .post(`${server.baseURL}/movies`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
    const previewPoster = (event) => {
      poster.value = event.target.files[0];
    };
    return {
      title,
      year,
      description,
      rating,
      poster,
      addMovie,
      choosePoster,
      previewPoster,
    };
  },
};
</script>

<style scoped>
.add-new-movie {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 500px;
  gap: 5px;
}
</style>