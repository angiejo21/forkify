import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/actual';
import 'regenerator-runtime/runtime';

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //1. Loading recipe fom API
    await model.loadRecipe(id);

    //2.Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1. get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2.load search results
    await model.loadSearchResults(query);

    //3. render results
    resultsView.render(model.getSearchResultsPage());

    //4. render initial pagination btns
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1. render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2. render NEW pagination btns
  paginationView.render(model.state.search);
};

const controlServings = function () {
  //update the recipe servings in the state
  model.updateServings(4);

  //update the recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
