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
            <v-col v-for="(slide, i) in group" :key="i" cols="12" :md="carouselCols" xs="2">

              <div class="card h-100 w-auto">
  <div class="card-image" :style="`background-image: url(${images[index * 3 + i]})`"></div>
  <p class="card-title">
    <router-link :to="`/publi${index * 3 + i}`">{{ slide }}</router-link>
  </p>
  <p class="card-body">{{ text[index * 3 + i] }}</p>
  <p class="footer">
    Escrito por <span class="by-name">{{ name[index * 3 + i] }}</span> em <span class="date">{{ date[index * 3 + i] }}</span>
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
import { defineComponent } from 'vue';

import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const router = useRouter();

    const openCustomLink = (i) => {
      router.push(`/publi${i + 1}`);
    };

    return {
      openCustomLink,
    };
  },
  data() {
    return {
      carouselCols: 1,
      loading: true,
      slides: [],
      text: [],
      name: [],
      date: [],
      images: [],
    };
  },
  computed: {
    slideGroups() {
      const groups = [];
      for (let i = 0; i < this.slides.length; i += 3) {
        groups.push(this.slides.slice(i, i + 3));
      }
      return groups;
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          'https://apidoego.onrender.com/postagens/'
        );

        this.slides = response.data.map(item => item.title);
        this.text = response.data.map(item => item.description);
        this.name = response.data.map(item => item.profileName);
        this.date = response.data.map(item => item.postDate);
        this.images = response.data.map((item, index) => `https://apidoego.onrender.com/img/post-${index + 1}.jpg`);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    adjustCarouselCols() {
      if (window.innerWidth >= 960) {
        this.carouselCols = 4;
      } else if (window.innerWidth >= 600) {
        this.carouselCols = 2;
      } else {
        this.carouselCols = 1;
      }
    },
  },
  mounted() {
    this.adjustCarouselCols();
    this.fetchData();
    window.addEventListener('resize', this.adjustCarouselCols);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustCarouselCols);
  },
});
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
