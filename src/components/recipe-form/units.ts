const units = [
  {
    category: "Metric",
    units: [
      { value: "milligram", label: "mg" },
      { value: "gram", label: "g" },
      { value: "kilogram", label: "kg" },
      { value: "deciliter", label: "dL" },
      { value: "milliliter", label: "mL" },
      { value: "liter", label: "L" },
    ],
  },
  {
    category: "Imperial",
    units: [
      { value: "cup", label: "C" },
      { value: "fluidOunce", label: "fl oz" },
      { value: "ounce", label: "oz" },
      { value: "gallon", label: "gal" },
      { value: "pound", label: "lb" },
      { value: "pint", label: "pt" },
      { value: "quart", label: "qt" },
      { value: "tablespoon", label: "tbsp" },
      { value: "teaspoon", label: "tsp" },
    ],
  },
  {
    category: "Other",
    units: [{ value: "scoop", label: "scoop" }],
  },
];

export default units;
