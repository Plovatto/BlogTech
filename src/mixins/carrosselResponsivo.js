// Ajusta a quantidade de colunas dos carrosséis conforme a largura da tela
export default {
  data() {
    return {
      carouselCols: 1,
    };
  },
  methods: {
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
    window.addEventListener('resize', this.adjustCarouselCols);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustCarouselCols);
  },
};

// Divide uma lista em grupos de 3 itens, um grupo por slide
export const agruparEmTres = (itens) => {
  const grupos = [];
  for (let i = 0; i < itens.length; i += 3) {
    grupos.push(itens.slice(i, i + 3));
  }
  return grupos;
};
