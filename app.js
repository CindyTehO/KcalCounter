const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MEALS = ["Breakfast","Lunch","Dinner","Snack"];
let currentDay = "Mon";

let foods = [
  { id:"chicken", name:"Chicken breast", serving:100, kcals:165, protein:31, carbs:0, fats:3.6, fiber:0 },
  { id:"oats", name:"Rolled oats", serving:40, kcals:152, protein:5.2, carbs:26.8, fats:2.8, fiber:4 }
];

let weekPlan = {};

function initWeek() {
  DAYS.forEach(d => {
    weekPlan[d] = {};
    MEALS.forEach(m => weekPlan[d][m] = []);
  });
}

function renderDayTabs() {
  document.querySelectorAll("#dayTabs button").forEach(btn => {
    btn.onclick = () => {
      currentDay = btn.dataset.day;
      document.querySelectorAll("#dayTabs button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderMeals();
      updateProgress();
    };
  });
}

function renderMeals() {
  const container = document.getElementById("mealPlanner");
  container.innerHTML = "";

  MEALS.forEach(meal => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${meal}</h3>`;

    // Add food inputs
    div.innerHTML += `
      <input class="addName" placeholder="Food name" />
      <input class="addQty" placeholder="Qty (g)" type="number" />
      <button class="addBtn">Add</button>
      <table class="mealTable">
        <tr><th>Name</th><th>Qty</th><th>Kcals</th><th>P</th><th>C</th><th>F</th><th>Fiber</th><th>Remove</th></tr>
      </table>
    `;

    container.appendChild(div);

    const addBtn = div.querySelector(".addBtn");
    addBtn.onclick = () => {
      const name = div.querySelector(".addName").value.trim();
      const qty = parseFloat(div.querySelector(".addQty").value);

      if (!name || !qty) return;

      // Find food or create temporary
      let food = foods.find(f => f.name.toLowerCase() === name.toLowerCase());
      if (!food) {
        food = { id: Date.now(), name, serving:100, kcals:0, protein:0, carbs:0, fats:0, fiber:0 };
        foods.push(food);
      }

      weekPlan[currentDay][meal].push({ foodId: food.id, qty });
      renderMeals();
      updateProgress();
    };

    // Render table rows
    const table = div.querySelector(".mealTable");
    weekPlan[currentDay][meal].forEach(entry => {
      const food = foods.find(f => f.id === entry.foodId);
      const factor = entry.qty / food.serving;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${food.name}</td>
        <td>${entry.qty}</td>
        <td>${(food.kcals * factor).toFixed(1)}</td>
        <td>${(food.protein * factor).toFixed(1)}</td>
        <td>${(food.carbs * factor).toFixed(1)}</td>
        <td>${(food.fats * factor).toFixed(1)}</td>
        <td>${(food.fiber * factor).toFixed(1)}</td>
        <td><button class="rmBtn">X</button></td>
      `;

      tr.querySelector(".rmBtn").onclick = () => {
        weekPlan[currentDay][meal] = weekPlan[currentDay][meal].filter(e => e !== entry);
        renderMeals();
        updateProgress();
      };

      table.appendChild(tr);
    });
  });
}

function updateProgress() {
  let totals = { kcals:0, protein:0, carbs:0, fats:0, fiber:0 };

  MEALS.forEach(meal => {
    weekPlan[currentDay][meal].forEach(entry => {
      const food = foods.find(f => f.id === entry.foodId);
      const factor = entry.qty / food.serving;
      totals.kcals += food.kcals * factor;
      totals.protein += food.protein * factor;
      totals.carbs += food.carbs * factor;
      totals.fats += food.fats * factor;
      totals.fiber += food.fiber * factor;
    });
  });

  document.getElementById("progEnergy").textContent = totals.kcals.toFixed(0);
  document.getElementById("progProtein").textContent = totals.protein.toFixed(1);
  document.getElementById("progCarbs").textContent = totals.carbs.toFixed(1);
  document.getElementById("progFats").textContent = totals.fats.toFixed(1);
  document.getElementById("progFiber").textContent = totals.fiber.toFixed(1);
}

function renderFoodTable() {
  const table = document.getElementById("foodTable");
  table.innerHTML = `
    <tr><th>Name</th><th>Serving</th><th>Kcals</th><th>P</th><th>C</th><th>F</th><th>Fiber</th><th>Remove</th></tr>
  `;

  foods.forEach(f => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${f.name}</td>
      <td>${f.serving}</td>
      <td>${f.kcals}</td>
      <td>${f.protein}</td>
      <td>${f.carbs}</td>
      <td>${f.fats}</td>
      <td>${f.fiber}</td>
      <td><button class="rmFood">X</button></td>
    `;
    tr.querySelector(".rmFood").onclick = () => {
      foods = foods.filter(x => x !== f);
      renderFoodTable();
    };
    table.appendChild(tr);
  });
}

document.getElementById("searchBtn").onclick = async () => {
  const q = document.getElementById("searchInput").value.trim();
  if (!q) return;

  const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${q}&search_simple=1&action=process&json=1&page_size=5`);
  const data = await res.json();

  const table = document.getElementById("searchResults");
  table.innerHTML = `
    <tr><th>Name</th><th>Kcals</th><th>P</th><th>C</th><th>F</th><th>Fiber</th><th>Add</th></tr>
  `;

  (data.products || []).forEach((p, idx) => {
    const n = p.nutriments || {};
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.product_name || "Unknown"}</td>
      <td>${n["energy-kcal_100g"] || 0}</td>
      <td>${n["proteins_100g"] || 0}</td>
      <td>${n["carbohydrates_100g"] || 0}</td>
      <td>${n["fat_100g"] || 0}</td>
      <td>${n["fiber_100g"] || 0}</td>
      <td><button class="addDB">Add</button></td>
    `;
    tr.querySelector(".addDB").onclick = () => {
      foods.push({
        id: Date.now() + "_" + idx,
        name: p.product_name || "Unknown",
        serving: 100,
        kcals: n["energy-kcal_100g"] || 0,
        protein: n["proteins_100g"] || 0,
        carbs: n["carbohydrates_100g"] || 0,
        fats: n["fat_100g"] || 0,
        fiber: n["fiber_100g"] || 0
      });
      renderFoodTable();
    };
    table.appendChild(tr);
  });
};

document.getElementById("addCustomBtn").onclick = () => {
  foods.push({
    id: Date.now(),
    name: document.getElementById("customName").value.trim(),
    serving: parseFloat(document.getElementById("customServing").value),
    kcals: parseFloat(document.getElementById("customKcals").value),
    protein: parseFloat(document.getElementById("customProtein").value),
    carbs: parseFloat(document.getElementById("customCarbs").value),
    fats: parseFloat(document.getElementById("customFats").value),
    fiber: parseFloat(document.getElementById("customFiber").value)
  });
  renderFoodTable();
};

document.getElementById("exportBtn").onclick = () => {
  const rows = [["Day","Meal","Food","Qty","Kcals","P","C","F","Fiber"]];

  DAYS.forEach(day => {
    MEALS.forEach(meal => {
      weekPlan[day][meal].forEach(entry => {
        const food = foods.find(f => f.id === entry.foodId);
        const factor = entry.qty / food.serving;
        rows.push([
          day,
          meal,
          food.name,
          entry.qty,
          (food.kcals * factor).toFixed(1),
          (food.protein * factor).toFixed(1),
          (food.carbs * factor).toFixed(1),
          (food.fats * factor).toFixed(1),
          (food.fiber * factor).toFixed(1)
        ]);
      });
    });
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Week");
  XLSX.writeFile(wb, "week.xlsx");
};

initWeek();
renderDayTabs();
renderMeals();
renderFoodTable();
updateProgress();
