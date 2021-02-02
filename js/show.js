const idMovies = getUrlVars('id');
const search = getUrlVars('search');

if( idMovies !== undefined ){
    document.querySelector('.loading').style.display = "inline-block";

    let url = `http://www.omdbapi.com/?apikey=bbea4df6&i=${idMovies}`;

    fetch(url).finally(() => {
        document.querySelector('.loading').style.display = "none";
    }).then(response => response.json()).then(result => {

        let card = `<div class="card" style="width: auto">
                    <img src="${result.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${result.Title}</h5>
                        <h6 class="card-subtitle mb-3 text-muted">Released: ${result.Released}</h6>
                        <h6 class="card-subtitle mb-3 text-muted">Director: ${result.Director}</h6>
                        <h6 class="card-subtitle mb-3 text-muted">Country: ${result.Country}</h6>
                        <h6 class="card-subtitle mb-3 text-muted">Runtime: ${result.Runtime}</h6>
                        <h6 class="card-subtitle mb-3 text-muted">Actors: ${result.Actors}</h6>
                        <h6 class="card-subtitle mb-3 text-muted">Genre: ${result.Genre}</h6>
                        <p class="card-text my-4">${result.Plot}</p>
                        <div class="text-center">
                            <a href="index.html?search=${search}" class="btn btn-primary">Back</a>
                        </div>
                    </div>
                </div>`;

        document.querySelector('.container .row .column-movie').innerHTML = card;
    });
}

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