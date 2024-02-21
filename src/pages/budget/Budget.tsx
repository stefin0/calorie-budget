import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Style from "./Budget.module.css";
import Toolbar from "../../components/toolbar/Toolbar";
import * as Separator from "@radix-ui/react-separator";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { RecipeProps } from "../../types";
import RecipeForm from "../../components/recipe-form/RecipeForm";

function Budget() {
  const [caloriesEaten, setCaloriesEaten] = useLocalStorage(
    "caloriesEaten",
    "0",
  );
  const [caloriesTotal /*setCaloriesTota*/] = useLocalStorage("bmr", "0");
  const [input, setInput] = useState("");
  const caloriesRatio = (caloriesEaten / caloriesTotal) * 100;
  const [recipes, setRecipes] = useLocalStorage("recipes", []);
  const [recipeId, setRecipeId] = useState("");

  function addRecipe(newRecipe: RecipeProps) {
    setRecipes([...recipes, newRecipe]);
  }

  function editRecipe(updatedRecipe: RecipeProps) {
    setRecipes((currentRecipes) =>
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
        <span className={Style.pValue}>
          {caloriesEaten}/{caloriesTotal}
        </span>
      </div>
      <input type="number" onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => setCaloriesEaten(input)}>
        Set Calories Eaten
      </button>

      {/* TOOLBAR */}
      <Toolbar addRecipe={addRecipe} />

      <h1>{caloriesRatio.toFixed(2)}</h1>

      {/* RECIPES */}
      <div className={Style.recipesContainer}>
        {recipes.length === 0 && <span>Your Cookbook is empty.</span>}
        {recipes.map((recipe: RecipeProps) => {
          const totalCalories = recipe.ingredient.reduce(
            (total, ingredient) => {
              return (
                total +
                9 * +ingredient.fat +
                4 * +ingredient.carb +
                4 * +ingredient.protein
              );
            },
            0,
          );

          return (
            <AlertDialog.Root key={recipe.id}>
              <AlertDialog.Trigger asChild>
                <button
                  className={Style.recipe}
                  onClick={() => setRecipeId(recipe.id)}
                >
                  <span>{recipe.title}</span>
                  <span className={Style.cal}>{totalCalories} Cal.</span>
                  <Separator.Root className={Style.SeparatorRoot} />
                </button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className={Style.DialogOverlay} />
                <RecipeForm
                  recipeId={recipeId}
                  editRecipe={editRecipe}
                  deleteRecipe={deleteRecipe}
                />
              </AlertDialog.Portal>
            </AlertDialog.Root>
          );
        })}
      </div>
    </>
  );
}

export default Budget;
