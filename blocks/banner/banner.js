export default function decorate(block) {
  // Get the banner content
  const content = block.children[0];
  const image = block.children[1];

  // Create banner structure
  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';

  

  let imgLeft = document.createElement("div");
  imgLeft.setAttribute("class", "img-left");
  imgLeft.innerHTML = `
  <a class="w-full -mr-4 z-10" href="/personal-banking/safe-deposit-locker">
    <div class="sc-eauhAA cWzrkZ h-60">
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
        <!-- SVG path data -->
      </svg>
      <div class="text">Lockers</div>
      <div class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>
    </div>
  </a>
  <a class="w-full -mr-4 z-20" href="/business-banking/accounts/current-account">
    <div class="sc-eauhAA cWzrkZ h-80">
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
        <!-- SVG path data -->
      </svg>
      <div class="text">Current<br>Account</div>
      <div class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>
    </div>
  </a>
  <a class="w-full -mr-4 z-30" href="/personal-banking/accounts/savings-account">
    <div class="sc-eauhAA cWzrkZ h-96">
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
        <!-- SVG path data -->
      </svg>
      <div class="text">Savings<br>Account</div>
      <div class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>
    </div>
  </a>
`;

bannerContent.appendChild(imgLeft);

  // Move the content
  while (content.firstElementChild) {
    bannerContent.appendChild(content.firstElementChild);
  }


  let imgRight = document.createElement("div");
  imgRight.setAttribute("class", "img-right");
  imgRight.innerHTML = `
  <a class="w-full -ml-4 z-30" href="/personal-banking/deposits/fixed-deposit">
    <div class="sc-eauhAA cWzrkZ h-96">
      <svg width="73" height="70" viewBox="0 0 73 70" fill="none">
        <!-- SVG path data -->
      </svg>
      <div class="text">Fixed<br>Deposit</div>
      <div class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>
    </div>
  </a>
  <a class="w-full -ml-4 z-20" href="/personal-banking/deposits/recurring-deposit">
    <div class="sc-eauhAA cWzrkZ h-80">
      <svg width="74" height="70" viewBox="0 0 74 70" fill="none">
        <!-- SVG path data -->
      </svg>
      <div class="text">Recurring<br>Deposit</div>
      <div class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>
    </div>
  </a>
  <a class="w-full -ml-4 z-10" href="/personal-banking/loans/personal-loan">
    <div class="sc-eauhAA cWzrkZ h-60">
      <svg width="71" height="70" viewBox="0 0 71 70" fill="none">
        <!-- SVG path data -->
      </svg>
      <div class="text">Personal<br>Loans</div>
      <div class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>
    </div>
  </a>
`;
bannerContent.appendChild(imgRight);
  


  // Clear the block and add the new structure
  block.textContent = '';
  block.appendChild(bannerContent);
  //block.appendChild(bannerImage);

  // Add animation class after a short delay
  setTimeout(() => {
    block.classList.add('banner-visible');
  }, 100);
} 