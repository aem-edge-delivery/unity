export default async function decorate(block) {
    console.log("offer component executed successfully");
    const aempublishurl = 'https://publish-p140426-e1433687.adobeaemcloud.com/';
    const aemauthorurl = 'https://author-p140426-e1433687.adobeaemcloud.com/';
    const offerpath = block.querySelector(':scope div:nth-child(1) > div a').innerHTML.trim();
    const cfReq = await fetch("https://author-p148716-e1519766.adobeaemcloud.com"+offerpath+"/jcr%3Acontent/data/master.json")
    .then((response) => response.json()).then((contentfragment) => {
      let offer = {};
      if (contentfragment) {
        offer.ctaButtonText = contentfragment.ctaButtonText;
        offer.ctaRedirectLink = contentfragment.ctaRedirectLink;
        offer.description = contentfragment.description;
        offer.imagePath = contentfragment.imagePath;
        offer.preTitle = contentfragment.preTitle;
        offer.shortDescription = contentfragment.shortDescription;
        offer.title = contentfragment.title;
      }
      return offer;
    });
    
    block.innerHTML = '<div class="banner-content" data-aue-type="reference" data-aue-filter="cf"><div data-aue-prop="heroImage" data-aue-type="media" class="banner-detail"><p data-aue-prop="title" data-aue-type="text" class="headline">'+ cfReq.title + '</p>'+
        '<p data-aue-prop="description" data-aue-type="text" class="headline">'+cfReq.description +'</p><img src="'+cfReq.imagePath+'"></img><p data-aue-prop="shortDescription" data-aue-type="text" class="short-description">'+cfReq.shortDescription+'</p>'+
        '<p data-aue-prop="preTitle" data-aue-type="text" class="pretitle">'+cfReq.preTitle+'</p><p class="button-container"><a data-aue-prop="ctaUrl" data-aue-type="text" href="'+cfReq.ctaRedirectLink+'" title="'+cfReq.ctaButtonText+'" class="hyperlink">'+cfReq.ctaButtonText+'</a></p></div></div>';
  }