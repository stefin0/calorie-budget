import { ChangeEvent, FormEvent, useState } from "react";
import Style from "./Calculator.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import * as Switch from "@radix-ui/react-switch";

function Calculator() {
  const [formData, setFormData] = useState({
    unit: "Imperial",
    gender: "male",
    lbs: "",
    kg: "",
    ft: "",
    in: "",
    cm: "",
    age: "",
    lifestyle: "sedentary",
    gymExperience: "beginner",
    fitnessGoal: "loseFat",
  });

  const [bmr, setBmr] = useLocalStorage("bmr", "0");
  const [maintCal1, setMaintCal1] = useLocalStorage("maintCal1", "0");
  const [maintCal2, setMaintCal2] = useLocalStorage("maintCal2", "0");
  const [goalCal1, setGoalCal1] = useLocalStorage("goalCal1", "0");
  const [goalCal2, setGoalCal2] = useLocalStorage("goalCal2", "0");

  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function calculateBMR(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { gender, age, lifestyle, gymExperience, fitnessGoal } = formData;

    let cm = 0;
    let weight = 0;
    if (formData.unit === "Imperial") {
      const feet = +formData.ft + +formData.in / 12;
      cm = feet * 30.48;

      weight = +formData.lbs/2.205
    } else {
      cm = +formData.cm;
      weight = +formData.kg;
    }
    const height = cm;

    let localBmr = 0;
    if (gender === "male") {
      localBmr = +(10 * +weight + 6.25 * +height - 5 * +age + 5).toFixed();
    } else if (gender === "female") {
      localBmr = +(10 * +weight + 6.25 * +height - 5 * +age - 161).toFixed();
    }
    setBmr(localBmr);

    let localMaintCal1 = 0;
    let localMaintCal2 = 0;
    if (lifestyle === "sedentary") {
      localMaintCal1 = +(1.2 * localBmr).toFixed();
      localMaintCal2 = +(1.5 * localBmr).toFixed();
    } else if (lifestyle === "lightlyActive") {
      localMaintCal1 = +(1.5 * localBmr).toFixed();
      localMaintCal2 = +(1.8 * localBmr).toFixed();
    } else if (lifestyle === "moderatelyActive") {
      localMaintCal1 = +(1.8 * localBmr).toFixed();
      localMaintCal2 = +(2.0 * localBmr).toFixed();
    } else if (lifestyle === "highlyActive") {
      localMaintCal1 = +(2.0 * localBmr).toFixed();
      localMaintCal2 = +(2.2 * localBmr).toFixed();
    }
    setMaintCal1(localMaintCal1);
    setMaintCal2(localMaintCal2);

    if (fitnessGoal === "loseFat") {
      setGoalCal1((localMaintCal1 * 0.8).toFixed());
      setGoalCal2((localMaintCal2 * 0.8).toFixed());
    } else if (fitnessGoal === "buildMuscle") {
      if (gymExperience === "beginner") {
        setGoalCal1((localMaintCal1 * 1.25).toFixed());
        setGoalCal2((localMaintCal2 * 1.25).toFixed());
      } else if (gymExperience === "intermediate") {
        setGoalCal1((localMaintCal1 * 1.175).toFixed());
        setGoalCal2((localMaintCal2 * 1.175).toFixed());
      } else if (gymExperience === "advanced") {
        setGoalCal1((localMaintCal1 * 1.125).toFixed());
        setGoalCal2((localMaintCal2 * 1.125).toFixed());
      }
    } else if (fitnessGoal === "both") {
      setGoalCal1(localMaintCal1);
      setGoalCal2(localMaintCal2);
    }
  }

  console.log(formData);

  return (
    <div className={Style.formContainer}>
      <form onSubmit={calculateBMR} className={Style.form}>
        {/*GENDER input*/}
        <fieldset className={Style.fieldset}>
          <div className={Style.metricToggle}>
            <label htmlFor="unit" style={{ paddingRight: 15 }}>
              {formData.unit}
            </label>
            <Switch.Root
              className={Style.SwitchRoot}
              id="unit"
              name="unit"
              onCheckedChange={(checked) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  unit: checked ? "Metric" : "Imperial",
                }));
              }}
            >
              <Switch.Thumb className={Style.SwitchThumb} />
            </Switch.Root>
          </div>

          <div className={Style.labelInput}>
            <label htmlFor="gender" className={Style.boldLabel}>
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              defaultValue="male"
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/*WEIGHT input*/}
          <div className={Style.labelInput}>
            <label htmlFor="weight" className={Style.boldLabel}>
              Weight
            </label>
            <input
              id="weight"
              name={formData.unit === "Imperial" ? "lbs" : "kg"}
              type="number"
              className={Style.inputUnit}
              onChange={handleChange}
              value={formData.unit === "Imperial" ? formData.lbs : formData.kg}
              required
            />
            <span className={Style.measureUnit}>
              {formData.unit === "Imperial" ? "lbs" : "kg"}
            </span>
          </div>

          {/*HEIGHT input*/}
          <div className={Style.labelInput}>
            <label htmlFor="height" className={Style.boldLabel}>
              Height
            </label>
            <div className={Style.heightField}>
              {formData.unit === "Imperial" ? (
                <>
                  <input
                    id="ft"
                    name="ft"
                    type="number"
                    className={Style.inputUnit}
                    style={{ width: "50%" }}
                    onChange={handleChange}
                    value={formData.ft}
                    required
                  />
                  <span className={Style.measureUnitFt}>{"ft"}</span>
                  <input
                    id="in"
                    name="in"
                    type="number"
                    className={Style.inputUnit}
                    style={{ width: "50%" }}
                    onChange={handleChange}
                    value={formData.in}
                    required
                  />
                  <span className={Style.measureUnit}>{"in"}</span>
                </>
              ) : (
                <>
                  <input
                    id="cm"
                    name="cm"
                    type="number"
                    className={Style.inputUnit}
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    value={formData.cm}
                    required
                  />
                  <span className={Style.measureUnit}>{"cm"}</span>
                </>
              )}
            </div>
          </div>

          {/*AGE input*/}
          <div className={Style.labelInput}>
            <label htmlFor="age" className={Style.boldLabel}>
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              onChange={handleChange}
              value={formData.age}
              required
            />
          </div>

          {/*LIFESTYLE input*/}
          <div className={Style.labelInput}>
            <label htmlFor="lifestyle" className={Style.boldLabel}>
              Lifestyle
            </label>
            <select
              id="lifestyle"
              name="lifestyle"
              defaultValue="sedentary"
              onChange={handleChange}
              className={Style.lifestyle}
            >
              <option value="sedentary">Sedentary + Training 3-6x/wk</option>
              <option value="lightlyActive">
                Lightly Active + Training 3-6x/wk
              </option>
              <option value="moderatelyActive">
                Moderately Active + Training 3-6x/wk
              </option>
              <option value="highlyActive">
                Highly Active + Training 3-6x/wk
              </option>
            </select>
          </div>

          {/*GYM EXPERIENCE input*/}
          <div className={Style.labelInput}>
            <label htmlFor="gymExperience" className={Style.boldLabel}>
              Gym Experience
            </label>
            <select
              id="gymExperience"
              name="gymExperience"
              defaultValue="beginner"
              onChange={handleChange}
            >
              <option value="beginner">0-2 years of lifting</option>
              <option value="intermediate">2-5 years of lifting</option>
              <option value="advanced">5+ years of lifting</option>
            </select>
          </div>

          {/*FITNESS GOAL input*/}
          <div className={Style.labelInput}>
            <label htmlFor="fitnessGoal" className={Style.boldLabel}>
              Fitness Goal
            </label>
            <select
              id="fitnessGoal"
              name="fitnessGoal"
              defaultValue="loseFat"
              onChange={handleChange}
              className={Style.lifestyle}
            >
              <option value="loseFat">Lose Fat</option>
              <option value="buildMuscle">Build Muscle</option>
              <option value="both">Lose Fat & Build Muscle</option>
            </select>
          </div>
          <button>Calculate</button>
        </fieldset>

        {bmr !== 0 && <span>Your BMR is {bmr}</span>}
        {bmr !== 0 && (
          <span>
            Your maintenance calories are {maintCal1} to {maintCal2}
          </span>
        )}
        <span>
          Your goal calories are {goalCal1} to {goalCal2}
        </span>
      </form>
    </div>
  );
}

export default Calculator;
