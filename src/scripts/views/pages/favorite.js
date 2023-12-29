import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantView from './liked-restaurant/favorite-restaurant-view';
import FavoriteRestaurantSearchInitiator from './liked-restaurant/favorite-restaurant-search-initiator';
import FavoriteRestaurantShowInitiator from './liked-restaurant/favorite-restaurant-show-initiator';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    // eslint-disable-next-line no-new
    new FavoriteRestaurantShowInitiator({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    // eslint-disable-next-line no-new
    new FavoriteRestaurantSearchInitiator({ view, favoriteRestaurants: FavoriteRestaurantIdb });
  },
};

export default Favorite;
