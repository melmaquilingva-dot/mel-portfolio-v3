document.documentElement.classList.add('js');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(value,min,max)=>Math.min(Math.max(value,min),max);
requestAnimationFrame(()=>document.body.classList.add('is-loaded'));
const revealItems=document.querySelectorAll('[data-reveal]');
if(reduceMotion){revealItems.forEach(item=>item.classList.add('is-visible'))}else{const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});revealItems.forEach(item=>revealObserver.observe(item))}
const cards=[...document.querySelectorAll('.stack-card')];const parallaxImages=[...document.querySelectorAll('[data-parallax]')];let ticking=false;
function updateMotion(){const scrollable=document.documentElement.scrollHeight-window.innerHeight;const progress=scrollable>0?(window.scrollY/scrollable)*100:0;document.documentElement.style.setProperty('--scroll-progress',progress.toFixed(3));if(!reduceMotion&&window.innerWidth>650){cards.forEach((card,index)=>{const next=cards[index+1];if(!next)return;const nextTop=next.getBoundingClientRect().top;const amount=clamp((window.innerHeight*.72-nextTop)/(window.innerHeight*.45),0,1);card.style.transform=`scale(${1-amount*.035}) translateY(${-amount*8}px)`;card.style.filter=`brightness(${1-amount*.17})`});parallaxImages.forEach(image=>{const rect=image.parentElement.getBoundingClientRect();const amount=clamp((window.innerHeight-rect.top)/(window.innerHeight+rect.height),0,1);image.style.transform=`scale(1.06) translateY(${(amount-.5)*24}px)`})}ticking=false}
function queueMotion(){if(!ticking){requestAnimationFrame(updateMotion);ticking=true}}
window.addEventListener('scroll',queueMotion,{passive:true});window.addEventListener('resize',queueMotion);updateMotion();
const params=new URLSearchParams(window.location.search);if(params.get('submitted')==='true'){document.querySelectorAll('.form-status').forEach(status=>status.classList.add('visible'))}
