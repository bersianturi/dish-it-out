const _showFoundRestaurants = (restaurants, view) => {
  view.showRestaurants(restaurants);
};

class FavoriteRestaurantSearchInitiator {
  constructor({ favoriteRestaurants, view }) {
    this._favoriteRestaurants = favoriteRestaurants;
    this._view = view;

    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurants(latestQuery);
    });
  }

  async _searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundRestaurant;
    if (this.latestQuery.length > 0) {
      foundRestaurant = await this._favoriteRestaurants.searchRestaurants(this._latestQuery);
    } else {
      foundRestaurant = await this._favoriteRestaurants.getAllRestaurant();
    }

    _showFoundRestaurants(foundRestaurant, this._view);
  }

  _showFoundRestaurants(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchInitiator;
