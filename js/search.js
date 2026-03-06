/*==========================================
   Car Evolution Website - Global Search Functionality
   Knowledge Management Project | MGMT3501
==========================================*/

// Global search database (in real app, this would come from JSON)
const searchDatabase = [
    // Brands
    { type: 'brand', name: 'Toyota', url: 'brands/toyota.html', keywords: ['corolla', 'camry', 'supra', 'land cruiser'] },
    { type: 'brand', name: 'Honda', url: 'brands/honda.html', keywords: ['civic', 'accord', 'nsx', 's2000'] },
    { type: 'brand', name: 'Nissan', url: 'brands/nissan.html', keywords: ['gtr', 'skyline', 'fairlady', 'patrol'] },
    { type: 'brand', name: 'BMW', url: 'brands/bmw.html', keywords: ['3 series', 'm3', '5 series', 'x5'] },
    { type: 'brand', name: 'Mercedes-Benz', url: 'brands/mercedes-benz.html', keywords: ['s class', 'e class', 'g class', '300sl'] },
    { type: 'brand', name: 'Audi', url: 'brands/audi.html', keywords: ['quattro', 'r8', 'a4', 'tt'] },
    { type: 'brand', name: 'Volkswagen', url: 'brands/volkswagen.html', keywords: ['beetle', 'golf', 'passat', 'tiguan'] },
    { type: 'brand', name: 'Porsche', url: 'brands/porsche.html', keywords: ['911', 'cayenne', 'panamera', 'taycan'] },
    { type: 'brand', name: 'Ferrari', url: 'brands/ferrari.html', keywords: ['488', 'f8', 'sf90', 'roma'] },
    { type: 'brand', name: 'Lamborghini', url: 'brands/lamborghini.html', keywords: ['aventador', 'huracan', 'urus', 'countach'] },
    { type: 'brand', name: 'Ford', url: 'brands/ford.html', keywords: ['mustang', 'f150', 'focus', 'explorer'] },
    { type: 'brand', name: 'Chevrolet', url: 'brands/chevrolet.html', keywords: ['corvette', 'camaro', 'silverado', 'malibu'] },
    
    // Eras
    { type: 'era', name: '1886-1920', title: 'Birth of the Automobile', url: '1886-1920.html' },
    { type: 'era', name: '1920-1950', title: 'Golden Age', url: '1920-1950.html' },
    { type: 'era', name: '1950-1980', title: 'Muscle Car Era', url: '1950-1980.html' },
    { type: 'era', name: '1980-2010', title: 'Technology Era', url: '1980-2010.html' },
    { type: 'era', name: '2010-Present', title: 'Electric Future', url: '2010-present.html' },
    
    // Pages
    { type: 'page', name: 'Home', url: 'index.html' },
    { type: 'page', name: 'About', url: 'about.html' },
    { type: 'page', name: 'Contact', url: 'contact.html' },
    { type: 'page', name: 'Gallery', url: 'gallery.html' },
    { type: 'page', name: 'All Brands', url: 'brands.html' }
];

// Initialize search on page load
document.addEventListener('DOMContentLoaded', function() {
    initSearchOverlay();
    initSearchInput();
    initKeyboardShortcuts();
    initSearchHistory();
});

/*========== Search Overlay ==========*/
function initSearchOverlay() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    
    if (!searchBtn || !searchOverlay) return;
    
    // Open search
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openSearch();
    });
    
    // Close search
    if (closeSearch) {
        closeSearch.addEventListener('click', closeSearchOverlay);
    }
    
    // Close on overlay click
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            closeSearchOverlay();
        }
    });
}

function openSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('globalSearchInput');
    
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        if (searchInput) {
            searchInput.focus();
        }
    }, 300);
}

function closeSearchOverlay() {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('globalSearchInput');
    
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Clear results
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
    }
}

/*========== Search Input Handler ==========*/
function initSearchInput() {
    const searchInput = document.getElementById('globalSearchInput');
    const resultsContainer = document.getElementById('searchResults');
    
    if (!searchInput || !resultsContainer) return;
    
    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.trim();
        
        if (query.length < 2) {
            resultsContainer.innerHTML = '<div class="search-hint">Type at least 2 characters to search</div>';
            return;
        }
        
        performGlobalSearch(query);
        
    }, 300));
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query.length >= 2) {
                performGlobalSearch(query);
                e.preventDefault();
            }
        }
    });
}

/*========== Perform Global Search ==========*/
function performGlobalSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    const searchTerm = query.toLowerCase();
    
    // Search in database
    const results = searchDatabase.filter(item => {
        return item.name.toLowerCase().includes(searchTerm) ||
               item.keywords?.some(k => k.includes(searchTerm)) ||
               item.title?.toLowerCase().includes(searchTerm);
    });
    
    // Also search in page content (simulated)
    const pageContentResults = searchPageContent(searchTerm);
    
    const allResults = [...results, ...pageContentResults];
    
    displaySearchResults(allResults, searchTerm);
}

function searchPageContent(searchTerm) {
    // Simulate searching page content
    // In a real app, this would search the actual page content
    return [];
}

function displaySearchResults(results, searchTerm) {
    const resultsContainer = document.getElementById('searchResults');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No results found for "${searchTerm}"</h3>
                <p>Try different keywords or browse our categories</p>
                <div class="suggestions">
                    <a href="brands.html">Browse All Brands</a>
                    <a href="gallery.html">Photo Gallery</a>
                    <a href="index.html#timeline">Historical Timeline</a>
                </div>
            </div>
        `;
        return;
    }
    
    // Group results by type
    const groupedResults = results.reduce((acc, result) => {
        if (!acc[result.type]) {
            acc[result.type] = [];
        }
        acc[result.type].push(result);
        return acc;
    }, {});
    
    let html = '<div class="search-results-header">';
    html += `<span class="results-count">${results.length} results found</span>`;
    
    // Add sort options
    html += `
        <div class="results-sort">
            <label for="sortResults">Sort by:</label>
            <select id="sortResults" onchange="window.searchFunctions.sortResults(this.value)">
                <option value="relevance">Relevance</option>
                <option value="name">Name</option>
                <option value="type">Type</option>
            </select>
        </div>
    `;
    
    html += '</div>';
    html += '<div class="search-results-list">';
    
    // Display results by type
    const typeOrder = ['brand', 'era', 'page'];
    const typeNames = {
        brand: 'Car Brands',
        era: 'Historical Eras',
        page: 'Pages'
    };
    
    typeOrder.forEach(type => {
        if (groupedResults[type]) {
            html += `<div class="result-group">`;
            html += `<h4 class="result-group-title">${typeNames[type]}</h4>`;
            
            groupedResults[type].forEach(result => {
                html += `
                    <a href="${result.url}" class="result-item" onclick="closeSearchOverlay()">
                        <div class="result-icon">
                            ${getResultIcon(result.type)}
                        </div>
                        <div class="result-info">
                            <div class="result-name">${highlightText(result.name, searchTerm)}</div>
                            ${result.title ? `<div class="result-subtitle">${highlightText(result.title, searchTerm)}</div>` : ''}
                        </div>
                        <i class="fas fa-arrow-right result-arrow"></i>
                    </a>
                `;
            });
            
            html += `</div>`;
        }
    });
    
    html += '</div>';
    
    // Add search tips
    html += `
        <div class="search-tips">
            <h5>Search Tips:</h5>
            <ul>
                <li>Type brand names (e.g., "Toyota", "Ferrari")</li>
                <li>Search for specific models (e.g., "Mustang", "911")</li>
                <li>Browse by era (e.g., "1920s", "muscle cars")</li>
            </ul>
        </div>
    `;
    
    resultsContainer.innerHTML = html;
}

function getResultIcon(type) {
    switch(type) {
        case 'brand':
            return '<i class="fas fa-car"></i>';
        case 'era':
            return '<i class="fas fa-timeline"></i>';
        case 'page':
            return '<i class="fas fa-file"></i>';
        default:
            return '<i class="fas fa-link"></i>';
    }
}

function highlightText(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

/*========== Keyboard Shortcuts ==========*/
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        
        // ESC to close search
        if (e.key === 'Escape') {
            closeSearchOverlay();
        }
    });
}

/*========== Search History ==========*/
function initSearchHistory() {
    const historyContainer = document.getElementById('searchHistory');
    if (!historyContainer) return;
    
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    if (searchHistory.length > 0) {
        let html = '<h5>Recent Searches:</h5><div class="history-list">';
        
        searchHistory.slice(0, 5).forEach(term => {
            html += `<button class="history-item" onclick="window.searchFunctions.searchTerm('${term}')">
                <i class="fas fa-history"></i> ${term}
            </button>`;
        });
        
        html += '</div>';
        historyContainer.innerHTML = html;
    }
}

function addToSearchHistory(term) {
    if (!term || term.length < 2) return;
    
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Remove if already exists
    searchHistory = searchHistory.filter(t => t !== term);
    
    // Add to beginning
    searchHistory.unshift(term);
    
    // Keep only last 10
    searchHistory = searchHistory.slice(0, 10);
    
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
    // Update history display
    initSearchHistory();
}

/*========== Utility Functions ==========*/
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function sortResults(sortBy) {
    // Implementation for sorting results
    console.log('Sorting by:', sortBy);
}

/*========== Export for Global Use ==========*/
window.searchFunctions = {
    openSearch,
    closeSearchOverlay,
    performGlobalSearch,
    addToSearchHistory,
    searchTerm: (term) => {
        document.getElementById('globalSearchInput').value = term;
        performGlobalSearch(term);
        addToSearchHistory(term);
    },
    sortResults
};