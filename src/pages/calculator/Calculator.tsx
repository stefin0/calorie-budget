import { ChangeEvent, FormEvent, useState } from "react";
import Style from "./Calculator.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";

function Calculator() {
  const [formData, setFormData] = useState({
    gender: "male",
    weight: "",
    height: "",
    age: "",
    bodyfat: "moderateBodyfat",
    lifestyle: "sedentary",
    gymExperience: "beginner",
    fitnessGoal: "loseFat",
  });

  const [bmr, setBmr] = useLocalStorage("bmr", "0");
  const [maintCal1, setMaintCal1] = useLocalStorage("maintCal1", "0");
  const [maintCal2, setMaintCal2] = useLocalStorage("maintCal2", "0");

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
    const {
      gender,
      weight,
      height,
      age,
      bodyfat,
      lifestyle,
      gymExperience,
      fitnessGoal,
    } = formData;
    if (gender === "male") {
      setBmr((10 * +weight + 6.25 * +height - 5 * +age + 5).toFixed());
    } else if (gender === "female") {
      setBmr((10 * +weight + 6.25 * +height - 5 * +age - 161).toFixed());
    }

    if (lifestyle === "sedentary") {
      setMaintCal1((1.2 * bmr).toFixed());
      setMaintCal2((1.5 * bmr).toFixed());
    } else if (lifestyle === "lightlyActive") {
      setMaintCal1((1.5 * bmr).toFixed());
      setMaintCal2((1.8 * bmr).toFixed());
    } else if (lifestyle === "moderatelyActive") {
      setMaintCal1((1.8 * bmr).toFixed());
      setMaintCal2((2.0 * bmr).toFixed());
    } else if (lifestyle === "highlyActive") {
      setMaintCal1((2.0 * bmr).toFixed());
      setMaintCal2((2.2 * bmr).toFixed());
    }
  }

  console.log(formData);

  return (
    <div className={Style.formContainer}>
      <form onSubmit={calculateBMR} className={Style.form}>
        {/*GENDER input*/}
        <fieldset className={Style.fieldset}>
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
              Weight (kg)
            </label>
            <input
              id="weight"
              name="weight"
              type="number"
              onChange={handleChange}
              value={formData.weight}
              required
            />
          </div>

          {/*HEIGHT input*/}
          <div className={Style.labelInput}>
            <label htmlFor="height" className={Style.boldLabel}>
              Height (cm)
            </label>
            <input
              id="height"
              name="height"
              type="number"
              onChange={handleChange}
              value={formData.height}
              required
            />
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

          {/*BODYFAT input*/}
          <div className={Style.labelInput}>
            <label htmlFor="bodyfat" className={Style.boldLabel}>
              Bodyfat %
            </label>
            <select
              id="bodyfat"
              name="bodyfat"
              defaultValue="moderateBodyfat"
              onChange={handleChange}
            >
              <option value="lowBodyfat">
                {formData.gender === "male" ? "8-12%" : "18-22%"}
              </option>
              <option value="moderateBodyfat">
                {formData.gender === "male" ? "12-18%" : "22-28%"}
              </option>
              <option value="highBodyfat">
                {formData.gender === "male" ? "18-20+%" : "28-30+%"}
              </option>
            </select>
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
      </form>
    </div>
  );
}

export default Calculator;
