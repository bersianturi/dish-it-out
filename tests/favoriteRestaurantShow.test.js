import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-view';
import FavoriteRestaurantShowInitiator from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-show-initiator';

describe('Showing all favorite restaurant', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getFavoriteRestaurantTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should render the information that no restaurants have been liked', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      const initiator = new FavoriteRestaurantShowInitiator({
        view,
        favoriteRestaurants,
      });

      const restaurants = [];
      initiator._displayRestaurants(restaurants);

      expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
    });

    it('should ask for the favorite restaurant', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowInitiator({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no movies have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);

        done();
      });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowInitiator({
        view,
        favoriteRestaurants,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should render the restaurants', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      const initiator = new FavoriteRestaurantShowInitiator({
        view,
        favoriteRestaurants,
      });

      initiator._displayRestaurants([
        {
          id: 11,
          name: 'A',
          rating: 3,
          description: 'Sebuah restoran A',
        },
        {
          id: 22,
          name: 'B',
          rating: 4,
          description: 'Sebuah restoran B',
        },
      ]);

      expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
    });
  });
});
