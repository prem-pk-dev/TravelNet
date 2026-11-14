(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s);
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem("travelnet:"+k))??d}catch{return d}};
const write=(k,v)=>{try{localStorage.setItem("travelnet:"+k,JSON.stringify(v));return true}catch{toast("Browser storage is unavailable.");return false}};
const toast=m=>{const root=$("#toastRoot");if(!root)return;const n=document.createElement("div");n.className="toast";n.textContent=m;root.append(n);setTimeout(()=>n.remove(),2600)};
const people=[
{id:"alex",name:"Alex Morgan",initials:"AM",tone:"avatar-coral",role:"Destination specialist",sector:"destination",place:"Lisbon, Portugal",region:"europe",bio:"Works across destination storytelling and locally led visitor experiences.",tags:["Destination strategy","Responsible tourism"]},
{id:"samira",name:"Samira Rahman",initials:"SR",tone:"avatar-blue",role:"Hospitality partnerships",sector:"hospitality",place:"Dubai, UAE",region:"middle-east",bio:"Focuses on hotel partnerships and guest experience collaboration.",tags:["Hospitality","Partnerships"]},
{id:"jordan",name:"Jordan Davis",initials:"JD",tone:"avatar-gold",role:"Tour operations manager",sector:"operations",place:"London, UK",region:"europe",bio:"Interested in practical operations, supplier coordination and tour quality.",tags:["Tour operations","Suppliers"]},
{id:"maya",name:"Maya Chen",initials:"MC",tone:"avatar-blue",role:"Travel technology consultant",sector:"technology",place:"Singapore",region:"asia",bio:"Explores digital tools that help travel teams improve service workflows.",tags:["Travel tech","Digital"]},
{id:"aarav",name:"Aarav Mehta",initials:"AM",tone:"avatar-gold",role:"Travel agency professional",sector:"agency",place:"Jaipur, India",region:"asia",bio:"Interested in destination knowledge, itinerary planning and local partnerships.",tags:["Travel agency","India"]},
{id:"oliver",name:"Oliver Bennett",initials:"OB",tone:"avatar-coral",role:"Boutique hospitality",sector:"hospitality",place:"Barcelona, Spain",region:"europe",bio:"Shares perspectives on independent accommodation and local operators.",tags:["Boutique hotels","Experiences"]}
];
let invitations=read("invitations",[]),received=read("receivedInvitations",["jordan","maya"]),connections=read("connections",[]),following=read("following",[]);
const demoFollowers=["alex","samira","oliver"];
function renderPeople(){
 const root=$("#peopleGrid");if(!root)return;
 const q=($("#directorySearch")?.value||"").toLowerCase().trim(),role=$("#roleFilter")?.value||"all",region=$("#regionFilter")?.value||"all";
 const list=people.filter(p=>(role==="all"||p.sector===role)&&(region==="all"||p.region===region)&&[p.name,p.role,p.place,p.bio,...p.tags].join(" ").toLowerCase().includes(q));
 $("#networkCount").textContent=list.length;
 root.innerHTML=list.length?list.map(p=>{
 const sent=invitations.includes(p.id),connected=connections.includes(p.id),incoming=received.includes(p.id),isFollowing=following.includes(p.id);
 const connectLabel=connected?"✓ Connected":incoming?"Invitation received":sent?"✓ Invitation sent":"＋ Connect";
 return '<article class="person-card"><div class="person-card-top"><div class="avatar '+p.tone+'">'+p.initials+'</div><div><h3>'+p.name+'</h3><p class="person-title">'+p.role+'</p><p class="person-place">⌖ '+p.place+'</p></div></div><p class="person-bio">'+p.bio+'</p><div class="person-tags">'+p.tags.map(t=>'<span>'+t+'</span>').join("")+'</div><button class="network-follow-button" data-network-action="follow" data-person="'+p.id+'">'+(isFollowing?"✓ Following":"＋ Follow")+'</button><button class="button '+(sent||connected||incoming?"button-secondary":"button-dark")+'" data-connect="'+p.id+'" '+(sent||connected||incoming?"disabled":"")+'>'+connectLabel+'</button></article>'
 }).join(""):'<div class="network-empty">No matching profiles. Try another name, speciality or location.</div>';
 renderAllLists();
}
function personRow(p,actions){return '<article class="network-person-row"><div class="avatar '+p.tone+'">'+p.initials+'</div><div class="network-person-copy"><strong>'+p.name+'</strong><span>'+p.role+' · '+p.place+'</span></div><div class="network-person-actions">'+actions+'</div></article>'}
function renderSent(){const root=$("#invitationList");if(!root)return;const list=people.filter(p=>invitations.includes(p.id));root.innerHTML=list.length?list.map(p=>'<div class="invitation-item"><span><strong>'+p.name+'</strong> · '+p.role+'</span><button class="network-inline-action" data-network-action="cancel" data-person="'+p.id+'">Withdraw invitation</button><span>Pending · Demo</span></div>').join(""):'<p class="muted">No outgoing invitations.</p>'}
function renderAllLists(){
 const incoming=$("#receivedInvitationList"),connected=$("#connectionsList"),followed=$("#followingList");
 if(incoming){const list=people.filter(p=>received.includes(p.id));incoming.innerHTML=list.length?list.map(p=>personRow(p,'<button class="button button-dark" data-network-action="accept" data-person="'+p.id+'">Accept</button><button class="button button-secondary" data-network-action="decline" data-person="'+p.id+'">Decline</button>')).join(""):'<p class="network-empty">You are all caught up. No pending invitations.</p>'}
 if(connected){const list=people.filter(p=>connections.includes(p.id));connected.innerHTML=list.length?list.map(p=>personRow(p,'<button class="network-inline-action" data-network-action="remove-connection" data-person="'+p.id+'">Remove connection</button>')).join(""):'<p class="network-empty">Your accepted connections will appear here.</p>'}
 if(followed){const list=people.filter(p=>following.includes(p.id));followed.innerHTML=list.length?list.map(p=>personRow(p,'<button class="network-inline-action" data-network-action="unfollow" data-person="'+p.id+'">Unfollow</button>')).join(""):'<p class="network-empty">Follow professionals from Discover to build your industry update list.</p>'}
 renderSent();
 const set=(id,n)=>{const el=$("#"+id);if(el)el.textContent=n};
 set("connectionTotal",connections.length);set("pendingTotal",received.length);set("followingTotal",following.length);set("followerTotal",demoFollowers.length);set("invitationBadge",received.length);
}
function showTab(target){
 document.querySelectorAll("[data-network-tab]").forEach(b=>{const active=b.dataset.networkTab===target;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});
 document.querySelectorAll("[data-network-panel]").forEach(p=>p.hidden=p.dataset.networkPanel!==target);
 const discover=$("#peopleGrid")?.closest(".network-section"),toolbar=document.querySelector(".network-toolbar");
 if(discover)discover.hidden=target!=="discover";if(toolbar)toolbar.hidden=target!=="discover";
}
["directorySearch","roleFilter","regionFilter"].forEach(id=>$("#"+id)?.addEventListener("input",renderPeople));
const params=new URLSearchParams(location.search),initialQuery=params.get("q");if(initialQuery&&$("#directorySearch"))$("#directorySearch").value=initialQuery;
const headerSearch=$("#peopleSearch");headerSearch?.addEventListener("input",()=>{if($("#directorySearch")){$("#directorySearch").value=headerSearch.value;renderPeople()}});
$("#peopleGrid")?.addEventListener("click",e=>{const b=e.target.closest("[data-connect]");if(!b)return;const id=b.dataset.connect;if(!invitations.includes(id)&&!connections.includes(id)&&!received.includes(id)){invitations.push(id);write("invitations",invitations);renderPeople();toast("Demo connection invitation sent locally.")}});
document.addEventListener("click",e=>{
 const tab=e.target.closest("[data-network-tab]");if(tab){showTab(tab.dataset.networkTab);return}
 const b=e.target.closest("[data-network-action]");if(b){const id=b.dataset.person,action=b.dataset.networkAction;
 if(action==="accept"&&received.includes(id)){received=received.filter(x=>x!==id);if(!connections.includes(id))connections.push(id);write("receivedInvitations",received);write("connections",connections);toast("Connection accepted in this browser.")}
 if(action==="decline"&&received.includes(id)){received=received.filter(x=>x!==id);write("receivedInvitations",received);toast("Invitation declined locally.")}
 if(action==="cancel"&&invitations.includes(id)){invitations=invitations.filter(x=>x!==id);write("invitations",invitations);toast("Invitation withdrawn locally.")}
 if(action==="remove-connection"&&connections.includes(id)){connections=connections.filter(x=>x!==id);write("connections",connections);toast("Connection removed locally.")}
 if(action==="follow"&&!following.includes(id)){following.push(id);write("following",following);toast("You are now following this professional.")}
 else if(action==="follow"&&following.includes(id)){following=following.filter(x=>x!==id);write("following",following);toast("You unfollowed this professional.")}
 if(action==="unfollow"&&following.includes(id)){following=following.filter(x=>x!==id);write("following",following);toast("You unfollowed this professional.")}
 renderPeople();return}
 const bAction=e.target.closest("[data-action]");if(!bAction)return;const action=bAction.dataset.action;
 if(action==="edit-profile"){const current=read("profileDraft",{});const name=prompt("Professional display name",current.name||"Travel professional");if(name===null)return;const role=prompt("Professional headline",current.role||"Travel & tourism professional");const location=prompt("City and country",current.location||"");const about=prompt("Short professional introduction",current.about||"");const data={name:name.trim()||"Travel professional",role:role||"",location:location||"",about:about||""};write("profileDraft",data);applyProfile(data);toast("Profile draft saved in this browser.")}
 if(action==="edit-section"){const section=bAction.dataset.section;const val=prompt("Add details for "+section);if(val===null)return;const data=read("profileSections",{});data[section]=val;write("profileSections",data);applySections(data);toast(section+" draft saved locally.")}
 if(action==="preview-profile")toast("You are viewing the local profile preview.");
});
function applyProfile(d){if(!d)return;const h=$(".profile-name h1"),r=$(".profile-role"),l=$(".profile-location"),a=$("#aboutText");if(h)h.textContent=d.name||"Travel professional";if(r)r.textContent=d.role||"Travel & tourism · Professional member";if(l)l.textContent="⌖ "+(d.location||"Add your city and country");if(a&&d.about)a.textContent=d.about}
function applySections(d){if(d.About)$("#aboutText").textContent=d.About;if(d.Experience)$("#experienceList").textContent=d.Experience;if(d.Education)$("#educationList").textContent=d.Education;if(d.Interests)$("#interestTags").textContent=d.Interests}
applyProfile(read("profileDraft",{}));applySections(read("profileSections",{}));const c=$("#connectionCount");if(c)c.textContent=connections.length;renderPeople();if(initialQuery)showTab("discover");
})();