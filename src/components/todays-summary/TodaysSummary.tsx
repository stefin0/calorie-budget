import * as Dialog from "@radix-ui/react-dialog";
import Style from "./TodaysSummary.module.css";
import { Cross2Icon } from "@radix-ui/react-icons";
import RecipeButton from "../recipe-button/RecipeButton";
import { TodaysSummaryProps } from "../../types";
import NutritionFacts from "../nutrition-facts/NutritionFacts";

function TodaysSummary({
  recipes,
  recipeId,
  setRecipeId,
  setRecipesEaten,
  totals,
}: TodaysSummaryProps) {
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
          isEditable={false}
          recipes={recipes}
          recipeId={recipeId}
          setRecipeId={setRecipeId}
          setRecipesEaten={setRecipesEaten}
        />
      </div>
    </Dialog.Content>
  );
}

export default TodaysSummary;
