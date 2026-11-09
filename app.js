(()=>{
  const menuButton=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.main-nav');
  const year=document.querySelector('#year');
  const offerLink=document.querySelector('.offer-link');
  const offerSection=document.querySelector('.featured-offer');
  const offerTitle=document.querySelector('#offer-title');
  const offerDescription=document.querySelector('.offer-description');

  year.textContent=new Date().getFullYear();

  menuButton.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Open navigation');
  }));

  // Frontend data contract for the future admin-managed featured offer.
  // The live admin/backend can provide window.PP_FEATURED_OFFER later.
  const offer=window.PP_FEATURED_OFFER||null;
  if(offer&&offerSection){
    const safeUrl=(()=>{try{const url=new URL(offer.url);return url.protocol==='https:'&&['amazon.in','www.amazon.in'].includes(url.hostname)?url.href:''}catch{return ''}})();
    if(safeUrl){
      if(offer.title)offerTitle.textContent=offer.title;
      if(offer.description)offerDescription.textContent=offer.description;
      offerLink.href=safeUrl;
      offerLink.target='_blank';
      offerLink.rel='noopener noreferrer';
      offerLink.textContent=`${offer.buttonLabel||'View featured find'} ↗`;
      offerLink.removeAttribute('aria-disabled');
      offerSection.hidden=false;
    }
  }
})();
