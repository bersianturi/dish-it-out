import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="jumbotron">
      <div class="jumbotron_body">
        <h1 class="jumbotron_brand">DishItOut!</h1>
        <p class="jumbotron_caption">Bingung makan dimana? Cari disini solusinya!</p>
      </div>
    </div>
    <section>
      <div class="section_title">
        Daftar Rekomendasi Restoran
      </div>
      <div id="restaurant-list" class="restaurant-list"></div>
    </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurant();
    const restaurantsContainer = document.querySelector('#restaurant-list');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
