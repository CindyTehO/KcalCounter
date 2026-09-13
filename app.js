/* FULL JS — trimmed comments for clarity */

const DAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MEALS=[
  {key:"breakfast",label:"Breakfast"},
  {key:"lunch",label:"Lunch"},
  {key:"dinner",label:"Dinner"},
  {key:"snack",label:"Snack / Post-Workout"}
];

let foods=[];
let weekPlan={};
let currentDay="Mon";

function initPresetFoods(){
  foods=[
    {id:"chicken_leg",name:"Skinless boneless chicken leg",category:"Poultry & Meats",servingSize:"100g",kcals:180,protein:23,carbs:0,fats:9,fiber:0,preset:true},
    {id:"chobani_light",name:"Chobani plain light yogurt",category:"Dairy & Eggs",servingSize:"170g cup",kcals:102,protein:17,carbs:6,fats:0.8,fiber:0,preset:true},
    {id:"rolled_oats",name:"Rolled oats",category:"Grains & Starches",servingSize:"40g dry",kcals:152,protein:5.2,carbs:26.8,fats:2.8,fiber:4,preset:true},
    {id:"blueberries",name:"Blueberries",category:"Fruits & Vegetables",servingSize:"80g",kcals:45.6,protein:0.6,carbs:11.6,fats:0.2,fiber:1.9,preset:true}
  ];
}

function loadState(){
  const f=JSON.parse(localStorage.getItem("cm_foods"));
  const w=JSON.parse(localStorage.getItem("cm_weekPlan"));
  if(f) foods=f;
  if(w) weekPlan=w;
  if(!weekPlan || Object.keys(weekPlan).length===0){
    weekPlan={};
    DAYS.forEach(d=>{
      weekPlan[d]={};
      MEALS.forEach(m=>weekPlan[d][m.key]=[]);
    });
  }
}

function saveFoods(){localStorage.setItem("cm_foods",JSON.stringify(foods));}
function saveWeek(){localStorage.setItem("cm_weekPlan",JSON.stringify(weekPlan));}

function computeRowMacros(entry,food){
  if(!food) return {kcals:0,protein:0,carbs:0,fats:0,fiber:0};
  const qty=entry.qty||0;
  const base=parseFloat(food.servingSize)||100;
  const factor=entry.mode==="grams"?qty/base:qty;
  return {
    kcals:food.kcals*factor,
    protein:food.protein*factor,
    carbs:food.carbs*factor,
    fats:food.fats*factor,
    fiber:food.fiber*factor
  };
}

function computeMealSubtotal(day,mealKey){
  return weekPlan[day][mealKey].reduce((acc,e)=>{
    const f=foods.find(x=>x.id===e.foodId);
    const m=computeRowMacros(e,f);
    acc.kcals+=m.kcals;
    acc.protein+=m.protein;
    acc.carbs+=m.carbs;
    acc.fats+=m.fats;
    acc.fiber+=m.fiber;
    return acc;
  },{kcals:0,protein:0,carbs:0,fats:0,fiber:0});
}

function updateProgress(){
  const t=computeMealSubtotal(currentDay,"breakfast");
  const totals=MEALS.reduce((acc,m)=>{
    const s=computeMealSubtotal(currentDay,m.key);
    acc.kcals+=s.kcals;
    acc.protein+=s.protein;
    acc.carbs+=s.carbs;
    acc.fats+=s.fats;
    acc.fiber+=s.fiber;
    return acc;
  },{kcals:0,protein:0,carbs:0,fats:0,fiber:0});

  document.getElementById("progEnergy").textContent=totals.kcals.toFixed(0);
  document.getElementById("progProtein").textContent=totals.protein.toFixed(1);
  document.getElementById("progCarbs").textContent=totals.carbs.toFixed(1);
  document.getElementById("progFats").textContent=totals.fats.toFixed(1);
  document.getElementById("progFiber").textContent=totals.fiber.toFixed(1);

  document.getElementById("tgtEnergy").textContent=1700;
  document.getElementById("tgtProtein").textContent=120;
  document.getElementById("tgtCarbs").textContent=175;
  document.getElementById("tgtFats").textContent=50;
  document.getElementById("tgtFiber").textContent=25;
}

function createAddFoodPanel(mealKey){
  const panel=document.createElement("div");
  panel.className="add-food-panel";

  panel.innerHTML=`
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
      <div><label>Kcals</label><input type="number" class="manualKcals"></div>
