import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
//import { Store } from '@ngrx/store';
//import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test',
         'http://www.seriouseats.com/recipes/assets_c/2015/01/20150119-pressure-cooker-chicken-stew-food-lab-11-thumb-1500xauto-418088.jpg',
        [new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)]),
        new Recipe('Another Test Recipe', 'This is simply a test',
         'http://www.seriouseats.com/recipes/assets_c/2015/01/20150119-pressure-cooker-chicken-stew-food-lab-11-thumb-1500xauto-418088.jpg',
        [new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)])
      ];

      /* Since components can dispath actions themselves we dont need to 
      use the store here! */
    //   constructor(//Store takes can of this private slService: ShoppingListService, 
    //     private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {}

      setRecipes(recipes: Recipe[]) {
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      /*We actually dont need this method here anymore. 
      The component that wants to perform the action can do it itself!*/
    //   addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //       this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    //       // Store receive the dispatch and take care of adding the ingredients
    //       // We don't need to use an external service to take care of it anymore
    //       //this.slService.addIngredients(ingredients);
    //   }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());          
      }
}