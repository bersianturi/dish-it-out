import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
  <article class="restaurant-list_item">
    <div class="restaurant-list_item_header">
      <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="Foto restoran ${restaurant.name}" crossorigin="anonymous">
      <h2><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h2>
    </div>
    <div class="restaurant-list_item_body">
      <p class="rating"><strong>Rating</strong>: ${restaurant.rating}/5</p>
      <p class="location"><strong>Lokasi</strong>: ${restaurant.city}</p>
      <p class="restaurant-list_item_body_caption">
        <strong>Deskripsi</strong>: <br> ${restaurant.description?.slice(0, 200)}...
      </p>
      <a class="more-link" href="/#/detail/${restaurant.id}">Lihat selengkapnya</a>
    </div>
  </article>
`;

const createRestaurantdetailTemplate = (restaurant) => `
  <div class="restaurant-detail-content">
    <img src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous">
    <div>
      <h2 class="restaurant-detail-name">${restaurant.name}</h2>
      <div class="restaurant-detail-group">
        <h4 class="restaurant-detail-rating"><strong>Rating</strong> <br> ${restaurant.rating}</h4>
        <h4 class="restaurant-detail-address"><strong>Alamat</strong> <br> ${restaurant.address}, ${restaurant.city}</h4>
      </div>
      <h3 class="restaurant-detail-description"><strong>Deskripsi</strong>:</h3>
      <p class="restaurant-detail-description">${restaurant.description}</p>
    </div>
  </div>
  <hr>
  <div class="restaurant-menu">
    <div class="section_title">Menu apa saja yang ada di restoran ini?</div>
    <div class="restaurant-menu-content">
      <div class="restaurant-foods">
        <div class="menu-title">Makanan</div>
        <div class="foods">
          <ul>${restaurant.menus?.foods?.map((food) => `
            <li>${food.name ?? '-'}</li>
            `)?.join('')}</ul>
        </div>
      </div>
      <div class="restaurant-drinks">
        <div class="menu-title">Minuman</div>
        <div class="drinks">
          <ul>${restaurant.menus?.drinks?.map((drink) => `
          <li>${drink.name ?? '-'}</li>
          `)?.join('')}</ul>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <div class="restaurant-reviews">
    <div class="section_title">Bagaimana pendapat pelanggan?</div>
    <div class="review">
    ${restaurant.customerReviews
    .map((review) => `
      <div class="review-item">
        <p class="customer-name">${review.name}</p>
        <p class="customer-date">${review.date}</p>
        <p class="customer-review">${review.review}</p>
      </div>
    `).join('')}
      
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
      <button aria-label="Tambahkan ke favorit" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
      </button>
`;

const createLikedButtonTemplate = () => `
      <button aria-label="Hapus dari favorit" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
      </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantdetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
