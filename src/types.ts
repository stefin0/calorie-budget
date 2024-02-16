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

export type ToolbarProps = {
  addRecipe: (newRecipe: RecipeProps) => void;
};
