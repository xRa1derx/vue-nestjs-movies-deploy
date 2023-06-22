<template>
  <div class="sign-container">
    <div>
      <span class="show-modal" @click="isModalOpen('register')"
        >Зарегистрироваться</span
      >
      / <span class="show-modal" @click="isModalOpen('login')">войти</span>
    </div>
    <Teleport to="body">
      <modal-component :show="showModal" @close="isModalOpen()">
        <template #header>
          <register-component
            v-if="actionType === 'register'"
          ></register-component>
        </template>
      </modal-component>
    </Teleport>
  </div>
</template>

<script>
import { ref } from 'vue';
import ModalComponent from './ModalComponent.vue';
import RegisterComponent from './RegisterComponent.vue';
export default {
  components: { ModalComponent, RegisterComponent },
  setup() {
    const showModal = ref(false);
    const actionType = ref('');
    const isModalOpen = (action) => {
      actionType.value = action;
      showModal.value = !showModal.value;
      if (showModal.value === true) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };
    return { showModal, isModalOpen, actionType };
  },
};
</script>

<style scoped>
.sign-container {
  display: flex;
  margin-right: 1rem;
}

.sign-container > div {
  align-self: center;
}

.show-modal {
  cursor: pointer;
  padding: 1px 5px;
  border-radius: 10px;
}

.show-modal:hover {
  background-color: #17a2b8;
  color: #fff;
}
</style>