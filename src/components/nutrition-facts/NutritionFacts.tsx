import * as Separator from "@radix-ui/react-separator";
import Style from "./NutritionFacts.module.css";
import { NutritionFactsProps } from "../../types";

function NutritionFacts({
  totalFat,
  totalCarb,
  totalProtein,
  totalCalories,
}: NutritionFactsProps) {
  return (
    <div className={Style.containter}>
      {/* TOTAL CALORIES */}
      <span
        className={`${Style.calories} ${Style.bold}`}
        style={{ marginRight: "2rem" }}
      >
        Calories
      </span>
      <span className={`${Style.caloriesTotal} ${Style.bold}`}>
        {totalCalories}
      </span>
      <Separator.Root
        className={Style.SeparatorRoot}
        style={{ height: "3px", marginBottom: "1rem" }}
      />

      {/* TOTAL FAT */}
      <span className={Style.bold}>Fat </span>
      <span>{totalFat}</span>
      <Separator.Root className={Style.SeparatorRoot} />

      {/* TOTAL CARB */}
      <span className={Style.bold}>Carbohydrate </span>
      <span>{totalCarb}</span>
      <Separator.Root className={Style.SeparatorRoot} />

      {/* TOTAL PROTEIN */}
      <span className={Style.bold}>Protein </span>
      <span>{totalProtein}</span>
      <Separator.Root className={Style.SeparatorRoot} />
    </div>
  );
}

export default NutritionFacts;
