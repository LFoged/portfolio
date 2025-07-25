'use strict';

const init = (() => {
  const doc = document;

  /* SMOOTH SCROLL */
  (() => {
    // set eventListeners directly on <a> tags with class 'to-scroll' 
    const scrollNavLinks = doc.querySelectorAll('a.to-scroll');
    scrollNavLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = link.getAttribute('href');
        const targetSection = doc.querySelector(target);

        return (
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" })
        );
      });
    });
  })();

  /* NAV-LINK - apply 'current' class to icon of section in view */
  (() => {
    const sections = doc.querySelectorAll('.section');
    // set each icon to var w/ name of corresponding section id
    const navIcons = doc.querySelectorAll('.nav-link-icon');
    const iconIndexBySection = { home: 0, projects: 1, about: 2 };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // find correct icon via 'id' of section in view 
          const { id } = entry.target;
          const targetIconIndex = iconIndexBySection[ id ];
          navIcons.forEach((icon, index) => {
            if (index === targetIconIndex) {
              return icon.classList.add('current');
            }

            return icon.classList.remove('current');
          });
        }
      });
    }, { threshold: .4 });

    return sections.forEach(section => observer.observe(section));
  })();

  /* CHANGING HEADER (home section) */
  (() => {
    const target = doc.querySelector('.changing-header');
    const titles = [ 'Sales Engineer', 'Technical Project Manager', 'Web Developer' ];
    const numTitles = titles.length;
    let indexCount = 0;

    const displayNewJobTitle = (titleToDisplay) => {
      return target.textContent = titleToDisplay;
    };

    setInterval(() => {
      if (!(indexCount < numTitles)) {
        indexCount = 0;
      }
      displayNewJobTitle(titles[ indexCount ]);

      return indexCount += 1;
    }, 2000);
  })();
})();
