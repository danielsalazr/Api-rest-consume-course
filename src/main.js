const api = axios.create(
    {
        baseURL: 'https://api.themoviedb.org/3/',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
            
        },

        params: {
            'api_key': API_KEY,
        },
    }
);

// Utils

function createMovies(movies, container){
    container.innerHTML = ""
    

    movies.forEach(movie => {

        // Mounting Point
        // const trendingMoviesPreviewList = document.querySelector("#trendingPreview .trendingPreview-movieList")
    
        // create elements
        const moviecontainer = document.createElement('div');
        moviecontainer.classList.add('movie-container');

        moviecontainer.addEventListener('click',() => {
            location.hash = `#movie=${movie.id}`
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)
        
        // Render
        moviecontainer.appendChild(movieImg);
        container.appendChild(moviecontainer);



    });
}

function createCategories(categories, container){
    container.innerHTML = ""

    categories.forEach(category => {

        // Mounting Point
        // const categoriesPreviewList = document.querySelector("#categoriesPreview .categoriesPreview-list")
    
        // create elements
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`)
        // movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${categorie.poster_path}`)
        const categoryTitleText = document.createTextNode(category.name)
        
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        })

        // Render
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        container.appendChild(categoryContainer)

        

    });
}


// Llamados APi

async function getTrendingMoviesPreview(){
    const { data } = await api(`trending/movie/day`)
    // const data = await res.json();

    console.log(data)

    const movies = data.results;
    console.log(movies)

    createMovies(movies,trendingMoviesPreviewList)
}


async function getCategoriesMoviesPreview(){
    const { data } = await api(`genre/movie/list`)
    // const data = await res.json();

    console.log(data)

    const categories = data.genres;

    createCategories(categories, categoriesPreviewList)

}

async function getMoviesByCategory(id) {
    const { data } = await api(`discover/movie`, {
        params: {
            with_genres:id,
        }
    })
    // const data = await res.json();

    console.log(data)

    const movies = data.results;

    createMovies(movies,genericSection)


}

async function getMoviesBySearch(query) {
    const { data } = await api(`search/movie`, {
        params: {
            query, // aqui debido que el parametro se llama igual que el query parameter, basta con solo poner query
        }
    })
    // const data = await res.json();

    console.log(data)

    const movies = data.results;

    createMovies(movies,genericSection)
}


async function getTrendingMovies(){
    const { data } = await api(`trending/movie/day`)
    // const data = await res.json();

    console.log(data)

    const movies = data.results;

    createMovies(movies,genericSection)
}


async function getMovieByID(movieID){
    const { data: movie } = await api(`movie/${movieID}`)
    // const data = await res.json();

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    console.log(movieImgUrl)

    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%)
        ,
    url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList)

    getRelatedMoviesId(movieID)
}

async function getRelatedMoviesId(id){
    const { data } = await api(`movie/${id}/recommendations`);
    
    const relatedMovies = data.results;

    console.log(relatedMovies)

    createMovies(relatedMovies, relatedMoviesContainer)

    // Ajustar scroll al inicio 
    relatedMoviesContainer.scrollTo(0, 0);

}