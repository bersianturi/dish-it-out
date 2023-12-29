/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert');
const { async } = require('regenerator-runtime');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');

  // I.seeElement('.query');

  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');
  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-list_item');
  const likedRestaurantName = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');

  const names = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__name a').at(i));

    I.seeElement('#likeButton');
    I.click('#likeButton');

    // eslint-disable-next-line no-await-in-loop
    names.push(await I.grabTextFrom('.restaurant-detail-name'));

    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-list_item');
  assert.strictEqual(names.length, visibleLikedRestaurants);

  const searchQuery = names[1].substring(1, 3);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-list_item');

  assert.strictEqual(matchingRestaurants.length, visibleSearchedLikedRestaurants);

  for (let i = 0; i < matchingRestaurants.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleName = await I.grabTextFrom(locate('.restaurant__name').at(i + 1));

    assert.strictEqual(matchingRestaurants[i], visibleName);
  }
});

Scenario('Unliking restaurant', async ({ I }) => {
  I.seeElement('#query');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');
  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-list_item');
  const likedRestaurantName = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});
