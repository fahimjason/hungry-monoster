// search event handler
document.getElementById('search').addEventListener('click', function () {
    const mealName = document.getElementById('meal-item').value;
    loadData(mealName);

    document.getElementById('meal-item').value = "";
})


//call api and load data
function loadData(mealItem) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealItem}`)
        .then(res => res.json())
        .then(data => {
            showFood(data.meals)
        })
        .catch(e => {
            document.getElementById('error-message').innerText = "Something was wrong, please try again later...";
        });
}


// show data on search
const showFood = foodItems => {
    const itemsDiv = document.getElementById('items');
    foodItems.forEach(element => {
        const meals = document.createElement('div');
        meals.className = "meals-info";
        const mealInfo = `
            <div onclick="showDetails('${element.strMealThumb}', '${element.strMeal}', '${element.strMeasure1}', '${element.strMeasure2}', '${element.strMeasure3}', '${element.strMeasure4}', '${element.strMeasure5}', '${element.strMeasure6}');">
                <img src="${element.strMealThumb}">
                <h4 class="pt-3">${element.strMeal}</h4>
                <h5 class="pb-3">${element.strArea}</h5>
            </div>
            `;
        meals.innerHTML = mealInfo;
        itemsDiv.appendChild(meals);
    });
}


// show  details in modal event handler
const showDetails = (strMealThumb, strMeal, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6) => {
    const modal = document.getElementById('modalMain');
    const modalDiv = document.createElement('div');
    const mealDetails = `
    <img src="${strMealThumb + '/preview'}">
    <h2>${strMeal}</h2>
    <h5>Ingredients</h5>
    <ul>
        <li>${strMeasure1}</li>
        <li>${strMeasure2}</li>
        <li>${strMeasure3}</li>
        <li>${strMeasure4}</li>
        <li>${strMeasure5}</li>
        <li>${strMeasure6}</li>
    </ul>
    `;
    modalDiv.innerHTML = mealDetails;
    console.log(mealDetails);
    modal.appendChild(modalDiv);

    const modalDisplay = document.getElementById('myModal');
    modalDisplay.style.display = 'block';
}


// close modal
document.getElementById('close').addEventListener('click', () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
})



