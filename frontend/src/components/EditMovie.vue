<template>
  <div class="show-movie-container">
    <div class="movie-body">
      <div class="movie-decr-and-actions">
        <input type="text" placeholder="Title" v-model="movie.title" />
        <input type="text" placeholder="Year" v-model="movie.year" />
        <div class="movie-description">
          <textarea v-model="movie.description"></textarea>
        </div>
        <div class="action-buttons">
          <button @click="updateMovie()">сохранить</button>
          <button @click="$emit('cancelEdit')">назад</button>
        </div>
      </div>
      <div class="poster-container">
        <div class="poster">
          <img :src="`/posters/${movie.poster}`" alt="" />
          <input id="fileUpload" type="file" hidden @change="previewPoster" />
          <button class="poster-change" @click="changePoster()">
            Сменить постер
          </button>
        </div>
        <div class="edit-rating">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            v-model="movie.rating"
          />
        </div>
        <div class="movie-rating">
          <h4>Рейтинг: {{ movie.rating }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { server } from '../../src/utils/helper';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
export default {
  emits: ['cancelEdit', 'saveAndExit'],
  setup(_, { emit }) {
    const movie = ref({});
    const route = useRoute();
    const poster = ref(null);
    const changePoster = () => {
      document.getElementById('fileUpload').click();
    };
    const previewPoster = (event) => {
      poster.value = event.target.files[0];
    };
    const getMovie = () => {
      axios
        .get(`${server.baseURL}/movies/${route.params.id}`)
        .then((res) => (movie.value = res.data));
    };
    const updateMovie = () => {
      const formData = new FormData();
      formData.append('poster', poster.value || movie.value.poster);
      formData.append('title', movie.value.title);
      formData.append('description', movie.value.description);
      formData.append('rating', movie.value.rating);
      formData.append('year', movie.value.year);
      axios
        .patch(`${server.baseURL}/movies/${route.params.id}`, formData
        , {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        )
        .then((res) => {
          emit('saveAndExit', res.data);
        });
    };
    const deleteMovie = (id) => {
      axios.delete(`${server.baseURL}/movies/${id}`);
    };
    onMounted(() => {
      getMovie();
    });
    return {
      getMovie,
      movie,
      deleteMovie,
      changePoster,
      previewPoster,
      updateMovie,
      poster,
    };
  },
};
</script>

<style scoped>
input {
  width: fit-content;
}

.show-movie-container {
  position: relative;
  max-width: 800px;
  height: 100%;
  margin: auto;
  background-color: #f4f4f4;
  padding: 2px;
  border-radius: 5px;
}

.movie-body {
  display: flex;
  margin: 1rem;
  justify-content: space-between;
}

.movie-decr-and-actions {
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 10px;
}

.poster-container {
}

.poster {
  position: relative;
  margin: 1rem;
  max-width: 500px;
  height: 550px;
  box-shadow: 0 0 3px 1px #424242;
}

.poster > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.movie-description {
  height: 100%;
}

.movie-description > textarea {
  width: 100%;
  min-height: 50%;
}

.movie-rating {
  margin-top: auto;
}

.action-buttons {
  margin-bottom: 1rem;
}

.poster-change {
  position: absolute;
  left: -10px;
  bottom: -10px;
}

@media (max-width: 800px) {
  .movie-body {
    flex-direction: column;
  }
  .movie-decr-and-actions {
    order: 1;
    width: 100%;
  }
  .poster {
    margin: auto;
  }
  .movie-description > textarea {
    min-height: 100px;
  }
}
</style>