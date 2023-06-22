<template>
  <div>
    <div v-if="!isEdit" class="show-movie-container">
      <h2 class="movie-title">{{ movie.title }}({{ movie.year }})</h2>
      <div class="movie-body">
        <div class="movie-decr-and-actions">
          <div class="movie-description">
            <p>{{ movie.description }}</p>
          </div>
          <div class="action-buttons">
            <button @click="editMovie()">Редактировать</button>
            <button @click="deleteMovie(movie._id)">Удалить</button>
          </div>
        </div>
        <div class="poster-container">
          <div class="poster">
            <img :src="`/posters/${movie.poster}`" alt="" />
          </div>
          <div class="movie-rating">
            <h4>Рейтинг: {{ movie.rating }}</h4>
          </div>
        </div>
      </div>
      <div @click="$router.back()" class="arrow-back">
        <img src="@/assets/arrow.png" alt="" />
      </div>
    </div>
    <edit-movie
      v-else
      @cancelEdit="isEdit = false"
      @saveAndExit="saveAndExit"
    ></edit-movie>
  </div>
</template>

<script>
import axios from 'axios';
import { server } from '../../src/utils/helper';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import EditMovie from './EditMovie.vue';
export default {
  components: { EditMovie },
  setup() {
    const movie = ref({});
    const route = useRoute();
    const router = useRouter();
    const isEdit = ref(false);
    const getMovie = () => {
      axios
        .get(`${server.baseURL}/movies/${route.params.id}`)
        .then((res) => (movie.value = res.data));
    };
    const deleteMovie = (id) => {
      axios
        .delete(`${server.baseURL}/movies/${id}`)
        .then(() => router.push({ name: 'Home' }));
    };
    const editMovie = () => {
      isEdit.value = true;
    };
    const saveAndExit = (data) => {
      movie.value = data;
      isEdit.value = false;
    };
    onMounted(() => {
      getMovie();
    });
    return { getMovie, movie, deleteMovie, isEdit, editMovie, saveAndExit };
  },
};
</script>

<style scoped>
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
}

.poster-container {
  flex: 0 0 50%;
}

.poster {
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

.movie-description > p {
  margin-bottom: 3rem;
  padding: 1rem;
  text-align: justify;
}

.movie-rating {
  margin-top: auto;
}

.arrow-back {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  width: 40px;
  height: 25px;
  cursor: pointer;
}

.arrow-back > img {
  width: 100%;
  height: 100%;
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.movie-decr-and-actions {
  width: 100%;
}

@media (max-width: 800px) {
  .movie-body {
    flex-direction: column;
  }
  .movie-decr-and-actions {
    order: 1;
  }
  .poster {
    margin: auto;
  }
}
</style>