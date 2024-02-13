import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Style from "./Budget.module.css";
import Toolbar from "../../components/toolbar/Toolbar";

function Budget() {
  const [caloriesEaten, setCaloriesEaten] = useLocalStorage(
    "caloriesEaten",
    "0",
  );
  const [caloriesTotal /*setCaloriesTota*/] = useLocalStorage("bmr", "0");
  const [input, setInput] = useState("");

  const caloriesRatio = (caloriesEaten / caloriesTotal) * 100;

  return (
    <>
      {/* RING */}
      <div
        className={Style.ring}
        style={{
          background: `conic-gradient(black ${caloriesRatio * 3.6
            }deg, grey 0deg)`,
        }}
      >
        <span className={Style.pValue}>
          {caloriesEaten}/{caloriesTotal}
        </span>
      </div>
      <input type="number" onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => setCaloriesEaten(input)}>
        Set Calories Eaten
      </button>

      {/* TOOLBAR */}
      <Toolbar />

      <h1>{caloriesRatio}</h1>
    </>
  );
}

export default Budget;
