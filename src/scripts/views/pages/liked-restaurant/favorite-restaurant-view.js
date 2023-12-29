/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <div class="section_title">Restoran Favorit</div>
      <div class="query-box">  
        <input id="query" type="text" placeholder="Cari restoran favoritmu">
      </div>
      <div id="restaurant-list" class="restaurant-list"></div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants) {
    this.showFavoriteRestaurants(restaurants);
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyMovieTemplate();
    }
    document.getElementById('restaurant-list').innerHTML = html;

    document.getElementById('restaurant-list').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyMovieTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada restoran untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
