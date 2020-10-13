const searchField = document.querySelector('.search__field');
const resultsList = document.querySelector('.results__list');
const searchBtn = document.querySelector(".search__btn");

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
                    let liTemplate = `<li>
                        <a class="results__link results__link--active">
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