window.addEventListener('hashchange', navigator, false)
window.addEventListener('DOMContentLoaded', navigator, false)


searchFormBtn.addEventListener('click',  () => {
    // const input = searchFormInput.value;
    location.hash = `#search=${searchFormInput.value.trim()}`

})
arrowBtn.addEventListener('click',() =>{
    // location.hash = '#home='
    // location.hash = window.history.back();
    // window.
    history.back();
})


trendingBtn.addEventListener('click', () => {
    location.hash = '#trends='
})



function navigator (){

    console.log(location);

    if (location.hash.startsWith('#trends=')) {
        trendsPage()
    } else if(location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')){
        movieDetailsPage()
    } else if (location.hash.startsWith('#category=')){
        categoriesPage()
    } else{
        homePage()
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    

}

function homePage() {

    console.log('Home!!')

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');


    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')


    
    getTrendingMoviesPreview()
    getCategoriesMoviesPreview()
}

function categoriesPage() {


    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');


    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    console.log('Categories!!')

    const [_, categoryData] = location.hash.split('=');
    const [categoryID, categoryName] = categoryData.split('-');
    // const urlPage = url[0]
    // const urlPage = url[0]

    headerCategoryTitle.innerHTML = categoryName

    getMoviesByCategory(categoryID)
}

function movieDetailsPage() {

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');


    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    // [#movie, 12464]
    const [_, movieID] = location.hash.split('=');
    getMovieByID(movieID);

    console.log('Movie')
}

function searchPage() {

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');


    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, query] = location.hash.split('=');

    getMoviesBySearch(query);

    console.log('Search!!')
}

function trendsPage() {

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');


    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    headerCategoryTitle.innerHTML = "Tendencias"

    getTrendingMovies()

    console.log('Trends!!')
}