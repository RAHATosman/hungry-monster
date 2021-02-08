const searchBtn = document.getElementById('search-btn');
const mealsList = document.getElementById('meal');
const mealsDetailsContent = document.querySelector('.meals-details-content');
const recipesCloseBtn = document.getElementById('recipes-close-btn');

searchBtn.addEventListener('click', getMealsList);
mealsList.addEventListener('click', getMealsRecipe);
recipesCloseBtn.addEventListener('click', () => {
    mealsDetailsContent.parentElement.classList.remove('showRecipe');
});
function getMealsList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `                
                <div class = "meal-item" data-id = "${meal.idMeal}">
                    <div class = "meal-img">
                        <img src = "${meal.strMealThumb}" alt = "food">
                    </div>
                    <div class = "meal-name">
                        <h3>${meal.strMeal}</h3>
                    <a href = "#" class = "recipe-btn">Get Recipe</a>
                    </div>
            </div>

                `;
                });
                mealsList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealsList.classList.add('notFound');
            }
            mealsList.innerHTML = html;
        });
}
function getMealsRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealsModal(data.meals));
    }
}
function mealsModal(meal) {
    meal = meal[0];
    let html = `
          
    <div class = "meal-img detels-img ">
        <img  src = "${meal.strMealThumb}" alt = "food">
    </div>
    <div class = "meal-name">
        <h3 >${meal.strMeal}</h3>
        <h4>${meal.strIngredient1}</h4>
        <h4>${meal.strIngredient2}</h4>
        <h4>${meal.strIngredient3}</h4>
        <h4>${meal.strIngredient4}</h4>
        <h4>${meal.strIngredient5}</h4>
        <h4>${meal.strIngredient6}</h4>
        <h4>${meal.strIngredient7}</h4>
        <h4>${meal.strIngredient8}</h4>
        <h4>${meal.strIngredient9}</h4>
    
    </div>
</div>
     
    `;
    mealsDetailsContent.innerHTML = html;
    mealsDetailsContent.parentElement.classList.add('showRecipe');
}