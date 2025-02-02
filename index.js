// Toggle Menu for Hamburger Icon
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the document
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close Menu When Clicking Outside
document.addEventListener('click', (e) => {
    if (menu.classList.contains('active') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Slider Functionality
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');
let dots = document.querySelectorAll('.dots .dot');
let pausePlayButton = document.getElementById('pausePlay');

let countItem = items.length;
let itemActive = 0;
let isPlaying = true;
let refreshInterval = setInterval(() => next.click(), 5000);

// Next Button
next.onclick = function () {
    itemActive = (itemActive + 1) % countItem;
    showSlider();
};

// Previous Button
prev.onclick = function () {
    itemActive = (itemActive - 1 + countItem) % countItem;
    showSlider();
};

// Dots Navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});

// Thumbnail Navigation
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});

// Pause/Play Button
pausePlayButton.onclick = function () {
    isPlaying = !isPlaying;
    pausePlayButton.textContent = isPlaying ? '⏸' : '▶';
    if (isPlaying) {
        refreshInterval = setInterval(() => next.click(), 5000);
    } else {
        clearInterval(refreshInterval);
    }
};

// Show Slider Function
function showSlider() {
    // Remove active class from old items
    document.querySelector('.slider .list .item.active').classList.remove('active');
    document.querySelector('.thumbnail .item.active').classList.remove('active');
    document.querySelector('.dots .dot.active').classList.remove('active');

    // Add active class to new items
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    dots[itemActive].classList.add('active');

    // Scroll thumbnail into view
    thumbnails[itemActive].scrollIntoView({ behavior: 'smooth', inline: 'nearest' });

    // Reset autoplay interval
    if (isPlaying) {
        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => next.click(), 5000);
    }
}