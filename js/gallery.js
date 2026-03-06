/*==========================================
   Car Evolution Website - Gallery Functionality
   Knowledge Management Project | MGMT3501
==========================================*/

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initLightbox();
    initGalleryFilters();
    initLoadMore();
});

// Gallery data (in real app, this would come from JSON)
const galleryImages = [
    // Classic Cars
    { id: 1, category: 'classic', src: 'images/gallery/classic-cars/classic-1.jpg', title: '1920 Rolls-Royce Silver Ghost', year: 1920 },
    { id: 2, category: 'classic', src: 'images/gallery/classic-cars/classic-2.jpg', title: '1930 Bugatti Type 57', year: 1930 },
    { id: 3, category: 'classic', src: 'images/gallery/classic-cars/classic-3.jpg', title: '1937 Mercedes-Benz 540K', year: 1937 },
    { id: 4, category: 'classic', src: 'images/gallery/classic-cars/classic-4.jpg', title: '1948 Jaguar XK120', year: 1948 },
    
    // Muscle Cars
    { id: 5, category: 'muscle', src: 'images/gallery/muscle-cars/muscle-1.jpg', title: '1964 Ford Mustang', year: 1964 },
    { id: 6, category: 'muscle', src: 'images/gallery/muscle-cars/muscle-2.jpg', title: '1969 Dodge Charger', year: 1969 },
    { id: 7, category: 'muscle', src: 'images/gallery/muscle-cars/muscle-3.jpg', title: '1970 Plymouth Hemi Cuda', year: 1970 },
    { id: 8, category: 'muscle', src: 'images/gallery/muscle-cars/muscle-4.jpg', title: '1970 Chevrolet Chevelle SS', year: 1970 },
    
    // Supercars
    { id: 9, category: 'supercar', src: 'images/gallery/supercars/super-1.jpg', title: '1966 Lamborghini Miura', year: 1966 },
    { id: 10, category: 'supercar', src: 'images/gallery/supercars/super-2.jpg', title: '1984 Ferrari Testarossa', year: 1984 },
    { id: 11, category: 'supercar', src: 'images/gallery/supercars/super-3.jpg', title: '1992 McLaren F1', year: 1992 },
    { id: 12, category: 'supercar', src: 'images/gallery/supercars/super-4.jpg', title: '2005 Bugatti Veyron', year: 2005 },
    
    // Electric Cars
    { id: 13, category: 'electric', src: 'images/gallery/electric-cars/electric-1.jpg', title: '1900 Lohner-Porsche', year: 1900 },
    { id: 14, category: 'electric', src: 'images/gallery/electric-cars/electric-2.jpg', title: '2008 Tesla Roadster', year: 2008 },
    { id: 15, category: 'electric', src: 'images/gallery/electric-cars/electric-3.jpg', title: '2012 Tesla Model S', year: 2012 },
    { id: 16, category: 'electric', src: 'images/gallery/electric-cars/electric-4.jpg', title: '2020 Porsche Taycan', year: 2020 }
];

let currentImageIndex = 0;
let currentCategory = 'all';

/*========== Initialize Gallery Grid ==========*/
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    // Clear loading spinner
    galleryGrid.innerHTML = '';
    
    // Add gallery items
    galleryImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        galleryGrid.appendChild(galleryItem);
    });
}

/*========== Create Single Gallery Item ==========*/
function createGalleryItem(image, index) {
    const div = document.createElement('div');
    div.className = `gallery-item ${image.category}`;
    div.setAttribute('data-index', index);
    div.setAttribute('data-category', image.category);
    div.setAttribute('data-year', image.year);
    
    div.innerHTML = `
        <img src="${image.src}" alt="${image.title}" loading="lazy">
        <div class="gallery-item-overlay">
            <h4>${image.title}</h4>
            <p>${image.year}</p>
        </div>
    `;
    
    // Add click event for lightbox
    div.addEventListener('click', function() {
        openLightbox(index);
    });
    
    return div;
}

/*========== Lightbox Functionality ==========*/
function initLightbox() {
    // Create lightbox elements if they don't exist
    if (!document.querySelector('.lightbox')) {
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <div class="lightbox-content">
                    <img src="" alt="" id="lightboxImage">
                    <div class="lightbox-caption" id="lightboxCaption"></div>
                    <button class="lightbox-close" id="lightboxClose">&times;</button>
                    <button class="lightbox-prev" id="lightboxPrev">&#10094;</button>
                    <button class="lightbox-next" id="lightboxNext">&#10095;</button>
                    <div class="lightbox-counter" id="lightboxCounter"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
    
    // Add event listeners
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevImage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
        
        if (document.querySelector('.lightbox.active')) {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    if (!lightbox || !lightboxImage) return;
    
    const image = galleryImages[index];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxCaption.textContent = `${image.title} (${image.year})`;
    lightboxCounter.textContent = `${index + 1} / ${galleryImages.length}`;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showPrevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = galleryImages.length - 1;
    }
    updateLightboxImage();
}

function showNextImage() {
    if (currentImageIndex < galleryImages.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0;
    }
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    if (!lightboxImage) return;
    
    const image = galleryImages[currentImageIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxCaption.textContent = `${image.title} (${image.year})`;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

/*========== Gallery Filters ==========*/
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            currentCategory = filter;
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Update URL without reload
            history.pushState(null, null, `?category=${filter}`);
        });
    });
    
    // Check URL for filter parameter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        const activeButton = document.querySelector(`.gallery-filter[data-filter="${category}"]`);
        if (activeButton) {
            activeButton.click();
        }
    }
}

/*========== Load More Images ==========*/
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more images
        this.textContent = 'Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            // In a real app, you would fetch more images from server
            alert('This is a demo. In production, more images would load from the server.');
            
            this.textContent = 'Load More Images';
            this.disabled = false;
        }, 1500);
    });
}

/*========== Sort Gallery ==========*/
function sortGallery(sortBy) {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const items = Array.from(galleryGrid.children);
    
    items.sort((a, b) => {
        const aVal = a.getAttribute(`data-${sortBy}`);
        const bVal = b.getAttribute(`data-${sortBy}`);
        
        if (sortBy === 'year') {
            return parseInt(bVal) - parseInt(aVal); // Newest first
        }
        return 0;
    });
    
    // Reorder items
    items.forEach(item => galleryGrid.appendChild(item));
}

/*========== Search Gallery ==========*/
function searchGallery(query) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const searchTerm = query.toLowerCase().trim();
    
    galleryItems.forEach(item => {
        const title = item.querySelector('h4')?.textContent.toLowerCase() || '';
        const year = item.getAttribute('data-year') || '';
        
        if (title.includes(searchTerm) || year.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

/*========== Export for Global Use ==========*/
window.galleryFunctions = {
    sortGallery,
    searchGallery
};