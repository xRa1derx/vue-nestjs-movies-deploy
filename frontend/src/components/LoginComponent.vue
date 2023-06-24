<template>
  <div class="login">
    <input type="text" v-model="login">
    <input type="password" v-model="password">
    <button @click="signIn()">Click</button>
  </div>
</template>

<script>
import axios from 'axios';
import { server } from '../utils/helper'
import { ref } from 'vue';
export default {
  name: 'RegisterComponent',
  props: {
    msg: String
  },
  setup() {
    const login = ref('');
    const password = ref('');
    const signIn = () => {
      axios.post(`${server.baseURL}/auth/login`, { username: login.value, password: password.value }).then((res) => console.log(res)).catch(err => console.log(err))
    };
    return { signIn, login, password }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registration {
  display: flex;
  flex-direction: column;
  max-width: 250px;
  margin: auto;
  gap: 5px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
