/* eslint-disable no-unused-vars */
import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import { spyOn } from 'jest-mock';
import FavoriteRestaurantSearchInitiator from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-initiator';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-view';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import { preset } from '../jest.config';

describe('Searching restaurants', () => {
  let initiator;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructInitiator = () => {
    favoriteRestaurants = {
      getAllRestaurant: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    initiator = new FavoriteRestaurantSearchInitiator({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructInitiator();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('resto a');

      expect(initiator.latestQuery).toEqual('resto a');
    });

    it('should ask the model to search fro liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('resto a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('resto a');
    });

    it('should show the found restaurants', () => {
      initiator._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant-list_item').length).toEqual(1);

      initiator._showFoundRestaurants([
        {
          id: 1,
          name: 'Satu',
        },
        {
          id: 2,
          name: 'Dua',
        },
      ]);
      expect(document.querySelectorAll('.restaurant-list_item').length).toEqual(2);
    });

    it('should show the name of the found restaurants', () => {
      initiator._showFoundRestaurants([
        {
          id: 1,
          name: 'Satu',
        },
      ]);

      expect(document.querySelectorAll('.restaurant__name').item(0).textContent).toEqual('Satu');

      initiator._showFoundRestaurants([
        {
          id: 1,
          name: 'Satu',
        },
        {
          id: 2,
          name: 'Dua',
        },
      ]);

      const restaurantNames = document.querySelectorAll('.restaurant__name');

      expect(restaurantNames.item(0).textContent).toEqual('Satu');
      expect(restaurantNames.item(1).textContent).toEqual('Dua');
    });

    it('should show - for found restaurant without title', () => {
      initiator._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant__name').item(0).textContent).toEqual('-');
    });

    it('should show the restaurants found by Favorite Restaurant', (done) => {
      document
        .getElementById('restaurant-list')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-list_item').length).toEqual(3);

          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc' },
            { id: 222, name: 'ada juga resto abcde' },
            { id: 333, name: 'ini juga boleh resto a' },
          ];
        }
        return [];
      });
      searchRestaurants('resto a');
    });

    it('should show the name of the restaurants found by Favorite Restaurant', (done) => {
      document
        .getElementById('restaurant-list')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames = document.querySelectorAll('.restaurant__name');
          expect(restaurantNames.item(0).textContent).toEqual('resto abc');
          expect(restaurantNames.item(1).textContent).toEqual('ada juga resto abcde');
          expect(restaurantNames.item(2).textContent).toEqual('ini juga boleh resto a');

          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc' },
            { id: 222, name: 'ada juga resto abcde' },
            { id: 333, name: 'ini juga boleh resto a' },
          ];
        }
        return [];
      });
      searchRestaurants('resto a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurant.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(initiator.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(initiator.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(initiator.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(initiator.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurant.mockImplementation(() => []);

      searchRestaurants('    ');

      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restaurant-list')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('resto a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant-list')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-list_item').length).toEqual(0);

          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('film a');
    });

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('restaurant-list')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames = document.querySelectorAll('.restaurant__name');
          expect(restaurantNames.item(0).textContent).toEqual('-');

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestaurants('resto a');
    });
  });
});
