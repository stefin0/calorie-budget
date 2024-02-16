import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Style from "./Budget.module.css";
import Toolbar from "../../components/toolbar/Toolbar";
import * as Separator from "@radix-ui/react-separator";
import { RecipeProps } from "../../types";

function Budget() {
  const [caloriesEaten, setCaloriesEaten] = useLocalStorage(
    "caloriesEaten",
    "0",
  );
  const [caloriesTotal /*setCaloriesTota*/] = useLocalStorage("bmr", "0");
  const [input, setInput] = useState("");
  const caloriesRatio = (caloriesEaten / caloriesTotal) * 100;
  const [recipes, setRecipes] = useLocalStorage("recipes", []);

  function addRecipe(newRecipe: object) {
    setRecipes([...recipes, newRecipe]);
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
            <button key={recipe.id} className={Style.recipe}>
              <span>{recipe.title}</span>
              <span className={Style.cal}>{totalCalories} Cal.</span>
              <Separator.Root className={Style.SeparatorRoot} />
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Budget;
