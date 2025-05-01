// Select all sections and navbar links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

// Function to remove active class from all links
function removeActiveClasses() {
    navLinks.forEach(link => link.classList.remove('active'));
}

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Optional: close menu when a link is clicked (mobile UX)
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// Function to add active class to the current section's link
function addActiveClassToLink(id) {
    const activeLink = document.querySelector(`nav a[href="#${id}"]`);
    activeLink.classList.add('active');
}

// Click event to handle immediate highlighting when clicking on a navbar link
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor click behavior

        // Scroll to the section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Remove active class from all links and add to the clicked link
        removeActiveClasses();
        this.classList.add('active');
    });
});

// Intersection Observer to observe sections in view when scrolling
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            // Only update active class if the clicked link isn't already active
            if (!document.querySelector('nav a.active').href.endsWith(`#${id}`)) {
                removeActiveClasses();
                addActiveClassToLink(id);
            }
        }
    });
}, {
    threshold: 0.5 // Adjust this threshold to control when the active class is applied (60% of the section in view)
});

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});


// JavaScript to set the progress dynamically
document.querySelectorAll('.progress-circle .progress').forEach(circle => {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    // Set the stroke dasharray to the circumference of the circle
    circle.style.strokeDasharray = `${circumference}`;

    // Get the percentage value from the data attribute
    const percentage = circle.getAttribute('data-percentage');

    // Calculate the stroke-dashoffset based on the percentage
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
});
