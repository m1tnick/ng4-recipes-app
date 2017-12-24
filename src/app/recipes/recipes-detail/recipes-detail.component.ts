import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    /* We don't use the method below anymore, since store 
      takes care of it.
      The good thing is that before we invoked the recipeService
      that would invoke ShoppingListService. Crazy!
      */
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
