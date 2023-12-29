/* eslint-disable no-new */
import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-view';
import FavoriteRestaurantShowInitiator from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-show-initiator';

describe('Showing all favorite restaurant', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should render the information that no restaurants have been liked', () => {
      const favoriteRestaurants = {
        getAllRestaurant: jest.fn().mockImplementation(() => []),
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
        getAllRestaurant: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowInitiator({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no movies have been liked', (done) => {
      document.getElementById('restaurant-list').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);

        done();
      });

      const favoriteRestaurants = {
        getAllRestaurant: jest.fn().mockImplementation(() => []),
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
        getAllRestaurant: jest.fn().mockImplementation(() => []),
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

      expect(document.querySelectorAll('.restaurant-list_item').length).toEqual(2);
    });
  });
});
