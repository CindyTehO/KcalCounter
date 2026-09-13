// ---------- DATA & STATE ----------

const DEFAULT_TARGETS = {
  energy: 1700,
  protein: 120,
  carbs: 175,
  fats: 50,
  fiber: 25
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEALS = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "snack", label: "Snack / Post-Workout" }
];

let foods = [];
let weekPlan = {};
let targets = { ...DEFAULT_TARGETS };
let currentDay = "Mon";

// ---------- PRESETS ----------

function initPresetFoods() {
  foods = [
    {
      id: "chicken_leg",
      name: "Skinless boneless chicken leg",
      category: "Poultry & Meats",
      servingSize: "100g",
      kcals: 180,
      protein: 23,
      carbs: 0,
      fats: 9,
      fiber: 0,
      preset: true
    },
    {
      id: "chobani_light",
      name: "Chobani plain light yogurt",
      category: "Dairy & Eggs",
      servingSize: "170g cup",
      kcals: 102,
      protein: 17,
      carbs: 6,
      fats: 0.8,
      fiber: 0,
      preset: true
    },
    {
      id: "lowfat_milk",
      name: "Low fat dairy milk",
      category: "Dairy & Eggs",
      servingSize: "250ml glass",
      kcals: 125,
      protein: 8.5,
      carbs: 12.5,
      fats: 3.8,
      fiber: 0,
      preset: true
    },
    {
      id: "rolled_oats",
      name: "Rolled oats",
      category: "Grains & Starches",
      servingSize: "40g dry",
      kcals: 152,
      protein: 5.2,
      carbs: 26.8,
      fats: 2.8,
      fiber: 4,
      preset: true
    },
    {
      id: "blueberries",
      name: "Blueberries",
      category: "Fruits & Vegetables",
      servingSize: "80g",
      kcals: 45.6,
      protein: 0.6,
      carbs: 11.6,
      fats: 0.2,
      fiber: 1.9,
      preset: true
    },
    {
      id: "golden_kiwi",
      name: "Golden kiwi",
      category: "Fruits & Vegetables",
      servingSize: "1 medium (80g)",
      kcals: 48,
      protein: 1,
      carbs: 12,
      fats: 0.4,
      fiber: 2,
      preset: true
    },
    {
      id: "pork_loin",
      name: "Pork loin",
      category: "Poultry & Meats",
      servingSize: "100g",
      kcals: 210,
      protein: 26,
      carbs: 0,
      fats: 11,
      fiber: 0,
      preset: true
    },
    {
      id: "minced_chicken",
      name: "Minced chicken",
      category: "Poultry & Meats",
      servingSize: "100g",
      kcals: 165,
      protein: 22,
      carbs: 0,
      fats: 8,
      fiber: 0,
      preset: true
    },
    {
      id: "minced_pork",
      name: "Minced pork",
      category: "Poultry & Meats",
      servingSize: "100g",
      kcals: 250,
      protein: 20,
      carbs: 0,
      fats: 19,
      fiber: 0,
      preset: true
    },
    {
      id: "minced_beef",
      name: "Minced beef",
      category: "Poultry & Meats",
      servingSize: "100g",
      kcals: 250,
      protein: 26,
      carbs: 0,
      fats: 15,
      fiber: 0,
      preset: true
    },
    {
      id: "beef_slices",
      name: "Beef slices",
      category: "Poultry & Meats",
      servingSize: "100g",
      kcals: 230,
      protein: 25,
      carbs: 0,
      fats: 14,
      fiber: 0,
      preset: true
    },
    {
      id: "salmon_sashimi",
      name: "Salmon sashimi",
      category: "Seafood",
      servingSize: "80g",
      kcals: 166.4,
      protein: 16,
      carbs: 0,
      fats: 10.4,
      fiber: 0,
      preset: true
    },
    {
      id: "salmon",
      name: "Salmon",
      category: "Seafood",
      servingSize: "100g",
      kcals: 208,
      protein: 20,
      carbs: 0,
      fats: 13,
      fiber: 0,
      preset: true
    },
    {
      id: "leafy_veg",
      name: "Green leafy vegetables",
      category: "Fruits & Vegetables",
      servingSize: "80g cooked",
      kcals: 20,
      protein: 2,
      carbs: 3.2,
      fats: 0.4,
      fiber: 2.4,
      preset: true
    }
  ];
}

// ---------- LOCAL STORAGE ----------

function loadState() {
  try {
    const storedFoods = JSON.parse(localStorage.getItem("cm_foods"));
    const storedWeek = JSON.parse(localStorage.getItem("cm_weekPlan"));
    const storedTargets = JSON.parse(localStorage.getItem("cm_targets"));

    if (storedFoods && Array.isArray(storedFoods)) foods = storedFoods;
    if (storedWeek) weekPlan = storedWeek;
    if (storedTargets) targets = storedTargets;
  } catch (e) {
    console.warn("Failed to load state", e);
  }

  if (!weekPlan || Object.keys(weekPlan).length === 0) {
    weekPlan = {};
    DAYS.forEach((d) => {
      weekPlan[d] = {};
      MEALS.forEach((m) => {
        weekPlan[d][m.key] = [];
      });
    });
  }
}

function saveFoods() {
  localStorage.setItem("cm_foods", JSON.stringify(foods));
}

function saveWeek() {
  localStorage.setItem("cm_weekPlan", JSON.stringify(weekPlan));
}

function saveTargets() {
  localStorage.setItem("cm_targets", JSON.stringify(targets));
}

// ---------- UTILITIES ----------

function computeRowMacros(entry, food) {
  if (!food) {
    return { kcals: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 };
  }
  const qty = entry.qty || 0;
  let factor = 1;
  if (entry.mode === "grams") {
    const match = food.servingSize.match(/(\d+(\.\d+)?)/);
    const base = match ? parseFloat(match[1]) : 100;
    factor = qty / base;
  } else {
    factor = qty;
  }
  return {
    kcals: food.kcals * factor,
    protein: food.protein * factor,
    carbs: food.carbs * factor,
    fats: food.fats * factor,
    fiber: food.fiber * factor
  };
}

function computeMealSubtotal(day, mealKey) {
  const entries = weekPlan[day][mealKey];
  return entries.reduce(
    (acc, e) => {
      const food = foods.find((f) => f.id === e.foodId);
      const m = computeRowMacros(e, food);
      acc.kcals += m.kcals;
      acc.protein += m.protein;
      acc.carbs += m.carbs;
      acc.fats += m.fats;
      acc.fiber += m.fiber;
      return acc;
    },
    { kcals: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
  );
}

function computeDayTotals(day) {
  return MEALS.reduce(
    (acc, m) => {
      const sub = computeMealSubtotal(day, m.key);
      acc.kcals += sub.kcals;
      acc.protein += sub.protein;
      acc.carbs += sub.carbs;
      acc.fats += sub.fats;
      acc.fiber += sub.fiber;
      return acc;
    },
    { kcals: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
  );
}

// ---------- RENDERING: MEAL PLANNER ----------

const dayTabsWrapperEl = document.getElementById("dayTabsWrapper");
const dayTabsEl = document.getElementById("dayTabs");
const mealScrollContainerEl = document.getElementById("mealScrollContainer");
const stickyMealHeaderEl = document.getElementById("stickyMealHeader");
const mealsContainerEl = document.getElementById("mealsContainer");

function renderDayTabs() {
  dayTabsEl.querySelectorAll(".day-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.day === currentDay);
    btn.onclick = () => {
      currentDay = btn.dataset.day;
      renderMeals();
      updateProgress();
    };
  });
}

function createAddFoodPanel(mealKey) {
  const panel = document.createElement("div");
  panel.className = "add-food-panel";

  const row1 = document.createElement("div");
  row1.className = "add-food-row";
  const dbDiv = document.createElement("div");
  const dbLabel = document.createElement("label");
  dbLabel.textContent = "Select from database";
  const dbSelect = document.createElement("select");
  dbSelect.innerHTML = `<option value="">-- choose food --</option>`;
  foods.forEach((f) => {
    const opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = `${f.name} (${f.servingSize})`;
    dbSelect.appendChild(opt);
  });
  dbDiv.appendChild(dbLabel);
  dbDiv.appendChild(dbSelect);
  row1.appendChild(dbDiv);

  const row2 = document.createElement("div");
  row2.className = "add-food-row";

  const nameDiv = document.createElement("div");
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Manual name";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(nameInput);

  const servingDiv = document.createElement("div");
  const servingLabel = document.createElement("label");
  servingLabel.textContent = "Serving size";
  const servingInput = document.createElement("input");
  servingInput.type = "text";
  servingDiv.appendChild(servingLabel);
  servingDiv.appendChild(servingInput);

  const kcalsDiv = document.createElement("div");
  const kcalsLabel = document.createElement("label");
  kcalsLabel.textContent = "Kcals";
  const kcalsInput = document.createElement("input");
  kcalsInput.type = "number";
  kcalsInput.step = "0.1";
  kcalsDiv.appendChild(kcalsLabel);
  kcalsDiv.appendChild(kcalsInput);

  const pDiv = document.createElement("div");
  const pLabel = document.createElement("label");
  pLabel.textContent = "Protein (g)";
  const pInput = document.createElement("input");
  pInput.type = "number";
  pInput.step = "0.1";
  pDiv.appendChild(pLabel);
  pDiv.appendChild(pInput);

  const cDiv = document.createElement("div");
  const cLabel = document.createElement("label");
  cLabel.textContent = "Carbs (g)";
  const cInput = document.createElement("input");
  cInput.type = "number";
  cInput.step = "0.1";
  cDiv.appendChild(cLabel);
  cDiv.appendChild(cInput);

  const fDiv = document.createElement("div");
  const fLabel = document.createElement("label");
  fLabel.textContent = "Fats (g)";
  const fInput = document.createElement("input");
  fInput.type = "number";
  fInput.step = "0.1";
  fDiv.appendChild(fLabel);
  fDiv.appendChild(fInput);

  const fiDiv = document.createElement("div");
  const fiLabel = document.createElement("label");
  fiLabel.textContent = "Fiber (g)";
  const fiInput = document.createElement("input");
  fiInput.type = "number";
  fiInput.step = "0.1";
  fiDiv.appendChild(fiLabel);
  fiDiv.appendChild(fiInput);

  row2.appendChild(nameDiv);
  row2.appendChild(servingDiv);
  row2.appendChild(kcalsDiv);
  row2.appendChild(pDiv);
  row2.appendChild(cDiv);
  row2.appendChild(fDiv);
  row2.appendChild(fiDiv);

  const actions = document.createElement("div");
  actions.className = "add-food-actions";
  const status = document.createElement("div");
  status.className = "add-food-status";
  status.textContent = "";
  const addBtn = document.createElement("button");
  addBtn.className = "btn-primary";
  addBtn.textContent = "Add to Meal";

  actions.appendChild(status);
  actions.appendChild(addBtn);

  panel.appendChild(row1);
  panel.appendChild(row2);
  panel.appendChild(actions);

  addBtn.onclick = async () => {
    status.textContent = "Adding...";
    const selectedId = dbSelect.value;
    if (selectedId) {
      const food = foods.find((f) => f.id === selectedId);
      if (!food) {
        status.textContent = "Food not found.";
        return;
      }
      weekPlan[currentDay][mealKey].push({
        foodId: food.id,
        mode: "grams",
        qty: parseFloat(food.servingSize.match(/(\d+(\.\d+)?)/)?.[1] || "100")
      });
      saveWeek();
      renderMeals();
      updateProgress();
      status.textContent = "Added from database.";
      return;
    }

    const name = nameInput.value.trim();
    if (!name) {
      status.textContent = "Enter a name or choose from database.";
      return;
    }

    // AUTO-SEARCH MODE C: try to fetch nutrition, then add
    let kcals = parseFloat(kcalsInput.value) || 0;
    let protein = parseFloat(pInput.value) || 0;
    let carbs = parseFloat(cInput.value) || 0;
    let fats = parseFloat(fInput.value) || 0;
    let fiber = parseFloat(fiInput.value) || 0;
    let servingSize = servingInput.value.trim() || "100g";

    const needsLookup =
      kcals === 0 && protein === 0 && carbs === 0 && fats === 0 && fiber === 0;

    if (needsLookup) {
      try {
        const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          name
        )}&search_simple=1&action=process&json=1&page_size=1`;
        const res = await fetch(url);
        const data = await res.json();
        const p = (data.products || [])[0];
        if (p && p.nutriments) {
          const nutr = p.nutriments;
          kcals = nutr["energy-kcal_100g"] || kcals;
          protein = nutr["proteins_100g"] || protein;
          carbs = nutr["carbohydrates_100g"] || carbs;
          fats = nutr["fat_100g"] || fats;
          fiber = nutr["fiber_100g"] || fiber;
          servingSize = "100g";
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
        "No nutrition found. Please fill macros manually, then tap Add again.";
      return;
    }

    const id = `manual_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const newFood = {
      id,
      name,
      category: "Fruits & Vegetables",
      servingSize,
      kcals,
      protein,
      carbs,
      fats,
      fiber,
      preset: false
    };
    foods.push(newFood);
    saveFoods();
    populateCategoryFilter();
    renderFoodTable();

    weekPlan[currentDay][mealKey].push({
      foodId: id,
      mode: "grams",
      qty: parseFloat(servingSize.match(/(\d+(\.\d+)?)/)?.[1] || "100")
    });
    saveWeek();
    renderMeals();
    updateProgress();
    status.textContent = "Added with nutrition.";
  };

  return panel;
}

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
  subtotal.textContent = `${sub.kcals.toFixed(0)} kcals • P ${sub.protein.toFixed(
    1
  )} • C ${sub.carbs.toFixed(1)} • F ${sub.fats.toFixed(1)} • Fiber ${sub.fiber.toFixed(1)}`;

  header.appendChild(title);
  header.appendChild(subtotal);

  const body = document.createElement("div");
  body.className = "meal-body";

  const addPanel = createAddFoodPanel(meal.key);
  body.appendChild(addPanel);

  const wrapper = document.createElement("div");
  wrapper.className = "meal-table-wrapper";

  const table = document.createElement("table");
  table.className = "meal-table";

  const thead = document.createElement("thead");
  thead.innerHTML = `
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
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  const entries = weekPlan[currentDay][meal.key];
  entries.forEach((entry, idx) => {
    const food = foods.find((f) => f.id === entry.foodId);
    const macros = computeRowMacros(entry, food);

    const tr = document.createElement("tr");

    const tdFood = document.createElement("td");
    tdFood.textContent = food ? food.name : "Unknown";

    const tdMode = document.createElement("td");
    const modeSelect = document.createElement("select");
    modeSelect.innerHTML = `
      <option value="grams">Grams</option>
      <option value="servings">Servings</option>
    `;
    modeSelect.value = entry.mode || "grams";
    modeSelect.dataset.meal = meal.key;
    modeSelect.dataset.index = idx;
    tdMode.appendChild(modeSelect);

    const tdQty = document.createElement("td");
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.step = "1";
    qtyInput.min = "0";
    qtyInput.value = entry.qty || 0;
    qtyInput.dataset.meal = meal.key;
    qtyInput.dataset.index = idx;
    tdQty.appendChild(qtyInput);

    const tdK = document.createElement("td");
    tdK.textContent = macros.kcals.toFixed(1);
    const tdP = document.createElement("td");
    tdP.textContent = macros.protein.toFixed(1);
    const tdC = document.createElement("td");
    tdC.textContent = macros.carbs.toFixed(1);
    const tdF = document.createElement("td");
    tdF.textContent = macros.fats.toFixed(1);
    const tdFi = document.createElement("td");
    tdFi.textContent = macros.fiber.toFixed(1);

    const tdRemove = document.createElement("td");
    const rmBtn = document.createElement("button");
    rmBtn.textContent = "✕";
    rmBtn.className = "btn-secondary";
    rmBtn.style.fontSize = "0.7rem";
    rmBtn.dataset.meal = meal.key;
    rmBtn.dataset.index = idx;
    tdRemove.appendChild(rmBtn);

    tr.appendChild(tdFood);
    tr.appendChild(tdMode);
    tr.appendChild(tdQty);
    tr.appendChild(tdK);
    tr.appendChild(tdP);
    tr.appendChild(tdC);
    tr.appendChild(tdF);
    tr.appendChild(tdFi);
    tr.appendChild(tdRemove);

    tbody.appendChild(tr);

    modeSelect.onchange = (e) => {
      const mKey = e.target.dataset.meal;
      const i = parseInt(e.target.dataset.index, 10);
      weekPlan[currentDay][mKey][i].mode = e.target.value;
      saveWeek();
      updateRowAndMealSubtotal(mKey, i, tr, subtotal);
      updateProgress();
    };

    qtyInput.oninput = (e) => {
      const mKey = e.target.dataset.meal;
      const i = parseInt(e.target.dataset.index, 10);
      const val = parseFloat(e.target.value) || 0;
      weekPlan[currentDay][mKey][i].qty = val;
      saveWeek();
      updateRowAndMealSubtotal(mKey, i, tr, subtotal);
      updateProgress();
    };

    rmBtn.onclick = () => {
      const mKey = rmBtn.dataset.meal;
      const i = parseInt(rmBtn.dataset.index, 10);
      weekPlan[currentDay][mKey].splice(i, 1);
      saveWeek();
      renderMeals();
      updateProgress();
    };
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);
  body.appendChild(wrapper);

  section.appendChild(header);
  section.appendChild(body);

  header.onclick = () => {
    const isExpanded = section.classList.contains("expanded");
    mealsContainerEl.querySelectorAll(".meal-section").forEach((sec) => {
      sec.classList.remove("expanded");
    });
    if (!isExpanded) {
      section.classList.add("expanded");
      updateStickyMealHeader(meal.key, section);
    } else {
      hideStickyMealHeader();
    }
  };

  return section;
}

function updateRowAndMealSubtotal(mealKey, index, rowEl, subtotalEl) {
  const entry = weekPlan[currentDay][mealKey][index];
  const food = foods.find((f) => f.id === entry.foodId);
  const macros = computeRowMacros(entry, food);

  const cells = rowEl.children;
  cells[3].textContent = macros.kcals.toFixed(1);
  cells[4].textContent = macros.protein.toFixed(1);
  cells[5].textContent = macros.carbs.toFixed(1);
  cells[6].textContent = macros.fats.toFixed(1);
  cells[7].textContent = macros.fiber.toFixed(1);

  const sub = computeMealSubtotal(currentDay, mealKey);
  subtotalEl.textContent = `${sub.kcals.toFixed(0)} kcals • P ${sub.protein.toFixed(
    1
  )} • C ${sub.carbs.toFixed(1)} • F ${sub.fats.toFixed(1)} • Fiber ${sub.fiber.toFixed(1)}`;
}

function renderMeals() {
  mealsContainerEl.innerHTML = "";
  MEALS.forEach((meal) => {
    const section = createMealSection(meal);
    mealsContainerEl.appendChild(section);
  });

  const firstSection = mealsContainerEl.querySelector(".meal-section");
  if (firstSection) {
    firstSection.classList.add("expanded");
    updateStickyMealHeader("breakfast", firstSection);
  }
}

// ---------- STICKY & AUTO-COLLAPSE LOGIC ----------

function updateStickyMealHeader(mealKey) {
  const meal = MEALS.find((m) => m.key === mealKey);
  if (!meal) return;

  const sub = computeMealSubtotal(currentDay, mealKey);
  stickyMealHeaderEl.innerHTML = `
    <div class="sticky-meal-title">${meal.label}</div>
    <div class="sticky-meal-subtotal">
      ${sub.kcals.toFixed(0)} kcals • P ${sub.protein.toFixed(
    1
  )} • C ${sub.carbs.toFixed(1)} • F ${sub.fats.toFixed(1)} • Fiber ${sub.fiber.toFixed(1)}
    </div>
  `;
  stickyMealHeaderEl.classList.add("visible");
}

function hideStickyMealHeader() {
  stickyMealHeaderEl.classList.remove("visible");
}

function handleMealScroll() {
  const sections = Array.from(mealsContainerEl.querySelectorAll(".meal-section"));
  if (!sections.length) return;

  const containerRect = mealScrollContainerEl.getBoundingClientRect();

  let currentStickySection = null;
  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    const headerHeight = stickyMealHeaderEl.offsetHeight || 0;
    const headerTop = rect.top - containerRect.top;

    if (headerTop <= headerHeight + 8 && headerTop + rect.height > headerHeight + 8) {
      currentStickySection = sec;
    }
  });

  if (currentStickySection) {
    const mealKey = currentStickySection.dataset.mealKey;
    sections.forEach((sec) => {
      if (sec === currentStickySection) {
        sec.classList.add("expanded");
      } else {
        sec.classList.remove("expanded");
      }
    });
    updateStickyMealHeader(mealKey);
  } else {
    hideStickyMealHeader();
  }

  const plannerRect = mealScrollContainerEl.getBoundingClientRect();
  if (plannerRect.top <= 0) {
    dayTabsWrapperEl.classList.add("sticky");
  } else {
    dayTabsWrapperEl.classList.remove("sticky");
  }
}

// ---------- PROGRESS ----------

function updateProgress() {
  const totals = computeDayTotals(currentDay);

  document.getElementById("progEnergy").textContent = totals.kcals.toFixed(0);
  document.getElementById("progProtein").textContent = totals.protein.toFixed(1);
  document.getElementById("progCarbs").textContent = totals.carbs.toFixed(1);
  document.getElementById("progFats").textContent = totals.fats.toFixed(1);
  document.getElementById("progFiber").textContent = totals.fiber.toFixed(1);

  document.getElementById("tgtEnergy").textContent = targets.energy;
  document.getElementById("tgtProtein").textContent = targets.protein;
  document.getElementById("tgtCarbs").textContent = targets.carbs;
  document.getElementById("tgtFats").textContent = targets.fats;
  document.getElementById("tgtFiber").textContent = targets.fiber;
}

// ---------- FOOD DATABASE ----------

const categoryFilterEl = document.getElementById("categoryFilter");
const foodTableBodyEl = document.getElementById("foodTableBody");

function populateCategoryFilter() {
  const cats = Array.from(new Set(foods.map((f) => f.category))).sort();
  categoryFilterEl.innerHTML = `<option value="all">All</option>`;
  cats.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    categoryFilterEl.appendChild(opt);
  });
}

function renderFoodTable() {
  const filter = categoryFilterEl.value || "all";
  foodTableBodyEl.innerHTML = "";

  foods
    .filter((f) => filter === "all" || f.category === filter)
    .forEach((f) => {
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
          foods = foods.filter((x) => x.id !== f.id);
          saveFoods();
          populateCategoryFilter();
          renderFoodTable();
        };
        rmCell.appendChild(btn);
      } else {
        rmCell.textContent = "-";
      }
      foodTableBodyEl.appendChild(tr);
    });
}

// ---------- SEARCH (Open Food Facts) ----------

const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");
const searchResultsBodyEl = document.getElementById("searchResultsBody");

async function searchOpenFoodFacts(query) {
  searchResultsBodyEl.innerHTML = "";
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
      const nutriments = p.nutriments || {};
      const kcals = nutriments["energy-kcal_100g"] || 0;
      const protein = nutriments["proteins_100g"] || 0;
      const carbs = nutriments["carbohydrates_100g"] || 0;
      const fats = nutriments["fat_100g"] || 0;
      const fiber = nutriments["fiber_100g"] || 0;

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

      searchResultsBodyEl.appendChild(tr);
    });
  } catch (e) {
    console.error("Search failed", e);
  }
}

// ---------- CUSTOM FOOD FORM ----------

const customFoodFormEl = document.getElementById("customFoodForm");
const customNameEl = document.getElementById("customName");
const customCategoryEl = document.getElementById("customCategory");
const customServingSizeEl = document.getElementById("customServingSize");
const customKcalsEl = document.getElementById("customKcals");
const customProteinEl = document.getElementById("customProtein");
const customCarbsEl = document.getElementById("customCarbs");
const customFatsEl = document.getElementById("customFats");
const customFiberEl = document.getElementById("customFiber");

customFoodFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = `custom_${Date.now()}`;
  foods.push({
    id,
    name: customNameEl.value.trim(),
    category: customCategoryEl.value,
    servingSize: customServingSizeEl.value.trim(),
    kcals: parseFloat(customKcalsEl.value) || 0,
    protein: parseFloat(customProteinEl.value) || 0,
    carbs: parseFloat(customCarbsEl.value) || 0,
    fats: parseFloat(customFatsEl.value) || 0,
    fiber: parseFloat(customFiberEl.value) || 0,
    preset: false
  });
  saveFoods();
  populateCategoryFilter();
  renderFoodTable();
  customFoodFormEl.reset();
});

// ---------- EXPORT TO EXCEL ----------

const exportBtnEl = document.getElementById("exportExcelBtn");

function exportWeekToExcel() {
  const rows = [];
  rows.push([
    "Day",
    "Meal",
    "Food",
    "Mode",
    "Qty",
    "Kcals",
    "Protein",
    "Carbs",
    "Fats",
    "Fiber"
  ]);

  DAYS.forEach((day) => {
    MEALS.forEach((meal) => {
      weekPlan[day][meal.key].forEach((entry) => {
        const food = foods.find((f) => f.id === entry.foodId);
        const macros = computeRowMacros(entry, food);
        rows.push([
          day,
          meal.label,
          food ? food.name : "Unknown",
          entry.mode,
          entry.qty,
          macros.kcals.toFixed(1),
          macros.protein.toFixed(1),
          macros.carbs.toFixed(1),
          macros.fats.toFixed(1),
          macros.fiber.toFixed(1)
        ]);
      });
    });
  });

  rows.push([]);
  rows.push([
    "Day",
    "Energy",
    "Protein",
    "Carbs",
    "Fats",
    "Fiber",
    "Target Energy",
    "Target Protein",
    "Target Carbs",
    "Target Fats",
    "Target Fiber"
  ]);
  DAYS.forEach((day) => {
    const totals = computeDayTotals(day);
    rows.push([
      day,
      totals.kcals.toFixed(0),
      totals.protein.toFixed(1),
      totals.carbs.toFixed(1),
      totals.fats.toFixed(1),
      totals.fiber.toFixed(1),
      targets.energy,
      targets.protein,
      targets.carbs,
      targets.fats,
      targets.fiber
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Week Plan");
  XLSX.writeFile(wb, "week_meal_plan.xlsx");
}

// ---------- INIT ----------

function init() {
  initPresetFoods();
  loadState();

  populateCategoryFilter();
  renderFoodTable();
  renderDayTabs();
  renderMeals();
  updateProgress();

  mealScrollContainerEl.addEventListener("scroll", handleMealScroll);
  window.addEventListener("scroll", handleMealScroll);

  categoryFilterEl.addEventListener("change", renderFoodTable);

  searchBtnEl.addEventListener("click", () => {
    searchOpenFoodFacts(searchInputEl.value.trim());
  });

  exportBtnEl.addEventListener("click", exportWeekToExcel);
}

document.addEventListener("DOMContentLoaded", init);
