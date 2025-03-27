 
// Movie data
const movieData = [
    { id: 1, title: "Movie Title 1", year: 2023, quality: "HD", size: "1.4GB", category: "hollywood", downloads: "1.2M", poster: "muv-data-img/eng/muv-1-eng.jpg" },
    { id: 2, title: "Movie Title 2", year: 2023, quality: "HD", size: "1.2GB", category: "bollywood", downloads: "980K", poster: "muv-data-img/hindi/muv-1-hindi.webp" },
    { id: 3, title: "Movie Title 3", year: 2022, quality: "HD", size: "1.5GB", category: "tamil", downloads: "850K", poster: "muv-data-img/tamil/muv-1-tamil.jpg" },
    { id: 4, title: "Movie Title 4", year: 2022, quality: "HD", size: "1.3GB", category: "telugu", downloads: "680K", poster: "muv-data-img/telugu/muv-1-tel.jpg" },
    { id: 5, title: "Movie Title 5", year: 2021, quality: "HD", size: "1.6GB", category: "malayalam", downloads: "550K", poster: "muv-data-img/malayalam/muv-1-mal.jpg" },
    { id: 6, title: "Movie Title 6", year: 2021, quality: "HD", size: "1.4GB", category: "hollywood", downloads: "520K", poster: "muv-data-img/eng/muv-2-eng.jpg" },
    { id: 7, title: "Movie Title 7", year: 2020, quality: "HD", size: "1.5GB", category: "bollywood", downloads: "480K", poster: "muv-data-img/hindi/muv-2-hindi.webp" },
    { id: 8, title: "Movie Title 8", year: 2020, quality: "HD", size: "1.3GB", category: "tamil", downloads: "450K", poster: "muv-data-img/tamil/muv-2-tamil.jpg" },
    { id: 9, title: "Movie Title 9", year: 2019, quality: "HD", size: "1.2GB", category: "telugu", downloads: "420K", poster: "muv-data-img/telugu/muv-1-tel.jpg" },
    { id: 10, title: "Movie Title 10", year: 2019, quality: "HD", size: "1.4GB", category: "malayalam", downloads: "400K", poster: "muv-data-img/malayalam/muv-3-mal.jpg" }
];

const tvShowData = [
    { id: 1, title: "TV Show S01E05", year: 2023, quality: "HD", size: "450MB", category: "hollywood", downloads: "720K", poster: "series-data-img/eng/ser-1.jpg" },
    { id: 2, title: "TV Show S02E03", year: 2023, quality: "HD", size: "480MB", category: "bollywood", downloads: "680K", poster: "series-data-img/hindi/ser-1.jpg" },
    { id: 3, title: "TV Show S03E10", year: 2022, quality: "HD", size: "510MB", category: "tamil", downloads: "650K", poster: "series-data-img/tamil/ser-1.jpg" },
    { id: 4, title: "TV Show S01E08", year: 2022, quality: "HD", size: "490MB", category: "telugu", downloads: "620K", poster: "series-data-img/telugu/ser-1.jpg" },
    { id: 5, title: "TV Show S02E05", year: 2021, quality: "HD", size: "470MB", category: "malayalam", downloads: "590K", poster: "series-data-img/malayalam/ser-1.jpg" },
    { id: 6, title: "TV Show S03E02", year: 2021, quality: "HD", size: "520MB", category: "hollywood", downloads: "560K", poster: "series-data-img/eng/ser-2.jpeg" },
    { id: 7, title: "TV Show S01E10", year: 2020, quality: "HD", size: "480MB", category: "bollywood", downloads: "530K", poster: "series-data-img/hindi/ser-2.jpg" },
    { id: 8, title: "TV Show S02E08", year: 2020, quality: "HD", size: "500MB", category: "tamil", downloads: "500K", poster: "series-data-img/tamil/ser-2.jpg" }
];

// Current filters
let currentYearFilter = 'all';
let currentCategoryFilter = 'all';
let currentSearchQuery = '';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
    loadTVShows();
    loadTopDownloads();

    // Year filter event listeners
    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentYearFilter = this.dataset.year;
            filterContent();
        });
    });

    // Category filter event listeners
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentCategoryFilter = this.dataset.category;
            filterContent();
        });
    });

    // Search button event listener
    document.getElementById('searchBtn').addEventListener('click', function() {
        currentSearchQuery = document.getElementById('movieSearch').value.toLowerCase();
        filterContent();
    });

    // Movie card click handlers will be added when cards are created
});

// Load movies into the container
function loadMovies() {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '';
    
    movieData.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'col-md-3 col-6';
        movieCard.innerHTML = `
            <div class="movie-card" data-id="${movie.id}" data-year="${movie.year}" data-category="${movie.category}">
                <img src="${movie.poster}" class="movie-poster">
                <h5 class="movie-title">${movie.title}</h5>
                <div class="movie-info">${movie.year} • ${movie.quality} • ${movie.size}</div>
            </div>
        `;
        container.appendChild(movieCard);
    });

    // Add click handlers to movie cards
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', function() {
            const movieId = this.dataset.id;
            const movie = movieData.find(m => m.id == movieId) || tvShowData.find(t => t.id == movieId);
            showMovieDetails(movie);
        });
    });
}

// Load TV shows into the container
function loadTVShows() {
    const container = document.getElementById('tvShowsContainer');
    container.innerHTML = '';
    
    tvShowData.forEach(show => {
        const showCard = document.createElement('div');
        showCard.className = 'col-md-3 col-6';
        showCard.innerHTML = `
            <div class="movie-card" data-id="${show.id}" data-year="${show.year}" data-category="${show.category}">
                <img src="${show.poster}" class="movie-poster">
                <h5 class="movie-title">${show.title}</h5>
                <div class="movie-info">${show.year} • ${show.quality} • ${show.size}</div>
            </div>
        `;
        container.appendChild(showCard);
    });
}

// Load top downloads
function loadTopDownloads() {
    const container = document.getElementById('topDownloads');
    container.innerHTML = '';
    
    // Combine movies and TV shows and sort by downloads (simplified)
    const allContent = [...movieData, ...tvShowData]
        .sort((a, b) => parseInt(b.downloads) - parseInt(a.downloads))
        .slice(0, 5);
    
    allContent.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${item.title}
            <span class="badge bg-danger rounded-pill">${item.downloads}</span>
        `;
        container.appendChild(li);
    });
}

// Filter content based on current filters
function filterContent() {
    const allCards = document.querySelectorAll('.movie-card');
    
    allCards.forEach(card => {
        const year = card.dataset.year;
        const category = card.dataset.category;
        const title = card.querySelector('.movie-title').textContent.toLowerCase();
        
        const yearMatch = currentYearFilter === 'all' || year === currentYearFilter;
        const categoryMatch = currentCategoryFilter === 'all' || category === currentCategoryFilter;
        const searchMatch = currentSearchQuery === '' || title.includes(currentSearchQuery);
        
        if (yearMatch && categoryMatch && searchMatch) {
            card.parentElement.style.display = 'block';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
}

// Show movie details (simulated)
function showMovieDetails(movie) {
    alert(`Movie Details:\n\nTitle: ${movie.title}\nYear: ${movie.year}\nQuality: ${movie.quality}\nSize: ${movie.size}\n\nThis is just a demo for educational purposes.`);
} 