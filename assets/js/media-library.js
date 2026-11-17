(()=>{"use strict";
const root=document.querySelector("#mediaLibrary");
if(!root)return;
const DATA="assets/data/media-library.json";
const savedKey="travelnet:media-saved";
let items=[];
let category="all";
const categoryNames={all:"All categories",destinations:"Destinations",nature:"Nature & Wildlife",adventure:"Adventure Activities",community:"Travel Community",food:"Food & Culture",hotels:"Hotels & Stays",transport:"Transport",photography:"Photography",technology:"Technology",general:"General"};
const categoryThumbs={destinations:"travel-beach-resort.webp",nature:"nature-tea-hills.webp",adventure:"travel-mountain-hiker.webp",community:"business-team.webp",food:"food-burger.webp",hotels:"travel-luxury-hotel.webp",transport:"travel-aircraft.webp",photography:"photography-camera.webp",technology:"technology-ai-chip.webp",general:"real-estate-home.webp"};
let query="";
let tab="explore";
let onlySaved=false;
let saved=[];
try{saved=JSON.parse(localStorage.getItem(savedKey)||"[]")}catch(savedError){saved=[]}
const esc=function(value){return String(value==null?"":value).replace(/[&<>"']/g,function(char){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]})};
const pretty=function(value){return String(value||"").replace(/[-_]/g," ").replace(/\b\w/g,function(char){return char.toUpperCase()})};
const isSaved=function(src){return saved.indexOf(src)!==-1};
const save=function(src){if(isSaved(src))saved=saved.filter(function(x){return x!==src});else saved.push(src);try{localStorage.setItem(savedKey,JSON.stringify(saved))}catch(storageError){}};
function card(item){
 return '<article class="media-card"><button class="media-image" type="button" data-preview="'+esc(item.src)+'" aria-label="Preview '+esc(item.title)+'"><img src="'+esc(item.src)+'" alt="'+esc(item.alt)+'" loading="lazy"></button><div class="media-card-copy"><span class="media-kicker">'+esc(pretty(item.category))+' · '+esc(pretty(item.subcategory||"Collection"))+'</span><h3>'+esc(item.title)+'</h3><p>'+esc(item.description)+'</p><div class="media-card-foot"><code>'+esc((item.path.split(".").pop()||"img").toUpperCase())+'</code><button type="button" data-save="'+esc(item.src)+'">'+(isSaved(item.src)?"♥ Saved":"♡ Save")+'</button></div></div></article>';
}
function render(){
 const filtered=items.filter(function(item){
  const matchesCategory=category==="all"||item.category===category;
  const matchesSaved=!onlySaved||isSaved(item.src);
  const haystack=[item.title,item.description,(item.tags||[]).join(" "),item.path].join(" ").toLowerCase();
  const matchesQuery=!query||haystack.indexOf(query.toLowerCase())!==-1;
  return matchesCategory&&matchesSaved&&matchesQuery;
 });
 const list=tab==="saved"?filtered.filter(function(item){return isSaved(item.src)}):filtered;
 const categories=["all","destinations","nature","adventure","community","food","hotels","transport","photography","technology","general"];
 let categoryOptions=categories.map(function(value){const label=categoryNames[value]||pretty(value);return '<option value="'+value+'" '+(category===value?"selected":"")+'>'+label+'</option>'}).join("");
 let body="";
 if(tab==="collections"){
  body='<section class="media-empty-panel"><h2>My collections</h2><p>Create a collection by saving images you want to keep together. Your saved selections are stored in this browser.</p><p><strong>'+saved.length+'</strong> saved media assets</p><button class="media-primary" type="button" data-tab="saved">View saved media</button></section>';
 }else if(tab==="insights"){
  body='<section class="media-empty-panel"><h2>Media confidence</h2><p>All 140 assets are served from your MEDIA-ASSETS Cloudflare Pages library as original JPG and WebP files. Preview each image before using it in a post or project.</p><div class="media-confidence"><span>Asset format</span><strong>JPG + WebP</strong><span>Source</span><strong>MEDIA-ASSETS</strong><span>Storage</span><strong>Public static URLs</strong><span>Saved in this browser</span><strong>'+saved.length+'</strong></div></section>';
 }else{
  body='<div class="media-collections">' + categories.filter(function(x){return x!=="all"}).map(function(x){return '<button class="media-collection" type="button" data-category-pick="'+x+'"><img src="https://media-assets-4sb.pages.dev/thumbnails/'+categoryThumbs[x]+'" alt="" loading="lazy"><span>'+categoryNames[x]+'</span></button>'}).join("") + '</div><div class="media-toolbar"><label class="media-search"><span>⌕</span><input id="mediaSearch" value="'+esc(query)+'" placeholder="Search destinations, topics or media..."></label><select id="mediaCategory" aria-label="Filter by media category">'+categoryOptions+'</select><label class="media-saved-toggle"><input id="onlySaved" type="checkbox" '+(onlySaved?"checked":"")+'> Only my saved media</label></div><div class="media-result-line"><strong>'+list.length+' results</strong><span>140 original image URLs · '+(tab==="saved"?"Saved hub":"Explore media")+'</span></div><div class="media-grid">'+(list.map(card).join("")||'<div class="media-empty">No media matched this filter. Try another category or search term.</div>')+'</div>';
 }
 root.innerHTML='<section class="media-hero"><div><span class="eyebrow">TRAVELNET MEDIA EXCHANGE</span><h1>Media &amp; Saved</h1><p>A knowledge library worth revisiting. Explore destination imagery, field inspiration and practical travel-industry visuals.</p><div class="media-hero-actions"><button class="media-primary" type="button" data-tab="explore">Explore original media</button><button class="media-ghost" type="button" data-tab="saved">Open saved hub</button></div></div><div class="media-hero-count"><strong>'+items.length+'</strong><span>curated WebP assets</span></div></section>'+
 '<div class="media-stats"><article><strong>'+items.length+'</strong><span>MEDIA RECORDS</span></article><article><strong>'+saved.length+'</strong><span>BOOKMARKS</span></article><article><strong>'+new Set(items.map(function(x){return x.category})).size+'</strong><span>COLLECTIONS</span></article><article><strong>140</strong><span>MEDIA SOURCES</span></article></div>'+
 '<nav class="media-tabs"><button type="button" class="'+(tab==="explore"?"active":"")+'" data-tab="explore">Explore media</button><button type="button" class="'+(tab==="saved"?"active":"")+'" data-tab="saved">Saved hub</button><button type="button" class="'+(tab==="collections"?"active":"")+'" data-tab="collections">My collections</button><button type="button" class="'+(tab==="insights"?"active":"")+'" data-tab="insights">Insights &amp; confidence</button></nav>'+body+
 '<div class="media-disclaimer">TravelNet media library · Original images served from your MEDIA-ASSETS Cloudflare Pages deployment. Demo-only library interactions are saved locally in this browser.</div>';
 root.querySelectorAll("[data-category-pick]").forEach(function(button){button.addEventListener("click",function(){category=button.dataset.categoryPick;tab="explore";onlySaved=false;render()})});
 root.querySelectorAll("[data-tab]").forEach(function(button){button.addEventListener("click",function(){tab=button.dataset.tab;render()})});
 const search=root.querySelector("#mediaSearch");
 if(search)search.addEventListener("input",function(event){query=event.target.value;const cursor=event.target.selectionStart;render();const next=root.querySelector("#mediaSearch");if(next){next.focus();next.setSelectionRange(cursor,cursor)}});
 const filter=root.querySelector("#mediaCategory");
 if(filter)filter.addEventListener("change",function(event){category=event.target.value;render()});
 const savedOnly=root.querySelector("#onlySaved");
 if(savedOnly)savedOnly.addEventListener("change",function(event){onlySaved=event.target.checked;render()});
 root.querySelectorAll("[data-save]").forEach(function(button){button.addEventListener("click",function(){save(button.dataset.save);render()})});
 root.querySelectorAll("[data-preview]").forEach(function(button){button.addEventListener("click",function(){const item=items.find(function(x){return x.src===button.dataset.preview});const overlay=document.createElement("div");overlay.className="media-lightbox";const close=document.createElement("button");close.type="button";close.setAttribute("aria-label","Close preview");close.textContent="×";const image=document.createElement("img");image.src=item.src;image.alt=item.alt||item.title;const details=document.createElement("div");const name=document.createElement("strong");name.textContent=item.title;const path=document.createElement("span");path.textContent=item.path;details.append(name,path);overlay.append(close,image,details);overlay.addEventListener("click",function(event){if(event.target===overlay||event.target===close)overlay.remove()});document.body.append(overlay)})});
}
fetch(DATA,{cache:"no-cache"}).then(function(response){if(!response.ok)throw new Error("Media manifest returned "+response.status);return response.json()}).then(function(data){if(!Array.isArray(data))throw new Error("Media manifest is not an array");items=data;render()}).catch(function(error){root.innerHTML='<div class="media-empty">The media library could not be loaded. '+esc(error.message)+' <button type="button" onclick="location.reload()">Retry</button></div>'});
})();