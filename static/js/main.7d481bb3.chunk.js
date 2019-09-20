(window["webpackJsonppet-hp"]=window["webpackJsonppet-hp"]||[]).push([[0],{73:function(e,t,a){e.exports=a(88)},78:function(e,t,a){},88:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(12),o=a.n(i),l=a(65),c=a(47),u=a(15),s=a(16),d=a(66),h=a(26),g=a(17),p=a(48),v=a(110),m=a(111),y=a(106),b=a(112),f=a(43),w=a(113),E=a(115),S=a(103),k=a(108),P=a(109),I=a(105),B=a(95),C=a(96),L=a(99),O=a(100),j=a(101),T=a(102),F=a(104),z={feeding:[{description:"Eating normal food",weight:1,tally:0},{description:"Hunting",weight:2,tally:0},{description:"Scavenging",weight:2,tally:0}],vocalizations:[{description:"Song",weight:1,tally:0},{description:"Alarm Call",weight:1,tally:0},{description:"Funny vocalization",weight:2,tally:0}],grooming:[{description:"Preening",weight:1,tally:0},{description:"Bathing",weight:1,tally:0},{description:"Social Grooming",weight:2,tally:0}],rogue:[{description:"Mischievous action",weight:3,tally:0},{description:"Stealing something",weight:4,tally:0},{description:"Surprising the shit out you",weight:5,tally:0}],cleric:[{description:"Soothing action",weight:3,tally:0},{description:"Gentle touch",weight:4,tally:0},{description:"Appearing in your hour of need",weight:5,tally:0}],paladin:[{description:"Loyal action",weight:3,tally:0},{description:"Doing good deeds",weight:4,tally:0},{description:"Bringing you something you didn't ask for",weight:5,tally:0}],ranger:[{description:"Clever action",weight:3,tally:0},{description:"Gazing contemplatively",weight:4,tally:0},{description:"Ignoring you completely",weight:5,tally:0}],barbarian:[{description:"Impolite action",weight:3,tally:0},{description:"Courageous feat",weight:4,tally:0},{description:"Not giving a shit about smart stuff",weight:5,tally:0}]},D={dog:2.4,cat:2,fish:3.1,reptile:2.8,bird:2.3,equine:2.4,"small mammal":2.4,bug:2.3,amphibian:2.2,"farm animal":2.2,exotic:2.8,plant:2.2},x={dog:{rogue:35,cleric:76,paladin:116,ranger:156,barbarian:196},cat:{rogue:40,cleric:75,paladin:110,ranger:144,barbarian:179},fish:{rogue:20,cleric:73,paladin:126,ranger:178,barbarian:231},reptile:{rogue:30,cleric:78,paladin:126,ranger:173,barbarian:221},bird:{rogue:40,cleric:79,paladin:116,ranger:154,barbarian:191},equine:{rogue:45,cleric:86,paladin:126,ranger:166,barbarian:206},"small mammal":{rogue:10,cleric:51,paladin:91,ranger:131,barbarian:171},bug:{rogue:1,cleric:40,paladin:77,ranger:115,barbarian:152},amphibian:{rogue:140,cleric:77,paladin:114,ranger:150,barbarian:187},"farm animal":{rogue:50,cleric:88,paladin:126,ranger:163,barbarian:201},exotic:{rogue:35,cleric:83,paladin:130,ranger:177,barbarian:224},plant:{rogue:30,cleric:68,paladin:106,ranger:143,barbarian:181}},A=function(){function e(){Object(u.a)(this,e)}return Object(s.a)(e,[{key:"getBehaviorsForCategory",value:function(e){return z[e]}},{key:"getBaseHp",value:function(e){return x[e.type][e.class]}},{key:"getLevelMod",value:function(e){return D[e.type]}},{key:"behaviorCategories",get:function(){return Object.keys(z)}},{key:"classList",get:function(){return["rogue","cleric","paladin","ranger","barbarian"]}},{key:"typeList",get:function(){return["dog","cat","fish","reptile","bird","equine","small mammal","bug","amphibian","farm animal","exotic","plant"]}}]),e}(),H={petId:0,petList:[],curPet:{id:0,name:"",type:"cat",class:"barbarian",level:0,duration:0,hp:0,behaviors:{feeding:[],vocalizations:[],grooming:[],class:[]}}},R=function(){function e(){if(Object(u.a)(this,e),this.petState=H,window.localStorage.getItem("pet-details")){var t=window.localStorage.getItem("pet-details");if(null!==t){var a=JSON.parse(t);this.petState=a}}}return Object(s.a)(e,[{key:"update",value:function(e){var t=JSON.stringify(e);window.localStorage.setItem("pet-details",t)}},{key:"savedState",get:function(){return this.petState}}]),e}();a(78);function N(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?N(a,!0).forEach((function(t){Object(c.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):N(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var J=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).bS=void 0,a.pS=void 0,a.theme={global:{colors:{brand:"#228BE6"}}},a.renderTallyUp=function(e){return n.a.createElement(v.a,{icon:n.a.createElement(B.a,null),onClick:function(){return a.incrementBehaviorTally(M({asc:!0},e))}})},a.renderTallyDn=function(e){var t=a.state.petList[e.petInd].behaviors[e.behaviorCategory][e.behaviorInd].tally>0;return n.a.createElement(v.a,{icon:n.a.createElement(C.a,null),active:t,onClick:function(){return a.incrementBehaviorTally(M({asc:!1},e))}})},a.handleInput=function(e){var t=e.target.value;a.setState((function(e){var a=e.curPet;return a.name=t,{curPet:a}}))},a.handleDurationInput=function(e){var t=e.target.value;a.setState((function(e){var a=e.curPet;return a.duration=t,{curPet:a}}))},a.onAddItem=function(){a.setState((function(e){return{petList:[].concat(Object(l.a)(e.petList),[e.curPet]),petId:e.petId+1,curPet:a.emptyPet(),showSidebar:!1}}))},a.onRemoveItem=function(){a.setState((function(e){return{petList:e.petList.filter((function(t){return t.id!==e.curPet.id})),curPet:a.emptyPet(),showSidebar:!1}}))},a.onEditItem=function(){a.setState((function(e){return{petList:e.petList.map((function(t){if(t.id===e.curPet.id){var r=a.calculateLevel({pet:e.curPet}),n=a.calculateHp({pet:e.curPet}),i=a.bS.getBehaviorsForCategory(e.curPet.class);e.curPet.level=r,e.curPet.hp=n,e.curPet.behaviors.class=i,t=e.curPet}return t})),curPet:a.emptyPet(),showSidebar:!1}}))},a.bS=new A,a.pS=new R,a.state={petId:0,showSidebar:!1,petList:[],curPet:{id:0,name:"tmp",type:"cat",class:"barbarian",level:0,duration:0,hp:0,behaviors:{feeding:a.bS.getBehaviorsForCategory("feeding"),vocalizations:a.bS.getBehaviorsForCategory("vocalizations"),grooming:a.bS.getBehaviorsForCategory("grooming"),class:a.bS.getBehaviorsForCategory("barbarian")}},saveButtonAction:"add"},a.incrementBehaviorTally.bind(Object(g.a)(a)),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.setState(this.pS.petState)}},{key:"incrementBehaviorTally",value:function(e){var t=this;this.setState((function(a){var r=a.petList.slice(),n=r[e.petInd],i=n.behaviors[e.behaviorCategory].slice();return e.asc?i[e.behaviorInd].tally++:i[e.behaviorInd].tally>0&&i[e.behaviorInd].tally--,n.behaviors[e.behaviorCategory]=i,n.level=t.calculateLevel({pet:n}),r[e.petInd]=n,{petList:r}}))}},{key:"calculateLevel",value:function(e){var t=0;t+=this.getLevelforBehavior(e.pet.behaviors.feeding),t+=this.getLevelforBehavior(e.pet.behaviors.grooming),t+=this.getLevelforBehavior(e.pet.behaviors.vocalizations),t+=this.getLevelforBehavior(e.pet.behaviors.class);var a=e.pet.duration;return e.pet.duration<=0&&(a=1),Math.floor(t/a)}},{key:"calculateHp",value:function(e){var t=this.calculateLevel(e),a=this.bS.getBaseHp({class:e.pet.class,type:e.pet.type}),r=this.bS.getLevelMod({type:e.pet.type});return Math.floor(a+t*r)}},{key:"getLevelforBehavior",value:function(e){var t=0;return e.forEach((function(e){t+=e.tally*e.weight})),t}},{key:"renderBehaviorRow",value:function(e){var t=this,a=this.state.petList[e.petInd].behaviors[e.category].map((function(a,r){var i=a.description.replace(" ","-");return n.a.createElement("tr",{key:i+"-row"},n.a.createElement("td",{key:i+"-des"},a.description),n.a.createElement("td",{key:i+"-tally"},a.tally),n.a.createElement("td",{key:i+"-inc"},t.renderTallyDn({petInd:e.petInd,behaviorInd:r,behaviorCategory:e.category}),t.renderTallyUp({petInd:e.petInd,behaviorInd:r,behaviorCategory:e.category})))})),r=e.category;return n.a.createElement(n.a.Fragment,null,n.a.createElement("tr",{className:"behavior-category-row",key:r+"-row"},n.a.createElement("td",{key:r+"-des",className:"behavior-category-title"},e.category)),a)}},{key:"renderBehaviorTable",value:function(e){var t=n.a.createElement(n.a.Fragment,null,this.renderBehaviorRow(M({category:"feeding"},e)),this.renderBehaviorRow(M({category:"vocalizations"},e)),this.renderBehaviorRow(M({category:"grooming"},e)),this.renderBehaviorRow(M({category:"class"},e)));return n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",{key:"behavior-headers"},n.a.createElement("th",null,"Behavior"),n.a.createElement("th",null,"Tally"))),n.a.createElement("tbody",null,t))}},{key:"renderNameInput",value:function(){return n.a.createElement(m.a,{placeholder:"name",value:this.state.curPet.name,onChange:this.handleInput})}},{key:"renderDurationInput",value:function(){return n.a.createElement(m.a,{type:"number",value:this.state.curPet.duration,onChange:this.handleDurationInput})}},{key:"renderClassPicker",value:function(){var e=this,t=this.bS.classList;return n.a.createElement(y.a,{options:t,value:this.state.curPet.class,onChange:function(t){return e.setState((function(e){var a=e.curPet;return a.class=t.value,{curPet:a}}))}})}},{key:"renderTypePicker",value:function(){var e=this,t=this.bS.typeList;return n.a.createElement(y.a,{options:t,value:this.state.curPet.type,onChange:function(t){return e.setState((function(e){var a=e.curPet;return a.type=t.value,{curPet:a}}))}})}},{key:"renderPetTabs",value:function(){var e=this,t=this.state.petList.map((function(t,a){return n.a.createElement(b.a,{key:t.id+"-tab",title:t.name},n.a.createElement(f.a,{key:t.id+"info-box",flex:!0},e.renderPetInfo({pet:t}),e.renderBehaviorTable({petInd:a})))}));return n.a.createElement(w.a,null,t)}},{key:"renderPetInfo",value:function(e){var t=this,a=this.calculateLevel(e),r=this.calculateHp(e);return n.a.createElement("div",null,n.a.createElement("div",{className:"pet-info"},e.pet.name,n.a.createElement("br",null),"Level "+a+" "+e.pet.type+" "+e.pet.class,n.a.createElement("br",null),"HP: "+r),n.a.createElement(v.a,{icon:n.a.createElement(L.a,null),onClick:function(){t.setState({showSidebar:!0,curPet:Object.assign({},e.pet),saveButtonAction:"edit"})}}),n.a.createElement(v.a,{icon:n.a.createElement(O.a,null),onClick:function(){t.setState({showSidebar:!0,curPet:Object.assign({},e.pet)},(function(){return t.onRemoveItem()}))}}))}},{key:"emptyPet",value:function(){return{id:this.state.petId,name:"",type:"cat",class:"barbarian",level:0,duration:0,hp:0,behaviors:{feeding:this.bS.getBehaviorsForCategory("feeding"),vocalizations:this.bS.getBehaviorsForCategory("vocalizations"),grooming:this.bS.getBehaviorsForCategory("grooming"),class:this.bS.getBehaviorsForCategory("barbarian")}}}},{key:"renderHeader",value:function(){var e=this;return n.a.createElement((function(e){return n.a.createElement(f.a,Object.assign({tag:"header",direction:"row",align:"center",justify:"between",background:"brand",pad:{left:"medium",right:"small",vertical:"small"},elevation:"medium",style:{zIndex:"1"}},e))}),null,n.a.createElement(E.a,{level:"3",margin:"none"},"Pet HP Calculator"),n.a.createElement(v.a,{icon:n.a.createElement(j.a,null),onClick:function(){return e.setState((function(t){return{showSidebar:!t.showSidebar,curPet:e.emptyPet(),saveButtonAction:"add"}}))}}),n.a.createElement(v.a,{icon:n.a.createElement(T.a,null),onClick:function(){return e.pS.update({curPet:e.state.curPet,petId:e.state.petId,petList:e.state.petList})}}))}},{key:"renderSidebar",value:function(e){var t=this;return this.state.showSidebar&&"small"===e?n.a.createElement(k.a,null,n.a.createElement(f.a,{background:"light-2",tag:"header",justify:"end",align:"center",direction:"row"},n.a.createElement(v.a,{icon:n.a.createElement(F.a,null),onClick:function(){return t.setState({showSidebar:!1})}})),n.a.createElement(f.a,{fill:!0,background:"light-2",align:"center",justify:"center"},this.renderInputs())):n.a.createElement(S.a,{direction:"horizontal",open:this.state.showSidebar},n.a.createElement(f.a,{flex:!0,width:"medium",background:"light-2",elevation:"small",align:"center",justify:"center"},this.renderInputs()))}},{key:"renderInputs",value:function(){return n.a.createElement(n.a.Fragment,null,this.renderNameInput(),this.renderClassPicker(),this.renderTypePicker(),this.renderDurationInput(),this.renderSaveButton())}},{key:"renderSaveButton",value:function(){var e;switch(this.state.saveButtonAction){case"add":e=this.renderAddSaveButton();break;case"edit":e=this.renderEditSaveButton()}return e}},{key:"renderAddSaveButton",value:function(){var e=this;return n.a.createElement(v.a,{icon:n.a.createElement(B.a,null),onClick:function(){return e.onAddItem()}})}},{key:"renderEditSaveButton",value:function(){var e=this;return n.a.createElement(v.a,{icon:n.a.createElement(T.a,null),onClick:function(){return e.onEditItem()}})}},{key:"renderRemoveButton",value:function(){var e=this;return n.a.createElement(v.a,{icon:n.a.createElement(O.a,null),onClick:function(){return e.onRemoveItem()}})}},{key:"render",value:function(){var e=this;return n.a.createElement(P.a,{theme:this.theme,full:!0},n.a.createElement(I.a.Consumer,null,(function(t){return n.a.createElement(f.a,{fill:!0},e.renderHeader(),n.a.createElement(f.a,{direction:"row",flex:!0,overflow:{horizontal:"hidden"}},e.renderSidebar(t),n.a.createElement(f.a,{flex:!0,align:"center"},e.renderPetTabs())))})))}}]),t}(r.Component),q=J;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[73,1,2]]]);
//# sourceMappingURL=main.7d481bb3.chunk.js.map