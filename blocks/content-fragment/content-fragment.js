export default async function decorate(block) {
    console.log("Content Fragment component executed successfully");
    const offerpath = block.querySelector(':scope div:nth-child(1) > div a').innerHTML.trim();
    const cfReq = await fetch("https://author-p140426-e1433687.adobeaemcloud.com/content/dam/mobile/en/fragments/default/jcr%3Acontent/data/master.json")
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
        <div class="banner-container" style="background-image: url('${cfReq.bannerimage}')">
          <div class="banner-overlay">
            <div class="banner-text-content">
              ${cfReq.preTitle ? `<p data-aue-prop="preTitle" data-aue-type="text" class="pretitle">${cfReq.preTitle}</p>` : ''}
              ${cfReq.title ? `<h1 data-aue-prop="title" data-aue-type="text" class="headline">${cfReq.title}</h1>` : ''}
              ${cfReq.subtitle ? `<h2 data-aue-prop="subtitle" data-aue-type="text" class="subtitle">${cfReq.subtitle}</h2>` : ''}
              ${cfReq.description ? `<p data-aue-prop="description" data-aue-type="text" class="description">${cfReq.description}</p>` : ''}
              ${cfReq.shortDescription ? `<p data-aue-prop="shortDescription" data-aue-type="text" class="short-description">${cfReq.shortDescription}</p>` : ''}
              ${cfReq.ctaRedirectLink ? `
                <div class="button-container">
                  <a data-aue-prop="ctaUrl" data-aue-type="text" href="${cfReq.ctaRedirectLink}" 
                     title="${cfReq.ctaButtonText}" class="cta-button">
                    ${cfReq.ctaButtonText}
                  </a>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }