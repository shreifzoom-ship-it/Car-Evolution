/*==========================================
   Car Evolution Website - Interactive Timeline
   Knowledge Management Project | MGMT3501
   Timeline Functionality
==========================================*/

// Timeline data
const timelineData = [
    {
        year: '1886',
        title: 'Birth of the Automobile',
        description: 'Karl Benz patents the first gasoline-powered car, the Benz Patent-Motorwagen, marking the beginning of the automotive era.',
        image: 'images/eras/1886-benz.jpg',
        icon: 'fa-car',
        facts: [
            'Three-wheeled vehicle',
            '0.75 horsepower engine',
            'Max speed: 16 km/h'
        ]
    },
    {
        year: '1908',
        title: 'Ford Model T Revolution',
        description: 'Henry Ford introduces the Model T and the moving assembly line, making cars affordable for the masses.',
        image: 'images/eras/1908-model-t.jpg',
        icon: 'fa-industry',
        facts: [
            '15 million units sold',
            'Assembly line reduced assembly time from 12 hours to 93 minutes',
            'Price dropped from $850 to $300'
        ]
    },
    {
        year: '1920',
        title: 'Golden Age of Classics',
        description: 'The 1920s bring luxury, style, and innovation with brands like Rolls-Royce, Bugatti, and Duesenberg.',
        image: 'images/eras/1920-classic.jpg',
        icon: 'fa-crown',
        facts: [
            'First closed-body cars',
            'Hydraulic brakes introduced',
            'Art Deco influence on design'
        ]
    },
    {
        year: '1930',
        title: 'Streamlining Era',
        description: 'Aerodynamics become important. Cars start to look like "teardrops" with rounded shapes and integrated fenders.',
        image: 'images/eras/1930-streamline.jpg',
        icon: 'fa-wind',
        facts: [
            'Chrysler Airflow leads the way',
            'First monocoque construction',
            'Integrated headlights appear'
        ]
    },
    {
        year: '1945',
        title: 'Post-War Boom',
        description: 'After WWII, car production explodes. European microcars and American tailfins define the era.',
        image: 'images/eras/1945-postwar.jpg',
        icon: 'fa-rocket',
        facts: [
            'Volkswagen Beetle becomes popular',
            'First radial tires',
            'Power steering introduced'
        ]
    },
    {
        year: '1950',
        title: 'Muscle Car Era Begins',
        description: 'American manufacturers start producing powerful V8 engines, leading to the muscle car revolution.',
        image: 'images/eras/1950-muscle.jpg',
        icon: 'fa-horse',
        facts: [
            'Chevrolet Small-Block V8 debuts',
            'Chrysler HEMI introduced',
            '0-60 mph under 8 seconds'
        ]
    },
    {
        year: '1960',
        title: 'The Swinging Sixties',
        description: 'British sports cars, Italian exotics, and American muscle dominate. The Mini Cooper and Ford Mustang debut.',
        image: 'images/eras/1960-sixties.jpg',
        icon: 'fa-music',
        facts: [
            'Mini Cooper revolutionizes small cars',
            'Jaguar E-Type - "most beautiful car ever"',
            'First rear-engine cars go mainstream'
        ]
    },
    {
        year: '1970',
        title: 'Oil Crisis & Safety',
        description: 'Fuel shortages lead to smaller, more efficient cars. Safety regulations increase.',
        image: 'images/eras/1970-oil.jpg',
        icon: 'fa-gas-pump',
        facts: [
            'OPEC oil embargo of 1973',
            'Catalytic converters required',
            'First crumple zones'
        ]
    },
    {
        year: '1980',
        title: 'Technology Revolution',
        description: 'Computers enter cars. Fuel injection, turbocharging, and electronic controls change performance.',
        image: 'images/eras/1980-tech.jpg',
        icon: 'fa-microchip',
        facts: [
            'First mass-produced turbo cars',
            'ABS becomes available',
            'Digital dashboards appear'
        ]
    },
    {
        year: '1990',
        title: 'SUV & Minivan Boom',
        description: 'Families embrace SUVs and minivans. Japanese brands dominate reliability rankings.',
        image: 'images/eras/1990-suv.jpg',
        icon: 'fa-truck',
        facts: [
            'Ford Explorer leads SUV craze',
            'Lexus introduces luxury reliability',
            'First modern hybrids in development'
        ]
    },
    {
        year: '2000',
        title: 'Hybrid Revolution',
        description: 'Toyota Prius leads the hybrid charge. Electronics and infotainment become essential.',
        image: 'images/eras/2000-hybrid.jpg',
        icon: 'fa-bolt',
        facts: [
            'Toyota Prius launches globally',
            'Bluetooth connectivity appears',
            'GPS navigation becomes common'
        ]
    },
    {
        year: '2010',
        title: 'Electric Future',
        description: 'Tesla proves electric cars can be desirable. Autonomous driving technology advances rapidly.',
        image: 'images/eras/2010-electric.jpg',
        icon: 'fa-charging-station',
        facts: [
            'Tesla Model S wins Motor Trend Car of the Year',
            'Nissan Leaf becomes best-selling EV',
            'First self-driving tests on public roads'
        ]
    },
    {
        year: '2020',
        title: 'Autonomous & Connected',
        description: 'Cars become "smartphones on wheels" with over-the-air updates, self-driving features, and electric dominance.',
        image: 'images/eras/2020-autonomous.jpg',
        icon: 'fa-robot',
        facts: [
            'Level 3 autonomous driving approved',
            'Electric SUVs outsell sedans',
            'Vehicle-to-everything (V2X) communication'
        ]
    },
    {
        year: '2025',
        title: 'Future Mobility',
        description: 'Flying cars, hyperloop, and sustainable materials reshape transportation.',
        image: 'images/eras/2025-future.jpg',
        icon: 'fa-rocket',
        facts: [
            'First flying cars certified',
            'Solid-state batteries arrive',
            '100% recyclable vehicles'
        ]
    }
];

// Initialize timeline
document.addEventListener('DOMContentLoaded', function() {
    initTimeline();
    initTimelineControls();
    initYearMarkers();
    initTimelineSlider();
});

/*========== Create Timeline Items ==========*/
function initTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    
    if (timelineContainer) {
        // Clear loading spinner
        timelineContainer.innerHTML = '';
        
        // Add timeline items
        timelineData.forEach((item, index) => {
            const timelineItem = createTimelineItem(item, index);
            timelineContainer.appendChild(timelineItem);
        });
        
        // Set first item as active
        const firstItem = timelineContainer.querySelector('.timeline-item');
        if (firstItem) {
            firstItem.classList.add('active');
        }
    }
}

/*========== Create Single Timeline Item ==========*/
function createTimelineItem(item, index) {
    const div = document.createElement('div');
    div.className = `timeline-item reveal-left`;
    div.setAttribute('data-year', item.year);
    div.setAttribute('data-index', index);
    
    div.innerHTML = `
        <div class="timeline-year-badge">${item.year}</div>
        <div class="timeline-content-wrapper">
            <div class="timeline-icon">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="timeline-facts">
                    ${item.facts.map(fact => `<span class="fact"><i class="fas fa-check-circle"></i> ${fact}</span>`).join('')}
                </div>
                <button class="btn-small timeline-read-more" data-year="${item.year}">
                    Read More <i class="fas fa-arrow-right"></i>
                </button>
            </div>
            <div class="timeline-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="image-overlay"></div>
            </div>
        </div>
    `;
    
    return div;
}

/*========== Timeline Controls ==========*/
function initTimelineControls() {
    const prevBtn = document.querySelector('.timeline-btn.prev');
    const nextBtn = document.querySelector('.timeline-btn.next');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const yearMarkers = document.querySelectorAll('.year-marker');
    
    if (prevBtn && nextBtn && timelineItems.length > 0) {
        let currentIndex = 0;
        
        // Update active item
        function setActiveItem(index) {
            // Remove active class from all items and markers
            timelineItems.forEach(item => item.classList.remove('active'));
            yearMarkers.forEach(marker => marker.classList.remove('active'));
            
            // Add active class to current item
            if (timelineItems[index]) {
                timelineItems[index].classList.add('active');
                
                // Update active year marker
                const year = timelineItems[index].getAttribute('data-year');
                const activeMarker = document.querySelector(`.year-marker[data-year="${year}"]`);
                if (activeMarker) {
                    activeMarker.classList.add('active');
                }
                
                // Scroll to active item
                timelineItems[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
            
            // Update button states
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === timelineItems.length - 1;
            
            currentIndex = index;
        }
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                setActiveItem(currentIndex - 1);
            }
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            if (currentIndex < timelineItems.length - 1) {
                setActiveItem(currentIndex + 1);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                setActiveItem(currentIndex - 1);
            } else if (e.key === 'ArrowRight' && currentIndex < timelineItems.length - 1) {
                setActiveItem(currentIndex + 1);
            }
        });
    }
}

/*========== Year Markers ==========*/
function initYearMarkers() {
    const yearMarkers = document.querySelectorAll('.year-marker');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (yearMarkers.length > 0 && timelineItems.length > 0) {
        yearMarkers.forEach(marker => {
            marker.addEventListener('click', function() {
                const year = this.getAttribute('data-year');
                
                // Find timeline item with matching year
                const targetItem = Array.from(timelineItems).find(
                    item => item.getAttribute('data-year') === year
                );
                
                if (targetItem) {
                    // Remove active class from all markers
                    yearMarkers.forEach(m => m.classList.remove('active'));
                    
                    // Add active class to clicked marker
                    this.classList.add('active');
                    
                    // Scroll to target item
                    targetItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    
                    // Update active timeline item
                    timelineItems.forEach(item => item.classList.remove('active'));
                    targetItem.classList.add('active');
                }
            });
        });
    }
}

/*========== Timeline Slider ==========*/
function initTimelineSlider() {
    const timelineContainer = document.getElementById('timelineContainer');
    const yearMarkers = document.querySelectorAll('.year-marker');
    
    if (timelineContainer && yearMarkers.length > 0) {
        // Observe timeline items to update year markers on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const year = entry.target.getAttribute('data-year');
                    
                    // Update active year marker
                    yearMarkers.forEach(marker => {
                        marker.classList.remove('active');
                        if (marker.getAttribute('data-year') === year) {
                            marker.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });
        
        // Observe all timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => observer.observe(item));
    }
}

/*========== Read More Buttons ==========*/
function initReadMoreButtons() {
    const readMoreBtns = document.querySelectorAll('.timeline-read-more');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            
            // Navigate to era page
            switch(year) {
                case '1886':
                case '1908':
                case '1920':
                    window.location.href = '1886-1920.html';
                    break;
                case '1930':
                case '1945':
                case '1950':
                    window.location.href = '1920-1950.html';
                    break;
                case '1960':
                case '1970':
                    window.location.href = '1950-1980.html';
                    break;
                case '1980':
                case '1990':
                    window.location.href = '1980-2010.html';
                    break;
                case '2000':
                case '2010':
                case '2020':
                case '2025':
                    window.location.href = '2010-present.html';
                    break;
                default:
                    window.location.href = `era-${year}.html`;
            }
        });
    });
}

/*========== Filter Timeline by Decade ==========*/
function filterTimeline(decade) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const year = parseInt(item.getAttribute('data-year'));
        
        if (decade === 'all') {
            item.style.display = 'block';
        } else {
            const decadeStart = parseInt(decade);
            const decadeEnd = decadeStart + 9;
            
            if (year >= decadeStart && year <= decadeEnd) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

/*========== Timeline Search ==========*/
function searchTimeline(query) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    query = query.toLowerCase().trim();
    
    timelineItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const year = item.getAttribute('data-year');
        
        if (title.includes(query) || description.includes(query) || year.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

/*========== Timeline Animation on Scroll ==========*/
function animateTimelineOnScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
}

/*========== Export Timeline Data ==========*/
function exportTimelineData() {
    const dataStr = JSON.stringify(timelineData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'timeline-data.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

/*========== Initialize all timeline functions ==========*/
window.addEventListener('load', function() {
    initReadMoreButtons();
    animateTimelineOnScroll();
    
    // Add keyboard shortcut for export (Ctrl+E)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            exportTimelineData();
        }
    });
});