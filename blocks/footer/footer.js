import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');

  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const parentPath = pathSegments.length > 1 ? `/${pathSegments.slice(0, -1).join('/')}/` : '/';console.log(parentPath);

  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : parentPath+'footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
