'use strict';

// select all <a> tags with class 'to-scroll' 
const links = document.querySelectorAll('a.to-scroll');

// attach event listener to each link (above) & pass event & href value
// ASIDE: 'link.hash' = alternative syntax for 'link.getAttribute('href')'
links.forEach(link => {
  link.addEventListener('click', (event) => {
    return smoothScroll(event, link.getAttribute('href'));
  });
});

// scroll an element into view smoothly
const smoothScroll = (event, targetEl) => {
  event.preventDefault();
  const scrollTarget = document.querySelector(targetEl);
  scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
};
