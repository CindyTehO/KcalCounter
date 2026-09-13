/* ============================
   CALORIE & MACRO TRACKER JS
   SAFE CHUNK 1 OF 4
============================ */

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MEALS = [
  { key:"breakfast", label:"Breakfast" },
  { key:"lunch", label:"Lunch" },
  { key:"dinner", label:"Dinner" },
  { key:"snack", label:"Snack / Post-Workout" }
];

let foods = [];
let weekPlan = {};
let currentDay = "Mon";

/* ----------------------------
   PRESET FOODS
---------------------------- */
function initPresetFoods() {
  foods = [
    { id:"chicken_leg", name:"Skinless boneless chicken leg", category:"Poultry & Meats", servingSize:"100g", kcals:180, protein:23, carbs:0, fats:9, fiber:0, preset:true },
    { id:"chobani_light", name:"Chobani plain light yogurt", category:"Dairy & Eggs", servingSize:"170g cup", kcals:102, protein:17, carbs:6, fats:0.8, fiber:0, preset:true },
    { id:"rolled_oats", name:"Rolled oats", category:"Grains & Starches", servingSize:"40g dry", kcals:152, protein:5.2, carbs:26.8, fats:2.8, fiber:4, preset:true },
    { id:"blueberries", name:"Blueberries", category:"Fruits & Vegetables", servingSize:"80g", kcals:45.6, protein:0.6, carbs:11.6, fats:0.2, fiber:1.9, preset:true }
  ];
}

/* ----------------------------
   LOAD / SAVE STATE
---------------------------- */
function loadState() {
  const f = JSON.parse(localStorage.getItem("cm_foods"));
  const w = JSON.parse(localStorage.getItem("cm_weekPlan"));

  if (f) foods = f;
  if (w) weekPlan = w;

  if (!weekPlan || Object.keys(weekPlan).length === 0) {
    weekPlan = {};
    DAYS.forEach(d => {
      weekPlan[d] = {};
      MEALS.forEach(m => weekPlan[d][m.key] = []);
    });
  }
}

function saveFoods() { localStorage.setItem("cm_foods", JSON.stringify(foods)); }
function saveWeek() { localStorage.setItem("cm_weekPlan", JSON.stringify(weekPlan)); }

/* ----------------------------
   MACRO CALCULATIONS
---------------------------- */
function computeRowMacros(entry, food) {
  if (!food) return { kcals:0, protein:0, carbs:0, fats:0, fiber:0 };

  const qty = entry.qty || 0;
  const base = parseFloat(food.servingSize) || 100;
  const factor = entry.mode === "grams" ? qty / base : qty;

  return {
    kcals: food.kcals * factor,
    protein: food.protein * factor,
    carbs: food.carbs * factor,
    fats: food.fats * factor,
    fiber: food.fiber * factor
  };
}

function computeMealSubtotal(day, mealKey) {
  return weekPlan[day][mealKey].reduce((acc, e) => {
    const food = foods.find(f => f.id === e.foodId);
    const m = computeRowMacros(e, food);
    acc.kcals += m.kcals;
    acc.protein += m.protein;
    acc.carbs += m.carbs;
    acc.fats += m.fats;
    acc.fiber += m.fiber;
    return acc;
  }, { kcals:0, protein:0, carbs:0, fats:0, fiber:0 });
}
/* ============================
   SAFE CHUNK 2 OF 4
============================ */

/* ----------------------------
   DAY TOTALS
---------------------------- */
function computeDayTotals(day) {
  return MEALS.reduce((acc, m) => {
    const sub = computeMealSubtotal(day, m.key);
    acc.kcals += sub.kcals;
    acc.protein += sub.protein;
    acc.carbs += sub.carbs;
    acc.fats += sub.fats;
    acc.fiber += sub.fiber;
    return acc;
  }, { kcals:0, protein:0, carbs:0, fats:0, fiber:0 });
}

/* ----------------------------
   UPDATE DAILY PROGRESS
---------------------------- */
function updateProgress() {
  const totals = computeDayTotals(currentDay);

  document.getElementById("progEnergy").textContent = totals.kcals.toFixed(0);
  document.getElementById("progProtein").textContent = totals.protein.toFixed(1);
  document.getElementById("progCarbs").textContent = totals.carbs.toFixed(1);
  document.getElementById("progFats").textContent = totals.fats.toFixed(1);
  document.getElementById("progFiber").textContent = totals.fiber.toFixed(1);

  document.getElementById("tgtEnergy").textContent = 1700;
  document.getElementById("tgtProtein").textContent = 120;
  document.getElementById("tgtCarbs").textContent = 175;
  document.getElementById("tgtFats").textContent = 50;
  document.getElementById("tgtFiber").textContent = 25;
}

/* ----------------------------
   DAY TABS
---------------------------- */
function renderDayTabs() {
  const dayTabsEl = document.getElementById("dayTabs");

  dayTabsEl.querySelectorAll(".day-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.day === currentDay);

    btn.onclick = () => {
      currentDay = btn.dataset.day;
      renderMeals();
      updateProgress();
    };
  });
}

/* ----------------------------
   STICKY MEAL HEADER
---------------------------- */
function updateStickyMealHeader(mealKey) {
  const sticky = document.getElementById("stickyMealHeader");
  const meal = MEALS.find(m => m.key === mealKey);
  if (!meal) return;

  const sub = computeMealSubtotal(currentDay, mealKey);

  sticky.innerHTML = `
    <div class="sticky-meal-title">${meal.label}</div>
    <div class="sticky-meal-subtotal">
      ${sub.kcals.toFixed(0)} kcals • 
      P ${sub.protein.toFixed(1)} • 
      C ${sub.carbs.toFixed(1)} • 
      F ${sub.fats.toFixed(1)} • 
      Fiber ${sub.fiber.toFixed(1)}
    </div>
  `;

  sticky.classList.add("visible");
}

function hideStickyMealHeader() {
  document.getElementById("stickyMealHeader").classList.remove("visible");
}

/* ----------------------------
   SCROLL BEHAVIOR
---------------------------- */
function handleMealScroll() {
  const container = document.getElementById("mealScrollContainer");
  const sections = Array.from(document.getElementById("mealsContainer").children);

  const containerRect = container.getBoundingClientRect();
  let activeSection = null;

  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    const stickyHeight = document.getElementById("stickyMealHeader").offsetHeight || 0;
    const offset = rect.top - containerRect.top;

    if (offset <= stickyHeight + 8 && offset + rect.height > stickyHeight + 8) {
      activeSection = sec;
    }
  });

  if (activeSection) {
    const mealKey = activeSection.dataset.mealKey;

    sections.forEach(sec => {
      sec.classList.toggle("expanded", sec === activeSection);
    });

    updateStickyMealHeader(mealKey);
  } else {
    hideStickyMealHeader();
  }

  const tabsWrapper = document.getElementById("dayTabsWrapper");
  const plannerRect = container.getBoundingClientRect();

  if (plannerRect.top <= 0) {
    tabsWrapper.classList.add("sticky");
  } else {
    tabsWrapper.classList.remove("sticky");
  }
}
/* ============================
   SAFE CHUNK 3 OF 4
============================ */

/* ----------------------------
   ADD FOOD PANEL (AF1-A)
---------------------------- */
function createAddFoodPanel(mealKey) {
  const panel = document.createElement("div");
  panel.className = "add-food-panel";

  panel.innerHTML = `
    <div class="add-food-row">
      <div>
        <label>Select from database</label>
        <select class="addFoodSelect">
          <option value="">-- choose food --</option>
        </select>
      </div>
    </div>

    <div class="add-food-row">
      <div><label>Manual name</label><input type="text" class="manualName"></div>
      <div><label>Serving size</label><input type="text" class="manualServing"></div>
      <div><label>Kcals</label><input type="number" class="manualKcals" step="0.1"></div>
      <div><label>Protein</label><input type="number" class="manualProtein" step="0.1"></div>
      <div><label>Carbs</label><input type="number" class="manualCarbs" step="0.1"></div>
      <div><label>Fats</label><input type="number" class="manualFats" step="0.1"></div>
      <div><label>Fiber</label><input type="number" class="manualFiber" step="0.1"></div>
    </div>

    <div class="add-food-actions">
      <div class="add-food-status"></div>
      <button class="btn-primary addFoodBtn">Add to Meal</button>
    </div>
  `;

  /* Populate database dropdown */
  const dbSelect = panel.querySelector(".addFoodSelect");
  foods.forEach(f => {
    const opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = `${f.name} (${f.servingSize})`;
    dbSelect.appendChild(opt);
  });

  /* Add to Meal button */
  const addBtn = panel.querySelector(".addFoodBtn");
  const status = panel.querySelector(".add-food-status");

  addBtn.onclick = async () => {
    status.textContent = "Adding...";

    const selectedId = dbSelect.value;
    const name = panel.querySelector(".manualName").value.trim();
    const serving = panel.querySelector(".manualServing").value.trim();
    let kcals = parseFloat(panel.querySelector(".manualKcals").value) || 0;
    let protein = parseFloat(panel.querySelector(".manualProtein").value) || 0;
    let carbs = parseFloat(panel.querySelector(".manualCarbs").value) || 0;
    let fats = parseFloat(panel.querySelector(".manualFats").value) || 0;
    let fiber = parseFloat(panel.querySelector(".manualFiber").value) || 0;

    /* CASE 1 — Database item */
    if (selectedId) {
      const food = foods.find(f => f.id === selectedId);
      weekPlan[currentDay][mealKey].push({
        foodId: food.id,
        mode: "grams",
        qty: parseFloat(food.servingSize) || 100
      });
      saveWeek();
      renderMeals();
      updateProgress();
      status.textContent = "Added from database.";
      return;
    }

    /* CASE 2 — Manual item */
    if (!name) {
      status.textContent = "Enter a name or choose from database.";
      return;
    }

    const needsLookup =
      kcals === 0 && protein === 0 && carbs === 0 && fats === 0 && fiber === 0;

    /* AUTO-SEARCH MODE C */
    if (needsLookup) {
      try {
        const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          name
        )}&search_simple=1&action=process&json=1&page_size=1`;

        const res = await fetch(url);
        const data = await res.json();
        const p = (data.products || [])[0];

        if (p && p.nutriments) {
          kcals = p.nutriments["energy-kcal_100g"] || kcals;
          protein = p.nutriments["proteins_100g"] || protein;
          carbs = p.nutriments["carbohydrates_100g"] || carbs;
          fats = p.nutriments["fat_100g"] || fats;
          fiber = p.nutriments["fiber_100g"] || fiber;
          serving = "100g";
        }
      } catch (e) {
        console.warn("Auto-search failed", e);
      }
    }

    if (
      kcals === 0 &&
      protein === 0 &&
      carbs === 0 &&
      fats === 0 &&
      fiber === 0
    ) {
      status.textContent =
        "No nutrition found. Fill macros manually then tap Add again.";
      return;
    }

    /* Save manual food into database */
    const id = `manual_${Date.now()}`;
    const newFood = {
      id,
      name,
      category: "Fruits & Vegetables",
      servingSize: serving || "100g",
      kcals,
      protein,
      carbs,
      fats,
      fiber,
      preset: false
    };

    foods.push(newFood);
    saveFoods();

    /* Add to meal */
    weekPlan[currentDay][mealKey].push({
      foodId: id,
      mode: "grams",
      qty: parseFloat(serving) || 100
    });

    saveWeek();
    renderMeals();
    updateProgress();

    status.textContent = "Added with nutrition.";
  };

  return panel;
}

/* ----------------------------
   MEAL SECTION
---------------------------- */
function createMealSection(meal) {
  const section = document.createElement("div");
  section.className = "meal-section";
  section.dataset.mealKey = meal.key;

  const header = document.createElement("div");
  header.className = "meal-header";

  const title = document.createElement("div");
  title.className = "meal-title";
  title.textContent = meal.label;

  const subtotal = document.createElement("div");
  subtotal.className = "meal-subtotal";

  const sub = computeMealSubtotal(currentDay, meal.key);
  subtotal.textContent =
    `${sub.kcals.toFixed(0)} kcals • P ${sub.protein.toFixed(1)} • C ${sub.carbs.toFixed(1)} • F ${sub.fats.toFixed(1)} • Fiber ${sub.fiber.toFixed(1)}`;

  header.appendChild(title);
  header.appendChild(subtotal);

  const body = document.createElement("div");
  body.className = "meal-body";

  /* Add-Food Panel */
  const addPanel = createAddFoodPanel(meal.key);
  body.appendChild(addPanel);

  /* Meal Table */
  const wrapper = document.createElement("div");
  wrapper.className = "meal-table-wrapper";

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
    <tbody></tbody>
  `;

  wrapper.appendChild(table);
  body.appendChild(wrapper);

  section.appendChild(header);
  section.appendChild(body);

  /* Expand / Collapse */
  header.onclick = () => {
    const isExpanded = section.classList.contains("expanded");

    document.querySelectorAll(".meal-section").forEach(sec =>
      sec.classList.remove("expanded")
    );

    if (!isExpanded) {
      section.classList.add("expanded");
      updateStickyMealHeader(meal.key);
    } else {
      hideStickyMealHeader();
    }
  };

  return section;
}

/* ----------------------------
   RENDER MEALS
---------------------------- */
function renderMeals() {
  const container = document.getElementById("mealsContainer");
  container.innerHTML = "";

  MEALS.forEach(meal => {
    const section = createMealSection(meal);
    container.appendChild(section);
  });

  /* Auto-expand Breakfast */
  const first = container.querySelector(".meal-section");
  if (first) {
    first.classList.add("expanded");
    updateStickyMealHeader("breakfast");
  }
}
/* ============================
   SAFE CHUNK 4 OF 4
============================ */

/* ----------------------------
   FOOD DATABASE TABLE
---------------------------- */
function populateCategoryFilter() {
  const filter = document.getElementById("categoryFilter");
  const categories = [...new Set(foods.map(f => f.category))].sort();

  filter.innerHTML = `<option value="all">All</option>`;
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    filter.appendChild(opt);
  });
}

function renderFoodTable() {
  const filter = document.getElementById("categoryFilter").value;
  const tbody = document.getElementById("foodTableBody");
  tbody.innerHTML = "";

  foods
    .filter(f => filter === "all" || f.category === filter)
    .forEach(f => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${f.name}</td>
        <td>${f.category}</td>
        <td>${f.servingSize}</td>
        <td>${f.kcals.toFixed(1)}</td>
        <td>${f.protein.toFixed(1)}</td>
        <td>${f.carbs.toFixed(1)}</td>
        <td>${f.fats.toFixed(1)}</td>
        <td>${f.fiber.toFixed(1)}</td>
        <td>${f.preset ? "Preset" : "Custom"}</td>
        <td></td>
      `;

      const rmCell = tr.lastElementChild;

      if (!f.preset) {
        const btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.className = "btn-secondary";
        btn.style.fontSize = "0.75rem";

        btn.onclick = () => {
          foods = foods.filter(x => x.id !== f.id);
          saveFoods();
          populateCategoryFilter();
          renderFoodTable();
        };

        rmCell.appendChild(btn);
      } else {
        rmCell.textContent = "-";
      }

      tbody.appendChild(tr);
    });
}

/* ----------------------------
   SEARCH (Open Food Facts)
---------------------------- */
async function searchOpenFoodFacts(query) {
  const tbody = document.getElementById("searchResultsBody");
  tbody.innerHTML = "";
  if (!query) return;

  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
      query
    )}&search_simple=1&action=process&json=1&page_size=10`;

    const res = await fetch(url);
    const data = await res.json();
    const products = data.products || [];

    products.forEach((p, idx) => {
      const name = p.product_name || "Unknown";
      const nutr = p.nutriments || {};

      const kcals = nutr["energy-kcal_100g"] || 0;
      const protein = nutr["proteins_100g"] || 0;
      const carbs = nutr["carbohydrates_100g"] || 0;
      const fats = nutr["fat_100g"] || 0;
      const fiber = nutr["fiber_100g"] || 0;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${name}</td>
        <td>100g</td>
        <td>${kcals.toFixed(1)}</td>
        <td>${protein.toFixed(1)}</td>
        <td>${carbs.toFixed(1)}</td>
        <td>${fats.toFixed(1)}</td>
        <td>${fiber.toFixed(1)}</td>
        <td></td>
      `;

      const addCell = tr.lastElementChild;
      const btn = document.createElement("button");
      btn.textContent = "Add to DB";
      btn.className = "btn-primary";
      btn.style.fontSize = "0.75rem";

      btn.onclick = () => {
        const id = `custom_${Date.now()}_${idx}`;
        foods.push({
          id,
          name,
          category: "Fruits & Vegetables",
          servingSize: "100g",
          kcals,
          protein,
          carbs,
          fats,
          fiber,
          preset: false
        });

        saveFoods();
        populateCategoryFilter();
        renderFoodTable();
      };

      addCell.appendChild(btn);
      tbody.appendChild(tr);
    });
  } catch (e) {
    console.error("Search failed", e);
  }
}

/* ----------------------------
   CUSTOM FOOD FORM
---------------------------- */
document.getElementById("customFoodForm").addEventListener("submit", e => {
  e.preventDefault();

  const id = `custom_${Date.now()}`;
  foods.push({
    id,
    name: document.getElementById("customName").value.trim(),
    category: document.getElementById("customCategory").value,
    servingSize: document.getElementById("customServingSize").value.trim(),
    kcals: parseFloat(document.getElementById("customKcals").value) || 0,
    protein: parseFloat(document.getElementById("customProtein").value) || 0,
    carbs: parseFloat(document.getElementById("customCarbs").value) || 0,
    fats: parseFloat(document.getElementById("customFats").value) || 0,
    fiber: parseFloat(document.getElementById("customFiber").value) || 0,
    preset: false
  });

  saveFoods();
  populateCategoryFilter();
  renderFoodTable();

  document.getElementById("customFoodForm").reset();
});

/* ----------------------------
   EXPORT TO EXCEL
---------------------------- */
document.getElementById("exportExcelBtn").onclick = () => {
  const rows = [];

  rows.push([
    "Day","Meal","Food","Mode","Qty",
    "Kcals","Protein","Carbs","Fats","Fiber"
  ]);

  DAYS.forEach(day => {
    MEALS.forEach(meal => {
      weekPlan[day][meal.key].forEach(entry => {
        const food = foods.find(f => f.id === entry.foodId);
        const m = computeRowMacros(entry, food);

        rows.push([
          day,
          meal.label,
          food ? food.name : "Unknown",
          entry.mode,
          entry.qty,
          m.kcals.toFixed(1),
          m.protein.toFixed(1),
          m.carbs.toFixed(1),
          m.fats.toFixed(1),
          m.fiber.toFixed(1)
        ]);
      });
    });
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Week Plan");
  XLSX.writeFile(wb, "week_meal_plan.xlsx");
};

/* ----------------------------
   INIT — THIS MAKES THE MEAL PLANNER APPEAR
---------------------------- */
function init() {
  initPresetFoods();
  loadState();

  populateCategoryFilter();
  renderFoodTable();
  renderDayTabs();
  renderMeals();
  updateProgress();

  document.getElementById("mealScrollContainer")
    .addEventListener("scroll", handleMealScroll);

  document.getElementById("categoryFilter")
    .addEventListener("change", renderFoodTable);

  document.getElementById("searchBtn")
    .addEventListener("click", () => {
      searchOpenFoodFacts(document.getElementById("searchInput").value.trim());
    });
}

document.addEventListener("DOMContentLoaded", init);
