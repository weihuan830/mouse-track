!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),Parse.initialize("mousetrack_app","mousetrack_master_key"),Parse.serverURL="http://mousetrack.s15.hkustvis.org/parse",window.localStorage.userid||(window.localStorage.userid=function(e,t){for(var n="",o=e;o>0;--o)n+=t[Math.floor(Math.random()*t.length)];return n}(16,"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"));const o=window.localStorage.userid,r=document.getElementById("script_mousetrack").getAttribute("collection");var i={pool:[],poolsize:60,static:{},init:function(){i.getBrowser(),i.getOS()},accumulation(e){let t=i.defAttributes(e);for(let n in e)"object"!=typeof e[n]?t[n]=e[n]:""==e[n]?t[n]="-":1==e[n]?t[n]="True":0==e[n]&&(t[n]="False");i.pool.push(new Parse.Object(r,t)),i.pool.length>=i.poolsize&&(i.submitData(),i.pool=[])},submitData(){Parse.Object.saveAll(i.pool).then(function(){console.log("Success")}).catch(function(e){alert("Error saving test object!"+e.message)})},defAttributes(e){let t={};return t.d_path=i.getElementPathByEvent(e),t.d_userid=o,t.d_osVersion=i.static.OS,t.d_browser=i.static.Browser||"unknown",t.d_timestamp=(new Date).getTime(),t.d_url=window.location.href,t.d_clientWidth=e.srcElement.clientWidth,t.d_clientHeight=e.srcElement.clientHeight,t},getElementPathByEvent:function(e){let t=e.target;if(!t||null==t.classList)return"";let n=","+(t.tagName||"")+"#"+(t.id||"")+"."+t.classList.value.replace(/ /g,".");for(;null!=t.parentElement;)n=","+(t=t.parentElement).tagName+"#"+t.id+"."+t.classList.value.replace(/ /g,".")+n;return n.slice(1)},getTouchable:function(){i.static.hasTouch="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch||navigator.maxTouchPoints>0||window.navigator.msMaxTouchPoints>0},getOS:function(){i.static.OS=navigator.appVersion.match(/\(.+?\)/)[0].replace(/[\(\)]/g,"")},getBrowser:function(){var e,t=navigator.userAgent,n=t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(n[1])?"IE "+((e=/\brv[ :]+(\d+)/g.exec(t)||[])[1]||""):"Chrome"===n[1]&&null!=(e=t.match(/\b(OPR|Edge)\/(\d+)/))?e.slice(1).join(" ").replace("OPR","Opera"):(n=n[2]?[n[1],n[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(e=t.match(/version\/(\d+)/i))&&n.splice(1,1,e[1]),void(i.static.Browser=n.join(" ")))}};i.init(),n.d(t,"mousetrack",function(){return a});var a={config:{ele:null,mouseEvents:["mousemove","mousedown","mouseleave","mouseenter","mouseup","mouseover","mouseout","mousewheel","select","wheel","contextmenu"],windowEvent:["blur","focus"],documentEvent:["keypress","paste","copy","cut"]},init(){a.config.ele=document.getElementsByTagName("html")[0],a.setWindowEvent(),a.setDocumentEvent(),a.setMouseEvent()},throttle(e,t){var n=!1;return function(){n||(e.call(),n=!0,setTimeout(function(){n=!1},t))}},setWindowEvent(){a.config.windowEvent.forEach(e=>{window.addEventListener(e,function(e){i.accumulation(e)})}),window.onbeforeunload=function(e){i.accumulation(e),i.submitData()}},setDocumentEvent(){a.config.documentEvent.forEach(e=>{document.addEventListener(e,function(e){i.accumulation(e)})})},setMouseEvent(e){e||(e=window),a.config.mouseEvents.forEach(t=>{"string"==typeof t?e.addEventListener(t,function(e){i.accumulation(e)}):e.addEventListener(t,a.throttle(function(e){i.accumulation(e)},t[1]))})}};a.init()}]);