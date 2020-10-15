const searchField = document.querySelector('.search__field');
const resultsList = document.querySelector('.results__list');
const searchBtn = document.querySelector(".search__btn");
// const resultsPages = document.querySelector(".results__pages");
const recipe = document.querySelector(".recipe");

// results pages - each item should be clickable - must append the recipe no. into the URL
// once appended, display recipe into the "recipe" panel 

let pickMe = (target) => {
    console.log(target.getAttribute("recipe_id"));
    let chosenRecipeId = target.getAttribute("recipe_id");
    let dataRecipe = axios.get('https://forkify-api.herokuapp.com/api/get?rId=' + chosenRecipeId)
        .then(function (response) {
            console.log(response.data.recipe)
            let item = response.data.recipe; 
            let recipeTemplate = 
            `<div class="recipe">

            <figure class="recipe__fig">
                <img src="img/test-1.jpg" alt="Tomato" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${item.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">45</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">4</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
                </div>

                <div class="recipe__ingredients">
                    <ul class="recipe__ingredient-list">
                        <li class="recipe__item">
                            <svg class="recipe__icon">
                                <use href="img/icons.svg#icon-check"></use>
                            </svg>
                            <div class="recipe__count">1000</div>
                            <div class="recipe__ingredient">
                                <span class="recipe__unit">g</span>
                                pasta
                            </div>
                        </li>
                        <li class="recipe__item">
                            <svg class="recipe__icon">
                                <use href="img/icons.svg#icon-check"></use>
                            </svg>
                            <div class="recipe__count">1/2</div>
                            <div class="recipe__ingredient">
                                <span class="recipe__unit">cup</span>
                                ricotta cheese
                            </div>
                        </li>

                        <li class="recipe__item">
                            <svg class="recipe__icon">
                                <use href="img/icons.svg#icon-check"></use>
                            </svg>
                            <div class="recipe__count">1</div>
                            <div class="recipe__ingredient">
                                <span class="recipe__unit"></span>
                                can of tomatoes, whole or crushed
                            </div>
                        </li>


                        <li class="recipe__item">
                            <svg class="recipe__icon">
                                <use href="img/icons.svg#icon-check"></use>
                            </svg>
                            <div class="recipe__count">1</div>
                            <div class="recipe__ingredient">
                                <span class="recipe__unit"></span>
                                can tuna packed in olive oil
                            </div>
                        </li>

                        <li class="recipe__item">
                            <svg class="recipe__icon">
                                <use href="img/icons.svg#icon-check"></use>
                            </svg>
                            <div class="recipe__count">1/2</div>
                            <div class="recipe__ingredient">
                                <span class="recipe__unit">cup</span>
                                grated parmesan cheese
                            </div>
                        </li>

                        <li class="recipe__item">
                            <svg class="recipe__icon">
                                <use href="img/icons.svg#icon-check"></use>
                            </svg>
                            <div class="recipe__count">1/4</div>
                            <div class="recipe__ingredient">
                                <span class="recipe__unit">cup</span>
                                fresh basil, chopped or torn
                            </div>
                        </li>
                    </ul>

                    <button class="btn-small recipe__btn">
                        <svg class="search__icon">
                            <use href="img/icons.svg#icon-shopping-cart"></use>
                        </svg>
                        <span>Add to shopping list</span>
                    </button>
                </div>

                <div class="recipe__directions">
                    <h2 class="heading-2">How to cook it</h2>
                    <p class="recipe__directions-text">
                        This recipe was carefully designed and tested by
                        <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
                    </p>
                    <a class="btn-small recipe__btn" href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/" target="_blank">
                        <span>Directions</span>
                        <svg class="search__icon">
                            <use href="img/icons.svg#icon-triangle-right"></use>
                        </svg>

                    </a>
                </div>
            </div>`
                recipe.innerHTML = recipeTemplate;
        })
}

(() => {
    let url = document.URL;
    console.log(url);
    let tokens = url.split('?');
    console.log(tokens);
    if (tokens[1]){
        let tokensB = tokens[1].split('=');

        let queryStr = tokensB[1];
        let query = encodeURIComponent(queryStr);
        console.log(query);
        let data = axios.get('https://forkify-api.herokuapp.com/api/search?q=' + query)
            .then(function (response) {
                console.log(response.data.recipes);
                let items = response.data.recipes;
                for (let i = 0; i < items.length; i++) {
                    let liTemplate = 
                    `<li recipe_id="${items[i].recipe_id}" onclick="pickMe(this)">
                        <a class="results__link results__link--active" href="javascript:void(0);">
                            <figure class="results__fig">
                                <img src="${items[i].image_url}" alt="Test">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${items[i].title}</h4>
                                <p class="results__author">${items[i].publisher}</p>
                            </div>
                        </a>
                    </li>`
                    {/* let liTemplate = '<li>' + items[i].recipe_id + ' | ' + items[i].title + ' | '+ 
                    '<img class="small-img" src="' + items[i].image_url + '"/>' + '<button>PICK ME</button>' + '</li>'; */}
                    resultsList.innerHTML += liTemplate;
                }
            })
            // let tokensC = tokensB[1].split('#');
            // let queryId = tokensC[1];
            // let queryTwo = encodeURIComponent(queryId);
            // console.log(queryTwo);
            // let dataTwo = axios.get('https://forkify-api.herokuapp.com/api/search?q=' + queryOne + queryTwo)
            //     .then(function (response) {
            //         console.log(response.dataTwo.recipes);
            //         let itemsTwo = response.dataTwo.recipes;
            //         for (let j = 0; j < itemsTwo.length; j++) {
            //             let liTemplateResults = `<button class="btn-inline results__btn--prev">
            //             <svg class="search__icon">
            //                 <use href="img/icons.svg#icon-triangle-left"></use>
            //             </svg>
            //             <span>Page 1</span>
            //         </button>
            //         <button class="btn-inline results__btn--next">
            //             <span>Page 3</span>
            //             <svg class="search__icon">
            //                 <use href="img/icons.svg#icon-triangle-right"></use>
            //             </svg>
            //         </button>`
            //         }
            //     })       
            // another axios.get for the #id from tokensB
        }
})();


// searchBtn.addEventListener('click', e =>{
//     console.log(searchField.value)
    // let searchQuery = async (searchStr) => {
    //     let data = await axios.get('https://forkify-api.herokuapp.com/api/search?q=' + searchStr)
    //     .then(function (response) {
    //         console.log(response);
    //     let searchItems = response.data.recipes;
    //     for (let i = 0; i < items.length; i++) {
    //         // dirty approach:
    //         let liTemplate = '<li>' + items[i].recipe_id + ' | ' + items[i].title + ' | '+ 
    //         '<img class="small-img" src="' + items[i].image_url + '"/>' + '<button>PICK ME</button>' + '</li>';

    //         // formal approach:
    //         // let li = document.createElement();

    //         searchResult.innerHTML += liTemplate;
    //     }
    //     return response;
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    //     return data; 
    // }
    // let res = searchQuery('pizza').then((response) => {
    //     console.log(response);
    // })
// })