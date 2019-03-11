'use strict';

/* SMOOTH SCROLL */
// select all <a> tags with class 'to-scroll' 
const links = document.querySelectorAll('a.to-scroll');

// attach event listener to each link (above) & pass event & href value
links.forEach(link => {
  link.addEventListener('click', (event) => {
    // ASIDE: 'link.hash' = alt. syntax for 'link.getAttribute('href')'
    return smoothScroll(event, link.getAttribute('href'));
  });
});

// scroll an element into view smoothly
const smoothScroll = (event, targetEl) => {
  event.preventDefault();
  const scrollTarget = document.querySelector(targetEl);
  scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
};


/* NAV-LINK - APPLY 'CURRENT' CLASS WHEN SECTION 100% IN VIEWPORT */
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


const eventListenerCtrl = (() => {
  const doc = document;

  // 'nav-link' <div> in nav-bar
  const navLinkDiv = doc.querySelector('.nav-links');
  // 'home-cta' section
  const homeCtaDiv = doc.querySelector('.home-cta');
  // all nav-links (<a>)
  const navLinks = doc.querySelectorAll('.nav-link');

  // remove 'current' class from all nav-links
  const removeCurrentClass = () => {
    return navLinks.forEach((link) => link.classList.remove('current'));
  }

  /* EVENT LISTENERS */
  // apply 'current' to clicked nav-link
  navLinkDiv.addEventListener('click', (event) => {
    if (event.target['tagName'] === 'A') {
      removeCurrentClass();
      return event.target['classList'].add('current');
    }
  });

  // 'current' class to 'about' nav-link when in-text-link clicked @'home'
  homeCtaDiv.addEventListener('click', (event) => {
    const targetTagName = event.target['tagName'];
    if ((targetTagName === 'A') || (targetTagName === 'H2')) {
      removeCurrentClass();
      return navLinks[2].classList.add('current');
    }
  });
})();
