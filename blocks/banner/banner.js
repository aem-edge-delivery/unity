export default function decorate(block) {
  // Get the banner content
  const content = block.children[0];
  const image = block.children[1];

  // Create banner structure
  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';
  
  // Move the content
  while (content.firstElementChild) {
    bannerContent.appendChild(content.firstElementChild);
  }


  // Clear the block and add the new structure
  block.textContent = '';
  block.appendChild(bannerContent);
  //block.appendChild(bannerImage);

  // Add animation class after a short delay
  setTimeout(() => {
    block.classList.add('banner-visible');
  }, 100);
} 