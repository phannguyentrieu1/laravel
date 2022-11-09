/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function r(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function t(n,o){var i=u.raw?n:r(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(r,c,f){if(void 0!==c&&!e.isFunction(c)){if(f=e.extend({},u.defaults,f),"number"==typeof f.expires){var a=f.expires,d=f.expires=new Date;d.setTime(+d+864e5*a)}return document.cookie=[n(r),"=",i(c),f.expires?"; expires="+f.expires.toUTCString():"",f.path?"; path="+f.path:"",f.domain?"; domain="+f.domain:"",f.secure?"; secure":""].join("")}for(var p=r?void 0:{},s=document.cookie?document.cookie.split("; "):[],m=0,x=s.length;x>m;m++){var v=s[m].split("="),k=o(v.shift()),l=v.join("=");if(r&&r===k){p=t(l,c);break}r||void 0===(l=t(l))||(p[k]=l)}return p};u.defaults={},e.removeCookie=function(n,o){return void 0===e.cookie(n)?!1:(e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n))}});
/*
 Jquery Iframe Auto Height Plugin
 Version 1.2.5 (09.10.2013)

 Author : Ilker Guller (http://ilkerguller.com)

 Description: This plugin can get contents of iframe and set height of iframe automatically. Also it has cross-domain fix (*).
 Details: http://github.com/Sly777/Iframe-Height-Jquery-Plugin
 */
(function($){var uuid=0;var iframeOptions={resizeMaxTry:4,resizeWaitTime:50,minimumHeight:200,defaultHeight:3000,heightOffset:0,exceptPages:"",debugMode:false,visibilitybeforeload:false,blockCrossDomain:false,externalHeightName:"bodyHeight",onMessageFunctionName:"getHeight",domainName:"*",watcher:false,watcherTime:400};$.iframeHeight=function(el,options){var base=this;$.iframeHeight.resizeTimeout=null;$.iframeHeight.resizeCount=0;base.$el=$(el);base.el=el;base.$el.before("<div id='iframeHeight-Container-"+uuid+"' style='padding: 0; margin: 0; border: none; background-color: transparent;'></div>");base.$el.appendTo("#iframeHeight-Container-"+uuid);base.$container=$("#iframeHeight-Container-"+uuid);base.$el.data("iframeHeight",base);base.watcher=null;base.debug={FirstTime:true,Init:function(){if(!('console'in window))console={};'log info warn error dir clear'.replace(/\w+/g,function(f){if(!(f in console))console[f]=console.log||new Function})},Log:function(message){if(this.FirstTime&&this.FirstTime===true){this.Init();this.FirstTime=false}if(base.options.debugMode&&base.options.debugMode===true&&console&&(message!==null||message!=="")){console["log"]("Iframe Plugin : "+message)}},GetBrowserInfo:(function(pub){var matched,browserObj;var uaMatch=function(ua){ua=ua.toLowerCase();if(/*@cc_on/*@if(@_jscript_version<=5.6)1@else@*/0/*@end@*/){ua="msie 6.0"}var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];return{browserObj:match[1]||"",version:match[2]||"0"}};matched=uaMatch(navigator.userAgent);browserObj={chrome:false,safari:false,mozilla:false,msie:false,webkit:false};if(matched.browserObj){browserObj[matched.browserObj]=true;browserObj.version=matched.version}if(browserObj.chrome){browserObj.webkit=true}else if(browserObj.webkit){browserObj.safari=true}pub=browserObj;return pub}(this.GetBrowserInfo||{}))};var isThisCDI=function(){try{var contentHtml;if(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version=="7.0"){contentHtml=base.$el.get(0).contentWindow.location.href}else{contentHtml=base.$el.get(0).contentDocument.location.href}base.debug.Log("This page is non-Cross Domain - "+contentHtml);return false}catch(err){base.debug.Log("This page is Cross Domain");return true}};base.resetIframe=function(){if(base.options.visibilitybeforeload&&!(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version=="7.0"))base.$el.css("visibility","hidden");base.debug.Log("Old Height is "+base.$el.height()+"px");base.$el.css("height","").removeAttr("height");base.debug.Log("Reset iframe");base.debug.Log("Height is "+base.$el.height()+"px after reset")};base.resizeFromOutside=function(event){if(base.options.blockCrossDomain){base.debug.Log("Blocked cross domain fix");return false}if(typeof event==="undefined")return false;if(typeof event.data=="string"){if(event.data=="reset"){base.$el.css("height","").removeAttr("height")}else{if(!/^ifh*/.test(event.data))return false;if(typeof parseInt(event.data.substring(3))!="number")return false;var frameHeightPx=parseInt(event.data.substring(3))+parseInt(base.options.heightOffset);base.resetIframe();base.setIframeHeight(frameHeightPx)}}else{return false}return true};base.checkMessageEvent=function(){if(base.options.blockCrossDomain||(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version=="7.0")){base.debug.Log("Blocked cross domain fix");return false}base.resetIframe();if(base.options.visibilitybeforeload&&!(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version=="7.0"))base.$el.css("visibility","visible");if(window.addEventListener){window.addEventListener('message',base.resizeFromOutside,false)}else if(window.attachEvent){window.attachEvent('onmessage',base.resizeFromOutside)}if(!base.$el.id){base.$el.id="iframe-id-"+(++uuid)}var frame=document.getElementById(base.$el.attr("id"));var message=base.options.onMessageFunctionName;if(frame.contentWindow.postMessage){frame.contentWindow.postMessage(message,"*")}else{base.debug.Log("Your browser does not support the postMessage method!");return false}base.debug.Log("Cross Domain Iframe started");return true};var tryFixIframe=function(){if($.iframeHeight.resizeCount<=base.options.resizeMaxTry){$.iframeHeight.resizeCount++;$.iframeHeight.resizeTimeout=setTimeout($.iframeHeight.resizeIframe,base.options.resizeWaitTime);base.debug.Log($.iframeHeight.resizeCount+" time(s) tried")}else{clearTimeout($.iframeHeight.resizeTimeout);$.iframeHeight.resizeCount=0;base.debug.Log("set default height for iframe");base.setIframeHeight(base.options.defaultHeight+base.options.heightOffset)}};base.sendInfotoTop=function(){if(top.length>0&&typeof JSON!="undefined"){var data={};data[base.options.externalHeightName].value=$(document).height();var domain='*';data=JSON.stringify(data);top.postMessage(data,domain);base.debug.Log("sent info to top page");return false}return true};base.setIframeHeight=function(_height){base.$el.height(_height).css("height",_height);if(base.$el.data("iframeheight")!=_height)base.$container.height(_height).css("height",_height);if(base.options.visibilitybeforeload&&!(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version=="7.0"))base.$el.css("visibility","visible");base.debug.Log("Now iframe height is "+_height+"px");base.$el.data("iframeheight",_height)};$.iframeHeight.resizeIframe=function(){base.resetIframe();if(isThisCDI()){base.$el.height(base.options.defaultHeight+base.options.heightOffset).css("height",base.options.defaultHeight+base.options.heightOffset);if(base.options.visibilitybeforeload&&!(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version=="7.0"))base.$el.css("visibility","visible");base.checkMessageEvent()}else{if(base.$el.css("height")===base.options.minimumHeight+"px"){base.resetIframe()}if(base.$el.get(0).contentWindow.document.body!==null){base.debug.Log("This page has body info");var _pageHeight=$(base.$el.get(0).contentWindow.document).height();var _pageName=base.$el.get(0).contentWindow.document.location.pathname.substring(base.$el.get(0).contentWindow.document.location.pathname.lastIndexOf('/')+1).toLowerCase();base.debug.Log("page height : "+_pageHeight+"px || page name : "+_pageName);if((_pageHeight<=base.options.minimumHeight&&base.options.exceptPages.indexOf(_pageName)==-1)){tryFixIframe()}else if(_pageHeight>base.options.minimumHeight&&base.options.exceptPages.indexOf(_pageName)==-1){base.setIframeHeight(_pageHeight+base.options.heightOffset)}}else{base.debug.Log("This page has not body info");tryFixIframe()}}};this.$el.bind("updateIframe",function(){$.iframeHeight.resizeIframe();base.debug.Log("Updated Iframe Manually")});this.$el.bind("killWatcher",function(){window.clearInterval(base.watcher);base.debug.Log("Killed Watcher")});base.init=function(){base.options=$.extend({},$.iframeHeight.defaultOptions,options);if(base.options.watcher==true)base.options.blockCrossDomain=true;base.debug.Log(base.options);if(base.$el.get(0).tagName===undefined||base.$el.get(0).tagName.toLowerCase()!=="iframe"){base.debug.Log("This element is not iframe!");return false}$.iframeHeight.resizeIframe();base.$el.load(function(){$.iframeHeight.resizeIframe()});if(base.options.watcher){base.watcher=setInterval(function(){$.iframeHeight.resizeIframe();base.debug.Log("Checked Iframe")},base.options.watcherTime)}return true};base.init()};$.iframeHeight.defaultOptions=iframeOptions;$.fn.iframeHeight=function(options){return this.each(function(){(new $.iframeHeight(this,options))})};$.iframeHeightExternal=function(){if(arguments.length===1){if($.isPlainObject(arguments[0])){iframeOptions=arguments[0]}}if(window.addEventListener){window.addEventListener("message",OnMessage,false)}else if(window.attachEvent){window.attachEvent("onmessage",OnMessage)}function OnMessage(event){var _domain;if('domain'in event){_domain=event.domain}if('origin'in event){_domain=event.origin}if(iframeOptions.domainName!=="*"){if(_domain!==iframeOptions.domainName){$.iframeHeight.debug.Log("It's not same domain. Blocked!");return}}if(event.data==iframeOptions.onMessageFunctionName){var message="ifh"+$(document).height();event.source.postMessage(message,event.origin)}}return{update:function(){this.reset();window.__domainname=iframeOptions.domainName;setTimeout(function(){var message="ifh"+$(document).height();parent.postMessage(message,window.__domainname)},90)},reset:function(){parent.postMessage("reset",iframeOptions.domainName)}}}})(jQuery);

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isLowIE=b.isIE8=document.all&&!document.addEventListener,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(c,d){if(void 0===d||d===!1)return!0;if(e=c.split("_"),e.length>1){var f=b.find(p+"-"+e[0]);if(f.length>0){var g=e[1];"replaceWith"===g?f[0]!==d[0]&&f.replaceWith(d):"img"===g?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(p+"-"+c).html(d)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery";return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s);e.click(function(){b.prev()}),f.click(function(){b.next()}),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),A()});

/*! jQuery Validation Plugin - v1.12.0 - 4/1/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(a)).hide())},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",b).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=d.attr("type");return"radio"===e||"checkbox"===e?a("input[name='"+d.attr("name")+"']:checked").val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c[0].toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d=this.errorsFor(b);d.length?(d.removeClass(this.settings.validClass).addClass(this.settings.errorClass),d.html(c)):(d=a("<"+this.settings.errorElement+">").attr("for",this.idOrName(b)).addClass(this.settings.errorClass).html(c||""),this.settings.wrapper&&(d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b))),!c&&this.settings.success&&(d.text(""),"string"==typeof this.settings.success?d.addClass(this.settings.success):this.settings.success(d,b)),this.toShow=this.toShow.add(d)},errorsFor:function(b){var c=this.idOrName(b);return this.errors().filter(function(){return a(this).attr("for")===c})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){return this.checkable(a)&&(a=this.findByName(a.name).not(this.settings.ignore)[0]),a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c[0].toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(b.min&&b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),b.minlength&&b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."}}(jQuery),function(a){var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})}(jQuery),function(a){a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})}(jQuery);

var theme_list_open = false;
var helpSeen = false;
jQuery(document).ready(function($){

	$.iframeHeightExternal('#iframe');

	function resizeThemeFrame(){
		var e=$("#switcher").height();
		if ( $('body').hasClass('switcher-hidden') ) {
			$("#iframe").attr("height", $(window).height()+"px");
		} else {
			$("#iframe").attr("height", $(window).height()-e+"px");
		}
	}

	IS_IPAD=navigator.userAgent.match(/iPad/i)!=null;

	$(window).resize(function(){
		resizeThemeFrame();
	}).resize();

	var overlayCookie = $.cookie("demoOverlayCookie");

	// function showHelp(){
	// 	if ($(window).width() < 768) {
	// 		$('#overlay').hide();
	// 		//$('#theme-list li').eq(5).find('a').trigger('mouseover');// not working
	// 	} else {

	// 		$('#filter-help').html('');
	// 		$('#hover-help ul').html('');

	// 		$('#theme-select').addClass('active');
	// 		theme_list_open=true;
		
	// 		var ulClone = $('#type-list').clone();
	// 		var ulClonepos = $('#type-list').offset();
	// 		var ulClonew = $('#type-list').width();
	// 		var ulCloneh = $('#type-list').height();
	// 		var liClone = $('#theme-list li').eq(5).clone();
	// 		var liClonepos = $('#theme-list li').eq(5).offset();
	// 		var liClonew = $('#theme-list li').eq(5).width();
	// 		var clickImgpos = false;
	// 		var closeImgpos = $('.links').offset();
	// 		var linksw = $('.links').width();
	// 		if ( $('#device-select').is(":visible") ) {
	// 			clickImgpos = $('#device-select').offset();
	// 		} else if ( $('.tabletlandscape').is(":visible") ) {
	// 			clickImgpos = $('.tabletlandscape').offset();
	// 		}

	// 		$('#filter-help').css({'position':'fixed', 'left': ulClonepos.left-10, 'top': ulClonepos.top, 'width': ulClonew+10}).append(ulClone);
	// 		$('#filter-help-img').css({'position':'fixed', 'left': ulClonepos.left, 'top': ulClonepos.top + ulCloneh + 20 });

	// 		$('#hover-help').css({'position':'fixed', 'left': liClonepos.left-10, 'top': liClonepos.top, 'width': liClonew+20}).find('ul').css('display', 'block').append(liClone);
	// 		$('#hover-help-img').css({'position':'fixed', 'left': liClonepos.left + liClonew + 20, 'top': liClonepos.top-10 });
			
	// 		if ( clickImgpos ) {
	// 			$('#click-help-img').css({'position':'fixed', 'left': clickImgpos.left, 'top': 70 });
	// 		} else {
	// 			$('#click-help-img').hide();
	// 		}

	// 		$('#close-help-img').css({'position':'fixed', 'left': closeImgpos.left + linksw - 50, 'top': 70 });

	// 		$('#overlay').fadeIn();
	// 	}
	// }
	
	$(window).resize(function(){
		$('#overlay').click();
	});

	$("#overlay").click(function(){
		$(this).fadeOut();
		$('.help').show();
		$('#theme-select').removeClass('active');
		theme_list_open=false;
	});

	$(".help").click(function(e){
		e.preventDefault();
		if ( $('#dropdown-wrap').hasClass('search-box-open') ) {
			$('.search-form .icon').click();
		}
		$(this).hide();
		$('#type-list .active').removeClass('active');
		$('#type-list li:first-child a').addClass('active');

		$('#right-column .products-list.active').removeClass('active');
		$('#theme-list').addClass('active');
		$('#right-column').scrollTop(0);
		//showHelp();
		if ( !overlayCookie ) {
			helpSeen = true;
			$.cookie('demoOverlayCookie', helpSeen, { expires: 7, path: '/' }); // 7 days
		}
	});

	$("#theme-select").click(function(){
		
		if(theme_list_open==true){
            $('#theme-select').removeClass('active');
			theme_list_open=false;
		}else{
            $('#theme-select').addClass('active');
			theme_list_open=true;
		}
		
		return false;
	});

	$("#device-select").click(function(e){
		e.preventDefault();

		$(this).toggleClass('active');
	});

	/*$(".responsive").hover(
		function(){
			$(this).find('#device-select').addClass('active');
		},
		function(){
			$(this).find('#device-select').removeClass('active');
		}
	);*/

	$(document).on('click', '.products-list a', function(e){
		e.preventDefault();
		$("#dropdown-wrap").removeClass('search-box-open');
		$('#theme-select').removeClass('active');
		var rel=$(this).attr("rel").split(",");
		$("li.purchase a").attr("href",rel[1]);
		$("li.remove_frame a").attr("href",rel[0]);
		$("#iframe").attr("src",rel[0]);
		window.location.href = "?theme="+rel[2]+""
		$("li.close a").attr("src",rel[0]);
		$("#theme-select").html('<span>'+$(this).find('.theme_name').text()+'<span><i class="icon icon-chevron-thin-up caret"></i>');
		
		theme_list_open=false;

	});

	clicked="desktop";
	var t={ desktop:"100%",tabletlandscape:1040,tabletportrait:788,mobilelandscape:500,mobileportrait:340,placebo:0 };

	jQuery("#device-dropdown a").click(function(e){
		e.preventDefault();
		var el=jQuery(this);
		for(device in t){
			console.log(device);console.log(t[device]);
			if(el.hasClass(device)){
				clicked=device;
				jQuery("#frameWrapper, #iframe").width(t[device]).attr('width', t[device]);
				if(clicked==device){
					if ( !el.closest('#device-select').length ) {
						jQuery("#device-dropdown a").removeClass("active");
						el.addClass("active");
						var dIcon = el.find('.icon').clone();
						$('.selected-device').html(dIcon);
						//$('#device-select').removeClass("active");
					}
					
				}
			}
		}
	});

	if(IS_IPAD){
		$("#iframe").css("padding-bottom","60px")
	}

	$(document).on('mouseover', '.products-list li a', function(e) {
		var relData=$(this).attr("rel").split(",");
		$(this).parent().find(".preview").attr("src",relData[3]);
	});

	$('#type-list a').click(function(e) {
   		e.preventDefault();
   		var $this = $(this),
   			productType = $this.data('type'),
   			listSelector = '#'+productType+'-list';

   		if ( !$this.hasClass('active') ) {
   			$('#type-list .active').removeClass('active');
   			$this.addClass('active');

   			$('#right-column .products-list.active').removeClass('active');
   			$( listSelector ).addClass('active');
   		}
	});

	$(document).on('keydown', '.search-form', function(e) {
        if ( 13 === e.which ) {
            e.preventDefault();
        }
    });

    $(document).on('keydown', 'html,body', function(e) {
    	if($('#overlay').is(":visible")) {
	        if ( 27 === e.which ) {
	            e.preventDefault();
	            $('#overlay').fadeOut();
				$('.help').show();
	        }
	    }
    });

	var search_data = [];
	$('.products-list a').each(function() {
		var $this = $(this),
			alt = $this.data('alt-names'),
			liItem = $this.parent().clone();

		search_data.push({ alt_names: alt, item: liItem });
	});

	function listResults( array ) {
        $('#search-results li').remove();
        $.each( array, function( key, value ) {
            $('#search-results').append( value.item );
        });
    }

    function loadSearchResults( query ) {

        var searchResArr={};

        if ( '' !== query ) {
            query.trim();
            var queries = query.split(" ");
            $.each( queries, function( key1, query1 ) {
                if ( '' !== query1 ) {
                    $.each( search_data, function( key, value ) {
                        if ( value.alt_names.toLowerCase().indexOf(query1.toLowerCase()) > -1 ) {
                            searchResArr[key] = value;
                        }
                    });
                }
            });

            listResults( searchResArr );

            $('#dropdown-wrap').addClass('search-box-open');
        } else {
            $('#dropdown-wrap').removeClass('search-box-open');
        }
    }

    $(document).on('input propertychange focus', '#s', function(e) {
        loadSearchResults( $(this).val() );
    });

    $(document).on('click', '.search-form .icon', function(e) {
        e.preventDefault();

        if ( $('#dropdown-wrap').hasClass('search-box-open') ) {
            $('#s').val('').blur();
            $('#dropdown-wrap').removeClass('search-box-open');
        } else {
            $('#s').focus();
        }
    });

	$('body,html').click(function(e) {
	    if ( !$(e.target).closest('#dropdown-wrap').length && theme_list_open && !$(e.target).closest('#overlay').length && !$(e.target).closest('.help').length ) {
	       $('#theme-select').removeClass('active');
	       theme_list_open = false;
	   	}
	   	if ( !$(e.target).closest('#device-select').length ) {
	   		$('#device-select').removeClass('active');
	   	}
	});

	$('#iframe').load(function(){

			if ( helpSeen == false) {

				if ( !overlayCookie ) {

					//showHelp();

					helpSeen = true;
					$.cookie('demoOverlayCookie', helpSeen, { expires: 7, path: '/' }); // 7 days

				}
			}

	        var iframe = $('#iframe').contents();

	        iframe.click(function(e){
               	if ( !$(e.target).closest('#dropdown-wrap').length && theme_list_open && !$(e.target).closest('#overlay').length && !$(e.target).closest('.help').length ) {
			       $('#theme-select').removeClass('active');
			       theme_list_open = false;
			   	}
			   	if ( !$(e.target).closest('#device-select').length ) {
			   		$('#device-select').removeClass('active');
			   	}
	        });
	});

	$(document).on('click', '.toggle', function(e) {
        e.preventDefault();
        if ( $('body').hasClass('switcher-hidden') ) {
        	$('body').removeClass('switcher-hidden').addClass('switcher-visible');
			$("#iframe").attr("height", $(window).height()-55+"px");
        } else {
        	$('body').removeClass('switcher-visible').addClass('switcher-hidden');
        	$("#iframe").attr("height", $(window).height()+"px");
        }

    });

    $(document).on('click', '.test-button', function(e) {
        e.preventDefault();
        $.magnificPopup.open({
			midClick: true,
			items: {
				src: $(this).attr('href')
			},
			type: 'inline'
		});
    });
  
    // new progress button
    // for Buy Now button
    var fadeafter = 3000;
    var fadespeed = 500;
    $('.purchase a').click(function() {
        var button = $(this).addClass('loading');
        setTimeout(function() { button.addClass('loaded'); }, fadeafter);
        setTimeout(function() { button.removeClass('loading loaded'); }, fadeafter + fadespeed);
    }).addClass('progressbar');


	jQuery.validator.addMethod("regex", function(value, element, params) {
		return this.optional(element) || new RegExp(params[0],params[1]).test(value);
	}, "Invalid Value");

	jQuery("#signup_form").validate({
		onkeyup: false,
		ignore: ':hidden',
		rules: {
			"product_id_page-0":{
				"required":true
			},
			"name_f":{
				"required":true,
				"regex":["^[^=:<>{}()\"]+$",""]
			},
			"email":{
				"required":true,
				"email":true,
				"remote":{
					"url":"https:\/\/mythemeshop.com\/go\/ajax?do=check_uniq_email",
					//"type":"post"
				}
			}
		},
		messages: {
			"product_id_page-0":{"required":"Please choose a membership type"},
			"name_f":{
				"required":"Please enter your First Name",
				"regex":"Please enter your First Name"
			},
			"email":{
				"required":"Please enter valid Email",
				"remote":"Entered email is already in use."
			}
		},
		submitHandler: function(form, event){
			//form.submit();
			event.preventDefault();
			var form = $(form);
			var form_action = form.attr('action');
			var modalContent = form.closest('.modal-content');
			var name = $('#name_f-0').val();
			var email = $('#email-0').val();
			modalContent.addClass('loading');
			$.ajax({
				url: form_action,
				type: "post",
				data : form.serialize(),
				success: function( response ) {
					if ( $(response).find('.third-step').length ) {
						$('#user_name').val(name);
						$('#user_email').val(email);
						$('form#setupform').submit();
					} else if ( $(response).find('.am-form > .errors').length ) {
						var responsePart = $(response).find('.am-form > .errors');
						modalContent.html( responsePart );
						modalContent.removeClass('loading');
					} else {
						modalContent.html( '<p>Something went wrong</p>' );
						modalContent.removeClass('loading');
					}
				}
			});
		},
		errorElement: "span",
		showErrors: function(errorMap, errorList) {
            for ( var j = 0; j < errorList.length; j++ ) {
                if ( errorList[j].message.indexOf("This email is blocked") >= 0 ) {
                    errorList[j].message = errorList[j].message.replace("contact site support", "<a href='https://mythemeshop.com/contact-us/'>contact site support</a>");
                }
                if ( errorList[j].message.indexOf("email already exists") >= 0 ) {
                    jQuery('#login-form #login').val( jQuery('#email-0').val() );
                    errorList[j].message = 'An account with the same email already exists.';
                }
            }
            this.errorList = errorList;
            this.defaultShowErrors();
        },
        errorPlacement: function(error, element) {
            errorMessage = error[0].innerHTML;
            if ( errorMessage.indexOf("This email is blocked") >= 0 ) {
                errorMessage = errorMessage.replace("contact site support", "<a href='https://mythemeshop.com/contact-us/'>contact site support</a>");
                error.html(errorMessage);
            }
            if ( errorMessage.indexOf("email already exists") >= 0 ) {
                jQuery('#login-form #login').val( jQuery('#email-0').val() );
                errorMessage = 'An account with the same email already exists.';
                error.html(errorMessage);
            }
            error.appendTo( element.parent() );
        }
	});

	jQuery("form#login-form").validate({
        ignore: ':hidden',
        rules: {
            "amember_login": {
                "required":true,
                "regex":["^[^=:<>{}()\"]+$",""]
            },
            "amember_pass": {
                "required":true,
            }
        },
        messages: {
            "amember_login": {
                "required":"Please enter your Username or Email",
                "regex":"Please enter your Username or Email"
            },
            "amember_pass":{
                "required":"Please enter your password"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo( element.parent());
        },
        //submitHandler: function(form) {
            //form.submit();
        //},
        errorElement: "span"
    });

    /*$("form#login-form").on("submit", function(e) {
        e.preventDefault();
        var form = $(this);
        
        $.ajax({
            url: this.action,
            type: "post",
            xhrFields: {
            	withCredentials: false
            },
            data : form.serialize(),
            success: function( response ){
                if ( response.ok ) {
                    //window.location.href = response.url;
                    window.location.reload(true);
                } else {
                    var error = response.error + "";
                    //console.log(error);
                    if ( error.indexOf("please contact website administator") >= 0 ) {
                        error = error.replace("please contact website administator", "<a href='https://mythemeshop.com/contact-us/'>please contact website administator</a>");
                    }
                    form.find('fieldset').prepend('<span class="error">'+error+'</span>');
                }
            //console.log(JSON.stringify(response));
            }

        });

        return false;

    });*/

    jQuery("form#sendpass-form").validate({
        ignore: ':hidden',
        rules: {
            "login":{
                "required":true,
                "email":true,
                //"regex":["^[^=:<>{}()\"]+$",""]
            }
        },
        messages: {
            "login":{
                "required":"Please enter your registered Email ID",
                //"regex":"Please enter your registered Email ID"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo( element.parent());
        },
        errorElement: "span"
    });

    $("form#sendpass-form").on("submit", function(e) {
        e.preventDefault();
        var form = $(this);
        if (form.find('#sendpass').val() == '')
            return false;
        $.ajax({
            url: this.action,
            type: "post",
            data : form.serialize(),
            success: function( response ){
            	if ( $(response).find('.am-body-content').length ) {
            		var message = $(response).find('.am-body-content').html();
             		form.find('#sendpass').after('<span class="error">'+message+'</span>');
            	}
                /*if ( response.ok ) {
                    form.find('fieldset').html('<span class="success">'+response.error+'</span>');
                } else {
                    form.find('#sendpass').after('<span class="error">'+response.error+'</span>');
                }*/
            //console.log(JSON.stringify(response));
            }
        });
        return false;
    });

	/*$(document).on('submit','form#signup_form', function(e) {
		e.preventDefault();
		var form = $(this);
		var form_action = form.attr('action');
		var modalContent = form.closest('.modal-content');
		var name = $('#name_f-0').val();
		var email = $('#email-0').val();
		modalContent.addClass('loading');
		$.ajax({
			url: this.action,
			type: "post",
			data : form.serialize(),
			success: function( response ) {
				if ( $(response).find('.third-step').length ) {
					$('#user_name').val(name);
					$('#user_email').val(email);
					$('form#setupform').submit();
				} else {
					modalContent.html( '<p>Something went wrong</p>' );
				}

				//modalContent.removeClass('loading');
			}
		});
		return false;
	});*/

	$(document).on('submit','form#setupform', function(e) {
		e.preventDefault();
		var form = $(this);
		var form_action = form.attr('action');
		var modalContent = form.closest('.modal-content');
		modalContent.addClass('loading');
		$.ajax({
			url: form_action,
			type: "post",
			data : form.serialize(),
			success: function( response ) {
				if ( $(response).find('.wp-signup-container').length ) {
					var responsePart = $(response).find('.wp-signup-container');
					if ( responsePart.find('form').length ) {
						responsePart.find('form').attr('action', form_action );
					}
					modalContent.html( responsePart );
				} else {
					modalContent.html( '<p>Something went wrong</p>' );
				}

				modalContent.removeClass('loading');
			}
		});
		return false;
	});

	$(document).on('click', '.modal-nav-link', function(e) {
		e.preventDefault();
		var $this = $(this);
		var target = $this.attr('href');
		$('.modal-content-part').removeClass('modal-content-part-shown');
		$(target).addClass('modal-content-part-shown');
	});

	function getUrlParameterByName(name, url) {
		if (!url) {
			url = window.location.href;
		}
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	if ( '1'=== getUrlParameterByName( 'demobar_login' ) ) {
		$.magnificPopup.open({
			midClick: true,
			items: {
				src: $('.test-button').attr('href')
			},
			type: 'inline'
		});
		$('form#setupform').submit();
	}
	
});