// ---------- Data Model ----------

const STORAGE_KEY = "macroTrackerData_v1";

let foodDatabase = [
  {
    name: "Skinless Boneless Chicken Leg",
    kcalPer100: 185.0,
    proteinPer100: 26.0,
    carbsPer100: 0.0,
    fatsPer100: 8.0,
    fiberPer100: 0.0,
    servingSize: 120
  },
  {
    name: "Pork Loin",
    kcalPer100: 143.0,
    proteinPer100: 21.0,
    carbsPer100: 0.0,
    fatsPer100: 5.0,
    fiberPer100: 0.0,
    servingSize: 150
  },
  {
    name: "Minced Chicken",
    kcalPer100: 143.0,
    proteinPer100: 17.5,
    carbsPer100: 0.0,
    fatsPer100: 8.1,
    fiberPer100: 0.0,
    servingSize: 100
  },
  {
    name: "Minced Pork (10% fat)",
    kcalPer100: 212.0,
    proteinPer100: 18.0,
    carbsPer100: 0.0,
    fatsPer100: 15.0,
    fiberPer100: 0.0,
    servingSize: 100
  },
  {
    name: "Minced Beef (15% fat)",
    kcalPer100: 215.0,
    proteinPer100: 19.0,
    carbsPer100: 0.0,
    fatsPer100: 15.0,
    fiberPer100: 0.0,
    servingSize: 100
  },
  {
    name: "Beef Slices (Lean)",
    kcalPer100: 175.0,
    proteinPer100: 22.0,
    carbsPer100: 0.0,
    fatsPer100: 9.0,
    fiberPer100: 0.0,
    servingSize: 100
  },
  {
    name: "Pork Collar",
    kcalPer100: 230.0,
    proteinPer100: 17.0,
    carbsPer100: 0.0,
    fatsPer100: 18.0,
    fiberPer100: 0.0,
    servingSize: 120
  },
  {
    name: "Salmon Sashimi",
    kcalPer100: 208.0,
    proteinPer100: 20.0,
    carbsPer100: 0.0,
    fatsPer100: 13.0,
    fiberPer100: 0.0,
    servingSize: 80
  },
  {
    name: "Salmon Fillet",
    kcalPer100: 208.0,
    proteinPer100: 20.4,
    carbsPer100: 0.0,
    fatsPer100: 13.4,
    fiberPer100: 0.0,
    servingSize: 150
  },
  {
    name: "Tiger Prawns",
    kcalPer100: 92.0,
    proteinPer100: 20.0,
    carbsPer100: 0.2,
    fatsPer100: 1.2,
    fiberPer100: 0.0,
    servingSize: 100
  },
  {
    name: "Chobani Plain Light Yogurt",
    kcalPer100: 56.0,
    proteinPer100: 9.3,
    carbsPer100: 4.0,
    fatsPer100: 0.2,
    fiberPer100: 0.0,
    servingSize: 170
  },
  {
    name: "Low Fat Dairy Milk",
    kcalPer100: 43.0,
    proteinPer100: 3.4,
    carbsPer100: 4.8,
    fatsPer100: 1.0,
    fiberPer100: 0.0,
    servingSize: 250
  },
  {
    name: "President Brand Gouda Slice",
    kcalPer100: 347.0,
    proteinPer100: 24.0,
    carbsPer100: 0.1,
    fatsPer100: 28.0,
    fiberPer100: 0.0,
    servingSize: 20
  },
  {
    name: "Whole Eggs",
    kcalPer100: 143.0,
    proteinPer100: 12.6,
    carbsPer100: 0.7,
    fatsPer100: 9.5,
    fiberPer100: 0.0,
    servingSize: 50
  },
  {
    name: "Firm Tofu",
    kcalPer100: 83.0,
    proteinPer100: 10.0,
    carbsPer100: 2.0,
    fatsPer100: 4.2,
    fiberPer100: 1.0,
    servingSize: 150
  },
  {
    name: "Rolled Oats (Dry)",
    kcalPer100: 379.0,
    proteinPer100: 13.2,
    carbsPer100: 67.7,
    fatsPer100: 6.5,
    fiberPer100: 10.1,
    servingSize: 40
  },
  {
    name: "Brown Rice (Cooked)",
    kcalPer100: 123.0,
    proteinPer100: 2.7,
    carbsPer100: 25.6,
    fatsPer100: 1.0,
    fiberPer100: 1.6,
    servingSize: 150
  },
  {
    name: "White Rice (Cooked)",
    kcalPer100: 130.0,
    proteinPer100: 2.4,
    carbsPer100: 28.2,
    fatsPer100: 0.3,
    fiberPer100: 0.4,
    servingSize: 150
  },
  {
    name: "Russet Potato (Raw)",
    kcalPer100: 79.0,
    proteinPer100: 2.1,
    carbsPer100: 18.1,
    fatsPer100: 0.1,
    fiberPer100: 1.3,
    servingSize: 170
  },
  {
    name: "Sourdough Slice",
    kcalPer100: 245.0,
    proteinPer100: 9.0,
    carbsPer100: 47.0,
    fatsPer100: 1.5,
    fiberPer100: 2.5,
    servingSize: 50
  },
  {
    name: "Blueberries",
    kcalPer100: 57.0,
    proteinPer100: 0.7,
    carbsPer100: 14.5,
    fatsPer100: 0.3,
    fiberPer100: 2.4,
    servingSize: 148
  },
  {
    name: "Golden Kiwi",
    kcalPer100: 63.0,
    proteinPer100: 1.0,
    carbsPer100: 15.8,
    fatsPer100: 0.3,
    fiberPer100: 1.4,
    servingSize: 80
  },
  {
    name: "Green Leafy Vegetables",
    kcalPer100: 23.0,
    proteinPer100: 2.9,
    carbsPer100: 3.6,
    fatsPer100: 0.4,
    fiberPer100: 2.2,
    servingSize: 100
  },
  {
    name: "Dried Cranberries",
    kcalPer100: 308.0,
    proteinPer100: 0.1,
    carbsPer100: 82.5,
    fatsPer100: 1.4,
    fiberPer100: 5.3,
    servingSize: 40
  },
  {
    name: "Tay's Steamed Chicken Breast",
    kcalPer100: 107.0,
    proteinPer100: 21.0,
    carbsPer100: 1.7,
    fatsPer100: 1.4,
    fiberPer100: 0.0,
    servingSize: 120
  },
  {
    name: "Ayam Brand Tuna Mayonnaise",
    kcalPer100: 162.0,
    proteinPer100: 12.8,
    carbsPer100: 2.2,
    fatsPer100: 11.1,
    fiberPer100: 0.5,
    servingSize: 80
  },
  {
    name: "100Plus Zero",
    kcalPer100: 0.0,
    proteinPer100: 0.0,
    carbsPer100: 0.0,
    fatsPer100: 0.0,
    fiberPer100: 0.0,
    servingSize: 325
  },
  {
    name: "BSN Syntha-6 Isolate Chocolate",
    kcalPer100: 368.4,
    proteinPer100: 65.8,
    carbsPer100: 18.4,
    fatsPer100: 3.9,
    fiberPer100: 2.6,
    servingSize: 38
  }
];

let meals = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: []
};

let targets = {
  energy: 1700,
  protein: 120,
  carbs: 175,
  fats: 50,
  fiber: 25
};

// ---------- Persistence ----------

function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (data.foodDatabase) foodDatabase = data.foodDatabase;
    if (data.meals) meals = data.meals;
    if (data.targets) targets = data.targets;
  } catch (e) {
    console.warn("Failed to parse stored data", e);
  }
}

function saveToStorage() {
  const data = {
    foodDatabase,
    meals,
    targets
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ---------- Helpers ----------

function createFoodOptionsHTML() {
  return foodDatabase
    .map(
      (food, idx) =>
        `<option value="${idx}">${food.name}</option>`
    )
    .join("");
}

function getFoodByIndex(index) {
  return foodDatabase[index];
}

function calculateMacros(food, quantity, unit) {
  // quantity: number; unit: "g" or "servings"
  let grams;
  if (unit === "g") {
    grams = quantity;
  } else {
    grams = quantity * (food.servingSize || 100);
  }
  const factor = grams / 100;
  return {
    energy: +(food.kcalPer100 * factor).toFixed(1),
    protein: +(food.proteinPer100 * factor).toFixed(1),
    carbs: +(food.carbsPer100 * factor).toFixed(1),
    fats: +(food.fatsPer100 * factor).toFixed(1),
    fiber: +(food.fiberPer100 * factor).toFixed(1)
  };
}

// ---------- UI Setup ----------

document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
  initTargetsUI();
  initMealsUI();
  initApiSearch();
  initCustomFood();
  updateAllTotals();
  document.getElementById("clear-data-btn").addEventListener("click", clearAllData);
});

// Targets UI
function initTargetsUI() {
  document.getElementById("target-energy").value = targets.energy;
  document.getElementById("target-protein").value = targets.protein;
  document.getElementById("target-carbs").value = targets.carbs;
  document.getElementById("target-fats").value = targets.fats;
  document.getElementById("target-fiber").value = targets.fiber;

  ["energy", "protein", "carbs", "fats", "fiber"].forEach((macro) => {
    const input = document.getElementById(`target-${macro}`);
    input.addEventListener("input", () => {
      targets[macro] = parseFloat(input.value) || 0;
      saveToStorage();
      updateAllTotals();
    });
  });
}

// Meals UI
function initMealsUI() {
  const sections = document.querySelectorAll(".meal-section");
  sections.forEach((section) => {
    const mealKey = section.dataset.meal;
    const tbody = section.querySelector("tbody");
    const addBtn = section.querySelector(".add-row-btn");

    addBtn.addEventListener("click", () => {
      addMealRow(mealKey, tbody);
    });

    // Load existing rows from stored meals
    if (meals[mealKey] && meals[mealKey].length) {
      meals[mealKey].forEach((item) => {
        addMealRow(mealKey, tbody, item);
      });
    }
  });
}

function addMealRow(mealKey, tbody, existingItem) {
  const tr = document.createElement("tr");

  const foodCell = document.createElement("td");
  const qtyCell = document.createElement("td");
  const unitCell = document.createElement("td");
  const energyCell = document.createElement("td");
  const proteinCell = document.createElement("td");
  const carbsCell = document.createElement("td");
  const fatsCell = document.createElement("td");
  const fiberCell = document.createElement("td");
  const removeCell = document.createElement("td");

  const select = document.createElement("select");
  select.innerHTML = `<option value="">--Select--</option>${createFoodOptionsHTML()}`;

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.min = "0";
  qtyInput.step = "0.1";
  qtyInput.value = existingItem ? existingItem.quantity : "";

  const unitSelect = document.createElement("select");
  unitSelect.innerHTML = `
    <option value="g">g</option>
    <option value="servings">servings</option>
  `;
  unitSelect.value = existingItem ? existingItem.unit : "g";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✕";
  removeBtn.style.background = "#c62828";

  foodCell.appendChild(select);
  qtyCell.appendChild(qtyInput);
  unitCell.appendChild(unitSelect);
  energyCell.textContent = "0";
  proteinCell.textContent = "0";
  carbsCell.textContent = "0";
  fatsCell.textContent = "0";
  fiberCell.textContent = "0";
  removeCell.appendChild(removeBtn);

  tr.appendChild(foodCell);
  tr.appendChild(qtyCell);
  tr.appendChild(unitCell);
  tr.appendChild(energyCell);
  tr.appendChild(proteinCell);
  tr.appendChild(carbsCell);
  tr.appendChild(fatsCell);
  tr.appendChild(fiberCell);
  tr.appendChild(removeCell);

  tbody.appendChild(tr);

  function recalcRowAndSave() {
    const foodIndex = select.value ? parseInt(select.value, 10) : null;
    const quantity = parseFloat(qtyInput.value) || 0;
    const unit = unitSelect.value;

    if (foodIndex !== null && !isNaN(foodIndex) && quantity > 0) {
      const food = getFoodByIndex(foodIndex);
      const macros = calculateMacros(food, quantity, unit);
      energyCell.textContent = macros.energy;
      proteinCell.textContent = macros.protein;
      carbsCell.textContent = macros.carbs;
      fatsCell.textContent = macros.fats;
      fiberCell.textContent = macros.fiber;
    } else {
      energyCell.textContent = "0";
      proteinCell.textContent = "0";
      carbsCell.textContent = "0";
      fatsCell.textContent = "0";
      fiberCell.textContent = "0";
    }

    // Update meals data
    const rows = Array.from(tbody.querySelectorAll("tr"));
    meals[mealKey] = rows.map((row) => {
      const s = row.querySelector("select");
      const q = row.querySelector('input[type="number"]');
      const u = row.querySelectorAll("select")[1];
      const e = row.children[3].textContent;
      const p = row.children[4].textContent;
      const c = row.children[5].textContent;
      const f = row.children[6].textContent;
      const fi = row.children[7].textContent;

      const idx = s.value ? parseInt(s.value, 10) : null;
      return {
        foodIndex: idx,
        quantity: parseFloat(q.value) || 0,
        unit: u.value,
        energy: parseFloat(e) || 0,
        protein: parseFloat(p) || 0,
        carbs: parseFloat(c) || 0,
        fats: parseFloat(f) || 0,
        fiber: parseFloat(fi) || 0
      };
    });

    saveToStorage();
    updateAllTotals();
  }

  select.addEventListener("change", recalcRowAndSave);
  qtyInput.addEventListener("input", recalcRowAndSave);
  unitSelect.addEventListener("change", recalcRowAndSave);

  removeBtn.addEventListener("click", () => {
    tr.remove();
    recalcRowAndSave();
  });

  // If existing item, set select value and recalc
  if (existingItem && typeof existingItem.foodIndex === "number") {
    select.value = existingItem.foodIndex;
    energyCell.textContent = existingItem.energy || 0;
    proteinCell.textContent = existingItem.protein || 0;
    carbsCell.textContent = existingItem.carbs || 0;
    fatsCell.textContent = existingItem.fats || 0;
    fiberCell.textContent = existingItem.fiber || 0;
  }

  // Initial calc
  recalcRowAndSave();
}

// ---------- Totals & Progress ----------

function updateAllTotals() {
  let totalEnergy = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;
  let totalFiber = 0;

  const sections = document.querySelectorAll(".meal-section");
  sections.forEach((section) => {
    const mealKey = section.dataset.meal;
    const tbody = section.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    let mealEnergy = 0;
    let mealProtein = 0;
    let mealCarbs = 0;
    let mealFats = 0;
    let mealFiber = 0;

    rows.forEach((row) => {
      const e = parseFloat(row.children[3].textContent) || 0;
      const p = parseFloat(row.children[4].textContent) || 0;
      const c = parseFloat(row.children[5].textContent) || 0;
      const f = parseFloat(row.children[6].textContent) || 0;
      const fi = parseFloat(row.children[7].textContent) || 0;

      mealEnergy += e;
      mealProtein += p;
      mealCarbs += c;
      mealFats += f;
      mealFiber += fi;
    });

    section.querySelector(".subtotal-energy").textContent = mealEnergy.toFixed(1);
    section.querySelector(".subtotal-protein").textContent = mealProtein.toFixed(1);
    section.querySelector(".subtotal-carbs").textContent = mealCarbs.toFixed(1);
    section.querySelector(".subtotal-fats").textContent = mealFats.toFixed(1);
    section.querySelector(".subtotal-fiber").textContent = mealFiber.toFixed(1);

    totalEnergy += mealEnergy;
    totalProtein += mealProtein;
    totalCarbs += mealCarbs;
    totalFats += mealFats;
    totalFiber += mealFiber;
  });

  document.getElementById("total-energy").textContent = totalEnergy.toFixed(1);
  document.getElementById("total-protein").textContent = totalProtein.toFixed(1);
  document.getElementById("total-carbs").textContent = totalCarbs.toFixed(1);
  document.getElementById("total-fats").textContent = totalFats.toFixed(1);
  document.getElementById("total-fiber").textContent = totalFiber.toFixed(1);

  updateProgressBars({
    energy: totalEnergy,
    protein: totalProtein,
    carbs: totalCarbs,
    fats: totalFats,
    fiber: totalFiber
  });
}

function updateProgressBars(totals) {
  const macros = ["energy", "protein", "carbs", "fats", "fiber"];
  let allMet = true;

  macros.forEach((macro) => {
    const targetVal = targets[macro];
    const totalVal = totals[macro];
    const bar = document.getElementById(`progress-${macro}`);
    const label = document.getElementById(`label-${macro}`);

    const ratio = targetVal > 0 ? Math.min(totalVal / targetVal, 1) : 0;
    bar.style.width = `${ratio * 100}%`;

    bar.classList.remove("met", "requiring");
    label.classList.remove("met", "requiring");

    if (totalVal >= targetVal && targetVal > 0) {
      const diff = (totalVal - targetVal).toFixed(1);
      label.textContent = `🎯 MET (+${diff}${macro === "energy" ? " kcal" : "g"})`;
      bar.classList.add("met");
      label.classList.add("met");
    } else {
      const remaining = (targetVal - totalVal).toFixed(1);
      label.textContent = `⏳ REQUIRING (${remaining}${macro === "energy" ? " kcal left" : "g left"})`;
      bar.classList.add("requiring");
      label.classList.add("requiring");
      allMet = false;
    }
  });

  const banner = document.getElementById("daily-status-banner");
  if (allMet) {
    banner.textContent = "🎉 ALL DAILY TARGETS ACCOMPLISHED!";
  } else {
    banner.textContent = "Keep going—your daily macro progress is updating in real time.";
  }
}

// ---------- API Search (Open Food Facts) ----------

function initApiSearch() {
  const input = document.getElementById("api-search-input");
  const btn = document.getElementById("api-search-btn");

  btn.addEventListener("click", async () => {
    const query = input.value.trim();
    if (!query) return;

    btn.disabled = true;
    btn.textContent = "Searching...";

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=1`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.products && data.products.length > 0) {
        const p = data.products[0];
        const nutriments = p.nutriments || {};

        const kcalPer100 = nutriments["energy-kcal_100g"] || nutriments["energy_100g"] || 0;
        const proteinPer100 = nutriments["proteins_100g"] || 0;
        const carbsPer100 = nutriments["carbohydrates_100g"] || 0;
        const fatsPer100 = nutriments["fat_100g"] || 0;
        const fiberPer100 = nutriments["fiber_100g"] || 0;

        const newFood = {
          name: p.product_name || query,
          kcalPer100: +kcalPer100,
          proteinPer100: +proteinPer100,
          carbsPer100: +carbsPer100,
          fatsPer100: +fatsPer100,
          fiberPer100: +fiberPer100,
          servingSize: 100
        };

        foodDatabase.push(newFood);
        saveToStorage();
        refreshAllFoodSelects();

        alert(`Added "${newFood.name}" to food list from Open Food Facts.`);
      } else {
        alert("No products found for that search term.");
      }
    } catch (e) {
      console.error(e);
      alert("Error fetching data from Open Food Facts.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Search & Add";
    }
  });
}

function refreshAllFoodSelects() {
  const selects = document.querySelectorAll(".meal-table tbody select:first-child");
  const optionsHTML = `<option value="">--Select--</option>${createFoodOptionsHTML()}`;
  selects.forEach((select) => {
    const currentValue = select.value;
    select.innerHTML = optionsHTML;
    if (currentValue) {
      select.value = currentValue;
    }
  });
}

// ---------- Custom Food ----------

function initCustomFood() {
  const btn = document.getElementById("custom-add-btn");
  btn.addEventListener("click", () => {
    const name = document.getElementById("custom-name").value.trim();
    const kcal = parseFloat(document.getElementById("custom-kcal").value) || 0;
    const protein = parseFloat(document.getElementById("custom-protein").value) || 0;
    const carbs = parseFloat(document.getElementById("custom-carbs").value) || 0;
    const fats = parseFloat(document.getElementById("custom-fats").value) || 0;
    const fiber = parseFloat(document.getElementById("custom-fiber").value) || 0;
    const serving = parseFloat(document.getElementById("custom-serving").value) || 100;

    if (!name) {
      alert("Please provide a name for the custom food.");
      return;
    }

    const newFood = {
      name,
      kcalPer100: kcal,
      proteinPer100: protein,
      carbsPer100: carbs,
      fatsPer100: fats,
      fiberPer100: fiber,
      servingSize: serving
    };

    foodDatabase.push(newFood);
    saveToStorage();
    refreshAllFoodSelects();

    document.getElementById("custom-name").value = "";
    document.getElementById("custom-kcal").value = "";
    document.getElementById("custom-protein").value = "";
    document.getElementById("custom-carbs").value = "";
    document.getElementById("custom-fats").value = "";
    document.getElementById("custom-fiber").value = "";
    document.getElementById("custom-serving").value = "";

    alert(`Custom food "${name}" added to list.`);
  });
}

// ---------- Clear Data ----------

function clearAllData() {
  if (!confirm("Clear all saved meals, foods, and targets?")) return;
  localStorage.removeItem(STORAGE_KEY);
  // Reset to defaults
  meals = { breakfast: [], lunch: [], dinner: [], snack: [] };
  targets = { energy: 1700, protein: 120, carbs: 175, fats: 50, fiber: 25 };
  // Reload page to reset UI
  location.reload();
}
