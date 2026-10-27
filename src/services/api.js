import axios from 'axios';

export const API_URL = 'https://apidoego.onrender.com';

const api = axios.create({ baseURL: API_URL });

// As imagens de capa seguem a ordem das publicações: post-1.jpg é a publicação 0
export const getImagemPostagem = (index) => `${API_URL}/img/post-${index + 1}.jpg`;

export async function getPostagens() {
  const { data } = await api.get('/postagens');
  return data.map((postagem, index) => ({
    ...postagem,
    id: index,
    imagem: getImagemPostagem(index),
  }));
}

export async function getPostagem(id) {
  const { data } = await api.get(`/postagem/${id}`);
  return { ...data, id, imagem: getImagemPostagem(id) };
}
