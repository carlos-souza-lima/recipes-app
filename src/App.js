import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';
import DoneRecipes from './Pages/DoneRecipes';
import DrinkRecipeDetail from './Pages/DrinkPages/DrinkRecipeDetail';
import DrinkRecipeInProgress from './Pages/DrinkPages/DrinkRecipeInProgress';
import Drinks from './Pages/DrinkPages/Drinks';
import DrinksIngredients from './Pages/DrinkPages/DrinksIngredients';
import Explore from './Pages/Explore';
import ExploreDrinks from './Pages/ExploreDrinks';
import ExploreFoods from './Pages/ExploreFoods';
import Favorites from './Pages/Favorites';
import FoodRecipeDetail from './Pages/FoodPages/FoodRecipeDetail';
import FoodRecipeInProgress from './Pages/FoodPages/FoodRecipeInProgress';
import Foods from './Pages/FoodPages/Foods';
import FoodsIngredients from './Pages/FoodPages/FoodsIngredients';
import FoodsNationalities from './Pages/FoodPages/FoodsNationalities';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import NotFound from './Components/NotFound';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route
            exact
            path="/foods/:id/in-progress"
            component={ FoodRecipeInProgress }
          />
          <Route exact path="/foods/:id" component={ FoodRecipeDetail } />
          <Route exact path="/foods" component={ Foods } />
          <Route
            exact
            path="/drinks/:id/in-progress"
            component={ DrinkRecipeInProgress }
          />
          <Route exact path="/drinks/:id" component={ DrinkRecipeDetail } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ FoodsNationalities }
          />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ DrinksIngredients }
          />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ Favorites } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
// new teste
