class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
      <div id="restaurant-search-container">
        <input id="query" type="text">

        <div class="restaurant-result-container">
          <ul class="restaurants">
          </ul>
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce(
        (carry, movie) => carry.concat(`
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
}

export default FavoriteRestaurantSearchView;