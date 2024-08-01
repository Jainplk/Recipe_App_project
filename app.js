const searchBtn = document.querySelector(".searchBtn");
const searchBox = document.querySelector(".checkBox");
const recipeContainer = document.querySelector(".recipe-container");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const recipeDetailContent = document.querySelector(".recipe-detail-content")

const fetchRecipes = async (recipes) => {
    recipeContainer.innerHTML = "Fetching Recepies....."
    try{
      const data = await fetch(
        `http://www.themealdb.com/api/json/v1/1/search.php?s=${recipes}`, {
          referrerPolicy : "unsafe-url"
        }
      );
      const response = await data.json();
    
      recipeContainer.innerHTML = "";
      response.meals.forEach((meal) => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
                                    <h3>${meal.strMeal} </h3>
                                    <p><span>${meal.strArea}</span> Dish</p>
                                    <p>Belongs to <span>${meal.strCategory}</span> Category</p>`;
    
        const button = document.createElement("button");
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button)
    
        button.addEventListener("click",()=>{
          openRecipePopup(meal);
        })
    
        recipeContainer.appendChild(recipeDiv);
      });
    } catch (e) {
       recipeContainer.innerHTML = "Error in Fetching Recepies....."
    }
  
};

const fetchIngredents = (meal) => {
  let ingreList = "";
  for(let i=1; i<=20; i++){
    const ingredent = meal[`strIngrediant${i}`];
    if(ingredent){
      const measure = meal[`strMeasure${i}`];
      ingreList += `<li>${measure} ${ingredent}</li>`
    } else{
      break;
    }
  }
  return ingreList;
}


const openRecipePopup = (meal) => {
  recipeDetailContent.innerHTML = `
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredents:</h3>
  <ul class="ingredientList">${fetchIngredents(meal)}</ul>
  <div>
    <h3 class="recipeInstruction">Instructions:</h3>
    <p >${meal.strInstructions}</p>
  </div>
  `
  
  recipeDetailContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener("click", ()=>{
  recipeDetailContent.parentElement.style.display = "none";
})

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const searchInput = searchBox.value.trim();
  if(!searchInput){
    recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`
    return;
  }
  fetchRecipes(searchInput);
});
