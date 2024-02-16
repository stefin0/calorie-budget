import { ChangeEvent, useState } from "react";
import Style from "./Toolbar.module.css";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { PlusIcon, Cross2Icon, ChevronDownIcon } from "@radix-ui/react-icons";
import * as Accordian from "@radix-ui/react-accordion";
import * as Separator from "@radix-ui/react-separator";

function Toolbar() {
  const [formData, setFormData] = useState({
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

  function handleSubmit() {
    console.log(formData);
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
    <div className={Style.toolbar}>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button>Add</button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={Style.DialogOverlay} />
          <AlertDialog.Content className={Style.DialogContent}>
            {/* RECIPE TITLE */}
            <input
              className={Style.recipeTitle}
              placeholder="Recipe Title"
              name="title"
              onChange={(e) => handleChange(e)}
              value={formData.title}
              required
            />

            <div className={Style.ingredientsContainer}>
              {formData.ingredient.map((ingredient, index) => (
                <fieldset key={ingredient.id} className={Style.ingredientInfo}>
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
            <button
              className={Style.newIngredientButton}
              onClick={newIngredient}
            >
              <PlusIcon />
            </button>

            {/* SUMMARY */}
            <Accordian.Root
              className={Style.AccordianRoot}
              type="single"
              defaultValue="item-1"
              collapsible
            >
              <Accordian.Item value="item-1">
                <Accordian.Trigger className={Style.AccordionTrigger}>
                  <span>Summary</span>
                  <ChevronDownIcon
                    className={Style.AccordionChevron}
                    aria-hidden
                  />
                </Accordian.Trigger>
                <Accordian.Content className={Style.AccordianContent}>
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
                </Accordian.Content>
              </Accordian.Item>
            </Accordian.Root>

            {/* ACTION BUTTONS */}
            <div className={Style.actionButtons}>
              <AlertDialog.Cancel asChild>
                <button>Cancel</button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button onClick={handleSubmit}>Create</button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}

export default Toolbar;
