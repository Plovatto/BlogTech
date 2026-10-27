<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <Header />
      <Recentes/>
      <Equipe />
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue';
  import Equipe from '@/components/Equipe.vue';
  import Footer from '@/components/Footer.vue';
  import Recentes from '@/components/Recentes.vue';
  
  export default {
    components: { Header, Recentes, Footer, Equipe },
  };
  </script>
