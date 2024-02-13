import { ChangeEvent, useState } from "react";
import Style from "./Toolbar.module.css";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { PlusIcon } from "@radix-ui/react-icons";

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
    } else if (id) {
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

  function handleSubmit() {
    console.log(formData);
  }

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
                    {/* CARBOHYDRATE */}
                    <div className={Style.labelInput}>
                      <label htmlFor="carb">Carb</label>
                      <input
                        id="carb"
                        name="carb"
                        type="number"
                        onChange={(e) => handleChange(e, ingredient.id)}
                        value={ingredient.carb}
                        required
                      />
                    </div>

                    {/* FAT */}
                    <div className={Style.labelInput}>
                      <label htmlFor="fat">Fat</label>
                      <input
                        id="fat"
                        name="fat"
                        type="number"
                        onChange={(e) => handleChange(e, ingredient.id)}
                        value={ingredient.fat}
                        required
                      />
                    </div>

                    <div className={Style.labelInput}>
                      <label htmlFor="protein">Protein</label>
                      <input
                        id="protein"
                        name="protein"
                        type="number"
                        onChange={(e) => handleChange(e, ingredient.id)}
                        value={ingredient.protein}
                        required
                      />
                    </div>
                  </div>
                </fieldset>
              ))}
            </div>

            {/* NEW INGREDIENT button */}
            <button className={Style.newIngredientButton} onClick={newIngredient}>
              <PlusIcon />
            </button>

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
