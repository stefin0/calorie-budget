import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Style from "./Budget.module.css";
import Toolbar from "../../components/toolbar/Toolbar";
import * as Dialog from "@radix-ui/react-dialog";
import { RecipeProps, Totals } from "../../types";
import TodaysSummary from "../../components/todays-summary/TodaysSummary";
import RecipeButton from "../../components/recipe-button/RecipeButton";

function Budget() {
  const [caloriesTotal /*setCaloriesTota*/] = useLocalStorage("goalCal1", "0");
  const [recipes, setRecipes] = useLocalStorage("recipes", []);
  const [recipesEaten, setRecipesEaten] = useLocalStorage("recipesEaten", []);
  const [recipeId, setRecipeId] = useState("");

  function addRecipe(newRecipe: RecipeProps) {
    setRecipes([...recipes, newRecipe]);
  }

  function editRecipe(updatedRecipe: RecipeProps) {
    setRecipes((currentRecipes: RecipeProps[]) =>
      currentRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
      ),
    );
    setRecipesEaten((currentRecipes: RecipeProps[]) =>
      currentRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
      ),
    );
  }

  function deleteRecipe(recipeId: string) {
    setRecipes((currentRecipes: RecipeProps[]) =>
      currentRecipes.filter((recipe) => recipe.id !== recipeId),
    );
  }

  const totals = recipesEaten.reduce(
    (total: Totals, recipe: RecipeProps) => {
      recipe.ingredient.forEach((ingredient) => {
        total.totalFat += +ingredient.fat;
        total.totalCarb += +ingredient.carb;
        total.totalProtein += +ingredient.protein;
      });
      total.totalCalories =
        9 * total.totalFat + 4 * total.totalCarb + 4 * total.totalProtein;
      return total;
    },
    { totalFat: 0, totalCarb: 0, totalProtein: 0, totalCalories: 0 },
  );

  const caloriesRatio = (totals.totalCalories / caloriesTotal) * 100;

  return (
    <>
      {/* RING */}
      <div
        className={Style.ring}
        style={{
          background: `conic-gradient(black ${caloriesRatio * 3.6
            }deg, grey 0deg)`,
        }}
      >
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className={Style.ringBefore}></button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className={Style.DialogOverlay}></Dialog.Overlay>
            <TodaysSummary
              recipes={recipesEaten}
              setRecipesEaten={setRecipesEaten}
              recipeId={recipeId}
              setRecipeId={setRecipeId}
              totals={totals}
            />
          </Dialog.Portal>
        </Dialog.Root>
        <span className={Style.pValue}>
          {totals.totalCalories}/{caloriesTotal}
        </span>
      </div>

      {/* TOOLBAR */}
      <Toolbar addRecipe={addRecipe} />

      {/* RECIPES */}
      {recipes.length === 0 && <span>Your Cookbook is empty.</span>}
      <RecipeButton
        recipes={recipes}
        recipeId={recipeId}
        setRecipeId={setRecipeId}
        editRecipe={editRecipe}
        deleteRecipe={deleteRecipe}
        setRecipesEaten={setRecipesEaten}
        isEditable={true}
      />
    </>
  );
}

export default Budget;
