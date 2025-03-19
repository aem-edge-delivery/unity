import {
  sampleRUM,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './aem.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  );
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
  import('./sidekick.js').then(({ initSidekick }) => initSidekick());
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();



// Handle scroll-based background color changes for specific classes
function handleClassScrollFocus() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add focused background color with animation when element is in view
        entry.target.style.transition = 'background-color 0.5s ease';
        if (entry.target.classList.contains('within-reach')) {
          entry.target.style.backgroundColor = '#e6f4ff';
          entry.target.previousElementSibling.style.backgroundColor = '#e6f4ff'; // Uncommented this line
        } else if (entry.target.classList.contains('take-charge')) {
          entry.target.style.backgroundColor = '#fff6e0';
          entry.target.previousElementSibling.style.backgroundColor = '#fff6e0';
        } else if (entry.target.classList.contains('banking-simple')) {
          entry.target.style.backgroundColor = '#f8eeff';
          entry.target.previousElementSibling.style.backgroundColor = '#f8eeff';
        } else if (entry.target.classList.contains('elevate-banking')) {
          entry.target.style.backgroundColor = '#000000';
          entry.target.previousElementSibling.style.backgroundColor = '#000000';
        }
      } else {
        // Reset to default with animation when out of view
        entry.target.style.transition = 'background-color 0.5s ease';
        entry.target.style.backgroundColor = '';
        if (entry.target.previousElementSibling) {
          entry.target.previousElementSibling.style.backgroundColor = '';
        }
      }
    });
  }, {
    threshold: 0.3 // Trigger when 30% of element is visible
  });

  // Observe elements with specific classes
  const classesToObserve = [
    'within-reach',
    'take-charge', 
    'banking-simple',
    'elevate-banking'
  ];

  classesToObserve.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(element => {
      observer.observe(element);
    });
  });
}

// Initialize class-specific scroll focus handling
window.addEventListener('load', handleClassScrollFocus);





// Add slider navigation buttons to cards
function addCardNavigation() {
  const cardContainers = document.querySelectorAll('.cards');
  
  cardContainers.forEach(container => {
    const cardList = container.querySelector('ul');
    if (!cardList) return;

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lt;';
    prevButton.classList.add('card-nav', 'prev');
    
    const nextButton = document.createElement('button'); 
    nextButton.innerHTML = '&gt;';
    nextButton.classList.add('card-nav', 'next');

    // Add click handlers
    let scrollAmount = 0;
    const cardWidth = cardList.offsetWidth;

    prevButton.addEventListener('click', () => {
      scrollAmount = Math.max(scrollAmount - cardWidth, 0);
      cardList.scroll({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    nextButton.addEventListener('click', () => {
      scrollAmount = Math.min(scrollAmount + cardWidth, cardList.scrollWidth - cardList.clientWidth);
      cardList.scroll({
        left: scrollAmount,
        behavior: 'smooth' 
      });
    });

    // Add buttons to container
    container.style.position = 'relative';
    container.appendChild(prevButton);
    container.appendChild(nextButton);
  });
}

// Initialize card navigation
window.addEventListener('load', addCardNavigation);
