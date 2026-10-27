<template>
  <v-container class="d-flex flex-column align-center mt-15">
    <div v-if="loading" class="d-flex justify-center py-10">
      <v-progress-circular indeterminate color="#E0AA8B"></v-progress-circular>
    </div>
    <div v-else class="card">
      <div class="card-image" :style="`background-image: url(${postagem.imagem})`"></div>
      <p class="card-title">{{ postagem.title }}</p>
      <p class="card-body">{{ postagem.description }}</p>
      <p class="footer">Escrito por <span class="by-name">{{ postagem.profileName }}</span> em <span class="by-name">{{ postagem.postDate }}</span></p>
    </div>
    <br><br>
    <router-link to="/" aria-label="Voltar para o início"><v-icon icon="mdi-home" color="blue-grey-darken-2"></v-icon></router-link>
  </v-container>
</template>

<script>
import { getPostagem } from '@/services/api';

export default {
  props: {
    id: { type: Number, required: true },
  },
  data() {
    return {
      loading: true,
      postagem: {},
    };
  },
  watch: {
    id: {
      immediate: true,
      async handler(id) {
        this.loading = true;
        try {
          this.postagem = await getPostagem(id);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          this.loading = false;
        }
      },
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 20px;
  border: 3px solid #E0AA8B;
  background: #FFF;
  padding: 20px;
  width: 30rem;
  height: 70vh;
  min-height: 380px;
  transition: 0.4s;
}

.card:hover {
  transform: translateY(-10px);
}

a {
  cursor: pointer;
  transition: 0.5s;
}

a:hover {
  transform: scale(1.5);
}

.card-title {
  font-size: 20px;
  margin: 20px 0 0 10px;
  color: #000;
  font-weight: 600;
  line-height: normal;
}

.card-image {
  min-height: 170px;
  border-radius: 15px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.card-body {
  margin: 20px 0 0 10px;
  font-size: 15px;
  color: #000;
  font-weight: 400;
  line-height: normal;
}

.footer {
  float: right;
  margin: 28px 0 12px 18px;
  font-size: 11px;
  color: #000000;
}

.by-name {
  font-weight: 700;
}

@media screen and (max-width: 600px) {
  .card {
    width: 20rem;
  }
}
</style>
