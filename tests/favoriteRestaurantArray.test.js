import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import { itActsAsFavoriteRestaurantModel } from "./contracts/favoriteRestaurantContract";

let favoriteRestaurant = [];

const FavoriteRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favoriteRestaurant.find((restaurant) => restaurant.id == id);
  },

  getAllRestaurant() {
    return favoriteRestaurant;
  },

  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favoriteRestaurant.push(restaurant);
  },

  deleteRestaurant(id) {
    favoriteRestaurant = favoriteRestaurant.filter((restaurant) => restaurant.id != id);
  },

  searchRestaurants(query) {
    return this.getAllRestaurant().filter((restaurant) => {
      const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedRestaurantName.indexOf(jammedQuery) !== -1;
    });
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestaurant = [];
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
