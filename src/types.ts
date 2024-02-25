export type IngredientProps = {
  id: string;
  quantityAmount: string;
  quantityType: string;
  name: string;
  carb: string;
  fat: string;
  protein: string;
};

export type RecipeProps = {
  id: string;
  idToday: string;
  title: string;
  ingredient: IngredientProps[];
};

export type Totals = {
  totalFat: number;
  totalCarb: number;
  totalProtein: number;
  totalCalories: number;
};

export type ToolBarProps = {
  addRecipe: (newRecipe: RecipeProps) => void;
};

export type RecipeFormProps = {
  isEditable: boolean;
  recipeId?: string;
  addRecipe?: (newRecipe: RecipeProps) => void;
  editRecipe?: (updatedRecipe: RecipeProps) => void;
  deleteRecipe?: (recipeId: string) => void;
};

export type RecipeButtonProps = {
  isEditable: boolean;
  recipes: RecipeProps[];
  recipeId: string;
  setRecipeId: (recipeId: string) => void;
  editRecipe?: (updatedRecipe: RecipeProps) => void;
  deleteRecipe?: (recipeId: string) => void;
  setRecipesEaten?: (
    updateFunction: (prevRecipesEaten: RecipeProps[]) => RecipeProps[],
  ) => void;
};

export type TodaysSummaryProps = {
  recipes: RecipeProps[];
  recipeId: string;
  setRecipeId: (recipeId: string) => void;
  setRecipesEaten: (
    updateFunction: (prevRecipesEaten: RecipeProps[]) => RecipeProps[],
  ) => void;
  totals: Totals;
};

export type NutritionFactsProps = {
  totalFat: number;
  totalCarb: number;
  totalProtein: number;
  totalCalories: number;
};
