
export default function decorate(block) {
  // Create container for the merge scroll effect
  const container = document.createElement('div');
  container.className = 'merge-scroll-container';
  
  // Get all content from the block
  const content = block.innerHTML;
  
  // Create content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'merge-scroll-content';
  contentWrapper.innerHTML = content;
  
  // Add content to container
  container.appendChild(contentWrapper);
  
  // Clear block and add container
  block.innerHTML = '';
  block.appendChild(container);
  
  // Add scroll event listener for the merge effect
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const direction = scrollTop > lastScrollTop ? 'down' : 'up';
    
    // Apply transform based on scroll direction
    const speed = 0.5; // Adjust this value to control the merge effect speed
    const transform = direction === 'down' 
      ? `translateY(${scrollTop * speed}px)`
      : `translateY(${scrollTop * speed}px)`;
    
    contentWrapper.style.transform = transform;
    lastScrollTop = scrollTop;
  });
} 