export default async function decorate(block) {
    const offerpath = block.querySelector(':scope div:nth-child(1) > div a').innerHTML.trim();
    const cfReq = await fetch("https://author-p140426-e1433687.adobeaemcloud.com" + offerpath + "/jcr%3Acontent/data/master.json")
    .then((response) => response.json()).then((contentfragment) => {
      let offer = {};
      if (contentfragment) {
        offer.description = contentfragment.description;
        offer.ctaurl = contentfragment.ctaurl;
        offer.ctalabel = contentfragment.ctalabel;
        offer.bannerimage = contentfragment.bannerimage;
        offer.title = contentfragment.title;
        offer.subtitle = contentfragment.subtitle;
      }
      return offer;
    });
    
    block.innerHTML = `
      <div class="banner-content" data-aue-type="reference" data-aue-filter="cf">
        <div class="banner-text-header">
          ${cfReq.title ? `<h1 data-aue-prop="title" data-aue-type="text" class="headline">${cfReq.title}</h1>` : ''}
          ${cfReq.subtitle ? `<h2 data-aue-prop="subtitle" data-aue-type="text" class="subtitle">${cfReq.subtitle}</h2>` : ''}
        </div>
        <div class="banner-container">
          <img src="${cfReq.bannerimage}" alt="${cfReq.title || 'Banner image'}" class="banner-image">
          <div class="banner-overlay">
            <div class="banner-text-content">
              ${cfReq.description ? `<p data-aue-prop="description" data-aue-type="text" class="description">${cfReq.description}</p>` : ''}
              ${cfReq.ctaurl ? `
                <div class="button-container">
                  <a data-aue-prop="ctaUrl" data-aue-type="text" href="${cfReq.ctaurl}" 
                     title="${cfReq.ctalabel}" class="cta-button">
                    ${cfReq.ctalabel}
                  </a>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }