const memes = [
    '/memes/meme1.jpg',
    '/memes/meme2.jpg',
    '/memes/meme3.jpg',
    '/memes/meme4.jpg',
    '/memes/meme5.jpg',
    '/memes/meme6.jpg',
    '/memes/meme7.jpg',
    '/memes/meme8.jpg',
    '/memes/meme9.jpg',
    '/memes/meme10.jpg',
    '/memes/meme11.jpg',
    '/memes/meme12.jpg',
    '/memes/meme13.jpg',
    '/memes/meme14.jpg',
    '/memes/meme15.jpg'
];

// Initialize the meme gallery
function initMemeGallery() {
    const memeGrid = document.getElementById('memeGrid');
    
    memes.forEach((meme, index) => {
        const memeItem = document.createElement('div');
        memeItem.className = 'meme-item';
        memeItem.onclick = () => openMemeModal(meme);
        
        memeItem.innerHTML = `
            <img src="${meme}" alt="Meme ${index + 1}" loading="lazy">
            <div class="meme-overlay"></div>
            <div class="meme-number">#${index + 1}</div>
        `;
        
        memeGrid.appendChild(memeItem);
    });
}

// Open meme modal
function openMemeModal(memeSrc) {
    const modal = document.getElementById('memeModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = memeSrc;
    modal.classList.add('active');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close meme modal
function closeMemeModal() {
    const modal = document.getElementById('memeModal');
    modal.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.getElementById('memeModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMemeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMemeModal();
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize meme gallery
    initMemeGallery();
    
    // Add click handler to "Check Out My Memes" button
    const memeButton = document.querySelector('.btn-gradient');
    if (memeButton) {
        memeButton.addEventListener('click', function() {
            document.querySelector('.meme-gallery').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.section-header, .meme-item, .strength-card, .about-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading state for images
function handleImageLoad() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleImageLoad();
});