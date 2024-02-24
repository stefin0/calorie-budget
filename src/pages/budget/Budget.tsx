import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Style from "./Budget.module.css";
import Toolbar from "../../components/toolbar/Toolbar";
import * as Dialog from "@radix-ui/react-dialog";
import { RecipeProps } from "../../types";
import TodaysSummary from "../../components/todays-summary/TodaysSummary";
import RecipeButton from "../../components/recipe-button/RecipeButton";

function Budget() {
  const [caloriesEaten, setCaloriesEaten] = useLocalStorage(
    "caloriesEaten",
    "0",
  );
  const [caloriesTotal /*setCaloriesTota*/] = useLocalStorage("bmr", "0");
  const [input, setInput] = useState("");
  const caloriesRatio = (caloriesEaten / caloriesTotal) * 100;
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
              setCaloriesEaten={setCaloriesEaten}
            />
          </Dialog.Portal>
        </Dialog.Root>
        <span className={Style.pValue}>
          {caloriesEaten}/{caloriesTotal}
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
        setCaloriesEaten={setCaloriesEaten}
        setRecipesEaten={setRecipesEaten}
        isEditable={true}
      />
    </>
  );
}

export default Budget;
