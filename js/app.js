document.querySelector('.btn-search').addEventListener('click', function(){

    const inputValue = document.querySelector('.input-search').value;

    if( inputValue === '' ){
        alert('can not be empty!');
        return;
    }

    document.querySelector('.loading').style.display = "inline-block";

    let url = `http://www.omdbapi.com/?apikey=bbea4df6&s=${inputValue}`;

    fetch(url).finally(() => {
        document.querySelector('.loading').style.display = "none";
    }).then(response => response.json()).then(result => {
        
        if( result.Response === "True" ) {
            
            let movies = result.Search;
            let cards = '';
    
            movies.forEach( el => {
                cards += `<div class="col-md-4 my-4" style="width: 18rem;">
                            <div class="card">
                                <img src="${el.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${el.Title}</h5>
                                    <p class="card-text">${el.Year}</p>
                                    <button class="btn btn-primary btn-show" data-omdbid="${el.imdbID}">Show Details</button>
                                </div>
                            </div>
                        </div>`;    
            });
            
            document.querySelector('.container .row-movies').innerHTML = cards;
            
            document.querySelectorAll('.btn-show').forEach(el => {
                el.addEventListener('click', function(){
                    const id = this.dataset.omdbid;
    
                    window.location.href = `show.html?id=${id}&search=${inputValue}`;
                });
            });

        } else {

            const alert = `
            <div class="alert alert-danger mx-3 text-center" role="alert" style="width: 100%;">
                ${result.Error}
            </div>`;

            document.querySelector('.container .row-movies').innerHTML = alert;

        }

    }).catch(err => {
        const alert = `
        <div class="alert alert-danger mx-3 text-center" role="alert" style="width: 100%;">
            ${err}, please check your internet connection!
        </div>`;

        document.querySelector('.container .row-movies').innerHTML = alert;
    });

    document.querySelector('.input-search').value = '';
});


const search = getUrlVars('search');

if( search !== undefined ){

    document.querySelector('.loading').style.display = "inline-block";

    let url = `http://www.omdbapi.com/?apikey=bbea4df6&s=${search}`;

    fetch(url).finally(() => {
        document.querySelector('.loading').style.display = "none";
    }).then(response => response.json()).then(result => {

        let movies = result.Search;
        let cards = '';

        movies.forEach(el => {
            cards += `<div class="col-md-4 my-4" style="width: 18rem;">
                        <div class="card text-center">
                            <img src="${el.Poster}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${el.Title}</h5>
                                <p class="card-text">${el.Year}</p>
                                <div class="text-center">
                                    <button class="btn btn-primary btn-show" data-omdbid="${el.imdbID}">Show Details</button>
                                </div>
                            </div>
                        </div>
                    </div>`;    
        });
        
        document.querySelector('.row-movies').innerHTML = cards;
        
        document.querySelectorAll('.btn-show').forEach(el => {
            el.addEventListener('click', function(){
                const id = this.dataset.omdbid;

                window.location.href = `show.html?id=${id}&search=${search}`;
            });
        });

    });
}

function getUrlVars(param = null) {
	if( param !== null ) {
		let vars = [], hash;
        let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        
		for( let i = 0; i < hashes.length; i++ ) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
        }
        
        return vars[param];
        
    } else {
		return null;
	}
}