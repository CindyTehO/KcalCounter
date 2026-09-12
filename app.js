// app.js

// ---------- Data Model ----------

const PRESET_FOODS = [
  {
    id: "preset-1",
    name: "Skinless boneless chicken leg",
    category: "Poultry & Meats",
    servingSize: "100g",
    per100g: { kcals: 180, protein: 23, carbs: 0, fats: 9, fiber: 0 },
    perServing: { kcals: 180, protein: 23, carbs: 0, fats: 9, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-2",
    name: "Chobani plain light yogurt",
    category: "Dairy & Eggs",
    servingSize: "170g cup",
    per100g: { kcals: 60, protein: 10, carbs: 3.5, fats: 0.5, fiber: 0 },
    perServing: { kcals: 102, protein: 17, carbs: 6, fats: 0.85, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-3",
    name: "Low fat dairy milk",
    category: "Dairy & Eggs",
    servingSize: "250ml glass",
    per100g: { kcals: 50, protein: 3.4, carbs: 5, fats: 1.5, fiber: 0 },
    perServing: { kcals: 125, protein: 8.5, carbs: 12.5, fats: 3.75, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-4",
    name: "Rolled oats",
    category: "Grains & Starches",
    servingSize: "40g dry",
    per100g: { kcals: 380, protein: 13, carbs: 67, fats: 7, fiber: 10 },
    perServing: { kcals: 152, protein: 5.2, carbs: 26.8, fats: 2.8, fiber: 4 },
    preset: true,
  },
  {
    id: "preset-5",
    name: "Blueberries",
    category: "Fruits & Vegetables",
    servingSize: "80g",
    per100g: { kcals: 57, protein: 0.7, carbs: 14.5, fats: 0.3, fiber: 2.4 },
    perServing: { kcals: 45.6, protein: 0.56, carbs: 11.6, fats: 0.24, fiber: 1.9 },
    preset: true,
  },
  {
    id: "preset-6",
    name: "Golden kiwi",
    category: "Fruits & Vegetables",
    servingSize: "1 medium (80g)",
    per100g: { kcals: 60, protein: 1.2, carbs: 15, fats: 0.5, fiber: 2.5 },
    perServing: { kcals: 48, protein: 0.96, carbs: 12, fats: 0.4, fiber: 2 },
    preset: true,
  },
  {
    id: "preset-7",
    name: "Pork loin",
    category: "Poultry & Meats",
    servingSize: "100g",
    per100g: { kcals: 210, protein: 26, carbs: 0, fats: 11, fiber: 0 },
    perServing: { kcals: 210, protein: 26, carbs: 0, fats: 11, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-8",
    name: "Minced chicken",
    category: "Poultry & Meats",
    servingSize: "100g",
    per100g: { kcals: 165, protein: 22, carbs: 0, fats: 8, fiber: 0 },
    perServing: { kcals: 165, protein: 22, carbs: 0, fats: 8, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-9",
    name: "Minced pork",
    category: "Poultry & Meats",
    servingSize: "100g",
    per100g: { kcals: 250, protein: 20, carbs: 0, fats: 19, fiber: 0 },
    perServing: { kcals: 250, protein: 20, carbs: 0, fats: 19, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-10",
    name: "Minced beef",
    category: "Poultry & Meats",
    servingSize: "100g",
    per100g: { kcals: 250, protein: 26, carbs: 0, fats: 15, fiber: 0 },
    perServing: { kcals: 250, protein: 26, carbs: 0, fats: 15, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-11",
    name: "Beef slices",
    category: "Poultry & Meats",
    servingSize: "100g",
    per100g: { kcals: 230, protein: 25, carbs: 0, fats: 14, fiber: 0 },
    perServing: { kcals: 230, protein: 25, carbs: 0, fats: 14, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-12",
    name: "Salmon sashimi",
    category: "Seafood",
    servingSize: "80g",
    per100g: { kcals: 208, protein: 20, carbs: 0, fats: 13, fiber: 0 },
    perServing: { kcals: 166.4, protein: 16, carbs: 0, fats: 10.4, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-13",
    name: "Salmon",
    category: "Seafood",
    servingSize: "100g",
    per100g: { kcals: 208, protein: 20, carbs: 0, fats: 13, fiber: 0 },
    perServing: { kcals: 208, protein: 20, carbs: 0, fats: 13, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-14",
    name: "Green leafy vegetables",
    category: "Fruits & Vegetables",
    servingSize: "80g cooked",
    per100g: { kcals: 25, protein: 2.5, carbs: 4, fats: 0.5, fiber: 3 },
    perServing: { kcals: 20, protein: 2, carbs: 3.2, fats: 0.4, fiber: 2.4 },
    preset: true,
  },
  {
    id: "preset-15",
    name: "Russet potato",
    category: "Grains & Starches",
    servingSize: "150g baked",
    per100g: { kcals: 90, protein: 2.5, carbs: 21, fats: 0.1, fiber: 2 },
    perServing: { kcals: 135, protein: 3.75, carbs: 31.5, fats: 0.15, fiber: 3 },
    preset: true,
  },
  {
    id: "preset-16",
    name: "Tiger prawns",
    category: "Seafood",
    servingSize: "100g",
    per100g: { kcals: 99, protein: 24, carbs: 0.2, fats: 0.3, fiber: 0 },
    perServing: { kcals: 99, protein: 24, carbs: 0.2, fats: 0.3, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-17",
    name: "Brown rice",
    category: "Grains & Starches",
    servingSize: "150g cooked",
    per100g: { kcals: 111, protein: 2.6, carbs: 23, fats: 0.9, fiber: 1.8 },
    perServing: { kcals: 166.5, protein: 3.9, carbs: 34.5, fats: 1.35, fiber: 2.7 },
    preset: true,
  },
  {
    id: "preset-18",
    name: "White rice",
    category: "Grains & Starches",
    servingSize: "150g cooked",
    per100g: { kcals: 130, protein: 2.7, carbs: 28, fats: 0.3, fiber: 0.4 },
    perServing: { kcals: 195, protein: 4.05, carbs: 42, fats: 0.45, fiber: 0.6 },
    preset: true,
  },
  {
    id: "preset-19",
    name: "Firm tofu",
    category: "Dairy & Eggs",
    servingSize: "100g",
    per100g: { kcals: 80, protein: 8, carbs: 2, fats: 4.5, fiber: 1 },
    perServing: { kcals: 80, protein: 8, carbs: 2, fats: 4.5, fiber: 1 },
    preset: true,
  },
  {
    id: "preset-20",
    name: "Tay's brand steamed chicken breast",
    category: "Poultry & Meats",
    servingSize: "100g pack",
    per100g: { kcals: 120, protein: 24, carbs: 1, fats: 2, fiber: 0 },
    perServing: { kcals: 120, protein: 24, carbs: 1, fats: 2, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-21",
    name: "President brand gouda slice",
    category: "Dairy & Eggs",
    servingSize: "1 slice (20g)",
    per100g: { kcals: 350, protein: 25, carbs: 2, fats: 27, fiber: 0 },
    perServing: { kcals: 70, protein: 5, carbs: 0.4, fats: 5.4, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-22",
    name: "Ayam brand tuna mayonnaise",
    category: "Seafood",
    servingSize: "90g can",
    per100g: { kcals: 210, protein: 18, carbs: 1, fats: 15, fiber: 0 },
    perServing: { kcals: 189, protein: 16.2, carbs: 0.9, fats: 13.5, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-23",
    name: "Eggs",
    category: "Dairy & Eggs",
    servingSize: "1 large (60g)",
    per100g: { kcals: 143, protein: 13, carbs: 1.1, fats: 9.5, fiber: 0 },
    perServing: { kcals: 85.8, protein: 7.8, carbs: 0.66, fats: 5.7, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-24",
    name: "Sourdough slice",
    category: "Grains & Starches",
    servingSize: "1 slice (40g)",
    per100g: { kcals: 230, protein: 8, carbs: 45, fats: 1.5, fiber: 3 },
    perServing: { kcals: 92, protein: 3.2, carbs: 18, fats: 0.6, fiber: 1.2 },
    preset: true,
  },
  {
    id: "preset-25",
    name: "Dried cranberries",
    category: "Fruits & Vegetables",
    servingSize: "30g",
    per100g: { kcals: 325, protein: 0.3, carbs: 82, fats: 1.5, fiber: 5 },
    perServing: { kcals: 97.5, protein: 0.09, carbs: 24.6, fats: 0.45, fiber: 1.5 },
    preset: true,
  },
  {
    id: "preset-26",
    name: "Pork collar",
    category: "Poultry & Meats",
    servingSize: "100g",
    per100g: { kcals: 260, protein: 22, carbs: 0, fats: 19, fiber: 0 },
    perServing: { kcals: 260, protein: 22, carbs: 0, fats: 19, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-27",
    name: "100plus zero 325ml can",
    category: "Beverages & Supplements",
    servingSize: "325ml can",
    per100g: { kcals: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 },
    perServing: { kcals: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 },
    preset: true,
  },
  {
    id: "preset-28",
    name: "BSN syntha-6 isolate chocolate",
    category: "Beverages & Supplements",
    servingSize: "1 scoop (37g)",
    per100g: { kcals: 370, protein: 60, carbs: 10, fats: 5, fiber: 3 },
    perServing: { kcals: 136.9, protein: 22.2, carbs: 3.7, fats: 1.85, fiber: 1.1 },
    preset: true,
  },
];

const MEAL_TYPES = [
  { key: "Breakfast", label: "Breakfast" },
  { key: "Lunch", label: "Lunch" },
  { key: "Dinner", label: "Dinner" },
  { key: "Snack", label: "Snack / Post-Workout" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const STORAGE_KEYS = {
  foods: "cmTrackerFoods",
  week: "cmTrackerWeek",
  targets: "cmTrackerTargets",
};

let foods = [];
let weekPlan = {};
let targets = {
  energy: 1700,
  protein: 120,
  carbs: 175,
  fats: 50,
  fiber: 25,
};

let currentDay = "Mon";
let nutritionDisplayMode = "perServing"; // UI toggle only

// ---------- Initialization ----------

function loadFromStorage() {
  const foodsStr = localStorage.getItem(STORAGE_KEYS.foods);
  const weekStr = localStorage.getItem(STORAGE_KEYS.week);
  const targetsStr = localStorage.getItem(STORAGE_KEYS.targets);

  foods = foodsStr ? JSON.parse(foodsStr) : PRESET_FOODS.slice();
  weekPlan = weekStr ? JSON.parse(weekStr) : {};
  targets = targetsStr
    ? JSON.parse(targetsStr)
    : { energy: 1700, protein: 120, carbs: 175, fats: 50, fiber: 25 };

  // Ensure week structure
  DAYS.forEach((day) => {
    if (!weekPlan[day]) {
      weekPlan[day] = {};
      MEAL_TYPES.forEach((meal) => {
        weekPlan[day][meal.key] = [];
      });
    }
  });
}

function saveFoods() {
  localStorage.setItem(STORAGE_KEYS.foods, JSON.stringify(foods));
}

function saveWeek() {
  localStorage.setItem(STORAGE_KEYS.week, JSON.stringify(weekPlan));
}

function saveTargets() {
  localStorage.setItem(STORAGE_KEYS.targets, JSON.stringify(targets));
}

// ---------- Rendering ----------

function renderTargets() {
  document.getElementById("targetEnergy").value = targets.energy;
  document.getElementById("targetProtein").value = targets.protein;
  document.getElementById("targetCarbs").value = targets.carbs;
  document.getElementById("targetFats").value = targets.fats;
  document.getElementById("targetFiber").value = targets.fiber;
}

function renderCategoryFilterOptions() {
  const select = document.getElementById("categoryFilter");
  const categories = Array.from(new Set(foods.map((f) => f.category))).sort();
  categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

function renderFoodTable() {
  const tbody = document.getElementById("foodTableBody");
  tbody.innerHTML = "";
  const filter = document.getElementById("categoryFilter").value;

  foods.forEach((food) => {
    if (filter !== "all" && food.category !== filter) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${food.name}</td>
      <td>${food.category}</td>
      <td>${food.servingSize}</td>
      <td>${food.perServing.kcals.toFixed(1)}</td>
      <td>${food.perServing.protein.toFixed(1)}</td>
      <td>${food.perServing.carbs.toFixed(1)}</td>
      <td>${food.perServing.fats.toFixed(1)}</td>
      <td>${food.perServing.fiber.toFixed(1)}</td>
      <td>${food.preset ? "Preset" : "Custom"}</td>
      <td>
        ${
          food.preset
            ? "-"
            : `<button data-id="${food.id}" class="btn-secondary btn-remove-food">Remove</button>`
        }
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll(".btn-remove-food").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      foods = foods.filter((f) => f.id !== id);
      saveFoods();
      renderFoodTable();
      renderMeals();
    });
  });
}

function renderDayTabs() {
  const tabs = document.querySelectorAll("#dayTabs .day-tab");
  tabs.forEach((tab) => {
    const day = tab.getAttribute("data-day");
    if (day === currentDay) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
    tab.onclick = () => {
      currentDay = day;
      document.getElementById("currentDayLabel").textContent =
        "Day: " + currentDay;
      renderDayTabs();
      renderMeals();
      updateProgress();
    };
  });
}

function renderMeals() {
  const container = document.getElementById("mealsContainer");
  container.innerHTML = "";

  MEAL_TYPES.forEach((meal) => {
    const section = document.createElement("div");
    section.className = "meal-section";

    const header = document.createElement("div");
    header.className = "meal-header";

    const title = document.createElement("h3");
    title.textContent = meal.label;

    const subtotal = document.createElement("div");
    subtotal.className = "meal-subtotal";
    subtotal.id = `subtotal-${meal.key}`;

    const addBtn = document.createElement("button");
    addBtn.className = "btn-secondary";
    addBtn.textContent = "Add Food";
    addBtn.onclick = () => addMealRow(currentDay, meal.key);

    header.appendChild(title);
    header.appendChild(subtotal);
    header.appendChild(addBtn);

    const table = document.createElement("table");
    table.className = "meal-table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Food</th>
          <th>Mode</th>
          <th>Qty</th>
          <th>Kcals</th>
          <th>Protein</th>
          <th>Carbs</th>
          <th>Fats</th>
          <th>Fiber</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody id="mealBody-${meal.key}"></tbody>
    `;

    section.appendChild(header);
    section.appendChild(table);
    container.appendChild(section);

    renderMealRows(meal.key);
  });

  updateProgress();
}

function renderMealRows(mealKey) {
  const tbody = document.getElementById(`mealBody-${mealKey}`);
  tbody.innerHTML = "";
  const rows = weekPlan[currentDay][mealKey];

  rows.forEach((row, index) => {
    const food = foods.find((f) => f.id === row.foodId);
    const tr = document.createElement("tr");

    const macros = computeRowMacros(row, food);

    tr.innerHTML = `
      <td>
        <select class="meal-food-select" data-meal="${mealKey}" data-index="${index}">
          ${foods
            .map(
              (f) =>
                `<option value="${f.id}" ${
                  f.id === row.foodId ? "selected" : ""
                }>${f.name}</option>`
            )
            .join("")}
        </select>
      </td>
      <td>
        <select class="meal-mode-select" data-meal="${mealKey}" data-index="${index}">
          <option value="grams" ${row.mode === "grams" ? "selected" : ""}>Grams (g)</option>
          <option value="servings" ${
            row.mode === "servings" ? "selected" : ""
          }>Servings</option>
        </select>
      </td>
      <td>
        <input type="number" min="0" step="0.1" class="meal-qty-input" data-meal="${mealKey}" data-index="${index}" value="${row.qty}" />
      </td>
      <td>${macros.kcals.toFixed(1)}</td>
      <td>${macros.protein.toFixed(1)}</td>
      <td>${macros.carbs.toFixed(1)}</td>
      <td>${macros.fats.toFixed(1)}</td>
      <td>${macros.fiber.toFixed(1)}</td>
      <td>
        <button class="btn-remove-row" data-meal="${mealKey}" data-index="${index}">X</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Attach events
  tbody.querySelectorAll(".meal-food-select").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      const mealKey = sel.getAttribute("data-meal");
      const index = parseInt(sel.getAttribute("data-index"), 10);
      weekPlan[currentDay][mealKey][index].foodId = e.target.value;
      saveWeek();
      renderMealRows(mealKey);
      updateProgress();
    });
  });

  tbody.querySelectorAll(".meal-mode-select").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      const mealKey = sel.getAttribute("data-meal");
      const index = parseInt(sel.getAttribute("data-index"), 10);
      weekPlan[currentDay][mealKey][index].mode = e.target.value;
      saveWeek();
      renderMealRows(mealKey);
      updateProgress();
    });
  });

  tbody.querySelectorAll(".meal-qty-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const mealKey = input.getAttribute("data-meal");
      const index = parseInt(input.getAttribute("data-index"), 10);
      const val = parseFloat(e.target.value) || 0;
      weekPlan[currentDay][mealKey][index].qty = val;
      saveWeek();
      renderMealRows(mealKey);
      updateProgress();
    });
  });

  tbody.querySelectorAll(".btn-remove-row").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mealKey = btn.getAttribute("data-meal");
      const index = parseInt(btn.getAttribute("data-index"), 10);
      weekPlan[currentDay][mealKey].splice(index, 1);
      saveWeek();
      renderMealRows(mealKey);
      updateProgress();
    });
  });

  updateMealSubtotal(mealKey);
}

function addMealRow(day, mealKey) {
  const defaultFood = foods[0];
  weekPlan[day][mealKey].push({
    foodId: defaultFood.id,
    mode: "grams",
    qty: 100,
  });
  saveWeek();
  renderMealRows(mealKey);
  updateProgress();
}

function computeRowMacros(row, food) {
  if (!food) {
    return { kcals: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 };
  }
  let factor = 1;
  if (row.mode === "grams") {
    factor = row.qty / 100;
    return {
      kcals: food.per100g.kcals * factor,
      protein: food.per100g.protein * factor,
      carbs: food.per100g.carbs * factor,
      fats: food.per100g.fats * factor,
      fiber: food.per100g.fiber * factor,
    };
  } else {
    factor = row.qty;
    return {
      kcals: food.perServing.kcals * factor,
      protein: food.perServing.protein * factor,
      carbs: food.perServing.carbs * factor,
      fats: food.perServing.fats * factor,
      fiber: food.perServing.fiber * factor,
    };
  }
}

function updateMealSubtotal(mealKey) {
  const rows = weekPlan[currentDay][mealKey];
  let totals = { kcals: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 };
  rows.forEach((row) => {
    const food = foods.find((f) => f.id === row.foodId);
    const macros = computeRowMacros(row, food);
    totals.kcals += macros.kcals;
    totals.protein += macros.protein;
    totals.carbs += macros.carbs;
    totals.fats += macros.fats;
    totals.fiber += macros.fiber;
  });
  const el = document.getElementById(`subtotal-${mealKey}`);
  el.textContent = `Subtotal: ${totals.kcals.toFixed(
    0
  )} kcals • P ${totals.protein.toFixed(1)} • C ${totals.carbs.toFixed(
    1
  )} • F ${totals.fats.toFixed(1)} • Fiber ${totals.fiber.toFixed(1)}`;
}

function computeDayTotals(day) {
  let totals = { kcals: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 };
  MEAL_TYPES.forEach((meal) => {
    weekPlan[day][meal.key].forEach((row) => {
      const food = foods.find((f) => f.id === row.foodId);
      const macros = computeRowMacros(row, food);
      totals.kcals += macros.kcals;
      totals.protein += macros.protein;
      totals.carbs += macros.carbs;
      totals.fats += macros.fats;
      totals.fiber += macros.fiber;
    });
  });
  return totals;
}

function updateProgress() {
  const totals = computeDayTotals(currentDay);

  updateProgressItem(
    "progressEnergy",
    totals.kcals,
    targets.energy,
    "kcals",
    false
  );
  updateProgressItem(
    "progressProtein",
    totals.protein,
    targets.protein,
    "g",
    true
  );
  updateProgressItem(
    "progressCarbs",
    totals.carbs,
    targets.carbs,
    "g",
    true
  );
  updateProgressItem("progressFats", totals.fats, targets.fats, "g", true);
  updateProgressItem(
    "progressFiber",
    totals.fiber,
    targets.fiber,
    "g",
    true
  );

  const allMet =
    totals.kcals >= targets.energy &&
    totals.protein >= targets.protein &&
    totals.carbs >= targets.carbs &&
    totals.fats >= targets.fats &&
    totals.fiber >= targets.fiber;

  const banner = document.getElementById("statusBanner");
  if (allMet) {
    banner.classList.remove("hidden");
  } else {
    banner.classList.add("hidden");
  }
}

function updateProgressItem(
  elementId,
  actual,
  target,
  unit,
  showDecimals = true
) {
  const el = document.getElementById(elementId);
  const diff = actual - target;
  const remaining = target - actual;

  if (actual >= target) {
    el.classList.remove("pending");
    el.classList.add("met");
    el.textContent = `🎯 MET (${diff.toFixed(showDecimals ? 1 : 0)} ${unit} over)`;
  } else {
    el.classList.remove("met");
    el.classList.add("pending");
    el.textContent = `⏳ REQUIRING (${remaining.toFixed(
      showDecimals ? 1 : 0
    )} ${unit} left)`;
  }
}

// ---------- Events: Targets & Mode ----------

function setupTargetsEvents() {
  document.getElementById("saveTargetsBtn").addEventListener("click", () => {
    targets.energy = parseFloat(
      document.getElementById("targetEnergy").value || "0"
    );
    targets.protein = parseFloat(
      document.getElementById("targetProtein").value || "0"
    );
    targets.carbs = parseFloat(
      document.getElementById("targetCarbs").value || "0"
    );
    targets.fats = parseFloat(
      document.getElementById("targetFats").value || "0"
    );
    targets.fiber = parseFloat(
      document.getElementById("targetFiber").value || "0"
    );
    saveTargets();
    updateProgress();
  });

  document
    .querySelectorAll('input[name="nutritionMode"]')
    .forEach((radio) => {
      radio.addEventListener("change", (e) => {
        nutritionDisplayMode = e.target.value;
        // Display mode is informational; calculations already use per100g/perServing.
      });
    });
}

// ---------- Events: Database ----------

function setupDatabaseEvents() {
  document
    .getElementById("categoryFilter")
    .addEventListener("change", renderFoodTable);

  document
    .getElementById("customFoodForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("customName").value.trim();
      const category = document.getElementById("customCategory").value;
      const servingSize =
        document.getElementById("customServingSize").value.trim();
      const kcals = parseFloat(
        document.getElementById("customKcals").value || "0"
      );
      const protein = parseFloat(
        document.getElementById("customProtein").value || "0"
      );
      const carbs = parseFloat(
        document.getElementById("customCarbs").value || "0"
      );
      const fats = parseFloat(
        document.getElementById("customFats").value || "0"
      );
      const fiber = parseFloat(
        document.getElementById("customFiber").value || "0"
      );

      const id = "custom-" + Date.now();
      const newFood = {
        id,
        name,
        category,
        servingSize,
        per100g: { kcals, protein, carbs, fats, fiber }, // assume serving ~100g if user wants
        perServing: { kcals, protein, carbs, fats, fiber },
        preset: false,
      };
      foods.push(newFood);
      saveFoods();
      renderCategoryFilterOptions();
      renderFoodTable();
      renderMeals();
      e.target.reset();
    });

  document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;
    searchOpenFoodFacts(query);
  });
}

// ---------- Open Food Facts Search ----------

async function searchOpenFoodFacts(query) {
  const tbody = document.getElementById("searchResultsBody");
  tbody.innerHTML = "<tr><td colspan='8'>Searching...</td></tr>";
  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
      query
    )}&search_simple=1&action=process&json=1&page_size=10`;
    const res = await fetch(url);
    const data = await res.json();
    tbody.innerHTML = "";
    if (!data.products || data.products.length === 0) {
      tbody.innerHTML =
        "<tr><td colspan='8'>No results found or missing nutrition data.</td></tr>";
      return;
    }

    data.products.forEach((p, idx) => {
      const nutriments = p.nutriments || {};
      const servingSize =
        p.serving_size || p.quantity || p.generic_name || "1 serving";

      const kcals =
        nutriments["energy-kcal_serving"] ??
        nutriments["energy-kcal_100g"] ??
        0;
      const protein =
        nutriments["proteins_serving"] ?? nutriments["proteins_100g"] ?? 0;
      const carbs =
        nutriments["carbohydrates_serving"] ??
        nutriments["carbohydrates_100g"] ??
        0;
      const fats =
        nutriments["fat_serving"] ?? nutriments["fat_100g"] ?? 0;
      const fiber =
        nutriments["fiber_serving"] ?? nutriments["fiber_100g"] ?? 0;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.product_name || "Unknown"}</td>
        <td>${servingSize}</td>
        <td><input type="number" step="0.1" value="${kcals || 0}" class="search-kcals" data-idx="${idx}" /></td>
        <td><input type="number" step="0.1" value="${protein || 0}" class="search-protein" data-idx="${idx}" /></td>
        <td><input type="number" step="0.1" value="${carbs || 0}" class="search-carbs" data-idx="${idx}" /></td>
        <td><input type="number" step="0.1" value="${fats || 0}" class="search-fats" data-idx="${idx}" /></td>
        <td><input type="number" step="0.1" value="${fiber || 0}" class="search-fiber" data-idx="${idx}" /></td>
        <td>
          <button class="btn-secondary search-add-btn" data-idx="${idx}">Add</button>
        </td>
      `;
      tbody.appendChild(tr);

      tr.querySelector(".search-add-btn").addEventListener("click", () => {
        const kcalsVal = parseFloat(
          tr.querySelector(".search-kcals").value || "0"
        );
        const proteinVal = parseFloat(
          tr.querySelector(".search-protein").value || "0"
        );
        const carbsVal = parseFloat(
          tr.querySelector(".search-carbs").value || "0"
        );
        const fatsVal = parseFloat(
          tr.querySelector(".search-fats").value || "0"
        );
        const fiberVal = parseFloat(
          tr.querySelector(".search-fiber").value || "0"
        );

        const id = "api-" + Date.now() + "-" + idx;
        const newFood = {
          id,
          name: p.product_name || "Unknown",
          category: "Beverages & Supplements",
          servingSize,
          per100g: {
            kcals: kcalsVal,
            protein: proteinVal,
            carbs: carbsVal,
            fats: fatsVal,
            fiber: fiberVal,
          },
          perServing: {
            kcals: kcalsVal,
            protein: proteinVal,
            carbs: carbsVal,
            fats: fatsVal,
            fiber: fiberVal,
          },
          preset: false,
        };
        foods.push(newFood);
        saveFoods();
        renderCategoryFilterOptions();
        renderFoodTable();
        renderMeals();
      });
    });
  } catch (err) {
    tbody.innerHTML =
      "<tr><td colspan='8'>Error fetching data from Open Food Facts.</td></tr>";
  }
}

// ---------- Excel Export ----------

function setupExport() {
  document
    .getElementById("exportExcelBtn")
    .addEventListener("click", exportWeekToExcel);
}

function exportWeekToExcel() {
  const wb = XLSX.utils.book_new();

  // Day-by-day sheets
  DAYS.forEach((day) => {
    const rows = [];
    rows.push([
      "Day",
      "Meal",
      "Ingredient Name",
      "Mode",
      "Portion Qty",
      "Kcals",
      "Protein",
      "Carbs",
      "Fats",
      "Fiber",
    ]);

    MEAL_TYPES.forEach((meal) => {
      weekPlan[day][meal.key].forEach((row) => {
        const food = foods.find((f) => f.id === row.foodId);
        const macros = computeRowMacros(row, food);
        rows.push([
          day,
          meal.label,
          food ? food.name : "Unknown",
          row.mode,
          row.qty,
          macros.kcals,
          macros.protein,
          macros.carbs,
          macros.fats,
          macros.fiber,
        ]);
      });
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, day);
  });

  // Summary sheet
  const summaryRows = [];
  summaryRows.push([
    "Day",
    "Total Kcals",
    "Total Protein",
    "Total Carbs",
    "Total Fats",
    "Total Fiber",
    "Target Kcals",
    "Target Protein",
    "Target Carbs",
    "Target Fats",
    "Target Fiber",
  ]);

  DAYS.forEach((day) => {
    const totals = computeDayTotals(day);
    summaryRows.push([
      day,
      totals.kcals,
      totals.protein,
      totals.carbs,
      totals.fats,
      totals.fiber,
      targets.energy,
      targets.protein,
      targets.carbs,
      targets.fats,
      targets.fiber,
    ]);
  });

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);
  XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

  XLSX.writeFile(wb, "Weekly_Meal_Plan.xlsx");
}

// ---------- Main ----------

document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
  renderTargets();
  document.getElementById("currentDayLabel").textContent =
    "Day: " + currentDay;
  renderCategoryFilterOptions();
  renderFoodTable();
  renderDayTabs();
  renderMeals();
  setupTargetsEvents();
  setupDatabaseEvents();
  setupExport();
});
