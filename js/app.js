'use strict';

// select all <a> tags with class 'to-scroll' 
const links = document.querySelectorAll('a.to-scroll');

// attach event listener to each link (above) => pass event & href (link.hash)
links.forEach(link => {
  link.addEventListener('click', (event) => smoothScroll(event, link.hash));
});

// scroll an element into view smoothly
const smoothScroll = (event, targetEl) => {
  event.preventDefault();
  const toScroll = document.querySelector(targetEl);
  return toScroll.scrollIntoView({ behavior: "smooth", block: "start" });
};
