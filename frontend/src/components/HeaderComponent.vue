<template>
  <header>
    <div class="sort-by-rating">
      <div>Сортировать по рейтингу: по убыванию</div>
    </div>
    <sign-in></sign-in>
  </header>
</template>

<script>
import SignIn from './SignIn.vue';
export default {
  components: { SignIn },
};
</script>

<style scoped>
header {
  display: flex;
  border-radius: 5px;
  max-width: 1200px;
  height: 2rem;
  background-color: #fff;
  margin: auto;
  margin-bottom: 8px;
  justify-content: space-between;
}

.sort-by-rating {
  display: flex;
  margin-left: 1rem;
  cursor: pointer;
  padding: 1px 5px;
  border-radius: 10px;
  align-self: center;
}

.sort-by-rating:hover {
  background-color: #17a2b8;
  color: #fff;
}
</style>