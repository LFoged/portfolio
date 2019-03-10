'use strict';

/* SMOOTH SCROLL */
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


/* NAV-LINK - APLLY CURRENT SECTION */
// apply 'current' class to correct nav-link on page load
const isInViewPort = (() => {
  const doc = document;

  const navLinks = doc.querySelectorAll('.nav-link');

  // sections
  const homeSection = doc.querySelector('#home');
  const projectsSection = doc.querySelector('#projects');
  const aboutSection = doc.querySelector('#about');

  // home section top & bottom
  const homeRect = homeSection.getBoundingClientRect();
  const homeTop = homeRect.top;
  const homeBtm = homeRect.bottom;

  // projects section top & bottom
  const projectsRect = projectsSection.getBoundingClientRect();
  const projectsTop = projectsRect.top;
  const projectsBtm = projectsRect.bottom;

  // about section top & bottom
  const aboutRect = aboutSection.getBoundingClientRect();
  const aboutTop = aboutRect.top;
  const aboutBtm = aboutRect.bottom;

  return (
    (homeTop >= 0) && (homeBtm <= window.innerHeight)
      ? navLinks[0].classList.add('current')
      : (projectsTop >= 0) && (projectsBtm <= window.innerHeight)
        ? navLinks[1].classList.add('current')
        : (aboutTop >= 0) && (aboutBtm <= window.innerHeight)
          ? navLinks[2].classList.add('current')
          : false
  );
})();


// apply 'current' class to correct nav-link on click
document.querySelector('.nav-links').addEventListener('click', (event) => {
  const doc = document;
  const navLinks = doc.querySelectorAll('.nav-link');

  // remove 'current' class from all nav-links
  navLinks.forEach((link) => link.classList.remove('current'));

  // if user clicks on an icon, add 'current' class to parent nav-link
  if (event.target['tagName'] === 'IMG') {
    return event.target['parentElement'].classList.add('current');
  }

  return event.target['classList'].add('current');
});
