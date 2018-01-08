import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";

export interface FeatureState {
    recipes: State
}


export interface State {
    recipes: Recipe[];
};

const initialState: State = {
    recipes: [
        new Recipe('A Test Recipe', 'This is simply a test',
         'http://www.seriouseats.com/recipes/assets_c/2015/01/20150119-pressure-cooker-chicken-stew-food-lab-11-thumb-1500xauto-418088.jpg',
        [new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)]),
        new Recipe('Another Test Recipe', 'This is simply a test',
         'http://www.seriouseats.com/recipes/assets_c/2015/01/20150119-pressure-cooker-chicken-stew-food-lab-11-thumb-1500xauto-418088.jpg',
        [new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)])
      ]
};

export function recipeReducer(state = initialState, action) {
    return state;
}