import { ChangeEvent, useState } from "react";
import Style from "./RecipeForm.module.css";
import {
  PlusIcon,
  Cross2Icon,
  DotsVerticalIcon,
  Pencil1Icon,
  TrashIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import * as Accordian from "@radix-ui/react-accordion";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useLocalStorage from "../../hooks/useLocalStorage";
import { RecipeFormProps, RecipeProps } from "../../types";
import NutritionFacts from "../nutrition-facts/NutritionFacts";

function RecipeForm({
  isEditable,
  recipeId,
  addRecipe,
  editRecipe,
  deleteRecipe,
}: RecipeFormProps) {
  const [recipes] = useLocalStorage("recipes", []);
  const existingRecipe: RecipeProps = recipes.find(
    (recipe: RecipeProps) => recipe.id === recipeId,
  );
  const [formData, setFormData] = useState(
    existingRecipe ?? {
      id: crypto.randomUUID(),
      idToday: crypto.randomUUID(),
      title: "",
      ingredient: [
        {
          id: crypto.randomUUID(),
          quantityAmount: "",
          quantityType: "",
          name: "",
          carb: "",
          fat: "",
          protein: "",
        },
      ],
    },
  );
  const [isEditing, setIsEditing] = useState(!recipeId);

  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    id?: string,
  ) {
    const { name, value } = e.target;
    if (name === "title") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        title: value,
      }));
    } else if (
      name === "quantityAmount" ||
      name === "fat" ||
      name === "carb" ||
      name === "protein"
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ingredient: prevFormData.ingredient.map((ingredient) =>
          // prevent user from inputting number < 0
          ingredient.id === id && Math.abs(+value) > 0
            ? { ...ingredient, [name]: Math.abs(+value) }
            : ingredient.id === id && +value <= 0
              ? { ...ingredient, [name]: value }
              : ingredient,
        ),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ingredient: prevFormData.ingredient.map((ingredient) =>
          ingredient.id === id ? { ...ingredient, [name]: value } : ingredient,
        ),
      }));
    }
  }

  function newIngredient() {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredient: [
        ...prevFormData.ingredient,
        {
          id: crypto.randomUUID(),
          quantityAmount: "",
          quantityType: "",
          name: "",
          carb: "",
          fat: "",
          protein: "",
        },
      ],
    }));
  }

  function deleteIngredient(id: string) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredient: prevFormData.ingredient.filter(
        (ingredient) => ingredient.id !== id,
      ),
    }));
  }

  function ActionButtons() {
    if (recipeId && !isEditing) {
      return <AlertDialog.Cancel>Close</AlertDialog.Cancel>;
    } else if (recipeId && isEditing) {
      return (
        <>
          <button onClick={() => setIsEditing((prev) => !prev)}>Cancel</button>
          <button onClick={saveRecipe}>Save</button>
        </>
      );
    } else {
      return (
        <>
          <AlertDialog.Cancel asChild>
            <button>Cancel</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={handleSubmit}>Create</button>
          </AlertDialog.Action>
        </>
      );
    }
  }

  function saveRecipe() {
    editRecipe && editRecipe(formData);
    setIsEditing((prev) => !prev);
  }

  function handleSubmit() {
    addRecipe && addRecipe(formData);
    setFormData({
      id: crypto.randomUUID(),
      idToday: crypto.randomUUID(),
      title: "",
      ingredient: [
        {
          id: crypto.randomUUID(),
          quantityAmount: "",
          quantityType: "",
          name: "",
          carb: "",
          fat: "",
          protein: "",
        },
      ],
    });
  }

  const totalFat = formData.ingredient.reduce((total, ingredient) => {
    return total + +ingredient.fat;
  }, 0);

  const totalCarb = formData.ingredient.reduce((total, ingredient) => {
    return total + +ingredient.carb;
  }, 0);

  const totalProtein = formData.ingredient.reduce((total, ingredient) => {
    return total + +ingredient.protein;
  }, 0);

  const totalCalories = 9 * totalFat + 4 * totalCarb + 4 * totalProtein;

  return (
    <AlertDialog.Content className={Style.DialogContent}>
      {/* DROPDOWN MENU */}
      {recipeId && isEditable && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className={Style.dropdownMenuButton}>
              <DotsVerticalIcon />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              className={Style.dropdownMenuContent}
            >
              <DropdownMenu.Item onSelect={() => setIsEditing((prev) => !prev)}>
                <button className={Style.dropdownMenuItem}>
                  Edit
                  <Pencil1Icon />
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => deleteRecipe && deleteRecipe(recipeId)}
              >
                <button className={Style.dropdownMenuItem}>
                  Delete
                  <TrashIcon />
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )}

      {/* RECIPE TITLE */}
      <input
        className={Style.recipeTitle}
        placeholder="Recipe Title"
        name="title"
        onChange={(e) => handleChange(e)}
        value={formData.title}
        required
        disabled={!isEditing}
      />

      <div className={Style.ingredientsContainer}>
        {formData.ingredient.map((ingredient, index) => (
          <fieldset
            key={ingredient.id}
            className={Style.ingredientInfo}
            disabled={!isEditing}
          >
            <legend>Ingredient {index + 1}</legend>
            {/* QUANTITY row */}
            <div className={Style.labelInput}>
              <label>Quantity</label>
              <div className={Style.quantityRow}>
                <input
                  name="quantityAmount"
                  type="number"
                  onChange={(e) => handleChange(e, ingredient.id)}
                  value={ingredient.quantityAmount}
                  min="0"
                  required
                />
                <select
                  name="quantityType"
                  onChange={(e) => handleChange(e, ingredient.id)}
                >
                  <option value=""></option>
                  <option value="mL">mL</option>
                </select>
              </div>
            </div>

            {/* INGREDIENT row */}
            <div className={Style.labelInput}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                onChange={(e) => handleChange(e, ingredient.id)}
                value={ingredient.name}
                required
              />
            </div>

            {/* MACRONUTRIENT row */}
            <div className={Style.macrosRow}>
              {/* FAT */}
              <div className={Style.labelInput}>
                <label htmlFor="fat">Fat</label>
                <input
                  id="fat"
                  name="fat"
                  type="number"
                  onChange={(e) => handleChange(e, ingredient.id)}
                  value={ingredient.fat}
                  min="0"
                  required
                />
              </div>

              {/* CARBOHYDRATE */}
              <div className={Style.labelInput}>
                <label htmlFor="carb">Carb</label>
                <input
                  id="carb"
                  name="carb"
                  type="number"
                  onChange={(e) => handleChange(e, ingredient.id)}
                  value={ingredient.carb}
                  min="0"
                  required
                />
              </div>

              {/* PROTEIN */}
              <div className={Style.labelInput}>
                <label htmlFor="protein">Protein</label>
                <input
                  id="protein"
                  name="protein"
                  type="number"
                  onChange={(e) => handleChange(e, ingredient.id)}
                  value={ingredient.protein}
                  min="0"
                  required
                />
              </div>
            </div>
            {index > 0 && (
              <button
                className={Style.deleteIngredientButton}
                onClick={() => deleteIngredient(ingredient.id)}
                aria-label="Delete"
              >
                <Cross2Icon />
              </button>
            )}
          </fieldset>
        ))}
      </div>

      {/* NEW INGREDIENT button */}
      {isEditable && (
        <button
          className={Style.newIngredientButton}
          onClick={newIngredient}
          disabled={!isEditing}
        >
          <PlusIcon />
        </button>
      )}

      {/* NUTRITION FACTS */}
      <Accordian.Root
        className={Style.AccordianRoot}
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <Accordian.Item value="item-1">
          <Accordian.Trigger className={Style.AccordionTrigger}>
            <span>Summary</span>
            <ChevronDownIcon className={Style.AccordionChevron} aria-hidden />
          </Accordian.Trigger>
          <Accordian.Content>
            <NutritionFacts
              totalFat={totalFat}
              totalCarb={totalCarb}
              totalProtein={totalProtein}
              totalCalories={totalCalories}
            />
          </Accordian.Content>
        </Accordian.Item>
      </Accordian.Root>

      {/* ACTION BUTTONS */}
      <div className={Style.actionButtons}>
        <ActionButtons />
      </div>
    </AlertDialog.Content>
  );
}

export default RecipeForm;
