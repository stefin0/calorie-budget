import Style from "./Toolbar.module.css";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import RecipeForm from "../recipe-form/RecipeForm";
import { RecipeFormProps } from "../../types";

function Toolbar({ addRecipe }: RecipeFormProps) {
  return (
    <div className={Style.toolbar}>
      {/* ADD RECIPE button */}
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button>Add</button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={Style.DialogOverlay} />
          <RecipeForm addRecipe={addRecipe} />
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}

export default Toolbar;
