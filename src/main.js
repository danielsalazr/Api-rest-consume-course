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


async function getTrendingMoviesPreview(){
    const { data } = await api(`trending/movie/day`)
    // const data = await res.json();

    console.log(data)

    const movies = data.results;

    // console.log(movies)

    trendingMoviesPreviewList.innerHTML = ""
    

    movies.forEach(movie => {

        // Mounting Point
        // const trendingMoviesPreviewList = document.querySelector("#trendingPreview .trendingPreview-movieList")
    
        // create elements
        const moviecontainer = document.createElement('div');
        moviecontainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)
        

        // Render
        moviecontainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(moviecontainer)
    });
}


async function getCategoriesMoviesPreview(){
    const { data } = await api(`genre/movie/list`)
    // const data = await res.json();

    console.log(data)

    const categories = data.genres;

    // console.log(movies)

    categoriesPreviewList.innerHTML = ""

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


        // Render
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        categoriesPreviewList.appendChild(categoryContainer)

        

    });
}