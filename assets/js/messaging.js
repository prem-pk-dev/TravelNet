(()=>{"use strict";
const $=s=>document.querySelector(s),KEY="travelnet:messaging";
const read=(k,fallback)=>{try{return JSON.parse(localStorage.getItem(KEY+":"+k))??fallback}catch{return fallback}};
const write=(k,value)=>{try{localStorage.setItem(KEY+":"+k,JSON.stringify(value));return true}catch{toast("Browser storage is unavailable.");return false}};
const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const stamp=()=>new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
const toast=message=>{const root=$("#toastRoot");if(!root)return;const item=document.createElement("div");item.className="toast";item.textContent=message;root.append(item);setTimeout(()=>item.remove(),2500)};
const contacts=[
{id:"maya",name:"Maya Chen",role:"Destination strategy · Singapore",initials:"MC",preview:"I can share the destination research outline.",time:"10:42",unread:true,messages:[["them","Thanks for connecting. I’m comparing community-led visitor experiences across a few destinations.","10:31"],["mine","That sounds useful. Which indicators are you finding most practical?","10:36"],["them","I can share the destination research outline.","10:42"]]},
{id:"oliver",name:"Oliver Bennett",role:"Hospitality partnerships · Barcelona",initials:"OB",preview:"A local operator partnership could be worth exploring.",time:"Yesterday",unread:false,messages:[["them","A local operator partnership could be worth exploring.","Yesterday"]]},
{id:"samira",name:"Samira Rahman",role:"Hotel partnerships · Dubai",initials:"SR",preview:"Are you attending the regional travel meet-up?",time:"Mon",unread:false,messages:[["them","Are you attending the regional travel meet-up?","Mon"]]},
{id:"alex",name:"Alex Morgan",role:"Destination specialist · Lisbon",initials:"AM",preview:"Happy to compare destination research notes.",time:"Tue",unread:false,messages:[["them","Happy to compare destination research notes.","Tue"]]}
];
let chats=read("chats",contacts).map(c=>({...c,messages:Array.isArray(c.messages)?c.messages:[],preview:c.preview||"",time:c.time||"",unread:!!c.unread}));
let notices=read("notices",[
{id:"n1",icon:"♧",text:"Maya Chen sent you a connection message.",time:"Today · 10:42",unread:true},
{id:"n2",icon:"◎",text:"A new discussion was added to Responsible Tourism Exchange.",time:"Yesterday",unread:true},
{id:"n3",icon:"▦",text:"A company profile you viewed has updated its service summary.",time:"2 days ago",unread:false},
{id:"n4",icon:"✳",text:"Your profile setup checklist is ready to review.",time:"3 days ago",unread:false}
]);
function renderList(){
 const root=$("#conversationList");if(!root)return;
 const q=($("#conversationSearch")?.value||"").trim().toLowerCase(),filter=$("#messageFilter")?.value||"all";
 const rows=chats.filter(c=>(filter!=="unread"||c.unread)&&(c.name+" "+c.role+" "+c.preview).toLowerCase().includes(q));
 root.innerHTML=rows.length?rows.map(c=>'<a class="conversation-row '+(c.unread?"unread":"")+'" href="conversation.html?id='+encodeURIComponent(c.id)+'"><span class="conversation-avatar">'+esc(c.initials)+'</span><span class="conversation-copy"><span class="conversation-top"><strong>'+esc(c.name)+'</strong><time>'+esc(c.time)+'</time></span><p>'+esc(c.preview||"Start a professional conversation")+'</p><small>'+esc(c.role)+'</small></span>'+(c.unread?'<i class="unread-dot" aria-label="Unread"></i>':"")+'</a>').join(""):'<div class="empty-messages">No conversations match this filter.</div>';
 const unread=chats.filter(c=>c.unread).length, count=$("#messageUnreadCount");if(count)count.textContent=unread+" unread";
}
function openNewMessage(){const modal=$("#newConversationModal");if(!modal)return;modal.hidden=false;$("#newConversationPerson")?.focus()}
function closeNewMessage(){const modal=$("#newConversationModal");if(modal)modal.hidden=true;$("#newConversationForm")?.reset()}
$("#conversationSearch")?.addEventListener("input",renderList);
$("#messageFilter")?.addEventListener("change",renderList);
$("#newMessageButton")?.addEventListener("click",openNewMessage);
$("#newConversationModal")?.addEventListener("click",e=>{if(e.target.id==="newConversationModal"||e.target.closest("[data-close-new-message]"))closeNewMessage()});
$("#newConversationForm")?.addEventListener("submit",e=>{
 e.preventDefault();const form=new FormData(e.currentTarget),id=String(form.get("person")||""),opening=String(form.get("message")||"").trim(),person=contacts.find(p=>p.id===id);if(!person)return;
 let chat=chats.find(c=>c.id===id);if(!chat){chat={...person,messages:[],preview:"",time:"",unread:false};chats.unshift(chat)}
 if(opening){const time=stamp();chat.messages.push(["mine",opening,time]);chat.preview=opening;chat.time=time}
 chat.unread=false;write("chats",chats);closeNewMessage();location.href="conversation.html?id="+encodeURIComponent(id);
});
if($("#conversationList"))renderList();
const chatRoot=$("#chatMessages");
if(chatRoot){
 const id=new URLSearchParams(location.search).get("id")||"maya";
 let chat=chats.find(c=>c.id===id);
 if(!chat){chat=contacts.find(c=>c.id===id)||contacts[0];chat={...chat,messages:[...(chat.messages||[])],unread:false};chats.unshift(chat)}
 if(!Array.isArray(chat.messages))chat.messages=[];
 $("#chatTitle").textContent=chat.name;$("#chatSubtitle").textContent=chat.role+" · illustrative conversation";
 chat.unread=false;write("chats",chats);
 function renderChat(){chatRoot.innerHTML=chat.messages.length?chat.messages.map(m=>'<div class="chat-bubble '+(m[0]==="mine"?"mine":"")+'">'+esc(m[1])+'<small>'+esc(m[2])+'</small></div>').join(""):'<div class="empty-messages">This conversation is ready. Write the first message to begin.</div>';chatRoot.scrollTop=chatRoot.scrollHeight}
 renderChat();
 $("#messageForm")?.addEventListener("submit",e=>{e.preventDefault();const field=$("#messageInput"),value=field.value.trim();if(!value)return;const time=stamp();chat.messages.push(["mine",value,time]);chat.preview=value;chat.time=time;write("chats",chats);field.value="";renderChat();field.focus();toast("Message saved in this browser only.")});
}
function renderNotices(){
 const root=$("#notificationList");if(!root)return;
 const filter=$("#notificationFilter")?.value||"all",items=notices.filter(n=>filter!=="unread"||n.unread);
 $("#notificationCount").textContent=notices.filter(n=>n.unread).length+" unread";
 root.innerHTML=items.length?items.map(n=>'<article class="notification-item '+(n.unread?"unread":"")+'"><span class="notification-icon">'+esc(n.icon)+'</span><div class="notification-copy"><p>'+esc(n.text)+'</p><time>'+esc(n.time)+'</time></div>'+(n.unread?'<button type="button" data-read="'+esc(n.id)+'">Mark read</button>':'<span aria-label="Read">✓</span>')+'</article>').join(""):'<div class="empty-messages">You’re all caught up.</div>';
}
$("#notificationFilter")?.addEventListener("change",renderNotices);
$("#notificationList")?.addEventListener("click",e=>{const button=e.target.closest("[data-read]");if(!button)return;notices=notices.map(n=>n.id===button.dataset.read?{...n,unread:false}:n);write("notices",notices);renderNotices()});
$("#markAllRead")?.addEventListener("click",()=>{notices=notices.map(n=>({...n,unread:false}));write("notices",notices);renderNotices();toast("All notifications marked as read.")});
if($("#notificationList"))renderNotices();
})();