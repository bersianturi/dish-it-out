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
      foundRestaurant = await this._favoriteRestaurants.getAllRestaurants();
    }

    _showFoundRestaurants(foundRestaurant, this._view);
  }

  _showFoundRestaurants(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(`
          <li class="restaurant">
            <span class="restaurant__name">${restaurant.name || '-'}</span>
          </li>
        `),
        '',
      );
    } else {
      html = '<div class="restaurant__not__found">Restoran tidak ditemukan</div>';
    }

    document.querySelector('.restaurants').innerHTML = html;

    document
      .getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurants:searched:updated'));
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchInitiator;
