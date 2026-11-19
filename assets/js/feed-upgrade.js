(()=>{"use strict";
const KEY="travelnet:phase1:posts",HIDDEN="travelnet:phase1:hidden",CONNECTIONS="travelnet:phase1:connections";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch{notify("Browser storage is unavailable.");return false}};
const seeds=[
{id:"tn-01",author:"Maya Chen",role:"Destination strategy · DMC partnerships",place:"Singapore",initials:"MC",tone:"avatar-blue",time:"2 hours ago",badge:["DMC"],tag:"DESTINATION INSIGHT",dest:["Bali","Thailand"],text:"We are refreshing our Bali and Thailand ground network for Q1. Looking for reliable local experience partners with transparent net rates, licensed guides and strong on-ground support. Which quality checks work best for your DMC?",likes:28,comments:6,shares:3,image:"https://media-assets-4sb.pages.dev/images/travel/destinations/07-maldives-v01.webp"},
{id:"tn-02",author:"Samira Rahman",role:"Hotel contracting · Verified hotelier",place:"Dubai, UAE",initials:"SR",tone:"avatar-coral",time:"Yesterday",badge:["Verified Hotelier"],tag:"B2B HOTEL OFFER",dest:["Dubai"],text:"Sharing a sample trade offer for agency partners planning winter departures. Flexible rooming support and dedicated reservations contact for confirmed groups.",deal:{title:"Dubai 4-star group stay · 20–30 pax",price:"AED 410 / room / night",details:"Breakfast included · Twin / double rooms · Airport transfers on request"},likes:41,comments:12,shares:5},
{id:"tn-03",author:"Aarav Mehta",role:"Travel agency owner · IATA accredited (demo)",place:"Jaipur, India",initials:"AM",tone:"avatar-gold",time:"2 days ago",badge:["IATA Verified · Demo"],tag:"INDUSTRY DISCUSSION",dest:["Himachal","Rajasthan"],text:"For agencies building Himachal itineraries, how are you validating seasonal road access and hotel allotments before confirming a family group? Interested in practical supplier coordination workflows.",likes:19,comments:9,shares:2},
{id:"tn-04",author:"Oliver Bennett",role:"Tour operator · Contracting",place:"London, UK",initials:"OB",tone:"avatar-blue",time:"3 days ago",badge:["Tour Operator"],tag:"SUPPLIER REQUIREMENT",dest:["Europe"],text:"Seeking new inbound DMC partners for small-group Europe departures. Please share your operating regions, FIT / group capabilities and emergency support arrangements.",likes:16,comments:4,shares:1},
{id:"tn-05",author:"Nisha Kapoor",role:"Visa & ticketing specialist",place:"New Delhi, India",initials:"NK",tone:"avatar-gold",time:"4 days ago",badge:["Agency"],tag:"COMMUNITY POLL",dest:["Dubai","Thailand"],text:"Which destination is receiving the strongest enquiry volume from your clients this season?",poll:"Which destination is trending with your clients?",options:["Dubai","Thailand","Bali","Europe"],votes:[12,9,7,5],likes:12,comments:8,shares:1}
];
let posts=read(KEY,seeds),hidden=read(HIDDEN,[]);
function notify(msg){const root=$("#toastRoot");if(!root)return;const el=document.createElement("div");el.className="toast";el.textContent=msg;root.append(el);setTimeout(()=>el.remove(),2600)}
function commentsFor(id){return read("travelnet:phase1:comments:"+id,[])}
function render(){
 const root=$("#feedList");if(!root)return;
 const filter=$("#feedFilter")?.value||"all",sort=$("#feedSort")?.value||"latest";
 const rows=posts.filter(p=>!hidden.includes(p.id)&&(filter==="all"||p.type===filter||p.type==="business"&&filter==="business"||p.type==="destination"&&filter==="destination"));
 rows.sort((a,b)=>sort==="engagement"?(b.likes+b.comments*2+b.shares)-(a.likes+a.comments*2+a.shares):(b.createdAt||0)-(a.createdAt||0));
 if(!rows.length){root.innerHTML='<div class="empty-state">No posts in this category yet. Start a conversation with travel professionals.</div>';return}
 root.innerHTML=rows.map(p=>{
 const badges=(p.badge||[]).map(x=>'<span class="verification-badge">'+esc(x)+'</span>').join("");
 const destinations=(p.dest||[]).map(x=>'<span class="post-topic destination-chip">📍 '+esc(x)+'</span>').join("");
 const deal=p.deal?'<div class="tn-deal-card"><span class="eyebrow">B2B PACKAGE · DEMO</span><strong>'+esc(p.deal.title)+'</strong><p>'+esc(p.deal.details)+'</p><div><b>'+esc(p.deal.price)+'</b><small>Illustrative rate · Demo only</small></div></div>':"";
 const poll=p.options?'<div class="tn-poll"><strong>'+esc(p.poll||p.text)+'</strong>'+p.options.map((x,i)=>'<button data-action="tn-vote" data-id="'+esc(p.id)+'" data-option="'+i+'" '+(p.voted!==undefined?"disabled":"")+'><span>'+esc(x)+'</span><b>'+((p.votes||[])[i]||0)+'</b></button>').join("")+'<small>'+(p.voted!==undefined?"Your vote is saved locally":"Vote once · Demo poll")+'</small></div>':"";
 const image=p.image?'<img class="post-media" src="'+esc(p.image)+'" alt="Travel destination shared in post" loading="lazy">':"";
 const comments=commentsFor(p.id).map(x=>'<p><strong>'+esc(x.author||"You")+'</strong> '+esc(x.text)+'</p>').join("");
 return '<article class="post-card tn-post-card" data-post="'+esc(p.id)+'"><div class="post-head"><div class="avatar '+esc(p.tone||"")+'">'+esc(p.initials||"TN")+'</div><div class="post-identity"><strong>'+esc(p.author)+' <span class="verification-badges">'+badges+'</span></strong><span>'+esc(p.role)+' · '+esc(p.place)+'</span><small>'+esc(p.time||"Just now")+' · Public demo</small></div><button class="post-menu" data-action="tn-menu" data-id="'+esc(p.id)+'" aria-label="Post options">···</button></div><span class="post-tag">'+esc(p.tag||"TRAVEL INDUSTRY UPDATE")+'</span>'+destinations+'<p class="post-copy">'+esc(p.text)+'</p>'+deal+poll+image+'<div class="post-stats"><span>♥ '+p.likes+' reactions</span><span>'+p.comments+' comments · '+p.shares+' shares</span></div><div class="post-actions"><button class="'+(p.liked?"selected":"")+'" data-action="tn-like" data-id="'+esc(p.id)+'">'+(p.liked?"♥ Reacted":"♡ React")+'</button><button data-action="tn-comment" data-id="'+esc(p.id)+'">▢ Comment</button><button data-action="tn-repost" data-id="'+esc(p.id)+'">⟳ Repost</button><button data-action="tn-share" data-id="'+esc(p.id)+'">↗ Share</button></div><div class="comment-list" id="tn-comments-'+esc(p.id)+'">'+comments+'</div></article>';
 }).join("");
}
function close(){const root=$("#modalRoot");if(root)root.innerHTML=""}
function modal(title,body,submit,callback){
 const root=$("#modalRoot");if(!root)return;
 root.innerHTML='<div class="modal-overlay" data-action="tn-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="tn-modal-title"><div class="modal-header"><h2 id="tn-modal-title">'+esc(title)+'</h2><button class="modal-close" data-action="tn-close" aria-label="Close">×</button></div><div class="modal-body">'+body+'</div><div class="modal-actions"><button class="button button-secondary" data-action="tn-close">Cancel</button><button class="button button-dark" id="tn-submit">'+esc(submit)+'</button></div></section></div>';
 $("#tn-submit").addEventListener("click",callback);$(".modal",root).addEventListener("click",e=>e.stopPropagation());
}
function composer(initial){
 const start=initial==="opportunity"?"deal":(["deal","poll"].includes(initial)?initial:"general");
 modal("Create a travel industry post",'<div class="tn-composer-tabs"><button type="button" data-tn-tab="general" class="'+(start==="general"?"active":"")+'">General post</button><button type="button" data-tn-tab="deal" class="'+(start==="deal"?"active":"")+'">B2B deal / package</button><button type="button" data-tn-tab="poll" class="'+(start==="poll"?"active":"")+'">Poll</button></div><input type="hidden" id="tn-kind" value="'+start+'"><div class="form-field"><label for="tn-text">Your update</label><textarea id="tn-text" maxlength="2000" placeholder="Share a travel insight, supplier offer or question..." required></textarea></div><div class="form-field"><label for="tn-destination">Destination tag</label><select id="tn-destination"><option value="">Select destination (optional)</option><option>Dubai</option><option>Bali</option><option>Himachal</option><option>Europe</option><option>Thailand</option><option>Rajasthan</option><option>Maldives</option></select></div><div id="tn-deal-fields" class="tn-conditional-fields" '+(start==="deal"?"":"hidden")+'><div class="form-field"><label for="tn-deal-title">Package / requirement title</label><input id="tn-deal-title" placeholder="e.g. Bali 4-star hotel package"></div><div class="form-field"><label for="tn-deal-price">Indicative rate / budget</label><input id="tn-deal-price" placeholder="e.g. INR 28,500 per person"></div><div class="form-field"><label for="tn-deal-details">Package details</label><textarea id="tn-deal-details" placeholder="Inclusions, pax, dates and supplier terms"></textarea></div></div><div id="tn-poll-fields" class="tn-conditional-fields" '+(start==="poll"?"":"hidden")+'><div class="form-field"><label for="tn-poll-question">Poll question</label><input id="tn-poll-question" placeholder="Which destination is trending this season?"></div><div class="form-field"><label for="tn-poll-options">Options (comma separated)</label><input id="tn-poll-options" placeholder="Dubai, Bali, Thailand, Europe"></div></div><p class="muted">Posts and interactions are stored in this browser only.</p>',"Publish post",()=>{
 const text=$("#tn-text").value.trim(),kind=$("#tn-kind").value;if(!text){notify("Add some text before publishing.");$("#tn-text").focus();return}
 const p={id:"tn-"+Date.now(),createdAt:Date.now(),author:"Travel professional",role:"TravelNet community member",place:"Your network",initials:"TN",time:"Just now",tag:kind==="deal"?"B2B DEAL / PACKAGE":kind==="poll"?"COMMUNITY POLL":"TRAVEL INDUSTRY UPDATE",type:kind==="deal"?"business":"discussion",text,dest:$("#tn-destination").value?[$("#tn-destination").value]:[],likes:0,comments:0,shares:0,liked:false};
 if(kind==="deal")p.deal={title:$("#tn-deal-title").value.trim()||"Travel industry B2B package",price:$("#tn-deal-price").value.trim()||"Rate on request",details:$("#tn-deal-details").value.trim()||text};
 if(kind==="poll"){const opts=$("#tn-poll-options").value.split(",").map(x=>x.trim()).filter(Boolean).slice(0,5);if(opts.length<2){notify("Add at least two poll options.");return}p.poll=$("#tn-poll-question").value.trim()||text;p.options=opts;p.votes=opts.map(()=>0)}
 posts.unshift(p);write(KEY,posts);close();if($("#feedFilter"))$("#feedFilter").value="all";render();notify("Your post was published to the local demo feed.");
 });
 $$("[data-tn-tab]").forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.tnTab;$("#tn-kind").value=k;$$("[data-tn-tab]").forEach(x=>x.classList.toggle("active",x===b));$("#tn-deal-fields").hidden=k!=="deal";$("#tn-poll-fields").hidden=k!=="poll"}));
 $("#tn-text").focus();
}
function intercept(e){
 const el=e.target.closest("[data-action]");if(!el)return;
 const action=el.dataset.action,id=el.dataset.id,p=posts.find(x=>x.id===id);
 if(!["compose","tn-close","tn-backdrop","tn-like","tn-comment","tn-send-comment","tn-repost","tn-share","tn-vote","tn-menu","tn-hide"].includes(action))return;
 e.preventDefault();e.stopImmediatePropagation();
 if(action==="compose"){composer(el.dataset.kind);return}
 if(action==="tn-close"||(action==="tn-backdrop"&&e.target===el)){close();return}
 if(action==="tn-like"&&p){p.liked=!p.liked;p.likes+=p.liked?1:-1;write(KEY,posts);render();return}
 if(action==="tn-comment"&&p){const box=$("#tn-comments-"+id);box.innerHTML+='<div class="comment-box"><input id="tn-comment-input" placeholder="Write a useful reply..." aria-label="Write a comment"><button class="button button-dark" data-action="tn-send-comment" data-id="'+esc(id)+'">Send</button></div>';$("#tn-comment-input").focus();return}
 if(action==="tn-send-comment"&&p){const input=$("#tn-comment-input"),text=input?.value.trim();if(!text){notify("Write a comment first.");return}const list=commentsFor(id);list.push({author:"You",text,createdAt:Date.now()});write("travelnet:phase1:comments:"+id,list);p.comments++;write(KEY,posts);render();notify("Comment saved locally.");return}
 if(action==="tn-repost"&&p){const reposts=read("travelnet:phase1:reposts",[]);if(reposts.includes(id)){notify("You have already reposted this item.");return}reposts.push(id);write("travelnet:phase1:reposts",reposts);p.shares++;write(KEY,posts);render();notify("Repost saved to your local activity.");return}
 if(action==="tn-share"&&p){const shares=read("travelnet:phase1:shares",[]);shares.push({postId:id,createdAt:Date.now()});write("travelnet:phase1:shares",shares);notify("Share action saved locally.");return}
 if(action==="tn-vote"&&p&&p.options&&p.voted===undefined){const n=Number(el.dataset.option);if(n>=0&&n<p.options.length){p.voted=n;p.votes[n]=(p.votes[n]||0)+1;write(KEY,posts);render();notify("Your poll vote was saved locally.")}return}
 if(action==="tn-menu"&&p){modal("Post options",'<p class="post-copy">Manage this demo conversation.</p><button class="side-link" data-action="tn-hide" data-id="'+esc(id)+'">Hide this post</button>',"Done",close);return}
 if(action==="tn-hide"&&p){hidden=Array.from(new Set(hidden.concat(id)));write(HIDDEN,hidden);close();render();notify("Post hidden in this browser.")}
}
document.addEventListener("click",intercept,true);
$("#feedFilter")?.addEventListener("change",render);$("#feedSort")?.addEventListener("change",render);
document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
$$('[data-action="connect"]').forEach(b=>{if(read(CONNECTIONS,[]).includes(b.dataset.person)){b.textContent="✓";b.disabled=true}});
render();
})();