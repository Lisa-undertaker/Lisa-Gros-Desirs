(() => {
    const pagesEl = document.getElementById('pages');
    const pages = document.querySelectorAll('.page');
    const numPages = pages.length;
    let currentPage = 0;
    let isScrolling = false;
  
    function animatePage(index) {
      pages.forEach(p => p.classList.remove('animated'));
      const active = pages[index];
      if (active) active.classList.add('animated');
    }
  
    function scrollToPage(index) {
      if (index < 0) index = numPages - 1;
      if (index >= numPages) index = 0;
      pagesEl.scrollTo({
        top: window.innerHeight * index,
        behavior: 'smooth'
      });
      currentPage = index;
      animatePage(index);
    }
  
    // Défilement à la molette
    let wheelTimeout;
    pagesEl.addEventListener('wheel', e => {
      e.preventDefault();
      if (isScrolling) return;
      isScrolling = true;
      if (e.deltaY > 0) scrollToPage(currentPage + 1);
      else if (e.deltaY < 0) scrollToPage(currentPage - 1);
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => { isScrolling = false; }, 700);
    }, { passive: false });
  
    // Défilement tactile
    let startY = 0;
    pagesEl.addEventListener('touchstart', e => startY = e.touches[0].clientY);
    pagesEl.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    pagesEl.addEventListener('touchend', e => {
      const delta = startY - e.changedTouches[0].clientY;
      if (isScrolling) return;
      if (delta > 50) scrollToPage(currentPage + 1);
      else if (delta < -50) scrollToPage(currentPage - 1);
      isScrolling = true;
      setTimeout(() => isScrolling = false, 700);
    });
  
    // Initialisation
    window.addEventListener('load', () => {
      scrollToPage(0);
      animatePage(0);
    });
  
    // Gestion des menus burgers
    document.querySelectorAll('.burger').forEach(burger => {
      const menu = burger.nextElementSibling;
      const toggleMenu = () => {
        const active = burger.classList.toggle('active');
        menu.style.display = active ? 'flex' : 'none';
      };
      burger.addEventListener('click', toggleMenu);
      burger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMenu();
        }
      });
      menu.querySelectorAll('a').forEach(link =>
        link.addEventListener('click', () => {
          burger.classList.remove('active');
          menu.style.display = 'none';
        })
      );
    });
  })();
  