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
  title: string;
  ingredient: IngredientProps[];
};

export type RecipeFormProps = {
  recipeId?: string;
  addRecipe?: (newRecipe: RecipeProps) => void;
  editRecipe?: (updatedRecipe: RecipeProps) => void;
  deleteRecipe?: (recipeId: string) => void;
};
