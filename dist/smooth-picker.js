!function t(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.SmoothPicker=n():e.SmoothPicker=n()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var i,o,s,a;Object.defineProperty(e,"__esModule",{value:!0}),e.SmoothPicker=e.version=e.default=void 0,i=n(1),o=r(i),s=function t(e){t.installed||e.component(o.default.name,o.default)},"undefined"!=typeof window&&window.Vue&&s(window.Vue),a="0.1.0",e.default=s,e.version=a,e.SmoothPicker=o.default},function(t,e,n){n(2);var r=n(4)(n(5),n(9),"data-v-43f1648a",null);t.exports=r.exports},function(t,e){},,function(t,e){t.exports=function t(e,n,r,i){var o,s,a,u=e=e||{},d=typeof e.default;return"object"!==d&&"function"!==d||(o=e,u=e.default),s="function"==typeof u?u.options:u,n&&(s.render=n.render,s.staticRenderFns=n.staticRenderFns),r&&(s._scopeId=r),i&&(a=s.computed||(s.computed={}),Object.keys(i).forEach(function(t){var e=i[t];a[t]=function(){return e}})),{esModule:o,exports:u,options:s}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var i,o;Object.defineProperty(e,"__esModule",{value:!0}),i=n(6),o=r(i),e.default={name:"smooth-picker",props:{data:{type:Array,default:[]},change:{type:Function,default:function t(){}}},data:function t(){return{currentIndexList:this.getCurrentIndexList(),groupsRectList:Array(this.data.length),touchOrMouse:{isTouchable:"ontouchstart"in window,isMouseDown:!1},draggingInfo:{isDragging:!1,groupIndex:null,startPageY:null}}},mounted:function t(){this.eventsRegister(),this.getGroupsRectList()},methods:{setGroupData:function t(e,n){var r,i;this.data[e]=n,r=n.currentIndex,i=0,"number"==typeof r&&r>=0&&n.list&&n.list.length&&r<=n.list.length-1&&(i=Math.round(r)),this.currentIndexList[e]=i},getGroupsRectList:function t(){this.$refs.smoothGroup&&this.$refs.smoothGroup.forEach(function(t,e){this.groupsRectList[e]=t.getBoundingClientRect()}.bind(this))},eventsRegister:function t(){var e=this.$refs.smoothHandleLayer;e&&this.addEventsForElement(e)},addEventsForElement:function t(e){var n=this.touchOrMouse.isTouchable,r=[{name:n?"touchstart":"mousedown",handler:this.handleStart},{name:n?"touchmove":"mousemove",handler:this.handleMove},{name:n?"touchend":"mouseup",handler:this.handleEnd},{name:n?"touchcancel":"mouseleave",handler:this.handleCancel}];r.forEach(function(t,n){e.removeEventListener(t.name,t.handler,!1),e.addEventListener(t.name,t.handler,!1)})},triggerMiddleLayerGroupClick:function t(e){var n=this.data;"number"==typeof e&&"function"==typeof n[e].onClick&&n[e].onClick(e,this.currentIndexList[e])},triggerAboveLayerClick:function t(e,n){this.forceUpdateCurrentIndex(n,this.currentIndexList[n]+1),this.correctionCurrentIndex(e,n)},triggerMiddleLayerClick:function t(e,n){this.triggerMiddleLayerGroupClick(n)},triggerBelowLayerClick:function t(e,n){this.forceUpdateCurrentIndex(n,this.currentIndexList[n]-1),this.correctionCurrentIndex(e,n)},getTouchInfo:function t(e){return this.touchOrMouse.isTouchable?e.changedTouches[0]||e.touches[0]:e},getGroupIndexBelongsEvent:function t(e){var n,r,i=this.getTouchInfo(e);for(n=0;n<this.groupsRectList.length;n++)if(r=this.groupsRectList[n],r.left<i.pageX&&i.pageX<r.right)return n;return null},handleEventClick:function t(e){var n=this.getGroupIndexBelongsEvent(e);switch(e.target.dataset.type){case"above":this.triggerAboveLayerClick(e,n);break;case"middle":this.triggerMiddleLayerClick(e,n);break;case"below":this.triggerBelowLayerClick(e,n)}},handleStart:function t(e){e.preventDefault(),e.stopPropagation();var n=this.getTouchInfo(e);this.draggingInfo.startPageY=n.pageY,this.touchOrMouse.isTouchable||(this.touchOrMouse.isMouseDown=!0)},handleMove:function t(e){e.preventDefault(),e.stopPropagation(),(this.touchOrMouse.isTouchable||this.touchOrMouse.isMouseDown)&&(this.draggingInfo.isDragging=!0,this.setCurrentIndexOnMove(e))},handleEnd:function t(e){e.preventDefault(),e.stopPropagation(),this.draggingInfo.isDragging||this.handleEventClick(e),this.draggingInfo.isDragging=!1,this.touchOrMouse.isMouseDown=!1,this.correctionAfterDragging(e)},handleCancel:function t(e){e.preventDefault(),e.stopPropagation(),(this.touchOrMouse.isTouchable||this.touchOrMouse.isMouseDown)&&(this.correctionAfterDragging(e),this.touchOrMouse.isMouseDown=!1,this.draggingInfo.isDragging=!1)},forceUpdateCurrentIndex:function t(e,n){var r=JSON.parse((0,o.default)(this.currentIndexList));r[e]=n,this.currentIndexList=r},setCurrentIndexOnMove:function t(e){var n,r,i,o=this.getTouchInfo(e);null===this.draggingInfo.groupIndex&&(this.draggingInfo.groupIndex=this.getGroupIndexBelongsEvent(e)),n=this.draggingInfo.groupIndex,("number"!=typeof n||!this.data[n].divider&&this.data[n].list)&&(r=(this.draggingInfo.startPageY-o.pageY)/32,i=this.currentIndexList[n]+r,this.forceUpdateCurrentIndex(n,i),this.draggingInfo.startPageY=o.pageY)},correctionAfterDragging:function t(e){var n=this.draggingInfo.groupIndex;this.correctionCurrentIndex(e,n),this.draggingInfo.groupIndex=null,this.draggingInfo.startPageY=null},correctionCurrentIndex:function t(e,n){setTimeout(function(){if("number"==typeof n&&this.data[n].divider!==!0&&this.data[n].list.length>0){var t=this.currentIndexList[n];t>this.data[n].list.length-1?t=this.data[n].list.length-1:t<0&&(t=0),t=Math.round(t),this.forceUpdateCurrentIndex(n,t),this.change(n,t)}}.bind(this),100)},isCurrentItem:function t(e,n){return!!(this.currentIndexList&&this.currentIndexList.length>e)&&this.currentIndexList[e]===n},getCurrentIndexList:function t(){return this.data.map(function(t,e){var n=t.currentIndex;return"number"==typeof n&&n>=0&&t.list&&t.list.length&&n<=t.list.length-1?Math.round(n):0})},getItemStyle:function t(e,n){var r,i=this.currentIndexList[e]-n;return Math.abs(i)<4?(r="transform: rotateX("+23*i+"deg) translate3d(0px, 0px, 90px);",this.draggingInfo.isDragging||(r+=" transition: transform 150ms ease-out;"),r):i>0?"transform: rotateX(100deg) translate3d(0px, 0px, 90px)":"transform: rotateX(-100deg) translate3d(0px, 0px, 90px)"}}}},function(t,e,n){t.exports={default:n(7),__esModule:!0}},function(t,e,n){var r=n(8),i=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function t(e){return i.stringify.apply(i,arguments)}},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"smooth-picker flex-box"},[t._l(t.data,function(e,r){return n("div",{key:r,ref:"smoothGroup",refInFor:!0,staticClass:"smooth-group",class:e.className+(e.flex?" flex-"+e.flex:1)},[n("div",{staticClass:"smooth-list"},[e.divider?n("div",{staticClass:"smooth-item divider",class:e.textAlign?"text-"+e.textAlign:""},[t._v(t._s(e.text))]):t._l(e.list,function(i,o){return n("div",{key:o,staticClass:"smooth-item",class:(t.isCurrentItem(r,o)?"smooth-item-selected ":"")+(e.textAlign?"text-"+e.textAlign:""),style:t.getItemStyle(r,o)},[t._v("\n        "+t._s(i.value||i)+"\n      ")])})],2)])}),t._v(" "),n("div",{ref:"smoothHandleLayer",staticClass:"smooth-handle-layer flex-box direction-column"},[n("div",{staticClass:"smooth-above flex-1",attrs:{"data-type":"above"}}),t._v(" "),n("div",{staticClass:"smooth-middle",attrs:{"data-type":"middle"}}),t._v(" "),n("div",{staticClass:"smooth-below flex-1",attrs:{"data-type":"below"}})])],2)},staticRenderFns:[]}}])});