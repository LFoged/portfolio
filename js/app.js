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
  const homeLeft = homeRect.left;
  const homeRight = homeRect.right;
  // projects section top & bottom
  const projectsRect = projectsSection.getBoundingClientRect();
  const projectsLeft = projectsRect.left;
  const projectsRight = projectsRect.right;
  // about section top & bottom
  const aboutRect = aboutSection.getBoundingClientRect();
  const aboutLeft = aboutRect.left;
  const aboutRight = aboutRect.right;

  // width of viewport (window.innerWidth) <= horizontal scrolling
  const innerWidth = window.innerWidth;

  // apply 'current' class to a nav-link
  const applyCurrentClass = (navLinkIndex) => {
    return navLinks[navLinkIndex].classList.add('current');
  };

  // 'applyCurrentClass()' on nav-link if el fully visible (horizontal)
  const applyCurrentClassIfFullyVisible = (elArrays) => {
    elArrays.forEach((elArray, index) => {
      const [elLeft, elRight] = elArray;

      if (!(elLeft >= 0) || !(elRight <= innerWidth)) {
        return false;
      }

      return applyCurrentClass(index);
    });
  };

  return applyCurrentClassIfFullyVisible([
    [homeLeft, homeRight],
    [projectsLeft, projectsRight],
    [aboutLeft, aboutRight]
  ]);
})();


// event listeners to apply 'current' class to nav-links when relevant
const eventListenerCtrl = (() => {
  const doc = document;

  // 'nav-link' <div> in nav-bar
  const navLinkDiv = doc.querySelector('.nav-links');
  // in-text-link to 'projects'
  const projectsLink = doc.querySelector('.to-projects');
  // int-text-link to 'about'
  const aboutLink = doc.querySelector('.to-about');
  // all nav-links (<a>)
  const navLinks = doc.querySelectorAll('.nav-link');

  // remove 'current' class from all nav-links
  const removeCurrentClassFromAllNavLinks = () => {
    return navLinks.forEach((link) => link.classList.remove('current'));
  }

  const setCurrentClassOnNavLink = (navLinkIndex = 0) => {
    removeCurrentClassFromAllNavLinks();
    return navLinks[navLinkIndex].classList.add('current');
  };

  /* EVENT LISTENERS */
  // apply 'current' class to clicked nav-link
  navLinkDiv.addEventListener('click', (event) => {
    if (event.target['tagName'] === 'A') {
      removeCurrentClassFromAllNavLinks();
      return event.target['classList'].add('current');
    }
  });

  // 'current' class to 'projects' nav-link when in-text-link clicked @'home'
  projectsLink.addEventListener('click', (event) => {
    return setCurrentClassOnNavLink(1);
  });

  // 'current' class to 'about' nav-link when in-text-link clicked @'home'
  aboutLink.addEventListener('click', (event) => {
    return setCurrentClassOnNavLink(2);
  });
})();
