import Style from "./Toolbar.module.css";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import RecipeForm from "../recipe-form/RecipeForm";
import { ToolBarProps } from "../../types";

function Toolbar({ addRecipe }: ToolBarProps) {
  return (
    <div className={Style.toolbar}>
      {/* ADD RECIPE button */}
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button>Add Recipe</button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={Style.DialogOverlay} />
          <RecipeForm addRecipe={addRecipe} isEditable={true} />
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}

export default Toolbar;
