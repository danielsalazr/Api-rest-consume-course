
async function getTrendingMoviesPreview(){
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    const data = await res.json();

    console.log(data)

    const movies = data.results;

    // console.log(movies)

    movies.forEach(movie => {

        // Mounting Point
        const trendingPreviewMoviesSection = document.querySelector("#trendingPreview .trendingPreview-movieList")
    
        // create elements
        const moviecontainer = document.createElement('div');
        moviecontainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)
        

        // Render
        moviecontainer.appendChild(movieImg);
        trendingPreviewMoviesSection.appendChild(moviecontainer)
    });
}


async function getCategoriesMoviesPreview(){
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    const data = await res.json();

    console.log(data)

    const categories = data.genres;

    // console.log(movies)

    categories.forEach(category => {

        // Mounting Point
        const previewCategoriesContainer = document.querySelector("#categoriesPreview .categoriesPreview-list")
    
        // create elements
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`)
        // movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${categorie.poster_path}`)
        const categoryTitleText = document.createTextNode(category.name)


        // Render
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        previewCategoriesContainer.appendChild(categoryContainer)

        

    });
}


getTrendingMoviesPreview()
getCategoriesMoviesPreview()