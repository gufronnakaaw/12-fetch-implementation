// author: @gufronnakaaw
// date: 02-02-2021

const idMovies = getUrlVars('id');

window.onload = async function() {
    
    try {
        
        const movie = await getMovieById(idMovies);
        renderCard(movie);

    } catch(err){

        console.log(err);
        showError(err);
    
    }
}

// show error
function showError(error){

    const alert = `<div class="alert alert-danger mx-3 text-center" role="alert" style="width: 100%;">${error}</div>`;

    document.querySelector('.container').innerHTML = alert;

}

// get movie by id
function getMovieById(id) {
    
    document.querySelector('.loading').style.display = "inline-block";
    let url = `https://www.omdbapi.com/?apikey=bbea4df6&i=${id}`;

    return fetch(url).finally(() => {
        document.querySelector('.loading').style.display = "none";
    }).then(response => {

        if( response.status === 200 ){
            return response.json();
        } else {
            throw new Error(response.statusText);
        }

    }).then(result => {

        if( result.Response === 'True' ){
            return result;
        } else {
            throw new Error(result.Error);
        }

    });

}

// render card
function renderCard(movie) {

    let card = `<div class="card" style="width: auto">
                    <img src="${movie.Poster}" class="card-img-top" alt="${( movie.Poster === 'N/A' ? movie.Title : '')}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-3 text-muted">Released: ${movie.Released}</h6>
                        <h6 class="card-subtitle mb-3 text-muted">Director: ${movie.Director}</h6>
                        <h6 class="card-subtitle mb-3 text-muted">Country: ${movie.Country}</h6>
                        <h6 class="card-subtitle mb-3 text-muted">Runtime: ${movie.Runtime}</h6>
                        <h6 class="card-subtitle mb-3 text-muted">Actors: ${movie.Actors}</h6>
                        <h6 class="card-subtitle mb-3 text-muted">Genre: ${movie.Genre}</h6>
                        <p class="card-text my-4">${movie.Plot}</p>
                        <div class="text-center">
                            <a href="index.html" class="btn btn-primary">Back</a>
                        </div>
                    </div>
                </div>`;

    document.querySelector('.container .row .column-movie').innerHTML = card;
}

// get url
function getUrlVars(param = null) {
	if(param !== null) {
		var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        
		for(var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
        }
        
		return vars[param];
    }
     
	else {
		return null;
	}
}