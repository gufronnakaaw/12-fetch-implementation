// author: @gufronnakaaw
// date: 02-02-2021

const inputSearch = document.querySelector('.input-search');

document.querySelector('.btn-search').addEventListener('click', async function(){
    
    if( inputSearch.value === '' ){
        showError('Error: Can not be empty!');
        return;
    }

    try {

        const movies = await getMovies(inputSearch.value);
        renderCards(movies);

    } catch(err){

        console.log(err);
        showError(err);
        
    }

});

document.addEventListener('click', function(e) {

    if( e.target.classList.contains('btn-show') ){

        if( inputSearch.value !== '' ){
            showDetails(e.target.dataset.omdbid, inputSearch.value);
        } else {
            showDetails(e.target.dataset.omdbid, getWithExpiry('search'));
        }
        
    }

});

window.onload = async function() {

    if( getWithExpiry('search') ){
        inputSearch.value = getWithExpiry('search');

        try {
            
            const movies = await getMovies(getWithExpiry('search'));
            renderCards(movies);

        } catch (err) {

            console.log(err);
            showError(err);
            
        }

    }
    
}


// all function
// get movies
function getMovies(keyword) {

    document.querySelector('.loading').style.display = "inline-block";

    let url = `https://www.omdbapi.com/?apikey=bbea4df6&s=${keyword}`;

    return fetch(url).finally(() => {
        document.querySelector('.loading').style.display = "none";
    })
    .then(response => {

        if( response.status === 200 ){
            return response.json();
        } else {
            throw new Error(response.statusText);
        }

    })
    .then(result => {

        if( result.Response === 'True' ){
            return result.Search;
        } else {
            throw new Error(result.Error);
        }

    });
    
}

// show details
function showDetails(id, keyword) {
    setWithExpiry('search', keyword, 50000);
    window.location.href = `show.html?id=${id}`;
}

// show cards
function renderCards(movies) {

    let cards = '';

    movies.forEach(el => {
        cards += `<div class="col-md-4 my-4" style="width: 18rem;">
                    <div class="card">
                        <img src="${el.Poster}" class="card-img-top" alt="${( el.Poster === 'N/A' ? el.Title : '')}">
                        <div class="card-body">
                            <h5 class="card-title">${el.Title}</h5>
                            <p class="card-text">${el.Year}</p>
                            <button class="btn btn-primary btn-show" data-omdbid="${el.imdbID}">Show Details</button>
                        </div>
                    </div>
                </div>`;    
    });
    
    document.querySelector('.container .row-movies').innerHTML = cards;
}

// show error
function showError(error){

    const alert = `<div class="alert alert-danger mx-3 text-center" role="alert" style="width: 100%;">${error}</div>`;

    document.querySelector('.container .row-movies').innerHTML = alert;

}

// set expire local storage
function setWithExpiry(key, value, ttl) {
    const now = new Date()
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

// get expire
function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
        return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
        return null
    }
    return item.value
}