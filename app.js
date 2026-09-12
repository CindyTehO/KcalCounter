// Basic storage structure
function getData() {
  return JSON.parse(localStorage.getItem("macroData")) || {
    ingredients: [],
    meals: []
  };
}

function saveData(data) {
  localStorage.setItem("macroData", JSON.stringify(data));
}

// RENDER FUNCTIONS
function renderIngredients() {
  const data = getData();
  const list = document.getElementById("ingredientList");
  list.innerHTML = "";
  data.ingredients.forEach(ing => {
    const li = document.createElement("li");
    li.textContent =
      `${ing.name} – ${ing.calories} kcal, P:${ing.protein} C:${ing.carbs} F:${ing.fat} Fib:${ing.fiber} (per 100g)`;
    list.appendChild(li);
  });
}

function renderMeals() {
  const data = getData();
  const list = document.getElementById("mealList");
  list.innerHTML = "";
  data.meals.forEach(meal => {
    const li = document.createElement("li");
    li.textContent =
      `${meal.name} – ${meal.calories.toFixed(0)} kcal, P:${meal.protein.toFixed(1)} C:${meal.carbs.toFixed(1)} F:${meal.fat.toFixed(1)} Fib:${meal.fiber.toFixed(1)} (portion: ${meal.portion}g)`;
    list.appendChild(li);
  });
}

// ADD INGREDIENT
document.getElementById("addIngredientBtn").addEventListener("click", () => {
  const name = document.getElementById("ingName").value.trim();
  const calories = Number(document.getElementById("ingCalories").value) || 0;
  const protein = Number(document.getElementById("ingProtein").value) || 0;
  const carbs = Number(document.getElementById("ingCarbs").value) || 0;
  const fat = Number(document.getElementById("ingFat").value) || 0;
  const fiber = Number(document.getElementById("ingFiber").value) || 0;

  if (!name) {
    alert("Ingredient name required.");
    return;
  }

  const data = getData();
  data.ingredients.push({ name, calories, protein, carbs, fat, fiber });
  saveData(data);
  renderIngredients();

  document.getElementById("ingName").value = "";
  document.getElementById("ingCalories").value = "";
  document.getElementById("ingProtein").value = "";
  document.getElementById("ingCarbs").value = "";
  document.getElementById("ingFat").value = "";
  document.getElementById("ingFiber").value = "";
});

// ADD MEAL (single ingredient + portion, simple version)
document.getElementById("addMealBtn").addEventListener("click", () => {
  const mealName = document.getElementById("mealName").value.trim();
  const ingredientName = document.getElementById("mealIngredient").value.trim();
  const portion = Number(document.getElementById("portionInput").value) || 0;

  if (!mealName || !ingredientName || portion <= 0) {
    alert("Meal name, ingredient name, and portion (g) are required.");
    return;
  }

  const data = getData();
  const ing = data.ingredients.find(
    i => i.name.toLowerCase() === ingredientName.toLowerCase()
  );

  if (!ing) {
    alert("Ingredient not found. Make sure the name matches exactly.");
    return;
  }

  const factor = portion / 100;

  const meal = {
    name: mealName,
    calories: ing.calories * factor,
    protein: ing.protein * factor,
    carbs: ing.carbs * factor,
    fat: ing.fat * factor,
    fiber: ing.fiber * factor,
    portion: portion
  };

  data.meals.push(meal);
  saveData(data);
  renderMeals();

  document.getElementById("mealName").value = "";
  document.getElementById("mealIngredient").value = "";
  document.getElementById("portionInput").value = "";
});

// WEEKLY PLAN SAVE
document.getElementById("saveWeekBtn").addEventListener("click", () => {
  const days = document.querySelectorAll("#weekly-planner .day");
  let weeklyPlan = {};

  days.forEach(day => {
    const name = day.dataset.day;
    const text = day.querySelector(".meal-input").value;
    const meals = text.split("\n").map(m => m.trim()).filter(m => m);
    weeklyPlan[name] = meals;
  });

  localStorage.setItem("weeklyPlan", JSON.stringify(weeklyPlan));
  alert("Weekly plan saved!");
});

// LOAD WEEKLY PLAN ON START
window.addEventListener("DOMContentLoaded", () => {
  renderIngredients();
  renderMeals();

  const saved = JSON.parse(localStorage.getItem("weeklyPlan"));
  if (saved) {
    document.querySelectorAll("#weekly-planner .day").forEach(day => {
      const name = day.dataset.day;
      const meals = saved[name] || [];
      day.querySelector(".meal-input").value = meals.join("\n");
    });
  }
});

// EXPORT WEEK TO EXCEL (CSV)
document.getElementById("exportWeekBtn").addEventListener("click", () => {
  const weeklyPlan = JSON.parse(localStorage.getItem("weeklyPlan")) || {};
  const data = getData();
  const meals = data.meals || [];

  let csv = "Day,Meal,Portion (g),Calories,Protein,Carbs,Fat,Fiber\n";

  let totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0
  };

  Object.keys(weeklyPlan).forEach(day => {
    weeklyPlan[day].forEach(mealName => {
      const meal = meals.find(
        m => m.name.toLowerCase() === mealName.toLowerCase()
      );

      if (meal) {
        csv += `${day},${meal.name},${meal.portion},${meal.calories.toFixed(
          0
        )},${meal.protein.toFixed(1)},${meal.carbs.toFixed(1)},${meal.fat.toFixed(
          1
        )},${meal.fiber.toFixed(1)}\n`;

        totals.calories += meal.calories;
        totals.protein += meal.protein;
        totals.carbs += meal.carbs;
        totals.fat += meal.fat;
        totals.fiber += meal.fiber;
      } else {
        csv += `${day},${mealName},NOT FOUND,NOT FOUND,NOT FOUND,NOT FOUND,NOT FOUND,NOT FOUND\n`;
      }
    });
  });

  csv += `\nTOTALS,,,${
    totals.calories.toFixed(0)
  },${totals.protein.toFixed(1)},${totals.carbs.toFixed(1)},${totals.fat.toFixed(
    1
  )},${totals.fiber.toFixed(1)}\n`;

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "weekly_meal_plan.csv";
  a.click();

  URL.revokeObjectURL(url);
});

// CLEAR ALL DATA
document.getElementById("clearDataBtn").addEventListener("click", () => {
  if (confirm("Clear all ingredients, meals, and weekly plan?")) {
    localStorage.removeItem("macroData");
    localStorage.removeItem("weeklyPlan");
    renderIngredients();
    renderMeals();
    document
      .querySelectorAll(".meal-input")
      .forEach(t => (t.value = ""));
  }
});
