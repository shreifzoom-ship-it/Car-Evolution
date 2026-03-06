/*==========================================
   Car Evolution Website - Brands Filter Functionality
   Knowledge Management Project | MGMT3501
==========================================*/

// Initialize brand filters on page load
document.addEventListener('DOMContentLoaded', function() {
    initBrandFilters();
    initBrandSearch();
    initCountryFilter();
    initSortOptions();
    initLetterFilter();
});

/*========== Brand Filter Tabs ==========*/
function initBrandFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const brandSections = document.querySelectorAll('.brands-section');
    
    if (!filterTabs.length) return;
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Update URL parameter
            updateUrlParam('country', filter);
            
            // Filter sections
            if (filter === 'all') {
                brandSections.forEach(section => {
                    section.style.display = 'block';
                    section.classList.add('animate-fade-in');
                });
            } else {
                brandSections.forEach(section => {
                    if (section.id.includes(filter)) {
                        section.style.display = 'block';
                        section.classList.add('animate-fade-in');
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
            
            // Update visible sections count
            updateVisibleSectionsCount();
            
            // If using infinite scroll, reset page
            if (window.brandsInfiniteScroll) {
                window.brandsInfiniteScroll.resetPage();
            }
        });
    });
    
    // Check URL for initial filter
    const urlParams = new URLSearchParams(window.location.search);
    const countryParam = urlParams.get('country');
    
    if (countryParam) {
        const activeTab = document.querySelector(`.filter-tab[data-filter="${countryParam}"]`);
        if (activeTab) {
            activeTab.click();
        }
    }
}

/*========== Brand Search ==========*/
function initBrandSearch() {
    const searchInput = document.getElementById('brandSearch');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    const brandCards = document.querySelectorAll('.brand-card');
    
    if (!searchInput) return;
    
    // Real-time search as you type
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            // Show all brands if search is too short
            showAllBrands();
            if (searchResults) searchResults.style.display = 'none';
            return;
        }
        
        // Perform search
        performSearch(searchTerm, brandCards, searchResults);
        
        // Update URL parameter
        updateUrlParam('q', searchTerm);
        
    }, 300));
    
    // Search on button click
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm.length >= 2) {
                performSearch(searchTerm, brandCards, searchResults);
            }
        });
    }
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase().trim();
            if (searchTerm.length >= 2) {
                performSearch(searchTerm, brandCards, searchResults);
            }
        }
    });
    
    // Check URL for search parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('q');
    
    if (searchParam) {
        searchInput.value = searchParam;
        performSearch(searchParam.toLowerCase(), brandCards, searchResults);
    }
}

function performSearch(searchTerm, brandCards, searchResults) {
    let matchCount = 0;
    
    brandCards.forEach(card => {
        const brandName = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const brandDesc = card.querySelector('.brand-desc')?.textContent.toLowerCase() || '';
        const brandModels = card.querySelector('.iconic-models')?.textContent.toLowerCase() || '';
        const brandCountry = card.getAttribute('data-country') || '';
        
        if (brandName.includes(searchTerm) || 
            brandDesc.includes(searchTerm) || 
            brandModels.includes(searchTerm) ||
            brandCountry.includes(searchTerm)) {
            card.style.display = 'flex';
            card.classList.add('search-match');
            matchCount++;
            
            // Show parent section
            const parentSection = card.closest('.brands-section');
            if (parentSection) parentSection.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update search results counter
    if (searchResults) {
        if (matchCount > 0) {
            searchResults.innerHTML = `<div class="search-summary">Found ${matchCount} matching brand${matchCount !== 1 ? 's' : ''}</div>`;
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-summary no-results">No brands found matching your search</div>';
            searchResults.style.display = 'block';
        }
    }
    
    // Hide empty sections
    document.querySelectorAll('.brands-section').forEach(section => {
        const visibleCards = Array.from(section.querySelectorAll('.brand-card'))
            .filter(card => card.style.display !== 'none');
        
        if (visibleCards.length === 0) {
            section.style.display = 'none';
        }
    });
}

function showAllBrands() {
    document.querySelectorAll('.brand-card').forEach(card => {
        card.style.display = 'flex';
        card.classList.remove('search-match');
    });
    
    document.querySelectorAll('.brands-section').forEach(section => {
        section.style.display = 'block';
    });
    
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

/*========== Country Filter ==========*/
function initCountryFilter() {
    const countrySelect = document.getElementById('countrySelect');
    if (!countrySelect) return;
    
    countrySelect.addEventListener('change', function() {
        const selectedCountry = this.value;
        const filterTab = document.querySelector(`.filter-tab[data-filter="${selectedCountry}"]`);
        
        if (filterTab) {
            filterTab.click();
        }
    });
}

/*========== Sort Options ==========*/
function initSortOptions() {
    const sortSelect = document.getElementById('sortSelect');
    const brandGrid = document.querySelector('.brands-grid');
    
    if (!sortSelect || !brandGrid) return;
    
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        const brandCards = Array.from(document.querySelectorAll('.brand-card'));
        
        sortBrands(brandCards, sortBy);
        
        // Reorder cards in DOM
        brandCards.forEach(card => {
            brandGrid.appendChild(card);
        });
        
        // Update URL parameter
        updateUrlParam('sort', sortBy);
    });
}

function sortBrands(brandCards, sortBy) {
    switch(sortBy) {
        case 'name-asc':
            brandCards.sort((a, b) => {
                const nameA = a.querySelector('h3')?.textContent || '';
                const nameB = b.querySelector('h3')?.textContent || '';
                return nameA.localeCompare(nameB);
            });
            break;
            
        case 'name-desc':
            brandCards.sort((a, b) => {
                const nameA = a.querySelector('h3')?.textContent || '';
                const nameB = b.querySelector('h3')?.textContent || '';
                return nameB.localeCompare(nameA);
            });
            break;
            
        case 'year-asc':
            brandCards.sort((a, b) => {
                const yearA = parseInt(a.querySelector('.founded')?.textContent.replace(/\D/g, '')) || 9999;
                const yearB = parseInt(b.querySelector('.founded')?.textContent.replace(/\D/g, '')) || 9999;
                return yearA - yearB;
            });
            break;
            
        case 'year-desc':
            brandCards.sort((a, b) => {
                const yearA = parseInt(a.querySelector('.founded')?.textContent.replace(/\D/g, '')) || 0;
                const yearB = parseInt(b.querySelector('.founded')?.textContent.replace(/\D/g, '')) || 0;
                return yearB - yearA;
            });
            break;
            
        default:
            // Default sort (by name)
            brandCards.sort((a, b) => {
                const nameA = a.querySelector('h3')?.textContent || '';
                const nameB = b.querySelector('h3')?.textContent || '';
                return nameA.localeCompare(nameB);
            });
    }
}

/*========== Letter Filter (Alphabetical) ==========*/
function initLetterFilter() {
    const letterFilters = document.querySelectorAll('.letter-filter');
    const brandCards = document.querySelectorAll('.brand-card');
    
    if (!letterFilters.length) return;
    
    letterFilters.forEach(letter => {
        letter.addEventListener('click', function() {
            const selectedLetter = this.getAttribute('data-letter').toLowerCase();
            
            // Update active state
            letterFilters.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            brandCards.forEach(card => {
                const brandName = card.querySelector('h3')?.textContent.toLowerCase() || '';
                
                if (selectedLetter === 'all' || brandName.startsWith(selectedLetter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show empty sections
            document.querySelectorAll('.brands-section').forEach(section => {
                const visibleCards = Array.from(section.querySelectorAll('.brand-card'))
                    .filter(card => card.style.display !== 'none');
                
                section.style.display = visibleCards.length > 0 ? 'block' : 'none';
            });
        });
    });
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

function updateUrlParam(key, value) {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
}

function updateVisibleSectionsCount() {
    const sections = document.querySelectorAll('.brands-section');
    let visibleCount = 0;
    
    sections.forEach(section => {
        if (section.style.display !== 'none') visibleCount++;
    });
    
    const counter = document.getElementById('visibleSectionsCount');
    if (counter) {
        counter.textContent = `Showing ${visibleCount} of ${sections.length} regions`;
    }
}

/*========== Load More / Pagination ==========*/
const brandsInfiniteScroll = {
    page: 1,
    loading: false,
    
    init() {
        window.addEventListener('scroll', () => {
            if (this.loading) return;
            
            const scrollPosition = window.innerHeight + window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            
            if (scrollPosition >= documentHeight - 1000) {
                this.loadMore();
            }
        });
    },
    
    loadMore() {
        this.loading = true;
        this.page++;
        
        // Show loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-more';
        loadingDiv.innerHTML = '<div class="spinner"></div><span>Loading more brands...</span>';
        document.querySelector('.brands-container').appendChild(loadingDiv);
        
        // Simulate loading (replace with actual AJAX call)
        setTimeout(() => {
            loadingDiv.remove();
            this.loading = false;
        }, 1500);
    },
    
    resetPage() {
        this.page = 1;
        this.loading = false;
    }
};

/*========== Export for Global Use ==========*/
window.brandFilters = {
    initBrandFilters,
    initBrandSearch,
    performSearch,
    sortBrands,
    updateUrlParam
};