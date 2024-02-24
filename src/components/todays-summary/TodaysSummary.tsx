import * as Dialog from "@radix-ui/react-dialog";
import Style from "./TodaysSummary.module.css";
import { Cross2Icon } from "@radix-ui/react-icons";
import RecipeButton from "../recipe-button/RecipeButton";
import { RecipeProps, TodaysSummaryProps } from "../../types";
import NutritionFacts from "../nutrition-facts/NutritionFacts";
import useLocalStorage from "../../hooks/useLocalStorage";

function TodaysSummary({
  recipes,
  recipeId,
  setRecipeId,
  setCaloriesEaten,
  setRecipesEaten,
}: TodaysSummaryProps) {
  const totals = recipes.reduce(
    (total, recipe: RecipeProps) => {
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

  return (
    <Dialog.Content className={Style.DialogContent}>
      <Dialog.Close asChild>
        <button className={Style.closeDialogButton}>
          <Cross2Icon />
        </button>
      </Dialog.Close>

      {/* NUTRITION FACTS */}
      <div className={Style.NutritionFacts}>
        <NutritionFacts
          totalFat={totals.totalFat}
          totalCarb={totals.totalCarb}
          totalProtein={totals.totalProtein}
          totalCalories={totals.totalCalories}
        />
      </div>

      {recipes.length === 0 && <span>You haven't eaten today</span>}

      {/* RECIPES EATEN container */}
      <div className={Style.recipesContainer}>
        <RecipeButton
          recipes={recipes}
          recipeId={recipeId}
          setRecipeId={setRecipeId}
          setCaloriesEaten={setCaloriesEaten}
          setRecipesEaten={setRecipesEaten}
          isEditable={false}
        />
      </div>
    </Dialog.Content>
  );
}

export default TodaysSummary;
