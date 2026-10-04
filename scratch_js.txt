
'use strict';

/* ===== PRICING — mirrors admin.html and server.js ===== */
const CAGE_YD = 18;
const PRICING = {
  loads:[
    {id:'min',  name:'Minimum load',price:89, kg:100, cuyd:1, bags:'10 bags',    mins:'10 min loading'},
    {id:'small',name:'Small load',  price:149,kg:150, cuyd:2, bags:'20 bags',    mins:'15 min loading'},
    {id:'med',  name:'Medium load', price:289,kg:350, cuyd:4, bags:'20–40 bags', mins:'20 min loading'},
    {id:'large',name:'Large load',  price:369,kg:700, cuyd:8, bags:'40–60 bags', mins:'30 min loading'},
    {id:'lp',   name:'Large+ load', price:449,kg:1000,cuyd:14,bags:'60–80 bags', mins:'40 min loading'},
    {id:'lpp',  name:'Large++ load',price:549,kg:1500,cuyd:18,bags:'80–150 bags',mins:'1 hour loading',best:true}
  ],
  items:[
    {id:'fridge',name:'Fridge or freezer',price:79},{id:'matt-s',name:'Mattress, single',price:50},
    {id:'matt-d',name:'Mattress, double',price:60},{id:'matt-k',name:'Mattress, kingsize',price:80},
    {id:'sofa',name:'Sofa, from',price:80},
    
    {id:'tyre',name:'Tyre',price:25},{id:'bin',name:'Wheelie bin emptied',price:45}
  ],
  extras:{inside:25,dismantleFirstTwo:25,dismantlePerExtra:10},
  discounts:{account:0.10,sub:0.15,guest:0}
};
/* Cage interior measured from the van photograph, as % of the image. */
const VAN_BOX={left:9.26,top:24.47,width:48.61,height:38.90};

const WASTE_TYPES=[
  {id:'builders',label:"Builders' waste"},{id:'household',label:'Household'},{id:'furniture',label:'Furniture'},
  {id:'garden',label:'Garden'},{id:'green',label:'Green waste'},{id:'wood',label:'Wood'},
  {id:'cardboard',label:'Cardboard'},{id:'food',label:'Food waste'},{id:'mixed',label:'Mixed waste'}
];
const ICONS={
  builders:'<path d="M3 20h18M5 20v-7h6v7M13 20v-11h6v11M5 13h6M13 9h6"/>',
  household:'<path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6"/>',
  furniture:'<path d="M3 11V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3M3 11h18v6H3zM5 17v3M19 17v3"/>',
  garden:'<path d="M12 21V9M12 9c0-3 2-5 5-5 0 3-2 5-5 5zM12 12c0-3-2-5-5-5 0 3 2 5 5 5z"/>',
  green:'<path d="M5 21c0-8 5-13 14-14 0 9-5 14-14 14zM8 18c2-4 5-7 9-9"/>',
  wood:'<path d="M4 7h11a3 3 0 0 1 0 10H4zM4 7a3 3 0 0 0 0 10"/>',
  cardboard:'<path d="M3 8l9-4 9 4v9l-9 4-9-4zM3 8l9 4 9-4M12 12v9"/>',
  food:'<path d="M5 3v8a3 3 0 0 0 6 0V3M8 11v10M16 3c-1.5 2-2 4-2 6s.5 3 2 3 2-1 2-3-.5-4-2-6zM16 12v9"/>',
  mixed:'<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/>'
};
const JOB_PHOTOS=[
  {src:'/assets/image_2.jpg',cap:'Site clearance, caged tipper loaded',area:'Marylebone, W1U',file:'photo-01.jpg'},
  {src:'/assets/image_3.jpg',cap:'Shop-fit strip-out, Marylebone',area:'Marylebone, W1U',file:'photo-02.jpg'},
  {src:'/assets/image_4.jpg',cap:'Rubble bag mountain, Fitzrovia',area:'Fitzrovia, W1T',file:'photo-03.jpg'},
  {src:'/assets/image_5.jpg',cap:'Restaurant refit waste, Foley Street',area:'Fitzrovia, W1W',file:'photo-04.jpg'},
  {src:'/assets/image_6.jpg',cap:'Office furniture clearance, Mayfair',area:'Mayfair, W1K',file:'photo-05.jpg'},
  {src:'/assets/image_7.jpg',cap:'Caged tipper on a City street',area:'City of London, EC3',file:'photo-06.jpg'},
  {src:'/assets/image_8.jpg',cap:'Timber and flooring, Leadenhall',area:'City of London, EC3',file:'photo-07.jpg'},
  {src:'/assets/image_9.jpg',cap:'Timber strip-out, Belgravia',area:'Belgravia, SW1X',file:'photo-08.jpg'},
  {src:'/assets/image_10.jpg',cap:'Fly-tip cleared from a shop front',area:'Oxford Circus, W1B',file:'photo-09.jpg'},
  {src:'/assets/image_11.jpg',cap:'Fly-tip clearance, Rotherhithe',area:'Rotherhithe, SE16',file:'photo-10.jpg'},
  {src:'/assets/image_12.jpg',cap:'Bagged waste, basement bin store',area:'Soho, W1D',file:'photo-11.jpg'},
  {src:'/assets/image_13.jpg',cap:'Builders’ waste, rear yard',area:'Knightsbridge, SW7',file:'photo-12.jpg'},
  {src:'/assets/image_14.jpg',cap:'Shop clearance, north London',area:'Paddington, W2',file:'photo-13.jpg'},
  {src:'/assets/image_15.jpg',cap:'Garden shed clearance',area:'Chelsea, SW3',file:'photo-14.jpg'},
  {src:'/assets/image_16.jpg',cap:'Late-night collection, West End',area:'Soho, W1D',file:'photo-15.jpg'},
  {src:'/assets/image_17.jpg',cap:'City of London, Lime Street',area:'City of London, EC3',file:'photo-16.jpg'},
  {src:'/assets/image_18.jpg',cap:'The Shard from Tower Bridge',area:'Tower Bridge, SE1',file:'photo-17.jpg'},
  {src:'/assets/image_19.jpg',cap:'Tower Bridge at dusk',area:'Tower Bridge, SE1',file:'photo-18.jpg'}
];
/* Placeholder — replace with a live Google Business Profile feed. */
const REVIEWS=[
  {n:'Sarah K.',t:"Builders' waste cleared the same afternoon."},
  {n:'Marcus O.',t:'Full office strip-out over a weekend. Invoice matched the quote.'},
  {n:'Priya D.',t:'Garden waste gone next morning. Straightforward pricing.'},
  {n:'Tom B.',t:'Turned up inside the window and called ahead. No fuss.'},
  {n:'Aisha R.',t:'Booked at 9am, cleared by 2pm. Sent the paperwork over.'},
  {n:'Dan W.',t:'Two-man team shifted a sofa down three flights without drama.'}
];

const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const money=n=>'£'+n.toFixed(2).replace(/\.00$/,'');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

let SHOP_BASKET={};
try{SHOP_BASKET=JSON.parse(localStorage.getItem('pw_basket')||'{}');}catch(e){}
/* Advertised shop prices, mirrored from shop.html */
const SHOP_PRICES={rubble100:37.69,tonnebag:8.99,'glove-orange':1.90,'glove-mp1':2.50,'glove-nitrile':1.90,'glove-hantex':7.50,ffp3:19.99,coverall:8.79,vest:6.40};
const SHOP_NAMES={rubble100:'Rubble sacks (100)',tonnebag:'1 tonne bulk bag','glove-orange':'Latex grip gloves','glove-mp1':'MP1 gloves','glove-nitrile':'Nitrile gloves','glove-hantex':'Hantex cut-D gloves',ffp3:'FFP3 masks (10)',coverall:'Type 5/6 coverall',vest:'Hi-vis vest'};
function shopTotal(){let t=0;for(const k in SHOP_BASKET){if(SHOP_PRICES[k])t+=SHOP_PRICES[k]*SHOP_BASKET[k];}return Math.round(t*100)/100;}
const S={postcode:'',address:'',types:[],place:'',floor:'',access:'',spot:'',
  files:[],noPhotos:false,load:null,items:{},labour:'',dis:null,disN:null,
  date:null,slot:null,park:'',ctype:'',acct:'',signedIn:'',pay:''};

/* ===== the van figure — used on the public page, in the picker and in the rail ===== */
const BESTFLAG='<span class="bestflag">Best value for money</span>';
function fillDiv(top,h){return '<div class="fill" style="left:'+VAN_BOX.left+'%;width:'+VAN_BOX.width+'%;top:'+top+'%;height:'+h+'%"></div>';}
function vanFigure(cuyd,opts){
  opts=opts||{};
  const share=Math.min(cuyd/CAGE_YD,1);
  const h=VAN_BOX.height*share;
  const top=VAN_BOX.top+(VAN_BOX.height-h);
  const tagTop=Math.max(top-1.5,VAN_BOX.top-6);
  return `<div class="vanfig">
    <img src="/assets/image_20.png" alt="${esc(opts.alt||('Tipper cage showing '+cuyd+' of '+CAGE_YD+' cubic yards filled'))}" loading="lazy">
    <div class="cage" style="left:${VAN_BOX.left}%;top:${VAN_BOX.top}%;width:${VAN_BOX.width}%;height:${VAN_BOX.height}%"></div>
    ${cuyd>0?fillDiv(top,h):""}
    ${(opts.hideTag||cuyd<=0)?'':`<div class="ydtag on-fill" style="left:${VAN_BOX.left+1.5}%;top:${tagTop}%">${cuyd} cu yd</div>`}
    ${opts.hideCap?'':`<div class="capacity">18 cu yd cage</div>`}
  </div>`;
}

/* public van grid */
$('#vanGrid').innerHTML=PRICING.loads.map(l=>`
  <article class="vcard${l.best?' best':''}">${l.best?BESTFLAG:''}
    ${vanFigure(l.cuyd,{alt:l.name+': '+l.cuyd+' of '+CAGE_YD+' cubic yards of the cage'})}
    <div class="vb">
      <span class="nm">${l.name}</span>
      <span class="pr">£${l.price}</span>
      <div class="specs"><span><b>${l.kg}kg</b> max</span><span><b>${l.cuyd}</b> of ${CAGE_YD} cu yd</span><span>${l.bags}</span><span>${l.mins}</span></div>
    </div>
  </article>`).join('');

/* flow van picker */
$('#vanPick').innerHTML=PRICING.loads.map(l=>`
  <label class="vopt${l.best?' best':''}">${l.best?BESTFLAG:''}
    <input type="radio" name="load" value="${l.id}">
    ${vanFigure(l.cuyd,{hideCap:true,alt:l.name})}
    <span class="vb">
      <span class="nm">${l.name}</span>
      <span class="pr">£${l.price}</span>
      <span class="specs"><span><b>${l.kg}kg</b></span><span><b>${l.cuyd}</b>/${CAGE_YD} cu yd</span><span>${l.bags}</span></span>
    </span>
  </label>`).join('');

$('#rateItems').innerHTML=PRICING.items.map(i=>
  `<tr><td data-l="Item">${i.name}</td><td data-l="Price" class="amt">${money(i.price)}</td></tr>`).join('');
$('#wasteTiles').innerHTML=WASTE_TYPES.map(w=>`
  <label class="tile"><input type="checkbox" name="wtype" value="${w.id}">
  <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[w.id]}</svg>
  <span class="lb">${w.label}</span></label>`).join('');
$('#itemList').innerHTML=PRICING.items.map(i=>`
  <div class="item" id="row-${i.id}">
    <span><span class="nm">${i.name}</span> <span class="pr">${money(i.price)} each</span></span>
    <span class="stepper"><button type="button" aria-label="Remove one ${esc(i.name)}" data-dec="${i.id}">−</button>
    <output id="q-${i.id}" aria-live="polite">0</output>
    <button type="button" aria-label="Add one ${esc(i.name)}" data-inc="${i.id}">+</button></span>
  </div>`).join('');
(function(){
  const t=$('#slideTrack'), d=$('#slDots');
  t.innerHTML=JOB_PHOTOS.map((p,i)=>`<img src="${p.src}" alt="${esc(p.cap)}" ${i?'loading="lazy"':''}>`).join('');
  d.innerHTML=JOB_PHOTOS.map(()=>'<i></i>').join('');
  const im=Array.from(t.children), ds=Array.from(d.children);
  let i=0, timer;
  function show(n,dir){
    const prev=i;
    i=(n+im.length)%im.length;
    im.forEach((x,k)=>{
      x.classList.remove('live','out');
      if(k===i) x.classList.add('live');
      else if(k===prev) x.classList.add(dir==='back'?'live':'out');
    });
    if(prev!==i) im[prev].classList.remove('live');
    ds.forEach((x,k)=>x.classList.toggle('live',k===i));
    $('#slArea').textContent=JOB_PHOTOS[i].area;
    $('#slCap').textContent=JOB_PHOTOS[i].cap;
    $$('#areaBar span').forEach(a=>a.classList.toggle('on', a.dataset.a===JOB_PHOTOS[i].area));
  }
  function run(){ clearInterval(timer); timer=setInterval(()=>show(i+1,'fwd'),4200); }
  $('#slPrev').onclick=()=>{show(i-1,'back');run();};
  $('#slNext').onclick=()=>{show(i+1,'fwd');run();};
  ds.forEach((x,k)=>x.onclick=()=>{show(k,'fwd');run();});
  const areas=[...new Set(JOB_PHOTOS.map(p=>p.area))];
  $('#areaBar').innerHTML=areas.map(a=>`<span data-a="${esc(a)}">${esc(a)}</span>`).join('');
  $$('#areaBar span').forEach(el=>el.onclick=()=>{
    const k=JOB_PHOTOS.findIndex(p=>p.area===el.dataset.a); if(k>=0){show(k,'fwd');run();}
  });
  show(0,'fwd'); run();
})();
$('#tickTrack').innerHTML=(()=>{const o=REVIEWS.map(r=>
  `<span class="tick-item"><span class="st">★★★★★</span><span class="nm">${esc(r.n)}</span>${esc(r.t)}</span>`).join('');return o+o;})();

/* hero slideshow */
(function(){
  const w=$('#pcSlides'),d=$('#pcDots');
  w.innerHTML=JOB_PHOTOS.map((p,i)=>`<img src="${p.src}" alt="" ${i?'loading="lazy"':''}>`).join('');
  d.innerHTML=JOB_PHOTOS.map(()=>'<i></i>').join('');
  const im=Array.from(w.children),ds=Array.from(d.children);let i=0;
  const show=n=>{im.forEach((x,k)=>x.classList.toggle('live',k===n));ds.forEach((x,k)=>x.classList.toggle('live',k===n));};
  show(0); setInterval(()=>{i=(i+1)%im.length;show(i);},2000);
})();

/* cookies */
(function(){
  let c=null; try{c=localStorage.getItem('pw_cookies');}catch(e){}
  if(!c) setTimeout(()=>$('#cookie').classList.add('up'),900);
  const set=v=>{try{localStorage.setItem('pw_cookies',v);}catch(e){} $('#cookie').classList.remove('up');};
  $('#ckYes').onclick=()=>set('all'); $('#ckNo').onclick=()=>set('essential');
})();

/* ===================== THE FLOW ===================== */
const ORDER=['address','types','place','floor','access','spot','photos',
             'load','addons','labour','dis','date','slot','park','details','acct','pay'];
const STEP_OF={address:1,types:2,place:2,floor:2,access:2,spot:2,photos:2,
               load:3,addons:3,labour:3,dis:3,date:4,slot:4,park:4,details:4,acct:4,pay:4};
const ONLY_IF={floor:()=>S.place==='inside',access:()=>S.place==='inside',spot:()=>S.place==='outside'};
const DONE={
  address:()=>$('#addr').value.trim().length>3,
  types:()=>S.types.length>0, place:()=>!!S.place, floor:()=>!!S.floor,
  access:()=>!!S.access, spot:()=>!!S.spot,
  photos:()=>S.noPhotos||S.files.filter(f=>f.type==='image').length>=3,
  load:()=>!!S.load, addons:()=>S.addonsSeen===true,
  labour:()=>!!S.labour, dis:()=>S.dis!==null&&S.dis!=='',
  date:()=>!!S.date, slot:()=>!!S.slot, park:()=>!!S.park,
  details:()=>textOk(false), acct:()=>!!S.acct, pay:()=>!!S.pay
};
const SUM={
  address:()=>$('#addr').value.trim(),
  types:()=>S.types.map(t=>WASTE_TYPES.find(w=>w.id===t).label).join(', '),
  place:()=>S.place==='inside'?'Inside the property':'Outside the property',
  floor:()=>S.floor, access:()=>S.access, spot:()=>S.spot,
  photos:()=>S.noPhotos?'No photos available':S.files.filter(f=>f.type==='image').length+' photos',
  load:()=>S.load?S.load.name+', £'+S.load.price:'',
  addons:()=>{const n=Object.values(S.items).reduce((a,b)=>a+b,0);return n?n+' item'+(n>1?'s':'')+' added':'None';},
  labour:()=>S.labour, dis:()=>S.dis,
  date:()=>S.date?S.date.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'}):'',
  slot:()=>S.slot?S.slot.label:'', park:()=>S.park,
  details:()=>$('#nm').value.trim()+($('#biz').value.trim()?' · '+$('#biz').value.trim():''),
  acct:()=>({account:'New account',guest:'Guest',sub:'Membership'})[S.acct]||'',
  pay:()=>S.pay
};
let openId='address';
const live=()=>ORDER.filter(id=>!ONLY_IF[id]||ONLY_IF[id]());

function renderFlow(){
  const vs=live(), oi=vs.indexOf(openId);
  ORDER.forEach(id=>{
    const el=$('#q-'+id); if(!el) return;
    const inPlay=vs.includes(id);
    if(!inPlay){ el.hidden=true; el.classList.remove('open','done'); return; }
    const i=vs.indexOf(id), done=DONE[id]();
    el.hidden=!(i<=oi||done);
    el.classList.toggle('open',id===openId);
    el.classList.toggle('done',done&&id!==openId);
    const sm=el.querySelector('.q-sum'); if(sm) sm.textContent=done?SUM[id]():'';
    const nm=el.querySelector('.q-num'); if(nm) nm.textContent=done&&id!==openId?'✓':String(i+1);
  });
  // progress
  const total=vs.length, doneN=vs.filter(id=>DONE[id]()).length;
  const pct=Math.round(doneN/total*100);
  $('#progBar').style.width=pct+'%'; $('#progPct').textContent=pct+'%';
  const curStep=STEP_OF[openId];
  $$('.pstep').forEach(p=>{
    const st=+p.dataset.step;
    const qs=vs.filter(id=>STEP_OF[id]===st);
    const allDone=qs.length>0&&qs.every(id=>DONE[id]());
    p.dataset.state = st===curStep?'active':(allDone?'done':'');
  });
  paint();
}
function openQ(id,scroll){
  openId=id; renderFlow();
  if(scroll!==false){
    const el=$('#q-'+id);
    requestAnimationFrame(()=>centerStep(el));
  }
}
function advance(from){
  const vs=live(), i=vs.indexOf(from);
  for(let k=i+1;k<vs.length;k++){ if(!DONE[vs[k]]()){ openQ(vs[k]); return; } }
  openQ(vs[vs.length-1]); // everything answered
}
function tryAdvance(id){
  const el=$('#q-'+id);
  if(!DONE[id]()){ el.classList.add('bad'); setTimeout(()=>el.classList.remove('bad'),2200);
    if(id==='details') textOk(true);
    flagProblem(id,el); return; }
  el.classList.remove('bad'); advance(id);
}
/* edit / reopen */
document.addEventListener('click',e=>{
  const head=e.target.closest('.q-head');
  if(head){ const q=head.closest('.q'); if(q.classList.contains('done')) openQ(q.id.replace('q-',''),true); return; }
  const adv=e.target.dataset && e.target.dataset.adv;
  if(adv){ if(adv==='addons') S.addonsSeen=true; tryAdvance(adv); }
});


/* ===== postcode (hero) ===== */
const LONDON=/^(E|EC|N|NW|SE|SW|W|WC|BR|CR|DA|EN|HA|IG|KT|RM|SM|TW|UB|WD)\d/i;
function pcMsg(kind,html){const m=$('#pcMsg');m.className='pc-msg on '+kind;m.innerHTML=html;}
function pcAccept(pc,area){
  S.postcode=pc;
  if(!$('#addr').value) $('#addr').value=pc;
  pcMsg('ok','We cover <b>'+esc(pc)+'</b>'+(area?' in '+esc(area):'')+'. Carry on below.');
  renderFlow();
  setTimeout(()=>openQ('address'),620);
}
$('#pcForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const raw=$('#pc').value.trim(), btn=$('#pcBtn');
  if(!raw){pcMsg('no','Please enter a postcode so we can check coverage.');return;}
  btn.disabled=true;btn.textContent='Checking…';
  try{
    const r=await fetch('https://api.postcodes.io/postcodes/'+encodeURIComponent(raw));
    if(r.status===404){ pcMsg('no','We could not find <b>'+esc(raw.toUpperCase())+'</b>. Please check it and try again.'); }
    else if(!r.ok){ throw new Error('lookup'); }
    else{
      const d=(await r.json()).result;
      if(d.region==='London'||LONDON.test(d.outcode)) pcAccept(d.postcode,d.admin_district);
      else pcMsg('no','<b>'+esc(d.postcode)+'</b> is in '+esc(d.admin_district)+', outside our usual London area. Message us on WhatsApp and we will tell you honestly whether we can reach you.');
    }
  }catch(err){
    /* Offline, or the page is open as a local file where the browser blocks the
       request. Do not dead-end the customer — accept a well-formed UK postcode
       and let the office confirm coverage. */
    const t=raw.toUpperCase().replace(/\s+/g,'');
    if(/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(t)){
      pcAccept(t.slice(0,-3)+' '+t.slice(-3),'');
    } else {
      pcMsg('no','We could not check that postcode just now. Please check the format, or message us on WhatsApp.');
    }
  }
  finally{ btn.disabled=false; btn.textContent='Check coverage'; }
});

/* ===== address autocomplete (postcodes.io — postcode level) ===== */
let acT;
$('#addr').addEventListener('input',e=>{
  const q=e.target.value.trim(); clearTimeout(acT);
  $('#fAddr').classList.remove('bad');
  if(q.length<2){$('#acList').classList.remove('on');return;}
  acT=setTimeout(async()=>{
    try{
      const r=await fetch('https://api.postcodes.io/postcodes/'+encodeURIComponent(q)+'/autocomplete');
      if(!r.ok) return;
      const l=(await r.json()).result||[];
      if(!l.length){$('#acList').classList.remove('on');return;}
      $('#acList').innerHTML=l.slice(0,6).map(p=>`<button type="button" data-ac="${esc(p)}">${esc(p)}</button>`).join('');
      $('#acList').classList.add('on');
    }catch(e){}
  },260);
});
$('#acList').addEventListener('click',e=>{
  const b=e.target.closest('[data-ac]'); if(!b) return;
  const cur=$('#addr').value.trim();
  const house=cur.replace(/[A-Z]{1,2}\d[A-Z\d]?\s?\d?[A-Z]{0,2}$/i,'').trim().replace(/,$/,'');
  $('#addr').value=(house?house+', ':'')+b.dataset.ac;
  $('#acList').classList.remove('on'); $('#addr').focus(); renderFlow();
});
document.addEventListener('click',e=>{ if(!e.target.closest('#q-address')) $('#acList').classList.remove('on'); });

/* ===== inputs ===== */
document.addEventListener('change',e=>{
  const t=e.target; if(!t.name) return;
  switch(t.name){
    case 'wtype': S.types=$$('input[name=wtype]:checked').map(i=>i.value); renderFlow(); return;
    case 'place': S.place=t.value; S.floor=''; S.access=''; S.spot='';
      $$('input[name=floor],input[name=access],input[name=spot]').forEach(i=>i.checked=false);
      advance('place'); return;
    case 'floor': S.floor=t.value; advance('floor'); return;
    case 'access': S.access=t.value; advance('access'); return;
    case 'spot': S.spot=t.value; advance('spot'); return;
    case 'load': S.load=PRICING.loads.find(l=>l.id===t.value); advance('load'); return;
    case 'labour': S.labour=t.value; advance('labour'); return;
    case 'dis': S.dis=t.value; S.disN=+t.dataset.n; advance('dis'); return;
    case 'slot': S.slot={v:t.value,fee:+t.dataset.fee,min:+t.dataset.min,
                   label:t.closest('.slot').querySelector('.t').textContent}; advance('slot'); return;
    case 'park': S.park=t.value; advance('park'); return;
    case 'ctype': S.ctype=t.value; renderFlow(); return;
    case 'acct': S.acct=t.value; onAccount(); return;
    case 'pay': S.pay=t.value; renderFlow(); return;
  }
});
$$('#q-details input,#q-details textarea').forEach(el=>{
  el.addEventListener('input',()=>{ el.closest('.fld') && el.closest('.fld').classList.remove('bad'); renderFlow(); });
});

/* account choice -> immediate sign-in prompt, then back to payment */
function onAccount(){
  if(S.acct==='guest'){ S.signedIn=''; $('#signedBox').innerHTML=''; advance('acct'); return; }
  $('#socTitle').textContent = S.acct==='sub' ? 'Set up your membership' : 'Set up your account';
  $('#socBlurb').textContent = S.acct==='sub'
    ? 'One tap to create the account your membership sits on. We will bring you straight back to your payment.'
    : 'One tap and you are done. We will bring you straight back to your payment.';
  openModal('socModal');
}
$$('#socModal .soc').forEach(b=>b.onclick=()=>{
  S.signedIn=b.dataset.soc;
  $('#signedBox').innerHTML=`<div class="signed"><span class="ok">✓</span>
    <span>Signed in with <b>${esc(S.signedIn)}</b>${S.acct==='sub'?' · membership applied':''}</span>
    <button type="button" id="soOut">Change</button></div>`;
  $('#soOut').onclick=()=>{ S.signedIn=''; $('#signedBox').innerHTML=''; onAccount(); };
  closeModals();
  setTimeout(()=>advance('acct'),260);   // straight back to payment
});

/* items */
document.addEventListener('click',e=>{
  const inc=e.target.dataset&&e.target.dataset.inc, dec=e.target.dataset&&e.target.dataset.dec;
  if(!inc&&!dec) return;
  const id=inc||dec;
  S.items[id]=Math.max(0,(S.items[id]||0)+(inc?1:-1));
  $('#q-'+id).textContent=S.items[id];
  $('#row-'+id).classList.toggle('has',S.items[id]>0);
  S.addonsSeen=true; renderFlow();
});

/* calendar */
const today=new Date(); today.setHours(0,0,0,0);
let vY=today.getFullYear(),vM=today.getMonth();
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
function drawCal(){
  const first=new Date(vY,vM,1),days=new Date(vY,vM+1,0).getDate(),pad=(first.getDay()+6)%7;
  const limit=new Date(today);limit.setDate(limit.getDate()+60);
  $('#calLabel').textContent=MONTHS[vM]+' '+vY;
  let h=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div class="cal-dow">${d}</div>`).join('');
  for(let i=0;i<pad;i++)h+='<div></div>';
  for(let d=1;d<=days;d++){
    const dt=new Date(vY,vM,d),off=dt<today||dt>limit,isT=dt.getTime()===today.getTime();
    const sel=S.date&&dt.getTime()===S.date.getTime();
    h+=`<button type="button" class="cal-d${isT?' today':''}" ${off?'disabled':''} aria-pressed="${sel?'true':'false'}"
      aria-label="${dt.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})}" data-d="${dt.toISOString()}">${d}</button>`;
  }
  $('#calGrid').innerHTML=h;
  $('#calPrev').disabled=(vY===today.getFullYear()&&vM===today.getMonth());
  $('#calNext').disabled=new Date(vY,vM,1)>limit;
}
$('#calPrev').onclick=()=>{if(--vM<0){vM=11;vY--;}drawCal();};
$('#calNext').onclick=()=>{if(++vM>11){vM=0;vY++;}drawCal();};
$('#calGrid').addEventListener('click',e=>{
  const b=e.target.closest('.cal-d'); if(!b||b.disabled) return;
  S.date=new Date(b.dataset.d); S.date.setHours(0,0,0,0); drawCal(); advance('date');
});
drawCal();

/* uploads */
const drop=$('#drop'),fi=$('#files');
['dragenter','dragover'].forEach(v=>drop.addEventListener(v,e=>{e.preventDefault();drop.classList.add('hot');}));
['dragleave','drop'].forEach(v=>drop.addEventListener(v,e=>{e.preventDefault();drop.classList.remove('hot');}));
drop.addEventListener('drop',e=>addFiles(e.dataTransfer.files));
fi.addEventListener('change',e=>{addFiles(e.target.files);e.target.value='';});
function addFiles(list){
  Array.from(list).forEach(f=>{
    if(!/^(image|video)\//.test(f.type)) return;
    if(f.size>25*1024*1024) return;
    if(S.files.length>=12) return;
    S.files.push({name:f.name,type:f.type.startsWith('video')?'video':'image',url:URL.createObjectURL(f)});
  });
  if(S.files.length){$('#noPhotos').checked=false;S.noPhotos=false;drop.classList.remove('off');}
  drawShots();
}
function drawShots(){
  $('#shots').innerHTML=S.files.map((f,i)=>`<div class="shot">
    ${f.type==='video'?`<div class="vid">Video<br>${esc(f.name.slice(0,12))}</div>`:`<img src="${f.url}" alt="${esc(f.name)}">`}
    <button type="button" aria-label="Remove ${esc(f.name)}" data-rm="${i}">×</button></div>`).join('');
  const n=S.files.filter(f=>f.type==='image').length,c=$('#shotCount');
  if(S.noPhotos){c.className='count';c.textContent='Proceeding without photos. The crew will price on arrival.';}
  else if(n>=3){c.className='count done';c.textContent=n+' photos added'+(S.files.length>n?', plus video':'');}
  else{c.className='count short';c.textContent=n+' of 3 photos added';}
  renderFlow();
}
$('#shots').addEventListener('click',e=>{
  const i=e.target.dataset&&e.target.dataset.rm; if(i===undefined) return;
  URL.revokeObjectURL(S.files[i].url); S.files.splice(i,1); drawShots();
});
$('#noPhotos').addEventListener('change',e=>{
  S.noPhotos=e.target.checked; drop.classList.toggle('off',S.noPhotos);
  if(S.noPhotos){S.files.forEach(f=>URL.revokeObjectURL(f.url));S.files=[];}
  drawShots();
});

/* ===== pricing ===== */
function quote(){
  const L=[]; let base=0;
  if(S.load){base=S.load.price;L.push({k:S.load.name,v:money(base)});}
  let total=base;
  PRICING.items.forEach(i=>{const q=S.items[i.id]||0;if(!q)return;
    const line=i.price*q;total+=line;L.push({k:`${q} × ${i.name.replace(/, from$/,'')}`,v:money(line)});});
  if(S.place==='inside'){total+=PRICING.extras.inside;L.push({k:'Removal from inside',v:money(PRICING.extras.inside)});}
  if(S.disN>0){const f=PRICING.extras.dismantleFirstTwo+Math.max(0,S.disN-2)*PRICING.extras.dismantlePerExtra;
    total+=f;L.push({k:`Dismantling, up to ${S.disN} items`,v:money(f)});}
  if(S.slot&&S.slot.fee){total+=S.slot.fee;L.push({k:`${S.slot.label} slot`,v:money(S.slot.fee)});}
  if(S.slot&&S.slot.min&&total<S.slot.min){L.push({k:'Late-night minimum',v:money(S.slot.min-total),mute:true});total=S.slot.min;}
  const r=PRICING.discounts[S.acct]||0;
  if(r&&total>0){const off=total*r;total-=off;
    L.push({k:`${r*100}% ${S.acct==='sub'?'membership':'account'} discount`,v:'−'+money(off),off:true});}
  /* shop items ride on the same invoice, after any collection discount */
  const st=shopTotal();
  if(st>0){
    for(const k in SHOP_BASKET){ if(SHOP_BASKET[k]>0&&SHOP_PRICES[k])
      L.push({k:`${SHOP_BASKET[k]} × ${SHOP_NAMES[k]}`,v:money(SHOP_PRICES[k]*SHOP_BASKET[k]),shop:true}); }
    total+=st;
  }
  return {total:Math.round(total*100)/100,lines:L,priced:base>0,shop:st};
}
let lastAmt=null;
function paint(){
  const q=quote(),a=$('#railAmt');
  if(q.priced){const t=money(q.total);
    if(t!==lastAmt){a.classList.remove('tbc');animatePrice(a,q.total);announcePrice(t);lastAmt=t;}}
  else{a.textContent='Choose a size';a.classList.add('tbc');lastAmt=null;}
  $('#railVan').innerHTML=vanFigure(S.load?S.load.cuyd:0,{hideCap:true,hideTag:!S.load,alt:S.load?S.load.name:'Empty cage'});
  const ctx=[];
  if(S.postcode)ctx.push({k:'Collecting from',v:esc(S.postcode),mute:true});
  if(S.date)ctx.push({k:'Date',v:S.date.toLocaleDateString('en-GB',{day:'numeric',month:'short'}),mute:true});
  if(S.slot&&!S.slot.fee)ctx.push({k:'Slot',v:esc(S.slot.label),mute:true});
  if(S.load)ctx.push({k:'Van space',v:S.load.cuyd+' of '+CAGE_YD+' cu yd',mute:true});
  $('#railLines').innerHTML=ctx.concat(q.lines).map(l=>
    `<div class="rl${l.mute?' mute':''}${l.off?' off':''}${l.shop?' shop':''}"><span>${esc(l.k)}</span><span class="v">${l.v}</span></div>`).join('')
    ||'<div class="rl mute"><span>Nothing selected yet</span><span class="v">—</span></div>';
}
function textOk(mark){
  const t=[['#fName','#nm',v=>v.trim().length>1],
           ['#fTel','#tel',v=>/^(\+?44|0)7\d{9}$/.test(v.replace(/[\s-]/g,''))],
           ['#fMail','#em',v=>/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v.trim())]];
  let ok=true;
  t.forEach(([w,i,fn])=>{const g=fn($(i).value); if(mark)$(w).classList.toggle('bad',!g); if(!g)ok=false;});
  if(!S.ctype) ok=false;
  return ok;
}

/* modals */
function openModal(id){$('#scrim').classList.add('on');$('#'+id).classList.add('on');}
function closeModals(){$('#scrim').classList.remove('on');$$('.modal').forEach(m=>m.classList.remove('on'));}
$('#scrim').onclick=()=>{ const wasSoc=$('#socModal').classList.contains('on'); closeModals(); if(wasSoc) afterSoc(); };
$('#socX').onclick=()=>{ closeModals(); afterSoc(); };
/* If they dismiss sign-in, the account type is still chosen, so carry on to payment
   rather than leaving them stuck on a question with no Continue button. */
function afterSoc(){ if(S.acct && S.acct!=='guest') setTimeout(()=>advance('acct'),200); }
$('#waX').onclick=closeModals; $('#shopX').onclick=closeModals; $('#shopNo').onclick=closeModals; $('#waKeep').onclick=closeModals; $('#waGo').onclick=closeModals;
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals();});

/* whatsapp prompt on reaching payment */
let waShown=false, shopShown=false;
const origOpenQ=openQ;
openQ=function(id,scroll){
  origOpenQ(id,scroll);
  /* Offer the shop once the price is settled but before anything is paid —
     the crew can bring bags and PPE with them on the same visit. */
  if(id==='acct'&&!shopShown){
    shopShown=true;
    let seen=null; try{seen=sessionStorage.getItem('pw_shop');}catch(e){}
    if(!seen){ setTimeout(()=>openModal('shopModal'),700); try{sessionStorage.setItem('pw_shop','1');}catch(e){} }
  }
  if(id==='pay'&&!waShown){
    waShown=true;
    let seen=null; try{seen=sessionStorage.getItem('pw_wa');}catch(e){}
    /* don't stack on top of the shop prompt if it is still open */
    if(!seen){ setTimeout(()=>{ if(!$('#shopModal').classList.contains('on')) openModal('waModal'); },900);
               try{sessionStorage.setItem('pw_wa','1');}catch(e){} }
  }
};

/* submit */
/* ---------------------------------------------------------------
   ENDPOINT — read this before changing it.
   This URL is visible to anyone who views source. That is unavoidable
   in a page with no backend, and it is NOT a secret: it accepts data,
   it does not return any. The risk is junk submissions, not data loss.
   Before launch, replace this with your own endpoint (e.g. /api/book)
   which validates, rate-limits, then forwards server-side. The Make
   URL then lives only on the server.
   NEVER put an API key, token or password in this file.
   --------------------------------------------------------------- */
const BOOKING_ENDPOINT='https://hook.eu2.make.com/46g39gftbdjtvxafxibnqqf3twiwgxib';
function payload(saveOnly){
  const q=quote();
  return {
    ref:'PW'+Date.now().toString().slice(-6),
    status:saveOnly?'Saved quote':'Awaiting payment',
    name:$('#nm').value.trim(), business:$('#biz').value.trim(),
    phone:$('#tel').value.trim(), email:$('#em').value.trim(),
    address:$('#addr').value.trim(), postcode:S.postcode,
    date:S.date?S.date.toISOString().slice(0,10):'', slot:S.slot?S.slot.label:'',
    wasteTypes:S.types.map(t=>WASTE_TYPES.find(w=>w.id===t).label).join(', '),
    place:S.place==='inside'?('Inside — '+S.floor+', '+S.access):('Outside — '+S.spot),
    labour:S.labour, vanSize:S.load?S.load.name+' ('+S.load.cuyd+' cu yd)':'',
    addons:PRICING.items.filter(i=>S.items[i.id]>0).map(i=>S.items[i.id]+' x '+i.name).join(', ')||'None',
    dismantle:S.dis||'Nothing', parking:S.park,
    photoCount:S.noPhotos?'No photos supplied':String(S.files.filter(f=>f.type==='image').length),
    total:q.total.toFixed(2), notes:$('#notes').value.trim(), accountType:S.acct,
    shopItems:Object.keys(SHOP_BASKET).filter(k=>SHOP_BASKET[k]>0)
      .map(k=>`${SHOP_BASKET[k]} x ${SHOP_NAMES[k]} @ £${SHOP_PRICES[k].toFixed(2)}`).join(' | ')||'None',
    shopTotal:shopTotal().toFixed(2),
    priority:shopTotal()>0?'SHOP ORDER — despatch required':'Collection only'
  };
}
function finish(saveOnly){
  const vs=live();
  for(const id of vs){
    if(id==='pay'&&saveOnly) continue;
    if(!DONE[id]()){ openQ(id); const el=$('#q-'+id); el.classList.add('bad');
      setTimeout(()=>el.classList.remove('bad'),2200); if(id==='details')textOk(true); return; }
  }
  const body=payload(saveOnly), q=quote();
  fetch(BOOKING_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    .catch(()=>{});   // the booking still stands locally if the webhook is unreachable
  $('#toastTitle').textContent=saveOnly?'Quote saved':'Booking received';
  $('#toastMsg').textContent=saveOnly
    ?` Reference ${body.ref}. Your price of ${money(q.total)} is locked in — we will send the payment link whenever you are ready.`
    :` Reference ${body.ref}, ${money(q.total)}. We have sent the details to your WhatsApp and our office.`;
  if(shopTotal()>0){ try{localStorage.removeItem('pw_basket');}catch(e){} SHOP_BASKET={}; }
  $('#toast').classList.add('up');
  setTimeout(()=>$('#toast').classList.remove('up'),9500);
}
$('#submitBtn').onclick=()=>finish(false);
$('#saveBtn').onclick=()=>finish(true);
$('#toastX').onclick=()=>$('#toast').classList.remove('up');

$('#yr').textContent=new Date().getFullYear();
renderFlow();

/* ================= AURA LAYER — behaviour ================= */
const RM=matchMedia('(prefers-reduced-motion: reduce)');
const priceMemo=new WeakMap();
/* Count from the last figure to the new one, then bounce and glow.
   Uses money() so the settled figure is exactly what the rest of the page shows. */
function animatePrice(el,to){
  const from=priceMemo.has(el)?priceMemo.get(el):0;
  priceMemo.set(el,to);
  el.classList.remove('price-pop'); void el.offsetWidth; el.classList.add('price-pop');
  cancelAnimationFrame(el._raf);
  if(RM.matches||from===to){ el.textContent=money(to); return; }
  const t0=performance.now(), dur=640;
  const step=now=>{
    if(el.classList.contains('tbc')) return;           /* size was cleared mid-count */
    const k=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-k,3);
    el.textContent=money(Math.round((from+(to-from)*e)*100)/100);
    if(k<1) el._raf=requestAnimationFrame(step); else el.textContent=money(to);
  };
  el._raf=requestAnimationFrame(step);
}
/* Screen readers hear the settled total once, not every frame of the count. */
let priceLiveT;
function announcePrice(t){ clearTimeout(priceLiveT); priceLiveT=setTimeout(()=>{ const p=$('#priceLive'); if(p) p.textContent='Total '+t; },900); }
/* Phones: sticky price bar once a size is chosen, hidden while the cookie banner is up. */
function syncMobBar(){
  const bar=$('#mobBar'); if(!bar) return;
  const q=quote(), ck=$('#cookie'), cookieUp=!!(ck&&ck.classList.contains('up'));
  const show=!!q.priced&&!cookieUp;
  bar.hidden=!show; document.body.classList.toggle('has-mobbar',show);
  if(show){ const m=$('#mobAmt'), t=money(q.total); if(m.dataset.v!==t){ m.dataset.v=t; animatePrice(m,q.total); } }
}
const __paint=paint;
paint=function(){ __paint(); syncMobBar(); syncCtype(); };
(function(){
  const bar=$('#mobBar'); if(bar) bar.addEventListener('click',()=>{
    const r=$('.rail'); if(r) r.scrollIntoView({behavior:RM.matches?'auto':'smooth',block:'start'});
  });
  const ck=$('#cookie'); if(ck&&'MutationObserver' in window) new MutationObserver(syncMobBar).observe(ck,{attributes:true,attributeFilter:['class']});
})();
/* Install as an app: Android/desktop get the native prompt; iPhone gets the two-tap instruction. */
(function(){
  const bar=$('#appBar'); if(!bar) return;
  const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  let dismissed=false; try{ dismissed=sessionStorage.getItem('pw_app_x')==='1'; }catch(e){}
  if(standalone||dismissed) return;
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1);
  let deferred=null;
  addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); deferred=e; bar.hidden=false; });
  if(ios) bar.hidden=false;
  $('#appInstall').addEventListener('click',async()=>{
    if(deferred){ deferred.prompt(); try{ await deferred.userChoice; }catch(e){} deferred=null; bar.hidden=true; return; }
    if(ios){ bar.querySelector('.ab-t').textContent='Tap Share, then \u201cAdd to Home Screen\u201d.'; $('#appInstall').hidden=true; }
  });
  $('#appX').addEventListener('click',()=>{ bar.hidden=true; try{ sessionStorage.setItem('pw_app_x','1'); }catch(e){} });
  addEventListener('appinstalled',()=>{ bar.hidden=true; });
})();
/* Service worker only on the real site or a developer's machine — never in previews. */
if('serviceWorker' in navigator&&((location.protocol==='https:'&&/(^|\.)pluswaste\.co\.uk$/.test(location.hostname))||location.hostname==='localhost')){
  addEventListener('load',()=>{ navigator.serviceWorker.register('/sw.js').catch(()=>{}); });
}
syncMobBar();

/* Where a step should land: centred in the space left between whatever is pinned
   at the top (header, progress card) and the bottom (phone price bar). Measured with
   layout offsets, so running animations can't skew it. Too tall to centre? Its top
   sits just below the pinned area, so the first line is never covered. */
function docTop(el){ let y=0; for(let e=el;e;e=e.offsetParent) y+=e.offsetTop; return y; }
function topCover(){
  let b=0;
  ['.hdr','.prog'].forEach(q=>{ const e=$(q); if(!e||e.offsetParent===null) return;
    const cs=getComputedStyle(e); if(cs.position==='sticky'||cs.position==='fixed') b=Math.max(b,(parseFloat(cs.top)||0)+e.offsetHeight); });
  return b;
}
function bottomCover(){ const m=$('#mobBar'); return m&&!m.hidden&&m.offsetParent!==null ? m.offsetHeight+16 : 0; }
function centerStep(el){
  if(!el) return;
  const top=topCover()+10, bottom=bottomCover()+10, avail=innerHeight-top-bottom, h=el.offsetHeight;
  const y=docTop(el)-top-(h<=avail ? (avail-h)/2 : 0);
  window.scrollTo({top:Math.max(0,Math.round(y)),behavior:RM.matches?'auto':'smooth'});
}
/* When Continue can't proceed, show exactly what's missing and bring it into view. */
function flagProblem(id,el){
  let target=el;
  if(id==='details'){
    const g=$('#ctypeGroup');
    if(!S.ctype&&g){ g.classList.add('bad'); g.classList.remove('shake'); void g.offsetWidth; g.classList.add('shake'); target=g; }
    else { const f=['#fName','#fTel','#fMail'].map(q=>$(q)).find(x=>x&&x.classList.contains('bad')); if(f){ target=f; const i=f.querySelector('input'); if(i) i.focus({preventScroll:true}); } }
  }
  centerStep(target);
}
function syncCtype(){ const g=$('#ctypeGroup'); if(!g) return; g.classList.toggle('need',!S.ctype); if(S.ctype) g.classList.remove('bad','shake'); }
document.addEventListener('change',e=>{ if(e.target.name==='ctype') setTimeout(syncCtype,0); });
/* Tap shadow */
if(!RM.matches) addEventListener('pointerdown',e=>{
  if(e.pointerType==='mouse'&&e.button!==0) return;
  const d=document.createElement('span'); d.className='tap'; d.setAttribute('aria-hidden','true');
  d.style.left=e.clientX+'px'; d.style.top=e.clientY+'px'; document.body.appendChild(d);
  d.addEventListener('animationend',()=>d.remove()); setTimeout(()=>d.remove(),900);
},{passive:true});
