import { RecipeButtonProps, RecipeProps } from "../../types";
import RecipeForm from "../recipe-form/RecipeForm";
import Style from "./RecipeButton.module.css";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Separator from "@radix-ui/react-separator";

function RecipeButton({
  isEditable,
  recipes,
  recipeId,
  setRecipeId,
  setCaloriesEaten,
  editRecipe,
  deleteRecipe,
  setRecipesEaten,
}: RecipeButtonProps) {
  function handleCaloriesEat(totalCalories: number, recipe: RecipeProps) {
    setCaloriesEaten((prevCaloriesEaten) => +prevCaloriesEaten + totalCalories);

    setRecipesEaten &&
      setRecipesEaten((prevRecipesEaten) => [
        ...prevRecipesEaten,
        { ...recipe, idToday: crypto.randomUUID() },
      ]);
  }

  function handleCaloriesRemove(totalCalories: number, recipe: RecipeProps) {
    setCaloriesEaten((prevCaloriesEaten) => +prevCaloriesEaten - totalCalories);
    setRecipesEaten &&
      setRecipesEaten((prevRecipesEaten) =>
        prevRecipesEaten.filter(
          (eatenRecipe) => eatenRecipe.idToday != recipe.idToday
        )
      );
  }

  return (
    <>
      {recipes.map((recipe: RecipeProps) => {
        const totalCalories = recipe.ingredient.reduce((total, ingredient) => {
          return (
            total +
            9 * +ingredient.fat +
            4 * +ingredient.carb +
            4 * +ingredient.protein
          );
        }, 0);

        return (
          <div key={recipeId && isEditable ? recipe.id : recipe.idToday}>
            <div className={Style.recipe}>
              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <button
                    className={Style.recipeButton}
                    onClick={() => setRecipeId(recipe.id)}
                  >
                    <span>{recipe.title}</span>
                    <span className={Style.cal}>{totalCalories} Cal.</span>
                  </button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay className={Style.DialogOverlay} />
                  <RecipeForm
                    recipeId={recipeId}
                    editRecipe={editRecipe}
                    deleteRecipe={deleteRecipe}
                    isEditable={isEditable}
                  />
                </AlertDialog.Portal>
              </AlertDialog.Root>
              {editRecipe ? (
                <button
                  onClick={() => handleCaloriesEat(totalCalories, recipe)}
                >
                  Eat
                </button>
              ) : (
                <button
                  onClick={() => handleCaloriesRemove(totalCalories, recipe)}
                >
                  Remove
                </button>
              )}
            </div>
            <Separator.Root className={Style.SeparatorRoot} />
          </div>
        );
      })}
    </>
  );
}

export default RecipeButton;
