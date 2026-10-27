<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container id="Recentes" class="w-auto mt-15 mb-15">
    <h3>Recentes</h3>
    <hr class="w-25 mt-2 mb-8">
    <div v-if="loading" class="d-flex flex-column align-center ga-3 py-10 text-center">
      <v-progress-circular indeterminate color="#E0AA8B"></v-progress-circular>
      <p class="loading-text">Carregando publicações… o servidor gratuito pode levar até 1 minuto para acordar.</p>
    </div>
    <div v-else class="d-flex justify-center align-center vh-100">
      <v-carousel
        :autoplay="false"
        :no-swipe="true"
        :interval="8000"
        hide-delimiters
        cycle
        no-controls
        height="auto"
        show-arrows="hover"
        :hide-delimiter-background="true"
        :cols="carouselCols"
        class="carousel-container custom-dot"
        dot-color="#FFFFFF"
      >
        <v-carousel-item v-for="(group, index) in slideGroups" :key="index">
          <v-row justify="center">
            <v-col v-for="postagem in group" :key="postagem.id" cols="12" :md="carouselCols" xs="2">
              <div class="card h-100 w-auto">
                <div class="card-image" :style="`background-image: url(${postagem.imagem})`"></div>
                <p class="card-title">
                  <router-link :to="`/postagem/${postagem.id}`">{{ postagem.title }}</router-link>
                </p>
                <p class="card-body">{{ postagem.description }}</p>
                <p class="footer">
                  Escrito por <span class="by-name">{{ postagem.profileName }}</span> em <span class="date">{{ postagem.postDate }}</span>
                </p>
              </div>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-container>
</template>

<script>
import { getPostagens } from '@/services/api';
import carrosselResponsivo, { agruparEmTres } from '@/mixins/carrosselResponsivo';

export default {
  mixins: [carrosselResponsivo],
  data() {
    return {
      loading: true,
      postagens: [],
    };
  },
  computed: {
    slideGroups() {
      return agruparEmTres(this.postagens);
    },
  },
  async mounted() {
    try {
      this.postagens = await getPostagens();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>


  <style scoped>


  .card {
    border-radius: 20px;
    border: 3px solid #E0AA8B;
    background: #FFF;
    
    padding: 20px;
    width: 310px;
    height: 380px;
    min-height: 380px;
    transition: 0.4s;

    
  }
a{color: #000;
  text-decoration: none;
  outline: none;
}
a:visited{
  color: #000;
  text-decoration: none;
  outline: none;
}
  .card:hover {
    transform: translateY(-10px);
  }


  .card-title {
    font-size: 16px;
    margin: 15px 0 0 10px;
    color: #000;
    font-family: 'Inter', sans-serif;
    font-style: normal;
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
    margin: 13px 0 0 10px;
    font-size: 11px;
    color: #000;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .footer {
    float: right;
    margin: 28px 0 12px 18px;
    font-size: 9px;
    color: #000000;
  }

  .by-name {
    font-weight: 700;
  }

  .loading-text {
    font-size: 14px;
    color: #666;
  }
  </style>
