/*!
 * ui-select
 * http://github.com/angular-ui/ui-select
 * Version: 0.12.1 - 2015-07-28T03:50:59.076Z
 * License: MIT
 */
!function(){"use strict";var e={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,COMMAND:91,MAP:{91:"COMMAND",8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",17:"CTRL",18:"ALT",19:"PAUSEBREAK",20:"CAPSLOCK",27:"ESC",32:"SPACE",33:"PAGE_UP",34:"PAGE_DOWN",35:"END",36:"HOME",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN",43:"+",44:"PRINTSCREEN",45:"INSERT",46:"DELETE",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NUMLOCK",145:"SCROLLLOCK",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},isControl:function(t){var c=t.which;switch(c){case e.COMMAND:case e.SHIFT:case e.CTRL:case e.ALT:return!0}return t.metaKey?!0:!1},isFunctionKey:function(e){return e=e.which?e.which:e,e>=112&&123>=e},isVerticalMovement:function(t){return~[e.UP,e.DOWN].indexOf(t)},isHorizontalMovement:function(t){return~[e.LEFT,e.RIGHT,e.BACKSPACE,e.DELETE].indexOf(t)}};void 0===angular.element.prototype.querySelectorAll&&(angular.element.prototype.querySelectorAll=function(e){return angular.element(this[0].querySelectorAll(e))}),void 0===angular.element.prototype.closest&&(angular.element.prototype.closest=function(e){for(var t=this[0],c=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector;t;){if(c.bind(t)(e))return t;t=t.parentElement}return!1});var t=0,c=angular.module("ui.select",[]).constant("uiSelectConfig",{theme:"bootstrap",searchEnabled:!0,sortable:!1,placeholder:"",refreshDelay:1e3,closeOnSelect:!0,generateId:function(){return t++},appendToBody:!1}).service("uiSelectMinErr",function(){var e=angular.$$minErr("ui.select");return function(){var t=e.apply(this,arguments),c=t.message.replace(new RegExp("\nhttp://errors.angularjs.org/.*"),"");return new Error(c)}}).directive("uisTranscludeAppend",function(){return{link:function(e,t,c,i,l){l(e,function(e){t.append(e)})}}}).filter("highlight",function(){function e(e){return e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(t,c){return c&&t?t.replace(new RegExp(e(c),"gi"),'<span class="ui-select-highlight">$&</span>'):t}}).factory("uisOffset",["$document","$window",function(e,t){return function(c){var i=c[0].getBoundingClientRect();return{width:i.width||c.prop("offsetWidth"),height:i.height||c.prop("offsetHeight"),top:i.top+(t.pageYOffset||e[0].documentElement.scrollTop),left:i.left+(t.pageXOffset||e[0].documentElement.scrollLeft)}}}]);c.directive("uiSelectChoices",["uiSelectConfig","uisRepeatParser","uiSelectMinErr","$compile",function(e,t,c,i){return{restrict:"EA",require:"^uiSelect",replace:!0,transclude:!0,templateUrl:function(t){var c=t.parent().attr("theme")||e.theme;return c+"/choices.tpl.html"},compile:function(l,s){if(!s.repeat)throw c("repeat","Expected 'repeat' expression.");return function(l,s,n,a,r){var o=n.groupBy,u=n.groupFilter;if(a.parseRepeatAttr(n.repeat,o,u),a.disableChoiceExpression=n.uiDisableChoice,a.onHighlightCallback=n.onHighlight,o){var d=s.querySelectorAll(".ui-select-choices-group");if(1!==d.length)throw c("rows","Expected 1 .ui-select-choices-group but got '{0}'.",d.length);d.attr("ng-repeat",t.getGroupNgRepeatExpression())}var p=s.querySelectorAll(".ui-select-choices-row");if(1!==p.length)throw c("rows","Expected 1 .ui-select-choices-row but got '{0}'.",p.length);p.attr("ng-repeat",t.getNgRepeatExpression(a.parserResult.itemName,"$select.items",a.parserResult.trackByExp,o)).attr("ng-if","$select.open").attr("ng-mouseenter","$select.setActiveItem("+a.parserResult.itemName+")").attr("ng-click","$select.select("+a.parserResult.itemName+",false,$event)");var g=s.querySelectorAll(".ui-select-choices-row-inner");if(1!==g.length)throw c("rows","Expected 1 .ui-select-choices-row-inner but got '{0}'.",g.length);g.attr("uis-transclude-append",""),i(s,r)(l),l.$watch("$select.search",function(e){e&&!a.open&&a.multiple&&a.activate(!1,!0),a.activeIndex=a.tagging.isActivated?-1:0,a.refresh(n.refresh)}),n.$observe("refreshDelay",function(){var t=l.$eval(n.refreshDelay);a.refreshDelay=void 0!==t?t:e.refreshDelay})}}}}]),c.controller("uiSelectCtrl",["$scope","$element","$timeout","$filter","uisRepeatParser","uiSelectMinErr","uiSelectConfig",function(t,c,i,l,s,n,a){function r(){(p.resetSearchInput||void 0===p.resetSearchInput&&a.resetSearchInput)&&(p.search=g,p.selected&&p.items.length&&!p.multiple&&(p.activeIndex=p.items.indexOf(p.selected)))}function o(e,t){var c,i,l=[];for(c=0;c<t.length;c++)for(i=0;i<e.length;i++)e[i].name==[t[c]]&&l.push(e[i]);return l}function u(t){var c=!0;switch(t){case e.DOWN:!p.open&&p.multiple?p.activate(!1,!0):p.activeIndex<p.items.length-1&&p.activeIndex++;break;case e.UP:!p.open&&p.multiple?p.activate(!1,!0):(p.activeIndex>0||0===p.search.length&&p.tagging.isActivated&&p.activeIndex>-1)&&p.activeIndex--;break;case e.TAB:(!p.multiple||p.open)&&p.select(p.items[p.activeIndex],!0);break;case e.ENTER:p.open&&(p.tagging.isActivated||p.activeIndex>=0)?p.select(p.items[p.activeIndex]):p.activate(!1,!0);break;case e.ESC:p.close();break;default:c=!1}return c}function d(){var e=c.querySelectorAll(".ui-select-choices-content"),t=e.querySelectorAll(".ui-select-choices-row");if(t.length<1)throw n("choices","Expected multiple .ui-select-choices-row but got '{0}'.",t.length);if(!(p.activeIndex<0)){var i=t[p.activeIndex],l=i.offsetTop+i.clientHeight-e[0].scrollTop,s=e[0].offsetHeight;l>s?e[0].scrollTop+=l-s:l<i.clientHeight&&(p.isGrouped&&0===p.activeIndex?e[0].scrollTop=0:e[0].scrollTop-=i.clientHeight-l)}}var p=this,g="";if(p.placeholder=a.placeholder,p.searchEnabled=a.searchEnabled,p.sortable=a.sortable,p.refreshDelay=a.refreshDelay,p.removeSelected=!1,p.closeOnSelect=!0,p.search=g,p.activeIndex=0,p.items=[],p.open=!1,p.focus=!1,p.disabled=!1,p.selected=void 0,p.focusser=void 0,p.resetSearchInput=!0,p.multiple=void 0,p.disableChoiceExpression=void 0,p.tagging={isActivated:!1,fct:void 0},p.taggingTokens={isActivated:!1,tokens:void 0},p.lockChoiceExpression=void 0,p.clickTriggeredSelect=!1,p.$filter=l,p.searchInput=c.querySelectorAll("input.ui-select-search"),1!==p.searchInput.length)throw n("searchInput","Expected 1 input.ui-select-search but got '{0}'.",p.searchInput.length);p.isEmpty=function(){return angular.isUndefined(p.selected)||null===p.selected||""===p.selected},p.activate=function(e,c){p.disabled||p.open||(c||r(),t.$broadcast("uis:activate"),p.open=!0,p.activeIndex=p.activeIndex>=p.items.length?0:p.activeIndex,-1===p.activeIndex&&p.taggingLabel!==!1&&(p.activeIndex=0),i(function(){p.search=e||p.search,p.searchInput[0].focus()}))},p.findGroupByName=function(e){return p.groups&&p.groups.filter(function(t){return t.name===e})[0]},p.parseRepeatAttr=function(e,c,i){function l(e){var l=t.$eval(c);if(p.groups=[],angular.forEach(e,function(e){var t=angular.isFunction(l)?l(e):e[l],c=p.findGroupByName(t);c?c.items.push(e):p.groups.push({name:t,items:[e]})}),i){var s=t.$eval(i);angular.isFunction(s)?p.groups=s(p.groups):angular.isArray(s)&&(p.groups=o(p.groups,s))}p.items=[],p.groups.forEach(function(e){p.items=p.items.concat(e.items)})}function a(e){p.items=e}p.setItemsFn=c?l:a,p.parserResult=s.parse(e),p.isGrouped=!!c,p.itemProperty=p.parserResult.itemName,p.refreshItems=function(e){e=e||p.parserResult.source(t);var c=p.selected;if(angular.isArray(c)&&!c.length||!p.removeSelected)p.setItemsFn(e);else if(void 0!==e){var i=e.filter(function(e){return c.indexOf(e)<0});p.setItemsFn(i)}},t.$watchCollection(p.parserResult.source,function(e){if(void 0===e||null===e)p.items=[];else{if(!angular.isArray(e))throw n("items","Expected an array but got '{0}'.",e);p.refreshItems(e),p.ngModel.$modelValue=null}})};var h;p.refresh=function(e){void 0!==e&&(h&&i.cancel(h),h=i(function(){t.$eval(e)},p.refreshDelay))},p.setActiveItem=function(e){p.activeIndex=p.items.indexOf(e)},p.isActive=function(e){if(!p.open)return!1;var t=p.items.indexOf(e[p.itemProperty]),c=t===p.activeIndex;return!c||0>t&&p.taggingLabel!==!1||0>t&&p.taggingLabel===!1?!1:(c&&!angular.isUndefined(p.onHighlightCallback)&&e.$eval(p.onHighlightCallback),c)},p.isDisabled=function(e){if(p.open){var t,c=p.items.indexOf(e[p.itemProperty]),i=!1;return c>=0&&!angular.isUndefined(p.disableChoiceExpression)&&(t=p.items[c],i=!!e.$eval(p.disableChoiceExpression),t._uiSelectChoiceDisabled=i),i}},p.select=function(e,c,l){if(void 0===e||!e._uiSelectChoiceDisabled){if(!p.items&&!p.search)return;if(!e||!e._uiSelectChoiceDisabled){if(p.tagging.isActivated){if(p.taggingLabel===!1)if(p.activeIndex<0){if(e=void 0!==p.tagging.fct?p.tagging.fct(p.search):p.search,!e||angular.equals(p.items[0],e))return}else e=p.items[p.activeIndex];else if(0===p.activeIndex){if(void 0===e)return;if(void 0!==p.tagging.fct&&"string"==typeof e){if(e=p.tagging.fct(p.search),!e)return}else"string"==typeof e&&(e=e.replace(p.taggingLabel,"").trim())}if(p.selected&&angular.isArray(p.selected)&&p.selected.filter(function(t){return angular.equals(t,e)}).length>0)return p.close(c),void 0}t.$broadcast("uis:select",e);var s={};s[p.parserResult.itemName]=e,i(function(){p.onSelectCallback(t,{$item:e,$model:p.parserResult.modelMapper(t,s)})}),p.closeOnSelect&&p.close(c),l&&"click"===l.type&&(p.clickTriggeredSelect=!0)}}},p.close=function(e){p.open&&(p.ngModel&&p.ngModel.$setTouched&&p.ngModel.$setTouched(),r(),p.open=!1,t.$broadcast("uis:close",e))},p.setFocus=function(){p.focus||p.focusInput[0].focus()},p.clear=function(e){p.select(void 0),e.stopPropagation(),i(function(){p.focusser[0].focus()},0,!1)},p.toggle=function(e){p.open?(p.close(),e.preventDefault(),e.stopPropagation()):p.activate()},p.isLocked=function(e,t){var c,i=p.selected[t];return i&&!angular.isUndefined(p.lockChoiceExpression)&&(c=!!e.$eval(p.lockChoiceExpression),i._uiSelectChoiceLocked=c),c};var f=null;p.sizeSearchInput=function(){var e=p.searchInput[0],c=p.searchInput.parent().parent()[0],l=function(){return c.clientWidth*!!e.offsetParent},s=function(t){if(0===t)return!1;var c=t-e.offsetLeft-10;return 50>c&&(c=t),p.searchInput.css("width",c+"px"),!0};p.searchInput.css("width","10px"),i(function(){null!==f||s(l())||(f=t.$watch(l,function(e){s(e)&&(f(),f=null)}))})},p.searchInput.on("keydown",function(c){var l=c.which;t.$apply(function(){var t=!1;if((p.items.length>0||p.tagging.isActivated)&&(u(l),p.taggingTokens.isActivated)){for(var s=0;s<p.taggingTokens.tokens.length;s++)p.taggingTokens.tokens[s]===e.MAP[c.keyCode]&&p.search.length>0&&(t=!0);t&&i(function(){p.searchInput.triggerHandler("tagged");var t=p.search.replace(e.MAP[c.keyCode],"").trim();p.tagging.fct&&(t=p.tagging.fct(t)),t&&p.select(t,!0)})}}),e.isVerticalMovement(l)&&p.items.length>0&&d(),(l===e.ENTER||l===e.ESC)&&(c.preventDefault(),c.stopPropagation())}),p.searchInput.on("paste",function(e){var t=e.originalEvent.clipboardData.getData("text/plain");if(t&&t.length>0&&p.taggingTokens.isActivated&&p.tagging.fct){var c=t.split(p.taggingTokens.tokens[0]);c&&c.length>0&&(angular.forEach(c,function(e){var t=p.tagging.fct(e);t&&p.select(t,!0)}),e.preventDefault(),e.stopPropagation())}}),p.searchInput.on("tagged",function(){i(function(){r()})}),t.$on("$destroy",function(){p.searchInput.off("keyup keydown tagged blur paste")})}]),c.directive("uiSelect",["$document","uiSelectConfig","uiSelectMinErr","uisOffset","$compile","$parse","$timeout",function(e,t,c,i,l,s,n){return{restrict:"EA",templateUrl:function(e,c){var i=c.theme||t.theme;return i+(angular.isDefined(c.multiple)?"/select-multiple.tpl.html":"/select.tpl.html")},replace:!0,transclude:!0,require:["uiSelect","^ngModel"],scope:!0,controller:"uiSelectCtrl",controllerAs:"$select",compile:function(l,a){return angular.isDefined(a.multiple)?l.append("<ui-select-multiple/>").removeAttr("multiple"):l.append("<ui-select-single/>"),function(l,a,r,o,u){function d(e){if(h.open){var t=!1;if(t=window.jQuery?window.jQuery.contains(a[0],e.target):a[0].contains(e.target),!t&&!h.clickTriggeredSelect){var c=["input","button","textarea"],i=angular.element(e.target).scope(),s=i&&i.$select&&i.$select!==h;s||(s=~c.indexOf(e.target.tagName.toLowerCase())),h.close(s),l.$digest()}h.clickTriggeredSelect=!1}}function p(){var t=i(a);m=angular.element('<div class="ui-select-placeholder"></div>'),m[0].style.width=t.width+"px",m[0].style.height=t.height+"px",a.after(m),$=a[0].style.width,e.find("body").append(a),a[0].style.position="absolute",a[0].style.left=t.left+"px",a[0].style.top=t.top+"px",a[0].style.width=t.width+"px"}function g(){null!==m&&(m.replaceWith(a),m=null,a[0].style.position="",a[0].style.left="",a[0].style.top="",a[0].style.width=$)}var h=o[0],f=o[1];h.generatedId=t.generateId(),h.baseTitle=r.title||"Select box",h.focusserTitle=h.baseTitle+" focus",h.focusserId="focusser-"+h.generatedId,h.closeOnSelect=function(){return angular.isDefined(r.closeOnSelect)?s(r.closeOnSelect)():t.closeOnSelect}(),h.onSelectCallback=s(r.onSelect),h.onRemoveCallback=s(r.onRemove),h.ngModel=f,h.choiceGrouped=function(e){return h.isGrouped&&e&&e.name},r.tabindex&&r.$observe("tabindex",function(e){h.focusInput.attr("tabindex",e),a.removeAttr("tabindex")}),l.$watch("searchEnabled",function(){var e=l.$eval(r.searchEnabled);h.searchEnabled=void 0!==e?e:t.searchEnabled}),l.$watch("sortable",function(){var e=l.$eval(r.sortable);h.sortable=void 0!==e?e:t.sortable}),r.$observe("disabled",function(){h.disabled=void 0!==r.disabled?r.disabled:!1}),r.$observe("resetSearchInput",function(){var e=l.$eval(r.resetSearchInput);h.resetSearchInput=void 0!==e?e:!0}),r.$observe("tagging",function(){if(void 0!==r.tagging){var e=l.$eval(r.tagging);h.tagging={isActivated:!0,fct:e!==!0?e:void 0}}else h.tagging={isActivated:!1,fct:void 0}}),r.$observe("taggingLabel",function(){void 0!==r.tagging&&(h.taggingLabel="false"===r.taggingLabel?!1:void 0!==r.taggingLabel?r.taggingLabel:"(new)")}),r.$observe("taggingTokens",function(){if(void 0!==r.tagging){var e=void 0!==r.taggingTokens?r.taggingTokens.split("|"):[",","ENTER"];h.taggingTokens={isActivated:!0,tokens:e}}}),angular.isDefined(r.autofocus)&&n(function(){h.setFocus()}),angular.isDefined(r.focusOn)&&l.$on(r.focusOn,function(){n(function(){h.setFocus()})}),e.on("click",d),l.$on("$destroy",function(){e.off("click",d)}),u(l,function(e){var t=angular.element("<div>").append(e),i=t.querySelectorAll(".ui-select-match");if(i.removeAttr("ui-select-match"),i.removeAttr("data-ui-select-match"),1!==i.length)throw c("transcluded","Expected 1 .ui-select-match but got '{0}'.",i.length);a.querySelectorAll(".ui-select-match").replaceWith(i);var l=t.querySelectorAll(".ui-select-choices");if(l.removeAttr("ui-select-choices"),l.removeAttr("data-ui-select-choices"),1!==l.length)throw c("transcluded","Expected 1 .ui-select-choices but got '{0}'.",l.length);a.querySelectorAll(".ui-select-choices").replaceWith(l)});var v=l.$eval(r.appendToBody);(void 0!==v?v:t.appendToBody)&&(l.$watch("$select.open",function(e){e?p():g()}),l.$on("$destroy",function(){g()}));var m=null,$="",b=null,x="direction-up";l.$watch("$select.open",function(t){if(t){if(b=angular.element(a).querySelectorAll(".ui-select-dropdown"),null===b)return;b[0].style.opacity=0,n(function(){var t=i(a),c=i(b);t.top+t.height+c.height>e[0].documentElement.scrollTop+e[0].documentElement.clientHeight&&(b[0].style.position="absolute",b[0].style.top=-1*c.height+"px",a.addClass(x)),b[0].style.opacity=1})}else{if(null===b)return;b[0].style.position="",b[0].style.top="",a.removeClass(x)}})}}}}]),c.directive("uiSelectMatch",["uiSelectConfig",function(e){return{restrict:"EA",require:"^uiSelect",replace:!0,transclude:!0,templateUrl:function(t){var c=t.parent().attr("theme")||e.theme,i=t.parent().attr("multiple");return c+(i?"/match-multiple.tpl.html":"/match.tpl.html")},link:function(t,c,i,l){function s(e){l.allowClear=angular.isDefined(e)?""===e?!0:"true"===e.toLowerCase():!1}l.lockChoiceExpression=i.uiLockChoice,i.$observe("placeholder",function(t){l.placeholder=void 0!==t?t:e.placeholder}),i.$observe("allowClear",s),s(i.allowClear),l.multiple&&l.sizeSearchInput()}}}]),c.directive("uiSelectMultiple",["uiSelectMinErr","$timeout",function(t,c){return{restrict:"EA",require:["^uiSelect","^ngModel"],controller:["$scope","$timeout",function(e,t){var c,i=this,l=e.$select;e.$evalAsync(function(){c=e.ngModel}),i.activeMatchIndex=-1,i.updateModel=function(){c.$setViewValue(Date.now()),i.refreshComponent()},i.refreshComponent=function(){l.refreshItems(),l.sizeSearchInput()},i.removeChoice=function(c){var s=l.selected[c];if(!s._uiSelectChoiceLocked){var n={};n[l.parserResult.itemName]=s,l.selected.splice(c,1),i.activeMatchIndex=-1,l.sizeSearchInput(),t(function(){l.onRemoveCallback(e,{$item:s,$model:l.parserResult.modelMapper(e,n)})}),i.updateModel()}},i.getPlaceholder=function(){return l.selected.length?void 0:l.placeholder}}],controllerAs:"$selectMultiple",link:function(i,l,s,n){function a(e){return angular.isNumber(e.selectionStart)?e.selectionStart:e.value.length}function r(t){function c(){switch(t){case e.LEFT:return~g.activeMatchIndex?u:n;case e.RIGHT:return~g.activeMatchIndex&&r!==n?o:(d.activate(),!1);case e.BACKSPACE:return~g.activeMatchIndex?(g.removeChoice(r),u):n;case e.DELETE:return~g.activeMatchIndex?(g.removeChoice(g.activeMatchIndex),r):!1}}var i=a(d.searchInput[0]),l=d.selected.length,s=0,n=l-1,r=g.activeMatchIndex,o=g.activeMatchIndex+1,u=g.activeMatchIndex-1,p=r;return i>0||d.search.length&&t==e.RIGHT?!1:(d.close(),p=c(),g.activeMatchIndex=d.selected.length&&p!==!1?Math.min(n,Math.max(s,p)):-1,!0)}function o(e){if(void 0===e||void 0===d.search)return!1;var t=e.filter(function(e){return void 0===d.search.toUpperCase()||void 0===e?!1:e.toUpperCase()===d.search.toUpperCase()}).length>0;return t}function u(e,t){var c=-1;if(angular.isArray(e))for(var i=angular.copy(e),l=0;l<i.length;l++)if(void 0===d.tagging.fct)i[l]+" "+d.taggingLabel===t&&(c=l);else{var s=i[l];s.isTag=!0,angular.equals(s,t)&&(c=l)}return c}var d=n[0],p=i.ngModel=n[1],g=i.$selectMultiple;d.multiple=!0,d.removeSelected=!0,d.focusInput=d.searchInput,p.$parsers.unshift(function(){for(var e,t={},c=[],l=d.selected.length-1;l>=0;l--)t={},t[d.parserResult.itemName]=d.selected[l],e=d.parserResult.modelMapper(i,t),c.unshift(e);return c}),p.$formatters.unshift(function(e){var t,c=d.parserResult.source(i,{$select:{search:""}}),l={};if(!c)return e;var s=[],n=function(e,c){if(e&&e.length){for(var n=e.length-1;n>=0;n--){if(l[d.parserResult.itemName]=e[n],t=d.parserResult.modelMapper(i,l),d.parserResult.trackByExp){var a=/\.(.+)/.exec(d.parserResult.trackByExp);if(a.length>0&&t[a[1]]==c[a[1]])return s.unshift(e[n]),!0}if(angular.equals(t,c))return s.unshift(e[n]),!0}return!1}};if(!e)return s;for(var a=e.length-1;a>=0;a--)n(d.selected,e[a])||n(c,e[a])||s.unshift(e[a]);return s}),i.$watchCollection(function(){return p.$modelValue},function(e,t){t!=e&&(p.$modelValue=null,g.refreshComponent())}),p.$render=function(){if(!angular.isArray(p.$viewValue)){if(!angular.isUndefined(p.$viewValue)&&null!==p.$viewValue)throw t("multiarr","Expected model value to be array but got '{0}'",p.$viewValue);d.selected=[]}d.selected=p.$viewValue,i.$evalAsync()},i.$on("uis:select",function(e,t){d.selected.push(t),g.updateModel()}),i.$on("uis:activate",function(){g.activeMatchIndex=-1}),i.$watch("$select.disabled",function(e,t){t&&!e&&d.sizeSearchInput()}),d.searchInput.on("keydown",function(t){var c=t.which;i.$apply(function(){var i=!1;e.isHorizontalMovement(c)&&(i=r(c)),i&&c!=e.TAB&&(t.preventDefault(),t.stopPropagation())})}),d.searchInput.on("keyup",function(t){if(e.isVerticalMovement(t.which)||i.$evalAsync(function(){d.activeIndex=d.taggingLabel===!1?-1:0}),d.tagging.isActivated&&d.search.length>0){if(t.which===e.TAB||e.isControl(t)||e.isFunctionKey(t)||t.which===e.ESC||e.isVerticalMovement(t.which))return;if(d.activeIndex=d.taggingLabel===!1?-1:0,d.taggingLabel===!1)return;var c,l,s,n,a=angular.copy(d.items),r=angular.copy(d.items),p=!1,g=-1;if(void 0!==d.tagging.fct){if(s=d.$filter("filter")(a,{isTag:!0}),s.length>0&&(n=s[0]),a.length>0&&n&&(p=!0,a=a.slice(1,a.length),r=r.slice(1,r.length)),c=d.tagging.fct(d.search),c.isTag=!0,r.filter(function(e){return angular.equals(e,d.tagging.fct(d.search))}).length>0)return;c.isTag=!0}else{if(s=d.$filter("filter")(a,function(e){return e.match(d.taggingLabel)}),s.length>0&&(n=s[0]),l=a[0],void 0!==l&&a.length>0&&n&&(p=!0,a=a.slice(1,a.length),r=r.slice(1,r.length)),c=d.search+" "+d.taggingLabel,u(d.selected,d.search)>-1)return;if(o(r.concat(d.selected)))return p&&(a=r,i.$evalAsync(function(){d.activeIndex=0,d.items=a})),void 0;if(o(r))return p&&(d.items=r.slice(1,r.length)),void 0}p&&(g=u(d.selected,c)),g>-1?a=a.slice(g+1,a.length-1):(a=[],a.push(c),a=a.concat(r)),i.$evalAsync(function(){d.activeIndex=0,d.items=a})}}),d.searchInput.on("blur",function(){c(function(){g.activeMatchIndex=-1})})}}}]),c.directive("uiSelectSingle",["$timeout","$compile",function(t,c){return{restrict:"EA",require:["^uiSelect","^ngModel"],link:function(i,l,s,n){var a=n[0],r=n[1];r.$parsers.unshift(function(e){var t,c={};return c[a.parserResult.itemName]=e,t=a.parserResult.modelMapper(i,c)}),r.$formatters.unshift(function(e){var t,c=a.parserResult.source(i,{$select:{search:""}}),l={};if(c){var s=function(c){return l[a.parserResult.itemName]=c,t=a.parserResult.modelMapper(i,l),t==e};if(a.selected&&s(a.selected))return a.selected;for(var n=c.length-1;n>=0;n--)if(s(c[n]))return c[n]}return e}),i.$watch("$select.selected",function(e){r.$viewValue!==e&&r.$setViewValue(e)}),r.$render=function(){a.selected=r.$viewValue},i.$on("uis:select",function(e,t){a.selected=t}),i.$on("uis:close",function(e,c){t(function(){a.focusser.prop("disabled",!1),c||a.focusser[0].focus()},0,!1)}),i.$on("uis:activate",function(){o.prop("disabled",!0)});var o=angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' id='{{ $select.focusserId }}' aria-label='{{ $select.focusserTitle }}' aria-haspopup='true' role='button' />");c(o)(i),a.focusser=o,a.focusInput=o,l.parent().append(o),o.bind("focus",function(){i.$evalAsync(function(){a.focus=!0})}),o.bind("blur",function(){i.$evalAsync(function(){a.focus=!1})}),o.bind("keydown",function(t){return t.which===e.BACKSPACE?(t.preventDefault(),t.stopPropagation(),a.select(void 0),i.$apply(),void 0):(t.which===e.TAB||e.isControl(t)||e.isFunctionKey(t)||t.which===e.ESC||((t.which==e.DOWN||t.which==e.UP||t.which==e.ENTER||t.which==e.SPACE)&&(t.preventDefault(),t.stopPropagation(),a.activate()),i.$digest()),void 0)}),o.bind("keyup input",function(t){t.which===e.TAB||e.isControl(t)||e.isFunctionKey(t)||t.which===e.ESC||t.which==e.ENTER||t.which===e.BACKSPACE||(a.activate(o.val()),o.val(""),i.$digest())})}}}]),c.directive("uiSelectSort",["$timeout","uiSelectConfig","uiSelectMinErr",function(e,t,c){return{require:"^uiSelect",link:function(t,i,l,s){if(null===t[l.uiSelectSort])throw c("sort","Expected a list to sort");var n=angular.extend({axis:"horizontal"},t.$eval(l.uiSelectSortOptions)),a=n.axis,r="dragging",o="dropping",u="dropping-before",d="dropping-after";t.$watch(function(){return s.sortable},function(e){e?i.attr("draggable",!0):i.removeAttr("draggable")}),i.on("dragstart",function(e){i.addClass(r),(e.dataTransfer||e.originalEvent.dataTransfer).setData("text/plain",t.$index)}),i.on("dragend",function(){i.removeClass(r)});var p,g=function(e,t){this.splice(t,0,this.splice(e,1)[0])},h=function(e){e.preventDefault();var t="vertical"===a?e.offsetY||e.layerY||(e.originalEvent?e.originalEvent.offsetY:0):e.offsetX||e.layerX||(e.originalEvent?e.originalEvent.offsetX:0);t<this["vertical"===a?"offsetHeight":"offsetWidth"]/2?(i.removeClass(d),i.addClass(u)):(i.removeClass(u),i.addClass(d))},f=function(t){t.preventDefault();var c=parseInt((t.dataTransfer||t.originalEvent.dataTransfer).getData("text/plain"),10);e.cancel(p),p=e(function(){v(c)},20)},v=function(e){var c=t.$eval(l.uiSelectSort),s=c[e],n=null;n=i.hasClass(u)?e<t.$index?t.$index-1:t.$index:e<t.$index?t.$index:t.$index+1,g.apply(c,[e,n]),t.$apply(function(){t.$emit("uiSelectSort:change",{array:c,item:s,from:e,to:n})}),i.removeClass(o),i.removeClass(u),i.removeClass(d),i.off("drop",f)};i.on("dragenter",function(){i.hasClass(r)||(i.addClass(o),i.on("dragover",h),i.on("drop",f))}),i.on("dragleave",function(e){e.target==i&&(i.removeClass(o),i.removeClass(u),i.removeClass(d),i.off("dragover",h),i.off("drop",f))})}}}]),c.service("uisRepeatParser",["uiSelectMinErr","$parse",function(e,t){var c=this;c.parse=function(c){var i=c.match(/^\s*(?:([\s\S]+?)\s+as\s+)?([\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!i)throw e("iexp","Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",c);return{itemName:i[2],source:t(i[3]),trackByExp:i[4],modelMapper:t(i[1]||i[2])}},c.getGroupNgRepeatExpression=function(){return"$group in $select.groups"},c.getNgRepeatExpression=function(e,t,c,i){var l=e+" in "+(i?"$group.items":t);return c&&(l+=" track by "+c),l}}])}(),angular.module("ui.select").run(["$templateCache",function(e){e.put("bootstrap/choices.tpl.html",'<ul class="ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu" role="listbox" ng-show="$select.items.length > 0"><li class="ui-select-choices-group" id="ui-select-choices-{{ $select.generatedId }}"><div class="divider" ng-show="$select.isGrouped && $index > 0"></div><div ng-show="$select.isGrouped" class="ui-select-choices-group-label dropdown-header" ng-bind="$group.name"></div><div id="ui-select-choices-row-{{ $select.generatedId }}-{{$index}}" class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}" role="option"><a href="javascript:void(0)" class="ui-select-choices-row-inner"></a></div></li></ul>'),e.put("bootstrap/match-multiple.tpl.html",'<span class="ui-select-match"><span ng-repeat="$item in $select.selected"><span class="ui-select-match-item btn btn-default btn-xs" tabindex="-1" type="button" ng-disabled="$select.disabled" ng-click="$selectMultiple.activeMatchIndex = $index;" ng-class="{\'btn-primary\':$selectMultiple.activeMatchIndex === $index, \'select-locked\':$select.isLocked(this, $index)}" ui-select-sort="$select.selected"><span class="close ui-select-match-close" ng-hide="$select.disabled" ng-click="$selectMultiple.removeChoice($index)">&nbsp;&times;</span> <span uis-transclude-append=""></span></span></span></span>'),e.put("bootstrap/match.tpl.html",'<div class="ui-select-match" ng-hide="$select.open" ng-disabled="$select.disabled" ng-class="{\'btn-default-focus\':$select.focus}"><span tabindex="-1" class="btn btn-default form-control ui-select-toggle" aria-label="{{ $select.baseTitle }} activate" ng-disabled="$select.disabled" ng-click="$select.activate()" style="outline: 0;"><span ng-show="$select.isEmpty()" class="ui-select-placeholder text-muted">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="ui-select-match-text pull-left" ng-class="{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}" ng-transclude=""></span> <i class="caret pull-right" ng-click="$select.toggle($event)"></i> <a ng-show="$select.allowClear && !$select.isEmpty()" aria-label="{{ $select.baseTitle }} clear" style="margin-right: 10px" ng-click="$select.clear($event)" class="btn btn-xs btn-link pull-right"><i class="glyphicon glyphicon-remove" aria-hidden="true"></i></a></span></div>'),e.put("bootstrap/select-multiple.tpl.html",'<div class="ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control" ng-class="{open: $select.open}"><div><div class="ui-select-match"></div><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search input-xs" placeholder="{{$selectMultiple.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-click="$select.activate()" ng-model="$select.search" role="combobox" aria-label="{{ $select.baseTitle }}" ondrop="return false;"></div><div class="ui-select-choices"></div></div>'),e.put("bootstrap/select.tpl.html",'<div class="ui-select-container ui-select-bootstrap dropdown" ng-class="{open: $select.open}"><div class="ui-select-match"></div><input type="text" autocomplete="off" tabindex="-1" aria-expanded="true" aria-label="{{ $select.baseTitle }}" aria-owns="ui-select-choices-{{ $select.generatedId }}" aria-activedescendant="ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}" class="form-control ui-select-search" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-show="$select.searchEnabled && $select.open"><div class="ui-select-choices"></div></div>'),e.put("select2/choices.tpl.html",'<ul class="ui-select-choices ui-select-choices-content select2-results"><li class="ui-select-choices-group" ng-class="{\'select2-result-with-children\': $select.choiceGrouped($group) }"><div ng-show="$select.choiceGrouped($group)" class="ui-select-choices-group-label select2-result-label" ng-bind="$group.name"></div><ul role="listbox" id="ui-select-choices-{{ $select.generatedId }}" ng-class="{\'select2-result-sub\': $select.choiceGrouped($group), \'select2-result-single\': !$select.choiceGrouped($group) }"><li role="option" id="ui-select-choices-row-{{ $select.generatedId }}-{{$index}}" class="ui-select-choices-row" ng-class="{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}"><div class="select2-result-label ui-select-choices-row-inner"></div></li></ul></li></ul>'),e.put("select2/match-multiple.tpl.html",'<span class="ui-select-match"><li class="ui-select-match-item select2-search-choice" ng-repeat="$item in $select.selected" ng-class="{\'select2-search-choice-focus\':$selectMultiple.activeMatchIndex === $index, \'select2-locked\':$select.isLocked(this, $index)}" ui-select-sort="$select.selected"><span uis-transclude-append=""></span> <a href="javascript:;" class="ui-select-match-close select2-search-choice-close" ng-click="$selectMultiple.removeChoice($index)" tabindex="-1"></a></li></span>'),e.put("select2/match.tpl.html",'<a class="select2-choice ui-select-match" ng-class="{\'select2-default\': $select.isEmpty()}" ng-click="$select.toggle($event)" aria-label="{{ $select.baseTitle }} select"><span ng-show="$select.isEmpty()" class="select2-chosen">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="select2-chosen" ng-transclude=""></span> <abbr ng-if="$select.allowClear && !$select.isEmpty()" class="select2-search-choice-close" ng-click="$select.clear($event)"></abbr> <span class="select2-arrow ui-select-toggle"><b></b></span></a>'),e.put("select2/select-multiple.tpl.html",'<div class="ui-select-container ui-select-multiple select2 select2-container select2-container-multi" ng-class="{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled}"><ul class="select2-choices"><span class="ui-select-match"></span><li class="select2-search-field"><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="true" aria-owns="ui-select-choices-{{ $select.generatedId }}" aria-label="{{ $select.baseTitle }}" aria-activedescendant="ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}" class="select2-input ui-select-search" placeholder="{{$selectMultiple.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-model="$select.search" ng-click="$select.activate()" style="width: 34px;" ondrop="return false;"></li></ul><div class="ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="ui-select-choices"></div></div></div>'),e.put("select2/select.tpl.html",'<div class="ui-select-container select2 select2-container" ng-class="{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled, \'select2-container-active\': $select.focus, \'select2-allowclear\': $select.allowClear && !$select.isEmpty()}"><div class="ui-select-match"></div><div class="ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="select2-search" ng-show="$select.searchEnabled"><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="true" aria-owns="ui-select-choices-{{ $select.generatedId }}" aria-label="{{ $select.baseTitle }}" aria-activedescendant="ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}" class="ui-select-search select2-input" ng-model="$select.search"></div><div class="ui-select-choices"></div></div></div>'),e.put("selectize/choices.tpl.html",'<div ng-show="$select.open" class="ui-select-choices ui-select-dropdown selectize-dropdown single"><div class="ui-select-choices-content selectize-dropdown-content"><div class="ui-select-choices-group optgroup" role="listbox"><div ng-show="$select.isGrouped" class="ui-select-choices-group-label optgroup-header" ng-bind="$group.name"></div><div role="option" class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}"><div class="option ui-select-choices-row-inner" data-selectable=""></div></div></div></div></div>'),e.put("selectize/match.tpl.html",'<div ng-hide="($select.open || $select.isEmpty())" class="ui-select-match" ng-transclude=""></div>'),e.put("selectize/select.tpl.html",'<div class="ui-select-container selectize-control single" ng-class="{\'open\': $select.open}"><div class="selectize-input" ng-class="{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}" ng-click="$select.activate()"><div class="ui-select-match"></div><input type="text" autocomplete="off" tabindex="-1" class="ui-select-search ui-select-toggle" ng-click="$select.toggle($event)" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-hide="!$select.searchEnabled || ($select.selected && !$select.open)" ng-disabled="$select.disabled" aria-label="{{ $select.baseTitle }}"></div><div class="ui-select-choices"></div></div>')
}]);

// Peity jQuery plugin version 2.0.3
// (c) 2014 Ben Pickles
//
// http://benpickles.github.io/peity
//
// Released under MIT license.
(function(e,q,h){var o=function(a,b){var c=q.createElementNS("http://www.w3.org/2000/svg",a);e.each(b,function(a,b){c.setAttribute(a,b)});return c},t="createElementNS"in q&&o("svg",{}).createSVGRect,r=1/(window.devicePixelRatio||1),j=e.fn.peity=function(a,b){t&&this.each(function(){var c=e(this),d=c.data("peity");if(d)a&&(d.type=a),e.extend(d.opts,b);else{var f=j.defaults[a],g={};e.each(c.data(),function(a,b){a in f&&(g[a]=b)});var h=e.extend({},f,g,b),d=new s(c,a,h);c.change(function(){d.draw()}).data("peity",
    d)}d.draw()});return this},s=function(a,b,c){this.$el=a;this.type=b;this.opts=c},m=s.prototype;m.draw=function(){j.graphers[this.type].call(this,this.opts)};m.fill=function(){var a=this.opts.fill,b=a;e.isFunction(b)||(b=function(b,d){return a[d%a.length]});return b};m.prepare=function(a,b){var c;this.svg?c=e(this.svg).empty():(this.svg=o("svg",{"class":"peity"}),this.$el.hide().after(this.svg),c=e(this.svg).data("peity",this));this.svg.setAttribute("height",b);this.svg.setAttribute("width",a);return c};
    m.values=function(){return e.map(this.$el.text().split(this.opts.delimiter),function(a){return parseFloat(a)})};j.defaults={};j.graphers={};j.register=function(a,b,c){this.defaults[a]=b;this.graphers[a]=c};j.register("pie",{delimiter:null,diameter:16,fill:["#ff9900","#fff4dd","#ffc66e"]},function(a){if(!a.delimiter){var b=this.$el.text().match(/[^0-9\.]/);a.delimiter=b?b[0]:","}b=this.values();if("/"==a.delimiter)var c=b[0],b=[c,h.max(0,b[1]-c)];for(var d=0,c=b.length,f=0;d<c;d++)f+=b[d];for(var a=
        this.prepare(a.width||a.diameter,a.height||a.diameter),d=a.width(),g=a.height(),a=d/2,g=g/2,p=h.min(a,g),e=h.PI,j=this.fill(),i=-e/2,d=0;d<c;d++){var n=b[d],l=n/f,k;if(0!=l){if(1==l)k=o("circle",{cx:a,cy:g,r:p});else{k=2*l*e;var l=i+k,m=p*h.cos(i)+a,i=p*h.sin(i)+g,q=p*h.cos(l)+a,r=p*h.sin(l)+g;k=o("path",{d:["M",a,g,"L",m,i,"A",p,p,0,k>e?1:0,1,q,r,"Z"].join(" ")});i=l}k.setAttribute("fill",j.call(this,n,d,b));this.svg.appendChild(k)}}});j.register("line",{delimiter:",",fill:"#c6d9fd",height:16,max:null,
        min:0,stroke:"#4d89f9",strokeWidth:1,width:32},function(a){var b=this.values();1==b.length&&b.push(b[0]);for(var c=h.max.apply(h,b.concat([a.max])),d=h.min.apply(h,b.concat([a.min])),f=this.prepare(a.width,a.height),g=f.width(),f=f.height()-a.strokeWidth,e=g/(b.length-1),c=c-d,j=0==c?f:f/c,m=f+d*j,c=[0,m],i=0;i<b.length;i++)c.push(i*e,f-j*(b[i]-d)+a.strokeWidth/2);c.push(g,m);b=o("polygon",{fill:a.fill,points:c.join(" ")});this.svg.appendChild(b);a.strokeWidth&&(a=o("polyline",{fill:"transparent",
        points:c.slice(2,c.length-2).join(" "),stroke:a.stroke,"stroke-width":a.strokeWidth,"stroke-linecap":"square"}),this.svg.appendChild(a))});j.register("bar",{delimiter:",",fill:["#4D89F9"],gap:1,height:16,max:null,min:0,width:32},function(a){for(var b=this.values(),c=h.max.apply(h,b.concat([a.max])),d=h.min.apply(h,b.concat([a.min])),f=this.prepare(a.width,a.height),g=f.width(),f=f.height(),e=c-d,j=0==e?0:f/e,a=a.gap,g=(g+a)/b.length,m=this.fill(),i=0;i<b.length;i++){var n=b[i],l=f-j*(n-d),k=j*n;if(0==
        k){if(k=r,0>=d&&0<c||0==e)l-=r}else 0>k&&(l+=k,k=-k);n=o("rect",{fill:m.call(this,n,i,b),x:i*g,y:l,width:g-a,height:k});this.svg.appendChild(n)}})})(jQuery,document,Math);

var angularPeity = angular.module('angular-peity', []);


var buildChartDirective = function (chartType) {
    return {
        restrict: 'E',
        scope: {
            data: "=",
            options: "="
        },
        link: function (scope, element, attrs) {

            var options = {};
            if (scope.options) {
                options = scope.options;
            }

            var span = document.createElement('span');
            span.textContent = scope.data.join();

            if (!attrs.class) {
                span.className = "";
            } else {
                span.className = attrs.class;
            }

            if (element[0].nodeType === 8) {
                element.replaceWith(span);
            } else {
                element[0].appendChild(span);
            }

            jQuery(span).peity(chartType, options);

        }
    };
};


angularPeity.directive('pieChart', function () {

    return buildChartDirective("pie");

});


angularPeity.directive('barChart', function () {

    return buildChartDirective("bar");

});


angularPeity.directive('lineChart', function () {

    return buildChartDirective("line");

});

//download.js v4.2, by dandavis; 2008-2016. [CCBY2] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
// https://github.com/rndme/download

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else
        if (typeof exports === 'object') {
            // Node. Does not work with strict CommonJS, but
            // only CommonJS-like environments that support module.exports,
            // like Node.
            module.exports = factory();
        } else {
            // Browser globals (root is window)
            root.download = factory();
        }
}(this, function () {

    return function download(data, strFileName, strMimeType) {

        var self = window, // this script is only for browsers anyway...
            defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
            mimeType = strMimeType || defaultMime,
            payload = data,
            url = !strFileName && !strMimeType && payload,
            anchor = document.createElement("a"),
            toString = function (a) {
                return String(a);
            },
            myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
            fileName = strFileName || "download",
            blob,
            reader;
        myBlob = myBlob.call ? myBlob.bind(self) : Blob;

        if (String(this) === "true") { //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
            payload = [payload, mimeType];
            mimeType = payload[0];
            payload = payload[1];
        }


        if (url && url.length < 2048) { // if no filename and no mime, assume a url was passed as the only argument
            fileName = url.split("/").pop().split("?")[0];
            anchor.href = url; // assign href prop to temp anchor
            if (anchor.href.indexOf(url) !== -1) { // if the browser determines that it's a potentially valid url path:
                var ajax = new XMLHttpRequest();
                ajax.open("GET", url, true);
                ajax.responseType = 'blob';
                ajax.onload = function (e) {
                    download(e.target.response, fileName, defaultMime);
                };
                setTimeout(function () {
                    ajax.send();
                }, 0); // allows setting custom ajax headers using the return:
                return ajax;
            } // end if valid url?
        } // end if url?


        //go ahead and download dataURLs right away
        if (/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)) {

            if (payload.length > (1024 * 1024 * 1.999) && myBlob !== toString) {
                payload = dataUrlToBlob(payload);
                mimeType = payload.type || defaultMime;
            } else {
                return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
                    navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
                    saver(payload); // everyone else can save dataURLs un-processed
            }

        }//end if dataURL passed?

        blob = payload instanceof myBlob ?
            payload :
            new myBlob([payload], {type: mimeType});


        function dataUrlToBlob(strUrl)
        {
            var parts = strUrl.split(/[:;,]/),
                type = parts[1],
                decoder = parts[2] == "base64" ? atob : decodeURIComponent,
                binData = decoder(parts.pop()),
                mx = binData.length,
                i = 0,
                uiArr = new Uint8Array(mx);

            for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);

            return new myBlob([uiArr], {type: type});
        }

        function saver(url, winMode)
        {

            if ('download' in anchor) { //html5 A[download]
                anchor.href = url;
                anchor.setAttribute("download", fileName);
                anchor.className = "download-js-link";
                anchor.innerHTML = "downloading...";
                anchor.style.display = "none";
                document.body.appendChild(anchor);
                setTimeout(function () {
                    anchor.click();
                    document.body.removeChild(anchor);
                    if (winMode === true) {
                        setTimeout(function () {
                            self.URL.revokeObjectURL(anchor.href);
                        }, 250);
                    }
                }, 66);
                return true;
            }

            // handle non-a[download] safari as best we can:
            if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
                url = url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
                if (!window.open(url)) { // popup blocked, offer direct download:
                    if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) {
                        location.href = url;
                    }
                }
                return true;
            }

            //do iframe dataURL download (old ch+FF):
            var f = document.createElement("iframe");
            document.body.appendChild(f);

            if (!winMode) { // force a mime that will download:
                url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
            }
            f.src = url;
            setTimeout(function () {
                document.body.removeChild(f);
            }, 333);

        }//end saver


        if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
            return navigator.msSaveBlob(blob, fileName);
        }

        if (self.URL) { // simple fast and modern way using Blob and URL:
            saver(self.URL.createObjectURL(blob), true);
        } else {
            // handle non-Blob()+non-URL browsers:
            if (typeof blob === "string" || blob.constructor === toString) {
                try {
                    return saver("data:" + mimeType + ";base64," + self.btoa(blob));
                } catch (y) {
                    return saver("data:" + mimeType + "," + encodeURIComponent(blob));
                }
            }

            // Blob but not URL support:
            reader = new FileReader();
            reader.onload = function (e) {
                saver(this.result);
            };
            reader.readAsDataURL(blob);
        }
        return true;
    };
    /* end download() */
}));
/*! 
 * jQuery Steps v1.0.6 - 04/27/2014
 * Copyright (c) 2014 Rafael Staib (http://www.jquery-steps.com)
 * Licensed under MIT http://www.opensource.org/licenses/MIT
 */
!function(a,b){function c(a,b){o(a).push(b)}function d(d,e,f){var g=d.children(e.headerTag),h=d.children(e.bodyTag);g.length>h.length?R(Z,"contents"):g.length<h.length&&R(Z,"titles");var i=e.startIndex;if(f.stepCount=g.length,e.saveState&&a.cookie){var j=a.cookie(U+q(d)),k=parseInt(j,0);!isNaN(k)&&k<f.stepCount&&(i=k)}f.currentIndex=i,g.each(function(e){var f=a(this),g=h.eq(e),i=g.data("mode"),j=null==i?$.html:r($,/^\s*$/.test(i)||isNaN(i)?i:parseInt(i,0)),k=j===$.html||g.data("url")===b?"":g.data("url"),l=j!==$.html&&"1"===g.data("loaded"),m=a.extend({},bb,{title:f.html(),content:j===$.html?g.html():"",contentUrl:k,contentMode:j,contentLoaded:l});c(d,m)})}function e(a){a.triggerHandler("canceled")}function f(a,b){return a.currentIndex-b}function g(b,c){var d=i(b);b.unbind(d).removeData("uid").removeData("options").removeData("state").removeData("steps").removeData("eventNamespace").find(".actions a").unbind(d),b.removeClass(c.clearFixCssClass+" vertical");var e=b.find(".content > *");e.removeData("loaded").removeData("mode").removeData("url"),e.removeAttr("id").removeAttr("role").removeAttr("tabindex").removeAttr("class").removeAttr("style")._removeAria("labelledby")._removeAria("hidden"),b.find(".content > [data-mode='async'],.content > [data-mode='iframe']").empty();var f=a('<{0} class="{1}"></{0}>'.format(b.get(0).tagName,b.attr("class"))),g=b._id();return null!=g&&""!==g&&f._id(g),f.html(b.find(".content").html()),b.after(f),b.remove(),f}function h(a,b){var c=a.find(".steps li").eq(b.currentIndex);a.triggerHandler("finishing",[b.currentIndex])?(c.addClass("done").removeClass("error"),a.triggerHandler("finished",[b.currentIndex])):c.addClass("error")}function i(a){var b=a.data("eventNamespace");return null==b&&(b="."+q(a),a.data("eventNamespace",b)),b}function j(a,b){var c=q(a);return a.find("#"+c+V+b)}function k(a,b){var c=q(a);return a.find("#"+c+W+b)}function l(a,b){var c=q(a);return a.find("#"+c+X+b)}function m(a){return a.data("options")}function n(a){return a.data("state")}function o(a){return a.data("steps")}function p(a,b){var c=o(a);return(0>b||b>=c.length)&&R(Y),c[b]}function q(a){var b=a.data("uid");return null==b&&(b=a._id(),null==b&&(b="steps-uid-".concat(T),a._id(b)),T++,a.data("uid",b)),b}function r(a,c){if(S("enumType",a),S("keyOrValue",c),"string"==typeof c){var d=a[c];return d===b&&R("The enum key '{0}' does not exist.",c),d}if("number"==typeof c){for(var e in a)if(a[e]===c)return c;R("Invalid enum value '{0}'.",c)}else R("Invalid key or value type.")}function s(a,b,c){return B(a,b,c,v(c,1))}function t(a,b,c){return B(a,b,c,f(c,1))}function u(a,b,c,d){if((0>d||d>=c.stepCount)&&R(Y),!(b.forceMoveForward&&d<c.currentIndex)){var e=c.currentIndex;return a.triggerHandler("stepChanging",[c.currentIndex,d])?(c.currentIndex=d,O(a,b,c),E(a,b,c,e),D(a,b,c),A(a,b,c),P(a,b,c,d,e),a.triggerHandler("stepChanged",[d,e])):a.find(".steps li").eq(e).addClass("error"),!0}}function v(a,b){return a.currentIndex+b}function w(b){var c=a.extend(!0,{},cb,b);return this.each(function(){var b=a(this),e={currentIndex:c.startIndex,currentStep:null,stepCount:0,transitionElement:null};b.data("options",c),b.data("state",e),b.data("steps",[]),d(b,c,e),J(b,c,e),G(b,c),c.autoFocus&&0===T&&j(b,c.startIndex).focus()})}function x(b,c,d,e,f){(0>e||e>d.stepCount)&&R(Y),f=a.extend({},bb,f),y(b,e,f),d.currentIndex!==d.stepCount&&d.currentIndex>=e&&(d.currentIndex++,O(b,c,d)),d.stepCount++;var g=b.find(".content"),h=a("<{0}>{1}</{0}>".format(c.headerTag,f.title)),i=a("<{0}></{0}>".format(c.bodyTag));return(null==f.contentMode||f.contentMode===$.html)&&i.html(f.content),0===e?g.prepend(i).prepend(h):k(b,e-1).after(i).after(h),K(b,d,i,e),N(b,c,d,h,e),F(b,c,d,e),e===d.currentIndex&&E(b,c,d),D(b,c,d),b}function y(a,b,c){o(a).splice(b,0,c)}function z(b){var c=a(this),d=m(c),e=n(c);if(d.suppressPaginationOnFocus&&c.find(":focus").is(":input"))return b.preventDefault(),!1;var f={left:37,right:39};b.keyCode===f.left?(b.preventDefault(),t(c,d,e)):b.keyCode===f.right&&(b.preventDefault(),s(c,d,e))}function A(b,c,d){if(d.stepCount>0){var e=p(b,d.currentIndex);if(!c.enableContentCache||!e.contentLoaded)switch(r($,e.contentMode)){case $.iframe:b.find(".content > .body").eq(d.currentIndex).empty().html('<iframe src="'+e.contentUrl+'" frameborder="0" scrolling="no" />').data("loaded","1");break;case $.async:var f=k(b,d.currentIndex)._aria("busy","true").empty().append(M(c.loadingTemplate,{text:c.labels.loading}));a.ajax({url:e.contentUrl,cache:!1}).done(function(a){f.empty().html(a)._aria("busy","false").data("loaded","1")})}}}function B(a,b,c,d){var e=c.currentIndex;if(d>=0&&d<c.stepCount&&!(b.forceMoveForward&&d<c.currentIndex)){var f=j(a,d),g=f.parent(),h=g.hasClass("disabled");return g._enableAria(),f.click(),e===c.currentIndex&&h?(g._enableAria(!1),!1):!0}return!1}function C(b){b.preventDefault();var c=a(this),d=c.parent().parent().parent().parent(),f=m(d),g=n(d),i=c.attr("href");switch(i.substring(i.lastIndexOf("#")+1)){case"cancel":e(d);break;case"finish":h(d,g);break;case"next":s(d,f,g);break;case"previous":t(d,f,g)}}function D(a,b,c){if(b.enablePagination){var d=a.find(".actions a[href$='#finish']").parent(),e=a.find(".actions a[href$='#next']").parent();if(!b.forceMoveForward){var f=a.find(".actions a[href$='#previous']").parent();f._enableAria(c.currentIndex>0)}b.enableFinishButton&&b.showFinishButtonAlways?(d._enableAria(c.stepCount>0),e._enableAria(c.stepCount>1&&c.stepCount>c.currentIndex+1)):(d._showAria(b.enableFinishButton&&c.stepCount>=c.currentIndex+1),e._showAria(0===c.stepCount||c.stepCount>c.currentIndex+1)._enableAria(c.stepCount>c.currentIndex+1||!b.enableFinishButton))}}function E(b,c,d,e){var f=j(b,d.currentIndex),g=a('<span class="current-info audible">'+c.labels.current+" </span>"),h=b.find(".content > .title");if(null!=e){var i=j(b,e);i.parent().addClass("done").removeClass("error")._selectAria(!1),h.eq(e).removeClass("current").next(".body").removeClass("current"),g=i.find(".current-info"),f.focus()}f.prepend(g).parent()._selectAria().removeClass("done")._enableAria(),h.eq(d.currentIndex).addClass("current").next(".body").addClass("current")}function F(a,b,c,d){for(var e=q(a),f=d;f<c.stepCount;f++){var g=e+V+f,h=e+W+f,i=e+X+f,j=a.find(".title").eq(f)._id(i);a.find(".steps a").eq(f)._id(g)._aria("controls",h).attr("href","#"+i).html(M(b.titleTemplate,{index:f+1,title:j.html()})),a.find(".body").eq(f)._id(h)._aria("labelledby",i)}}function G(a,b){var c=i(a);a.bind("canceled"+c,b.onCanceled),a.bind("finishing"+c,b.onFinishing),a.bind("finished"+c,b.onFinished),a.bind("stepChanging"+c,b.onStepChanging),a.bind("stepChanged"+c,b.onStepChanged),b.enableKeyNavigation&&a.bind("keyup"+c,z),a.find(".actions a").bind("click"+c,C)}function H(a,b,c,d){return 0>d||d>=c.stepCount||c.currentIndex===d?!1:(I(a,d),c.currentIndex>d&&(c.currentIndex--,O(a,b,c)),c.stepCount--,l(a,d).remove(),k(a,d).remove(),j(a,d).parent().remove(),0===d&&a.find(".steps li").first().addClass("first"),d===c.stepCount&&a.find(".steps li").eq(d).addClass("last"),F(a,b,c,d),D(a,b,c),!0)}function I(a,b){o(a).splice(b,1)}function J(b,c,d){var e='<{0} class="{1}">{2}</{0}>',f=r(_,c.stepsOrientation),g=f===_.vertical?" vertical":"",h=a(e.format(c.contentContainerTag,"content "+c.clearFixCssClass,b.html())),i=a(e.format(c.stepsContainerTag,"steps "+c.clearFixCssClass,'<ul role="tablist"></ul>')),j=h.children(c.headerTag),k=h.children(c.bodyTag);b.attr("role","application").empty().append(i).append(h).addClass(c.cssClass+" "+c.clearFixCssClass+g),k.each(function(c){K(b,d,a(this),c)}),j.each(function(e){N(b,c,d,a(this),e)}),E(b,c,d),L(b,c,d)}function K(a,b,c,d){var e=q(a),f=e+W+d,g=e+X+d;c._id(f).attr("role","tabpanel")._aria("labelledby",g).addClass("body")._showAria(b.currentIndex===d)}function L(a,b,c){if(b.enablePagination){var d='<{0} class="actions {1}"><ul role="menu" aria-label="{2}">{3}</ul></{0}>',e='<li><a href="#{0}" role="menuitem">{1}</a></li>',f="";b.forceMoveForward||(f+=e.format("previous",b.labels.previous)),f+=e.format("next",b.labels.next),b.enableFinishButton&&(f+=e.format("finish",b.labels.finish)),b.enableCancelButton&&(f+=e.format("cancel",b.labels.cancel)),a.append(d.format(b.actionContainerTag,b.clearFixCssClass,b.labels.pagination,f)),D(a,b,c),A(a,b,c)}}function M(a,c){for(var d=a.match(/#([a-z]*)#/gi),e=0;e<d.length;e++){var f=d[e],g=f.substring(1,f.length-1);c[g]===b&&R("The key '{0}' does not exist in the substitute collection!",g),a=a.replace(f,c[g])}return a}function N(b,c,d,e,f){var g=q(b),h=g+V+f,j=g+W+f,k=g+X+f,l=b.find(".steps > ul"),m=M(c.titleTemplate,{index:f+1,title:e.html()}),n=a('<li role="tab"><a id="'+h+'" href="#'+k+'" aria-controls="'+j+'">'+m+"</a></li>");n._enableAria(c.enableAllSteps||d.currentIndex>f),d.currentIndex>f&&n.addClass("done"),e._id(k).attr("tabindex","-1").addClass("title"),0===f?l.prepend(n):l.find("li").eq(f-1).after(n),0===f&&l.find("li").removeClass("first").eq(f).addClass("first"),f===d.stepCount-1&&l.find("li").removeClass("last").eq(f).addClass("last"),n.children("a").bind("click"+i(b),Q)}function O(b,c,d){c.saveState&&a.cookie&&a.cookie(U+q(b),d.currentIndex)}function P(b,c,d,e,f){var g=b.find(".content > .body"),h=r(ab,c.transitionEffect),i=c.transitionEffectSpeed,j=g.eq(e),k=g.eq(f);switch(h){case ab.fade:case ab.slide:var l=h===ab.fade?"fadeOut":"slideUp",m=h===ab.fade?"fadeIn":"slideDown";d.transitionElement=j,k[l](i,function(){var b=a(this)._showAria(!1).parent().parent(),c=n(b);c.transitionElement&&(c.transitionElement[m](i,function(){a(this)._showAria()}),c.transitionElement=null)}).promise();break;case ab.slideLeft:var o=k.outerWidth(!0),p=e>f?-o:o,q=e>f?o:-o;k.animate({left:p},i,function(){a(this)._showAria(!1)}).promise(),j.css("left",q+"px")._showAria().animate({left:0},i).promise();break;default:k._showAria(!1),j._showAria()}}function Q(b){b.preventDefault();var c=a(this),d=c.parent().parent().parent().parent(),e=m(d),f=n(d),g=f.currentIndex;if(c.parent().is(":not(.disabled):not(.current)")){var h=c.attr("href"),i=parseInt(h.substring(h.lastIndexOf("-")+1),0);u(d,e,f,i)}return g===f.currentIndex?(j(d,g).focus(),!1):void 0}function R(a){throw arguments.length>1&&(a=a.format(Array.prototype.slice.call(arguments,1))),new Error(a)}function S(a,b){null==b&&R("The argument '{0}' is null or undefined.",a)}a.fn.extend({_aria:function(a,b){return this.attr("aria-"+a,b)},_removeAria:function(a){return this.removeAttr("aria-"+a)},_enableAria:function(a){return null==a||a?this.removeClass("disabled")._aria("disabled","false"):this.addClass("disabled")._aria("disabled","true")},_showAria:function(a){return null==a||a?this.show()._aria("hidden","false"):this.hide()._aria("hidden","true")},_selectAria:function(a){return null==a||a?this.addClass("current")._aria("selected","true"):this.removeClass("current")._aria("selected","false")},_id:function(a){return a?this.attr("id",a):this.attr("id")}}),String.prototype.format||(String.prototype.format=function(){for(var b=1===arguments.length&&a.isArray(arguments[0])?arguments[0]:arguments,c=this,d=0;d<b.length;d++){var e=new RegExp("\\{"+d+"\\}","gm");c=c.replace(e,b[d])}return c});var T=0,U="jQu3ry_5teps_St@te_",V="-t-",W="-p-",X="-h-",Y="Index out of range.",Z="One or more corresponding step {0} are missing.";a.fn.steps=function(b){return a.fn.steps[b]?a.fn.steps[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.steps"):w.apply(this,arguments)},a.fn.steps.add=function(a){var b=n(this);return x(this,m(this),b,b.stepCount,a)},a.fn.steps.destroy=function(){return g(this,m(this))},a.fn.steps.finish=function(){h(this,n(this))},a.fn.steps.getCurrentIndex=function(){return n(this).currentIndex},a.fn.steps.getCurrentStep=function(){return p(this,n(this).currentIndex)},a.fn.steps.getStep=function(a){return p(this,a)},a.fn.steps.insert=function(a,b){return x(this,m(this),n(this),a,b)},a.fn.steps.next=function(){return s(this,m(this),n(this))},a.fn.steps.previous=function(){return t(this,m(this),n(this))},a.fn.steps.remove=function(a){return H(this,m(this),n(this),a)},a.fn.steps.setStep=function(){throw new Error("Not yet implemented!")},a.fn.steps.skip=function(){throw new Error("Not yet implemented!")};var $=a.fn.steps.contentMode={html:0,iframe:1,async:2},_=a.fn.steps.stepsOrientation={horizontal:0,vertical:1},ab=a.fn.steps.transitionEffect={none:0,fade:1,slide:2,slideLeft:3},bb=a.fn.steps.stepModel={title:"",content:"",contentUrl:"",contentMode:$.html,contentLoaded:!1},cb=a.fn.steps.defaults={headerTag:"h1",bodyTag:"div",contentContainerTag:"div",actionContainerTag:"div",stepsContainerTag:"div",cssClass:"wizard",clearFixCssClass:"clearfix",stepsOrientation:_.horizontal,titleTemplate:'<span class="number">#index#.</span> #title#',loadingTemplate:'<span class="spinner"></span> #text#',autoFocus:!1,enableAllSteps:!1,enableKeyNavigation:!0,enablePagination:!0,suppressPaginationOnFocus:!0,enableContentCache:!0,enableCancelButton:!0,enableFinishButton:!0,preloadContent:!1,showFinishButtonAlways:!1,forceMoveForward:!1,saveState:!1,startIndex:0,transitionEffect:ab.none,transitionEffectSpeed:200,onStepChanging:function(){return!0},onStepChanged:function(){},onCanceled:function(){},onFinishing:function(){return!0},onFinished:function(){},labels:{cancel:"Cancel",current:"current step:",pagination:"Pagination",finish:"Finish",next:"Next",previous:"Previous",loading:"Loading ..."}}}(jQuery);



/*!
 * ClockPicker v{package.version} (http://weareoutman.github.io/clockpicker/)
 * Copyright 2014 Wang Shenwei.
 * Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)
 */

;(function () {
    var $ = window.jQuery,
        $win = $(window),
        $doc = $(document),
        $body;

    // Can I use inline svg ?
    var svgNS = 'http://www.w3.org/2000/svg',
        svgSupported = 'SVGAngle' in window && (function () {
            var supported,
                el = document.createElement('div');
            el.innerHTML = '<svg/>';
            supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
            el.innerHTML = '';
            return supported;
        })();

    // Can I use transition ?
    var transitionSupported = (function () {
        var style = document.createElement('div').style;
        return 'transition' in style ||
            'WebkitTransition' in style ||
            'MozTransition' in style ||
            'msTransition' in style ||
            'OTransition' in style;
    })();

    // Listen touch events in touch screen device, instead of mouse events in desktop.
    var touchSupported = 'ontouchstart' in window,
        mousedownEvent = 'mousedown' + (touchSupported ? ' touchstart' : ''),
        mousemoveEvent = 'mousemove.clockpicker' + (touchSupported ? ' touchmove.clockpicker' : ''),
        mouseupEvent = 'mouseup.clockpicker' + (touchSupported ? ' touchend.clockpicker' : '');

    // Vibrate the device if supported
    var vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

    function createSvgElement(name)
    {
        return document.createElementNS(svgNS, name);
    }

    function leadingZero(num)
    {
        return (num < 10 ? '0' : '') + num;
    }

    // Get a unique id
    var idCounter = 0;

    function uniqueId(prefix)
    {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    }

    // Clock size
    var dialRadius = 100,
        outerRadius = 80,
        // innerRadius = 80 on 12 hour clock
        innerRadius = 54,
        tickRadius = 13,
        diameter = dialRadius * 2,
        duration = transitionSupported ? 350 : 1;

    // Popover template
    var tpl = [
        '<div class="popover clockpicker-popover">',
        '<div class="arrow"></div>',
        '<div class="popover-title">',
        '<span class="clockpicker-span-hours text-primary"></span>',
        ' : ',
        '<span class="clockpicker-span-minutes"></span>',
        '<span class="clockpicker-span-am-pm"></span>',
        '</div>',
        '<div class="popover-content">',
        '<div class="clockpicker-plate">',
        '<div class="clockpicker-canvas"></div>',
        '<div class="clockpicker-dial clockpicker-hours"></div>',
        '<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>',
        '</div>',
        '<span class="clockpicker-am-pm-block">',
        '</span>',
        '</div>',
        '</div>'
    ].join('');

    // ClockPicker
    function ClockPicker(element, options)
    {
        var popover = $(tpl),
            plate = popover.find('.clockpicker-plate'),
            hoursView = popover.find('.clockpicker-hours'),
            minutesView = popover.find('.clockpicker-minutes'),
            amPmBlock = popover.find('.clockpicker-am-pm-block'),
            isInput = element.prop('tagName') === 'INPUT',
            input = isInput ? element : element.find('input'),
            addon = element.find('.input-group-addon'),
            self = this,
            timer;

        this.id = uniqueId('cp');
        this.element = element;
        this.options = options;
        this.isAppended = false;
        this.isShown = false;
        this.currentView = 'hours';
        this.isInput = isInput;
        this.input = input;
        this.addon = addon;
        this.popover = popover;
        this.plate = plate;
        this.hoursView = hoursView;
        this.minutesView = minutesView;
        this.amPmBlock = amPmBlock;
        this.spanHours = popover.find('.clockpicker-span-hours');
        this.spanMinutes = popover.find('.clockpicker-span-minutes');
        this.spanAmPm = popover.find('.clockpicker-span-am-pm');
        this.amOrPm = "PM";

        // Setup for for 12 hour clock if option is selected
        if (options.twelvehour) {

            var amPmButtonsTemplate = ['<div class="clockpicker-am-pm-block">',
                '<button type="button" class="btn btn-sm btn-default clockpicker-button clockpicker-am-button">',
                'AM</button>',
                '<button type="button" class="btn btn-sm btn-default clockpicker-button clockpicker-pm-button">',
                'PM</button>',
                '</div>'].join('');

            var amPmButtons = $(amPmButtonsTemplate);
            //amPmButtons.appendTo(plate);

            ////Not working b/c they are not shown when this runs
            //$('clockpicker-am-button')
            //    .on("click", function() {
            //        self.amOrPm = "AM";
            //        $('.clockpicker-span-am-pm').empty().append('AM');
            //    });
            //
            //$('clockpicker-pm-button')
            //    .on("click", function() {
            //         self.amOrPm = "PM";
            //        $('.clockpicker-span-am-pm').empty().append('PM');
            //    });

            $('<button type="button" class="btn btn-sm btn-default clockpicker-button am-button">' + "AM" + '</button>')
                .on("click", function () {
                    self.amOrPm = "AM";
                    $('.clockpicker-span-am-pm').empty().append('AM');
                }).appendTo(this.amPmBlock);


            $('<button type="button" class="btn btn-sm btn-default clockpicker-button pm-button">' + "PM" + '</button>')
                .on("click", function () {
                    self.amOrPm = 'PM';
                    $('.clockpicker-span-am-pm').empty().append('PM');
                }).appendTo(this.amPmBlock);

        }

        if (!options.autoclose) {
            // If autoclose is not setted, append a button
            $('<button type="button" class="btn btn-sm btn-default btn-block clockpicker-button">' + options.donetext + '</button>')
                .click($.proxy(this.done, this))
                .appendTo(popover);
        }

        // Placement and arrow align - make sure they make sense.
        if ((options.placement === 'top' || options.placement === 'bottom') && (options.align === 'top' || options.align === 'bottom')) options.align = 'left';
        if ((options.placement === 'left' || options.placement === 'right') && (options.align === 'left' || options.align === 'right')) options.align = 'top';

        popover.addClass(options.placement);
        popover.addClass('clockpicker-align-' + options.align);

        this.spanHours.click($.proxy(this.toggleView, this, 'hours'));
        this.spanMinutes.click($.proxy(this.toggleView, this, 'minutes'));

        // Show or toggle
        input.on('focus.clockpicker click.clockpicker', $.proxy(this.show, this));
        addon.on('click.clockpicker', $.proxy(this.toggle, this));

        // Build ticks
        var tickTpl = $('<div class="clockpicker-tick"></div>'),
            i, tick, radian, radius;

        // Hours view
        if (options.twelvehour) {
            for (i = 1; i < 13; i += 1) {
                tick = tickTpl.clone();
                radian = i / 6 * Math.PI;
                radius = outerRadius;
                tick.css('font-size', '120%');
                tick.css({
                    left: dialRadius + Math.sin(radian) * radius - tickRadius,
                    top: dialRadius - Math.cos(radian) * radius - tickRadius
                });
                tick.html(i === 0 ? '00' : i);
                hoursView.append(tick);
                tick.on(mousedownEvent, mousedown);
            }
        } else {
            for (i = 0; i < 24; i += 1) {
                tick = tickTpl.clone();
                radian = i / 6 * Math.PI;
                var inner = i > 0 && i < 13;
                radius = inner ? innerRadius : outerRadius;
                tick.css({
                    left: dialRadius + Math.sin(radian) * radius - tickRadius,
                    top: dialRadius - Math.cos(radian) * radius - tickRadius
                });
                if (inner) {
                    tick.css('font-size', '120%');
                }
                tick.html(i === 0 ? '00' : i);
                hoursView.append(tick);
                tick.on(mousedownEvent, mousedown);
            }
        }

        // Minutes view
        for (i = 0; i < 60; i += 5) {
            tick = tickTpl.clone();
            radian = i / 30 * Math.PI;
            tick.css({
                left: dialRadius + Math.sin(radian) * outerRadius - tickRadius,
                top: dialRadius - Math.cos(radian) * outerRadius - tickRadius
            });
            tick.css('font-size', '120%');
            tick.html(leadingZero(i));
            minutesView.append(tick);
            tick.on(mousedownEvent, mousedown);
        }

        // Clicking on minutes view space
        plate.on(mousedownEvent, function (e) {
            if ($(e.target).closest('.clockpicker-tick').length === 0) {
                mousedown(e, true);
            }
        });

        // Mousedown or touchstart
        function mousedown(e, space)
        {
            var offset = plate.offset(),
                isTouch = /^touch/.test(e.type),
                x0 = offset.left + dialRadius,
                y0 = offset.top + dialRadius,
                dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
                dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0,
                z = Math.sqrt(dx * dx + dy * dy),
                moved = false;

            // When clicking on minutes view space, check the mouse position
            if (space && (z < outerRadius - tickRadius || z > outerRadius + tickRadius)) {
                return;
            }
            e.preventDefault();

            // Set cursor style of body after 200ms
            var movingTimer = setTimeout(function () {
                $body.addClass('clockpicker-moving');
            }, 200);

            // Place the canvas to top
            if (svgSupported) {
                plate.append(self.canvas);
            }

            // Clock
            self.setHand(dx, dy, !space, true);

            // Mousemove on document
            $doc.off(mousemoveEvent).on(mousemoveEvent, function (e) {
                e.preventDefault();
                var isTouch = /^touch/.test(e.type),
                    x = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
                    y = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0;
                if (!moved && x === dx && y === dy) {
                    // Clicking in chrome on windows will trigger a mousemove event
                    return;
                }
                moved = true;
                self.setHand(x, y, false, true);
            });

            // Mouseup on document
            $doc.off(mouseupEvent).on(mouseupEvent, function (e) {
                $doc.off(mouseupEvent);
                e.preventDefault();
                var isTouch = /^touch/.test(e.type),
                    x = (isTouch ? e.originalEvent.changedTouches[0] : e).pageX - x0,
                    y = (isTouch ? e.originalEvent.changedTouches[0] : e).pageY - y0;
                if ((space || moved) && x === dx && y === dy) {
                    self.setHand(x, y);
                }
                if (self.currentView === 'hours') {
                    self.toggleView('minutes', duration / 2);
                } else {
                    if (options.autoclose) {
                        self.minutesView.addClass('clockpicker-dial-out');
                        setTimeout(function () {
                            self.done();
                        }, duration / 2);
                    }
                }
                plate.prepend(canvas);

                // Reset cursor style of body
                clearTimeout(movingTimer);
                $body.removeClass('clockpicker-moving');

                // Unbind mousemove event
                $doc.off(mousemoveEvent);
            });
        }

        if (svgSupported) {
            // Draw clock hands and others
            var canvas = popover.find('.clockpicker-canvas'),
                svg = createSvgElement('svg');
            svg.setAttribute('class', 'clockpicker-svg');
            svg.setAttribute('width', diameter);
            svg.setAttribute('height', diameter);
            var g = createSvgElement('g');
            g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
            var bearing = createSvgElement('circle');
            bearing.setAttribute('class', 'clockpicker-canvas-bearing');
            bearing.setAttribute('cx', 0);
            bearing.setAttribute('cy', 0);
            bearing.setAttribute('r', 2);
            var hand = createSvgElement('line');
            hand.setAttribute('x1', 0);
            hand.setAttribute('y1', 0);
            var bg = createSvgElement('circle');
            bg.setAttribute('class', 'clockpicker-canvas-bg');
            bg.setAttribute('r', tickRadius);
            var fg = createSvgElement('circle');
            fg.setAttribute('class', 'clockpicker-canvas-fg');
            fg.setAttribute('r', 3.5);
            g.appendChild(hand);
            g.appendChild(bg);
            g.appendChild(fg);
            g.appendChild(bearing);
            svg.appendChild(g);
            canvas.append(svg);

            this.hand = hand;
            this.bg = bg;
            this.fg = fg;
            this.bearing = bearing;
            this.g = g;
            this.canvas = canvas;
        }

        raiseCallback(this.options.init);
    }

    function raiseCallback(callbackFunction)
    {
        if (callbackFunction && typeof callbackFunction === "function") {
            callbackFunction();
        }
    }

    // Default options
    ClockPicker.DEFAULTS = {
        'default': '',       // default time, 'now' or '13:14' e.g.
        fromnow: 0,          // set default time to * milliseconds from now (using with default = 'now')
        placement: 'bottom', // clock popover placement
        align: 'left',       // popover arrow align
        donetext: '完成',    // done button text
        autoclose: false,    // auto close when minute is selected
        twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
        vibrate: true        // vibrate the device when dragging clock hand
    };

    // Show or hide popover
    ClockPicker.prototype.toggle = function () {
        this[this.isShown ? 'hide' : 'show']();
    };

    // Set popover position
    ClockPicker.prototype.locate = function () {
        var element = this.element,
            popover = this.popover,
            offset = element.offset(),
            width = element.outerWidth(),
            height = element.outerHeight(),
            placement = this.options.placement,
            align = this.options.align,
            styles = {},
            self = this;

        popover.show();

        // Place the popover
        switch (placement) {
            case 'bottom':
                styles.top = offset.top + height;
                break;
            case 'right':
                styles.left = offset.left + width;
                break;
            case 'top':
                styles.top = offset.top - popover.outerHeight();
                break;
            case 'left':
                styles.left = offset.left - popover.outerWidth();
                break;
        }

        // Align the popover arrow
        switch (align) {
            case 'left':
                styles.left = offset.left;
                break;
            case 'right':
                styles.left = offset.left + width - popover.outerWidth();
                break;
            case 'top':
                styles.top = offset.top;
                break;
            case 'bottom':
                styles.top = offset.top + height - popover.outerHeight();
                break;
        }

        popover.css(styles);
    };

    // Show popover
    ClockPicker.prototype.show = function (e) {
        // Not show again
        if (this.isShown) {
            return;
        }

        raiseCallback(this.options.beforeShow);

        var self = this;

        // Initialize
        if (!this.isAppended) {
            // Append popover to body
            $body = $(document.body).append(this.popover);

            // Reset position when resize
            $win.on('resize.clockpicker' + this.id, function () {
                if (self.isShown) {
                    self.locate();
                }
            });

            this.isAppended = true;
        }

        // Get the time
        var value = ((this.input.prop('value') || this.options['default'] || '') + '').split(':');
        if (value[0] === 'now') {
            var now = new Date(+new Date() + this.options.fromnow);
            value = [
                now.getHours(),
                now.getMinutes()
            ];
        }
        this.hours = +value[0] || 0;
        this.minutes = +value[1] || 0;
        this.spanHours.html(leadingZero(this.hours));
        this.spanMinutes.html(leadingZero(this.minutes));

        // Toggle to hours view
        this.toggleView('hours');

        // Set position
        this.locate();

        this.isShown = true;

        // Hide when clicking or tabbing on any element except the clock, input and addon
        $doc.on('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id, function (e) {
            var target = $(e.target);
            if (target.closest(self.popover).length === 0 &&
                target.closest(self.addon).length === 0 &&
                target.closest(self.input).length === 0) {
                self.hide();
            }
        });

        // Hide when ESC is pressed
        $doc.on('keyup.clockpicker.' + this.id, function (e) {
            if (e.keyCode === 27) {
                self.hide();
            }
        });

        raiseCallback(this.options.afterShow);
    };

    // Hide popover
    ClockPicker.prototype.hide = function () {
        raiseCallback(this.options.beforeHide);

        this.isShown = false;

        // Unbinding events on document
        $doc.off('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id);
        $doc.off('keyup.clockpicker.' + this.id);

        this.popover.hide();

        raiseCallback(this.options.afterHide);
    };

    // Toggle to hours or minutes view
    ClockPicker.prototype.toggleView = function (view, delay) {
        var raiseAfterHourSelect = false;
        if (view === 'minutes' && $(this.hoursView).css("visibility") === "visible") {
            raiseCallback(this.options.beforeHourSelect);
            raiseAfterHourSelect = true;
        }
        var isHours = view === 'hours',
            nextView = isHours ? this.hoursView : this.minutesView,
            hideView = isHours ? this.minutesView : this.hoursView;

        this.currentView = view;

        this.spanHours.toggleClass('text-primary', isHours);
        this.spanMinutes.toggleClass('text-primary', !isHours);

        // Let's make transitions
        hideView.addClass('clockpicker-dial-out');
        nextView.css('visibility', 'visible').removeClass('clockpicker-dial-out');

        // Reset clock hand
        this.resetClock(delay);

        // After transitions ended
        clearTimeout(this.toggleViewTimer);
        this.toggleViewTimer = setTimeout(function () {
            hideView.css('visibility', 'hidden');
        }, duration);

        if (raiseAfterHourSelect) {
            raiseCallback(this.options.afterHourSelect);
        }
    };

    // Reset clock hand
    ClockPicker.prototype.resetClock = function (delay) {
        var view = this.currentView,
            value = this[view],
            isHours = view === 'hours',
            unit = Math.PI / (isHours ? 6 : 30),
            radian = value * unit,
            radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
            x = Math.sin(radian) * radius,
            y = -Math.cos(radian) * radius,
            self = this;
        if (svgSupported && delay) {
            self.canvas.addClass('clockpicker-canvas-out');
            setTimeout(function () {
                self.canvas.removeClass('clockpicker-canvas-out');
                self.setHand(x, y);
            }, delay);
        } else {
            this.setHand(x, y);
        }
    };

    // Set clock hand to (x, y)
    ClockPicker.prototype.setHand = function (x, y, roundBy5, dragging) {
        var radian = Math.atan2(x, -y),
            isHours = this.currentView === 'hours',
            unit = Math.PI / (isHours || roundBy5 ? 6 : 30),
            z = Math.sqrt(x * x + y * y),
            options = this.options,
            inner = isHours && z < (outerRadius + innerRadius) / 2,
            radius = inner ? innerRadius : outerRadius,
            value;

        if (options.twelvehour) {
            radius = outerRadius;
        }

        // Radian should in range [0, 2PI]
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }

        // Get the round value
        value = Math.round(radian / unit);

        // Get the round radian
        radian = value * unit;

        // Correct the hours or minutes
        if (options.twelvehour) {
            if (isHours) {
                if (value === 0) {
                    value = 12;
                }
            } else {
                if (roundBy5) {
                    value *= 5;
                }
                if (value === 60) {
                    value = 0;
                }
            }
        } else {
            if (isHours) {
                if (value === 12) {
                    value = 0;
                }
                value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            } else {
                if (roundBy5) {
                    value *= 5;
                }
                if (value === 60) {
                    value = 0;
                }
            }
        }

        // Once hours or minutes changed, vibrate the device
        if (this[this.currentView] !== value) {
            if (vibrate && this.options.vibrate) {
                // Do not vibrate too frequently
                if (!this.vibrateTimer) {
                    navigator[vibrate](10);
                    this.vibrateTimer = setTimeout($.proxy(function () {
                        this.vibrateTimer = null;
                    }, this), 100);
                }
            }
        }

        this[this.currentView] = value;
        this[isHours ? 'spanHours' : 'spanMinutes'].html(leadingZero(value));

        // If svg is not supported, just add an active class to the tick
        if (!svgSupported) {
            this[isHours ? 'hoursView' : 'minutesView'].find('.clockpicker-tick').each(function () {
                var tick = $(this);
                tick.toggleClass('active', value === +tick.html());
            });
            return;
        }

        // Place clock hand at the top when dragging
        if (dragging || (!isHours && value % 5)) {
            this.g.insertBefore(this.hand, this.bearing);
            this.g.insertBefore(this.bg, this.fg);
            this.bg.setAttribute('class', 'clockpicker-canvas-bg clockpicker-canvas-bg-trans');
        } else {
            // Or place it at the bottom
            this.g.insertBefore(this.hand, this.bg);
            this.g.insertBefore(this.fg, this.bg);
            this.bg.setAttribute('class', 'clockpicker-canvas-bg');
        }

        // Set clock hand and others' position
        var cx = Math.sin(radian) * radius,
            cy = -Math.cos(radian) * radius;
        this.hand.setAttribute('x2', cx);
        this.hand.setAttribute('y2', cy);
        this.bg.setAttribute('cx', cx);
        this.bg.setAttribute('cy', cy);
        this.fg.setAttribute('cx', cx);
        this.fg.setAttribute('cy', cy);
    };

    // Hours and minutes are selected
    ClockPicker.prototype.done = function () {
        raiseCallback(this.options.beforeDone);
        this.hide();
        var last = this.input.prop('value'),
            value = leadingZero(this.hours) + ':' + leadingZero(this.minutes);
        if (this.options.twelvehour) {
            value = value + this.amOrPm;
        }

        this.input.prop('value', value);
        if (value !== last) {
            this.input.triggerHandler('change');
            if (!this.isInput) {
                this.element.trigger('change');
            }
        }

        if (this.options.autoclose) {
            this.input.trigger('blur');
        }

        raiseCallback(this.options.afterDone);
    };

    // Remove clockpicker from input
    ClockPicker.prototype.remove = function () {
        this.element.removeData('clockpicker');
        this.input.off('focus.clockpicker click.clockpicker');
        this.addon.off('click.clockpicker');
        if (this.isShown) {
            this.hide();
        }
        if (this.isAppended) {
            $win.off('resize.clockpicker' + this.id);
            this.popover.remove();
        }
    };

    // Extends $.fn.clockpicker
    $.fn.clockpicker = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var $this = $(this),
                data = $this.data('clockpicker');
            if (!data) {
                var options = $.extend({}, ClockPicker.DEFAULTS, $this.data(), typeof option == 'object' && option);
                $this.data('clockpicker', new ClockPicker($this, options));
            } else {
                // Manual operatsions. show, hide, remove, e.g.
                if (typeof data[option] === 'function') {
                    data[option].apply(data, args);
                }
            }
        });
    };
}());

/*
 *  Bootstrap TouchSpin - v3.0.1
 *  A mobile and touch friendly input spinner component for Bootstrap 3.
 *  http://www.virtuosoft.eu/code/bootstrap-touchspin/
 *
 *  Made by IstvĂĄn Ujj-MĂŠszĂĄros
 *  Under Apache License v2.0 License
 */
!function (a) { "use strict"; function b(a, b) { return a + ".touchspin_" + b } function c(c, d) { return a.map(c, function (a) { return b(a, d) }) } var d = 0; a.fn.TouchSpin = function (b) { if ("destroy" === b) return void this.each(function () { var b = a(this), d = b.data(); a(document).off(c(["mouseup", "touchend", "touchcancel", "mousemove", "touchmove", "scroll", "scrollstart"], d.spinnerid).join(" ")) }); var e = { min: 0, max: 100, initval: "", step: 1, decimals: 0, stepinterval: 100, forcestepdivisibility: "round", stepintervaldelay: 500, verticalbuttons: !1, verticalupclass: "glyphicon glyphicon-chevron-up", verticaldownclass: "glyphicon glyphicon-chevron-down", prefix: "", postfix: "", prefix_extraclass: "", postfix_extraclass: "", booster: !0, boostat: 10, maxboostedstep: !1, mousewheel: !0, buttondown_class: "btn btn-default", buttonup_class: "btn btn-default", buttondown_txt: "-", buttonup_txt: "+" }, f = { min: "min", max: "max", initval: "init-val", step: "step", decimals: "decimals", stepinterval: "step-interval", verticalbuttons: "vertical-buttons", verticalupclass: "vertical-up-class", verticaldownclass: "vertical-down-class", forcestepdivisibility: "force-step-divisibility", stepintervaldelay: "step-interval-delay", prefix: "prefix", postfix: "postfix", prefix_extraclass: "prefix-extra-class", postfix_extraclass: "postfix-extra-class", booster: "booster", boostat: "boostat", maxboostedstep: "max-boosted-step", mousewheel: "mouse-wheel", buttondown_class: "button-down-class", buttonup_class: "button-up-class", buttondown_txt: "button-down-txt", buttonup_txt: "button-up-txt" }; return this.each(function () { function g() { if (!J.data("alreadyinitialized")) { if (J.data("alreadyinitialized", !0), d += 1, J.data("spinnerid", d), !J.is("input")) return void console.log("Must be an input."); j(), h(), u(), m(), p(), q(), r(), s(), D.input.css("display", "block") } } function h() { "" !== B.initval && "" === J.val() && J.val(B.initval) } function i(a) { l(a), u(); var b = D.input.val(); "" !== b && (b = Number(D.input.val()), D.input.val(b.toFixed(B.decimals))) } function j() { B = a.extend({}, e, K, k(), b) } function k() { var b = {}; return a.each(f, function (a, c) { var d = "bts-" + c; J.is("[data-" + d + "]") && (b[a] = J.data(d)) }), b } function l(b) { B = a.extend({}, B, b) } function m() { var a = J.val(), b = J.parent(); "" !== a && (a = Number(a).toFixed(B.decimals)), J.data("initvalue", a).val(a), J.addClass("form-control"), b.hasClass("input-group") ? n(b) : o() } function n(b) { b.addClass("bootstrap-touchspin"); var c, d, e = J.prev(), f = J.next(), g = '<span class="input-group-addon bootstrap-touchspin-prefix">' + B.prefix + "</span>", h = '<span class="input-group-addon bootstrap-touchspin-postfix">' + B.postfix + "</span>"; e.hasClass("input-group-btn") ? (c = '<button class="' + B.buttondown_class + ' bootstrap-touchspin-down" type="button">' + B.buttondown_txt + "</button>", e.append(c)) : (c = '<span class="input-group-btn"><button class="' + B.buttondown_class + ' bootstrap-touchspin-down" type="button">' + B.buttondown_txt + "</button></span>", a(c).insertBefore(J)), f.hasClass("input-group-btn") ? (d = '<button class="' + B.buttonup_class + ' bootstrap-touchspin-up" type="button">' + B.buttonup_txt + "</button>", f.prepend(d)) : (d = '<span class="input-group-btn"><button class="' + B.buttonup_class + ' bootstrap-touchspin-up" type="button">' + B.buttonup_txt + "</button></span>", a(d).insertAfter(J)), a(g).insertBefore(J), a(h).insertAfter(J), C = b } function o() { var b; b = B.verticalbuttons ? '<div class="input-group bootstrap-touchspin"><span class="input-group-addon bootstrap-touchspin-prefix">' + B.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + B.postfix + '</span><span class="input-group-btn-vertical"><button class="' + B.buttondown_class + ' bootstrap-touchspin-up" type="button"><i class="' + B.verticalupclass + '"></i></button><button class="' + B.buttonup_class + ' bootstrap-touchspin-down" type="button"><i class="' + B.verticaldownclass + '"></i></button></span></div>' : '<div class="input-group bootstrap-touchspin"><span class="input-group-btn"><button class="' + B.buttondown_class + ' bootstrap-touchspin-down" type="button">' + B.buttondown_txt + '</button></span><span class="input-group-addon bootstrap-touchspin-prefix">' + B.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + B.postfix + '</span><span class="input-group-btn"><button class="' + B.buttonup_class + ' bootstrap-touchspin-up" type="button">' + B.buttonup_txt + "</button></span></div>", C = a(b).insertBefore(J), a(".bootstrap-touchspin-prefix", C).after(J), J.hasClass("input-sm") ? C.addClass("input-group-sm") : J.hasClass("input-lg") && C.addClass("input-group-lg") } function p() { D = { down: a(".bootstrap-touchspin-down", C), up: a(".bootstrap-touchspin-up", C), input: a("input", C), prefix: a(".bootstrap-touchspin-prefix", C).addClass(B.prefix_extraclass), postfix: a(".bootstrap-touchspin-postfix", C).addClass(B.postfix_extraclass) } } function q() { "" === B.prefix && D.prefix.hide(), "" === B.postfix && D.postfix.hide() } function r() { J.on("keydown", function (a) { var b = a.keyCode || a.which; 38 === b ? ("up" !== M && (w(), z()), a.preventDefault()) : 40 === b && ("down" !== M && (x(), y()), a.preventDefault()) }), J.on("keyup", function (a) { var b = a.keyCode || a.which; 38 === b ? A() : 40 === b && A() }), J.on("blur", function () { u() }), D.down.on("keydown", function (a) { var b = a.keyCode || a.which; (32 === b || 13 === b) && ("down" !== M && (x(), y()), a.preventDefault()) }), D.down.on("keyup", function (a) { var b = a.keyCode || a.which; (32 === b || 13 === b) && A() }), D.up.on("keydown", function (a) { var b = a.keyCode || a.which; (32 === b || 13 === b) && ("up" !== M && (w(), z()), a.preventDefault()) }), D.up.on("keyup", function (a) { var b = a.keyCode || a.which; (32 === b || 13 === b) && A() }), D.down.on("mousedown.touchspin", function (a) { D.down.off("touchstart.touchspin"), J.is(":disabled") || (x(), y(), a.preventDefault(), a.stopPropagation()) }), D.down.on("touchstart.touchspin", function (a) { D.down.off("mousedown.touchspin"), J.is(":disabled") || (x(), y(), a.preventDefault(), a.stopPropagation()) }), D.up.on("mousedown.touchspin", function (a) { D.up.off("touchstart.touchspin"), J.is(":disabled") || (w(), z(), a.preventDefault(), a.stopPropagation()) }), D.up.on("touchstart.touchspin", function (a) { D.up.off("mousedown.touchspin"), J.is(":disabled") || (w(), z(), a.preventDefault(), a.stopPropagation()) }), D.up.on("mouseout touchleave touchend touchcancel", function (a) { M && (a.stopPropagation(), A()) }), D.down.on("mouseout touchleave touchend touchcancel", function (a) { M && (a.stopPropagation(), A()) }), D.down.on("mousemove touchmove", function (a) { M && (a.stopPropagation(), a.preventDefault()) }), D.up.on("mousemove touchmove", function (a) { M && (a.stopPropagation(), a.preventDefault()) }), a(document).on(c(["mouseup", "touchend", "touchcancel"], d).join(" "), function (a) { M && (a.preventDefault(), A()) }), a(document).on(c(["mousemove", "touchmove", "scroll", "scrollstart"], d).join(" "), function (a) { M && (a.preventDefault(), A()) }), J.on("mousewheel DOMMouseScroll", function (a) { if (B.mousewheel && J.is(":focus")) { var b = a.originalEvent.wheelDelta || -a.originalEvent.deltaY || -a.originalEvent.detail; a.stopPropagation(), a.preventDefault(), 0 > b ? x() : w() } }) } function s() { J.on("touchspin.uponce", function () { A(), w() }), J.on("touchspin.downonce", function () { A(), x() }), J.on("touchspin.startupspin", function () { z() }), J.on("touchspin.startdownspin", function () { y() }), J.on("touchspin.stopspin", function () { A() }), J.on("touchspin.updatesettings", function (a, b) { i(b) }) } function t(a) { switch (B.forcestepdivisibility) { case "round": return (Math.round(a / B.step) * B.step).toFixed(B.decimals); case "floor": return (Math.floor(a / B.step) * B.step).toFixed(B.decimals); case "ceil": return (Math.ceil(a / B.step) * B.step).toFixed(B.decimals); default: return a } } function u() { var a, b, c; a = J.val(), "" !== a && (B.decimals > 0 && "." === a || (b = parseFloat(a), isNaN(b) && (b = 0), c = b, b.toString() !== a && (c = b), b < B.min && (c = B.min), b > B.max && (c = B.max), c = t(c), Number(a).toString() !== c.toString() && (J.val(c), J.trigger("change")))) } function v() { if (B.booster) { var a = Math.pow(2, Math.floor(L / B.boostat)) * B.step; return B.maxboostedstep && a > B.maxboostedstep && (a = B.maxboostedstep, E = Math.round(E / a) * a), Math.max(B.step, a) } return B.step } function w() { u(), E = parseFloat(D.input.val()), isNaN(E) && (E = 0); var a = E, b = v(); E += b, E > B.max && (E = B.max, J.trigger("touchspin.on.max"), A()), D.input.val(Number(E).toFixed(B.decimals)), a !== E && J.trigger("change") } function x() { u(), E = parseFloat(D.input.val()), isNaN(E) && (E = 0); var a = E, b = v(); E -= b, E < B.min && (E = B.min, J.trigger("touchspin.on.min"), A()), D.input.val(E.toFixed(B.decimals)), a !== E && J.trigger("change") } function y() { A(), L = 0, M = "down", J.trigger("touchspin.on.startspin"), J.trigger("touchspin.on.startdownspin"), H = setTimeout(function () { F = setInterval(function () { L++ , x() }, B.stepinterval) }, B.stepintervaldelay) } function z() { A(), L = 0, M = "up", J.trigger("touchspin.on.startspin"), J.trigger("touchspin.on.startupspin"), I = setTimeout(function () { G = setInterval(function () { L++ , w() }, B.stepinterval) }, B.stepintervaldelay) } function A() { switch (clearTimeout(H), clearTimeout(I), clearInterval(F), clearInterval(G), M) { case "up": J.trigger("touchspin.on.stopupspin"), J.trigger("touchspin.on.stopspin"); break; case "down": J.trigger("touchspin.on.stopdownspin"), J.trigger("touchspin.on.stopspin") }L = 0, M = !1 } var B, C, D, E, F, G, H, I, J = a(this), K = J.data(), L = 0, M = !1; g() }) } }(jQuery);
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define([],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.geoViewport=f()}}(function(){return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){return o(e[i][1][r]||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r}()({1:[function(require,module,exports){function fetchMerc(tileSize){return tileSize=tileSize||256,smCache[tileSize]||(smCache[tileSize]=new SphericalMercator({size:tileSize})),smCache[tileSize]}function viewport(bounds,dimensions,minzoom,maxzoom,tileSize){minzoom=void 0===minzoom?0:minzoom,maxzoom=void 0===maxzoom?20:maxzoom;var merc=fetchMerc(tileSize),base=maxzoom,bl=merc.px([bounds[0],bounds[1]],base),tr=merc.px([bounds[2],bounds[3]],base),width=tr[0]-bl[0],height=bl[1]-tr[1],ratios=[width/dimensions[0],height/dimensions[1]],center=[(bounds[0]+bounds[2])/2,(bounds[1]+bounds[3])/2],adjusted=Math.floor(Math.min(base-Math.log(ratios[0])/Math.log(2),base-Math.log(ratios[1])/Math.log(2)));return{center:center,zoom:Math.max(minzoom,Math.min(maxzoom,adjusted))}}function bounds(viewport,zoom,dimensions,tileSize){void 0!==viewport.lon&&(viewport=[viewport.lon,viewport.lat]);var merc=fetchMerc(tileSize),px=merc.px(viewport,zoom),tl=merc.ll([px[0]-dimensions[0]/2,px[1]-dimensions[1]/2],zoom),br=merc.ll([px[0]+dimensions[0]/2,px[1]+dimensions[1]/2],zoom);return[tl[0],br[1],br[0],tl[1]]}var SphericalMercator=require("@mapbox/sphericalmercator"),smCache={};module.exports.viewport=viewport,module.exports.bounds=bounds},{"@mapbox/sphericalmercator":2}],2:[function(require,module,exports){var SphericalMercator=function(){function isFloat(n){return Number(n)===n&&n%1!=0}function SphericalMercator(options){if(options=options||{},this.size=options.size||256,!cache[this.size]){var size=this.size,c=cache[this.size]={};c.Bc=[],c.Cc=[],c.zc=[],c.Ac=[];for(var d=0;d<30;d++)c.Bc.push(size/360),c.Cc.push(size/(2*Math.PI)),c.zc.push(size/2),c.Ac.push(size),size*=2}this.Bc=cache[this.size].Bc,this.Cc=cache[this.size].Cc,this.zc=cache[this.size].zc,this.Ac=cache[this.size].Ac}var cache={},D2R=Math.PI/180,R2D=180/Math.PI,A=6378137,MAXEXTENT=20037508.342789244;return SphericalMercator.prototype.px=function(ll,zoom){if(isFloat(zoom)){var size=this.size*Math.pow(2,zoom),d=size/2,bc=size/360,cc=size/(2*Math.PI),ac=size,f=Math.min(Math.max(Math.sin(D2R*ll[1]),-.9999),.9999),x=d+ll[0]*bc,y=d+.5*Math.log((1+f)/(1-f))*-cc;return x>ac&&(x=ac),y>ac&&(y=ac),[x,y]}var d=this.zc[zoom],f=Math.min(Math.max(Math.sin(D2R*ll[1]),-.9999),.9999),x=Math.round(d+ll[0]*this.Bc[zoom]),y=Math.round(d+.5*Math.log((1+f)/(1-f))*-this.Cc[zoom]);return x>this.Ac[zoom]&&(x=this.Ac[zoom]),y>this.Ac[zoom]&&(y=this.Ac[zoom]),[x,y]},SphericalMercator.prototype.ll=function(px,zoom){if(isFloat(zoom)){var size=this.size*Math.pow(2,zoom),bc=size/360,cc=size/(2*Math.PI),zc=size/2,g=(px[1]-zc)/-cc,lon=(px[0]-zc)/bc,lat=R2D*(2*Math.atan(Math.exp(g))-.5*Math.PI);return[lon,lat]}var g=(px[1]-this.zc[zoom])/-this.Cc[zoom],lon=(px[0]-this.zc[zoom])/this.Bc[zoom],lat=R2D*(2*Math.atan(Math.exp(g))-.5*Math.PI);return[lon,lat]},SphericalMercator.prototype.bbox=function(x,y,zoom,tms_style,srs){tms_style&&(y=Math.pow(2,zoom)-1-y);var ll=[x*this.size,(+y+1)*this.size],ur=[(+x+1)*this.size,y*this.size],bbox=this.ll(ll,zoom).concat(this.ll(ur,zoom));return"900913"===srs?this.convert(bbox,"900913"):bbox},SphericalMercator.prototype.xyz=function(bbox,zoom,tms_style,srs){"900913"===srs&&(bbox=this.convert(bbox,"WGS84"));var ll=[bbox[0],bbox[1]],ur=[bbox[2],bbox[3]],px_ll=this.px(ll,zoom),px_ur=this.px(ur,zoom),x=[Math.floor(px_ll[0]/this.size),Math.floor((px_ur[0]-1)/this.size)],y=[Math.floor(px_ur[1]/this.size),Math.floor((px_ll[1]-1)/this.size)],bounds={minX:Math.min.apply(Math,x)<0?0:Math.min.apply(Math,x),minY:Math.min.apply(Math,y)<0?0:Math.min.apply(Math,y),maxX:Math.max.apply(Math,x),maxY:Math.max.apply(Math,y)};if(tms_style){var tms={minY:Math.pow(2,zoom)-1-bounds.maxY,maxY:Math.pow(2,zoom)-1-bounds.minY};bounds.minY=tms.minY,bounds.maxY=tms.maxY}return bounds},SphericalMercator.prototype.convert=function(bbox,to){return"900913"===to?this.forward(bbox.slice(0,2)).concat(this.forward(bbox.slice(2,4))):this.inverse(bbox.slice(0,2)).concat(this.inverse(bbox.slice(2,4)))},SphericalMercator.prototype.forward=function(ll){var xy=[A*ll[0]*D2R,A*Math.log(Math.tan(.25*Math.PI+.5*ll[1]*D2R))];return xy[0]>MAXEXTENT&&(xy[0]=MAXEXTENT),xy[0]<-MAXEXTENT&&(xy[0]=-MAXEXTENT),xy[1]>MAXEXTENT&&(xy[1]=MAXEXTENT),xy[1]<-MAXEXTENT&&(xy[1]=-MAXEXTENT),xy},SphericalMercator.prototype.inverse=function(xy){return[xy[0]*R2D/A,(.5*Math.PI-2*Math.atan(Math.exp(-xy[1]/A)))*R2D]},SphericalMercator}();void 0!==module&&void 0!==exports&&(module.exports=exports=SphericalMercator)},{}]},{},[1])(1)});
(function () {
    angular.module('inspinia', [
        'ngRoute',
        'ui.router',
        'ui.bootstrap',
        // 'oc.lazyLoad',
        'localytics.directives',
        'pascalprecht.translate',
        'ngIdle',
        'ngSanitize',
        'restangular',
        'angular-flash.service',
        'angular-flash.flash-alert-directive',
        'ngSanitize',
        'angularPayments',
        'ngCookies',
        'ngCountTo',
        'timer',
        'ui.select',
        'ngPageTitle',
        'ngDraggable',
        'toggle-switch',
        'ngLocalize',
        'ngLocalize.InstalledLanguages',
        'ui.event',
        'ui.map',
        'ui.sortable',
        'colorpicker.module',
        'satellizer',
        'angular-toArrayFilter',
        'angular-clipboard',
        'daterangepicker',
        'angAccordion',
        'mwl.calendar',
        'ui.calendar',
        'ngPDFViewer',
        'ngOnload',
        '19degrees.ngSweetAlert2',
        'ngLocalize',
        'ngLocalize.Events',
        'ngLocalize.InstalledLanguages',
        'ngFileSaver',
        'toastr',
        'xeditable',
        'ui.calendar',
        'pusher-angular',
        'angular-stripe',
        'mapboxgl-directive'

    ]);
})();

/**
 */

var dbSever = window.location.origin + "/api/v1/";
var dbServe = window.location.origin + "/";



function config($stateProvider, $urlRouterProvider, USER_ROLES)
{

    $urlRouterProvider.otherwise("/login");


    $stateProvider
        .state('login', {
            url: "/login",
            name: 'login',
            templateUrl: "views/login.html",
            controller: LoginController,
            data: {
                pageTitle: 'Log in',
                specialClass: 'gray-bg',
                authorizedRoles: [USER_ROLES.anonymusUser]
            }
        })
        .state('forgotPassword', {
            url: "/forgotPassword/:code",
            templateUrl: "views/forgotPassword.html",
            controller: ForgetPasswordController,
            data: {
                pageTitle: 'Forgotten password',
                specialClass: 'gray-bg',
                authorizedRoles: [USER_ROLES.anonymusUser]
            }
        })
        .state('registerConfirmation', {
            url: "/registerConfirmation/:code",
            templateUrl: "views/registerConfirmation.html",
            controller: RegisterConfirmationController,
            data: {
                pageTitle: 'Confirmation of registration',
                specialClass: 'gray-bg',
                authorizedRoles: [USER_ROLES.anonymusUser]
            }
        })
        .state('register', {
            url: "/register",
            templateUrl: "views/register.html",
            controller: RegisterController,
            data: {
                pageTitle: 'Registration',
                specialClass: 'gray-bg',
                authorizedRoles: [USER_ROLES.anonymusUser]
            }
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "views/profile.html",
            controller: ProfileController,
            data: {
                pageTitle: 'Profile',
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.generalAdmin, USER_ROLES.consumer, USER_ROLES.trainer]
            }
        })
        .state('chat', {
            url: "/chat",
            templateUrl: "views/user/chat.html",
            controller: ChatController,
            data: {
                pageTitle: 'Chat',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('routeManagement', {
            url: "/routeManagement",
            name: 'routeManagement',
            templateUrl: "views/routeManagement.html",
            controller: RouteManagementController,
            data: {
                pageTitle: 'Route Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('menuManagement', {
            url: "/menuManagement",
            name: 'menuManagement',
            templateUrl: "views/menuManagement.html",
            controller: MenuManagementController,
            data: {
                pageTitle: 'Menu Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('menus', {
            url: "/menus",
            name: 'Menus',
            templateUrl: "views/menus.html",
            controller: MenusController,
            data: {
                pageTitle: 'Menus',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
//         .state('RoleUser', {
//             url: "/admin/user/management/role/user",
//             name: 'RoleUser',
//             templateUrl: "views/admin/user/roleUser.html",
//             controller: RoleUserController,
//             data: {
//                 pageTitle: 'Role Management',
//                 authorizedRoles: [USER_ROLES.admin,USER_ROLES.generalAdmin]
//             }
//         })
        .state('paymentsManagement', {
            url: "/admin/user/management/payments",
            name: 'Payments Management',
            templateUrl: "views/admin/user/paymentsManagement.html",
            controller: PaymentsManagementController,
            data: {
                pageTitle: 'Payments Management',
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.generalAdmin, USER_ROLES.consumer, USER_ROLES.trainer]
            }
        })
        .state('userManagementFilter', {
            url: "/admin/user/management/:email",
            name: 'User Management',
            templateUrl: "views/admin/user/userManagement.html",
            controller: UserManagementController,
            data: {
                pageTitle: 'User Management',
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.generalAdmin]
            }
        })
        .state('userManagement', {
            url: "/admin/user/management",
            name: 'User Management',
            templateUrl: "views/admin/user/userManagement.html",
            controller: UserManagementController,
            data: {
                pageTitle: 'User Management',
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.generalAdmin]
            }
        })
        .state('userCreate', {
            url: "/admin/management/create",
            templateUrl: "views/admin/user/create.html",
            controller: UserCreateController,
            data: {
                pageTitle: 'Create an account',
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.generalAdmin]
            }
        })
        .state('userEdit', {
            url: "/admin/management/edit/:entityID",
            templateUrl: "views/admin/user/edit.html",
            controller: UserEditController,
            data: {
                pageTitle: 'Edit user',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('fileUpload', {
            url: "/user/fileUpload",
            templateUrl: "views/user/fileModal.html",
            controller: FileModalController,
            data: {
                pageTitle: 'Upload File',
                authorizedRoles: [USER_ROLES.generalAdmin]
            }
        })
        .state('userGroups', {
            url: "/admin/user/groups",
            templateUrl: "views/admin/user/group.html",
            controller: UserGroupController,
            data: {
                pageTitle: 'Group Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('photos', {
            url: "/admin/user/photos",
            templateUrl: "views/admin/user/photos.html",
            controller: PhotosController,
            data: {
                pageTitle: 'Photos Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('photosEdit', {
            url: "/admin/photos/edit/:entityID",
            templateUrl: "views/admin/user/photosEdit.html",
            controller: PhotosEditController,
            data: {
                pageTitle: 'Photos Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('photosCreate', {
            url: "/admin/photos/create",
            templateUrl: "views/admin/user/photosCreate.html",
            controller: PhotosCreateController,
            data: {
                pageTitle: 'Photos Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('places', {
            url: "/admin/user/places",
            templateUrl: "views/admin/user/places.html",
            controller: PlacesController,
            data: {
                pageTitle: 'Places Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('placesEdit', {
            url: "/admin/places/edit/:entityID",
            templateUrl: "views/admin/user/placesEdit.html",
            controller: PlacesEditController,
            data: {
                pageTitle: 'Places Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('bills', {
            url: "/user/bills",
            templateUrl: "views/user/bills.html",
            controller: BillingInfoController,
            data: {
                pageTitle: 'BillingInfoController',
                authorizedRoles: [USER_ROLES.consumer, USER_ROLES.trainer]
            }
        });
}


smartApp = angular
    .module('inspinia');

smartApp.run(function (editableOptions) {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGlhbWF0aWMiLCJhIjoiY2pqZjh2a2huMng0cDNrcGxtaTRwa2NhZiJ9.7RJBlZw7LBi7FuiIFVXRWA';
    L.mapbox.accessToken = 'pk.eyJ1IjoiZGlhbWF0aWMiLCJhIjoiY2pqZjh2a2huMng0cDNrcGxtaTRwa2NhZiJ9.7RJBlZw7LBi7FuiIFVXRWA';

    editableOptions.theme = 'bs3';
})
    .config(function (stripeProvider) {
        stripeProvider.setPublishableKey('pk_test_N6sQsWgn5hHL1ESpJkTXoZoM');
    });

smartApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];
        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

smartApp.factory('debounce', function ($timeout) {
    return function (callback, interval) {
        var timeout = null;
        return function () {
            $timeout.cancel(timeout);
            var args = arguments;
            timeout = $timeout(function () {
                callback.apply(this, args);
            }, interval);
        };
    };
});


smartApp
    .config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-bottom-right',
            preventOpenDuplicates: true

        });
        //payment key configuration goes here
    })
    .run(function (locale, localeEvents, $rootScope, localeChanged, uibPaginationConfig) {

        $rootScope.languages = [
            {code: "en-US", pre: 'en', label: "English", icon: 'flag-icon-gb'},
        ];

        $rootScope.availableLanguages = [
            {code: "en-US", pre: 'en', label: "English", icon: 'flag-icon-gb'},
        ];


        $rootScope.lang = $rootScope.languages[0];

        locale.ready(['common', 'dashboard', 'case']).then(function (res) {
        });

        $rootScope.$on(localeEvents.localeChanges, function (event, data) {
            locale.ready(['common', 'dashboard', 'case']).then(function (res) {
            });
        });


        $rootScope.getLan = function (value) {
            for (var i = 0; i < $rootScope.languages.length; i++) {
                if ($rootScope.languages[i].pre === value) {
                    return $rootScope.languages[i].label;
                }
            }
        };

        $rootScope.getLanguage = function (value) {
            for (var i = 0; i < $rootScope.languages.length; i++) {
                if ($rootScope.languages[i].pre === value) {
                    return $rootScope.languages[i];
                }
            }
        };


        $rootScope.setCurrentLanguage = function (value) {
            for (var i = 0; i < $rootScope.languages.length; i++) {
                if ($rootScope.languages[i].pre == value) {
                    $rootScope.lang = $rootScope.languages[i];
                }
            }
        };

        $rootScope.setCurrentUserLanguages = function (langArray) {
            $rootScope.languages = [];
            for (var i = 0; i < langArray.length; i++) {
                for (var j = 0; j < $rootScope.availableLanguages.length; j++) {
                    if (langArray[i].language == $rootScope.availableLanguages[j].pre) {
                        $rootScope.languages.push($rootScope.availableLanguages[j]);
                        break;
                    }
                }
            }

            if (langArray.length === 0) {
                var dLan = [{"language": "en"}];
                $rootScope.setCurrentUserLanguages(dLan);
            }

        };

        $rootScope.setCurrentLanguageByCode = function (value) {
            for (var i = 0; i < $rootScope.languages.length; i++) {
                if ($rootScope.languages[i].code == value) {
                    $rootScope.lang = $rootScope.languages[i];
                }
            }
        };

        var defaultLan = [{"language": "en"}];

        $rootScope.setCurrentUserLanguages(defaultLan);


        $rootScope.setCurrentUserLanguages = function (langArray) {
            $rootScope.languages = [];
            for (var i = 0; i < langArray.length; i++) {
                for (var j = 0; j < $rootScope.availableLanguages.length; j++) {
                    if (langArray[i].language == $rootScope.availableLanguages[j].pre) {
                        $rootScope.languages.push($rootScope.availableLanguages[j]);
                        break;
                    }
                }
            }

            if (langArray.length === 0) {
                var dLan = [{"language": "en"}];
                $rootScope.setCurrentUserLanguages(dLan);
            }

        };


        $rootScope.changeLag = function (loc) {
            $rootScope.lang = loc;
            locale.setLocale(loc.code);
            $rootScope.$broadcast(localeChanged.changed);
        };
    })


    .config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self'
            // Allow loading from our assets domain.  Notice the difference between * and **.
            //'http://google.com'
        ]);

        // The blacklist overrides the whitelist so the open redirect here is blocked.
        $sceDelegateProvider.resourceUrlBlacklist([
            'http://myapp.example.com/clickThru**'
        ]);
    })

    .config(function ($authProvider) {
        /*$authProvider.facebook({
         url: dbSever + 'facebookReservation',
         clientId: '893118840793702',
         scope: ['user_birthday,email']
         });*/
    })
    .filter('trustUrl', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    })
    .config(config)
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    })

    .config(function (flashProvider) {
        // Support bootstrap 3.0 "alert-danger" class with error flash types
        flashProvider.errorClassnames.push('alert-danger');
        flashProvider.warnClassnames.push('alert-warning');
        flashProvider.infoClassnames.push('alert-info');
        flashProvider.successClassnames.push('alert-success');
    })

    .run(function ($rootScope, $location, flash, $modal, limitToFilter) {

        $rootScope.go = function (path) {
            $location.path(path);
        };


        $rootScope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        $rootScope.isSideBar = false;
        $rootScope.isFooter = true;
        $rootScope.isBackgroundLight = false;
        $rootScope.isLoading = false;
        $rootScope.firstLogin = false;


        $rootScope.getTimeStamp = function (string) {
            return new Date(string);
        };

        $rootScope.goToNextTab = function (path) {
            window.open(path, '_blank');
        };

        $rootScope.days = [
            {id: 1, name: 'Mandag'},
            {id: 2, name: 'Tirsdag'},
            {id: 3, name: 'Onsdag'},
            {id: 4, name: 'Torsdag'},
            {id: 5, name: 'Fredag'},
            {id: 6, name: 'Lørdag'},
            {id: 7, name: 'Søndag'}];

        $rootScope.setDefaultDays = function () {
            angular.forEach($rootScope.days, function (day) {
                if (!!day.selected) day.selected = false;
            });
        };

        $rootScope.customeMessage = function (response, action) {
            flash.error = response;
        };

        $rootScope.successMessage = function (response, action) {
            flash.success = action;
        };

        $rootScope.errorMessage = function (response, action) {
            var errorMsg = "";
            for (var k in response.data) {

                if (response.data.hasOwnProperty(k)) {
                    // errorMsg = errorMsg + "<br>" + "Error with  " + k + ":" + response.data[k];
                    errorMsg = errorMsg + " " + response.data[k] + "<br>";
                }
            }
            flash.error = errorMsg;
        };


        $rootScope.removeEmptyVariables = function (currentEntity) {
            for (var k in currentEntity) {
                if (currentEntity.hasOwnProperty(k)) {

                    if (currentEntity[k] && typeof currentEntity[k] != 'function') {
                        if (currentEntity[k].length === 0) {
                            delete currentEntity[k];
                        }
                    }
                }
            }
            return currentEntity;

        };

        $rootScope.timeAgo = function (date, granularity) {

            date = (new Date().getTime() / 1000) - (new Date(date).getTime() / 1000);
            var retval = "";

            var difference = date;
            var periods = {
                "decade": 315360000,
                "year": 31536000,
                "month": 2628000,
                "week": 604800,
                "day": 86400,
                "hour": 3600,
                "minute": 60,
                "second": 1
            };
            if (difference < 5) { // less than 5 seconds ago, let's say "just now"
                retval = "just now";
                return retval;
            } else
                if (difference > 86400) {
                    return new Date();
                } else {
                    for (var key in periods) {
                        if (difference >= periods[key]) {
                            var time = Math.floor(difference / periods[key]);
                            difference %= periods[key];
                            retval += (retval ? ' ' : '') + time + ' ';
                            retval += ((time > 1) ? key + 's' : key);
                            granularity--;
                        }
                        if (granularity === '0') {
                            break;
                        }
                    }
                    return retval + '';
                }
        };

        $rootScope.getDeleteConfirmationModel = function (entityName) {
            return $modal.open({
                templateUrl: 'views/deleteConfirmation.html',
                controller: 'DeleteConfirmModalInstanceController',
                resolve: {
                    entityName: function () {
                        return entityName;
                    }
                }
            });
        };

        $rootScope.formattedGrapData = function (data, position) {
            var _array = [];
            for (var i in data) {
                var temp_array = [];
                if (data.hasOwnProperty(i) && !isNaN(+i)) {
                    temp_array.push(parseFloat(data[i][0]) * 1000, parseFloat(data[i][position]));
                    _array.push(temp_array);
                }
            }
            return _array;
        };


        $rootScope.getDeleteConfirmationModel = function (entityName) {
            var modalInstance = $modal.open({
                templateUrl: 'views/deleteConfirmation.html',
                controller: 'DeleteConfirmModalInstanceController',
                resolve: {
                    entityName: function () {
                        return entityName;
                    }
                }
            });
            return modalInstance;
        };


        $rootScope.modelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };


        $rootScope.removeExistingEntities = function (entities, temp_Entities) {
            var ExistingEntities = [];
            for (var i = 0, xlen = entities.length; i < xlen; i++) {
                for (var x = 0, len = temp_Entities.length; x < len; x++) {
                    if (temp_Entities[x].id === entities[i].id) {
                        ExistingEntities.push(entities[i]);
                    }
                }
            }
            return ExistingEntities;
        };


        $rootScope.makeId = function (length) {
            if (!length)
                length = 9;

            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        };


    })
    .factory('errorInterceptor',
        function ($q, $rootScope, $location, $window, $cookieStore, $injector, $store) {

            return {

                responseError: function (response) {

                    if (response && response.status === 401 && response.data.code === 500) {
                        var access_token = $store.get('access_token');

                        if (!access_token) {

                        }
                        if (!$window.sessionStorage["access_token"]) {

                        }

                    }
                    if (response && response.status === 401 && response.data.error === "invalid_token") {


                        var access_token = $cookieStore.get('access_token');
                        var refresh_token = $cookieStore.get('refresh_token');

                        if (!$window.sessionStorage["access_token"]) {

                            if (refresh_token) {

                                var data = "b=1&refresh_token=" + refresh_token +
                                    "&client_id=2" +
                                    "&client_secret=RX586LXPT8nFzNEQcwXYIvn7bzA9NLoYOKGiaikd&grant_type=refresh_token&a=1";

                                $http = $injector.get('$http');
                                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

                                $http.post(dbSever + 'api/v1/login', data)
                                    .success(function (resp) {

                                        $window.sessionStorage["access_token"] = resp.access_token;
                                        $window.sessionStorage['refresh_token'] = resp.refresh_token;

                                        $injector.get("$http")(resp.config).then(function (response) {
                                                deferred.resolve(response);
                                            },
                                            function (response) {
                                                deferred.reject();
                                            });
                                    }).error(function (error) {
                                    // $location.path('/login.html');
                                    window.location = "#/login";
                                    return;

                                });
                            }
                        }
                        var deferred = $q.defer();

                    }
                    if (response && response.status === 400) {
                    }
                    if (response && response.status === 404) {
                    }
                    if (response && response.status >= 500) {
                    }
                    return $q.reject(response);
                }
            };
        })

    .run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {

        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };
    }])


    .run(['$rootScope', '$window', function ($rootScope, $window) {
        $rootScope.getGlobals = function (variableName) {
            return $window[variableName];
        };


        $rootScope.isImage = function (ext) {
            if (ext) {
                return ext === "jpg" || ext === "jpeg" || ext === "gif" || ext === "png";
            }
        };
    }])


    .value('localeConf', {
        basePath: 'languages',
        defaultLocale: 'en-US',
        sharedDictionary: 'common',
        fileExtension: '.lang.json',
        persistSelection: true,
        cookieName: 'COOKIE_LOCALE_LANG',
        observableAttrs: new RegExp('^data-(?!ng-|i18n)'),
        delimiter: '::',
        validTokens: new RegExp('^[\\w\\.-]+\\.[\\w\\s\\.-]+\\w(:.*)?$')
    })
    .value('localeSupported', [
        'en-US'
    ])
    .value('localeFallbacks', {
        'en': 'en-US'
    })

    .value('localeChanged', {
        changed: 'locale-changed'
    })


    .factory('BearerAuthInterceptor', function ($window, $q, $store) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($store.get('access_token') && !config.noAuth) {
                    // may also use sessionStorage
                    config.headers.Authorization = 'Bearer ' + $store.get('access_token');
                    config.headers.XDEBUG_SESSION = 'PHPSTORM';
                }
                return config || $q.when(config);
            },
            response: function (response) {
                if (response.status === 401) {
                    //  Redirect user to login page / signup Page.
                }
                return response || $q.when(response);
            }
        };
    })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('BearerAuthInterceptor');
    })

    .config(function (RestangularProvider) {
        RestangularProvider.setResponseExtractor(function (response, operation) {
            if (operation === 'getList') {
                var newResponse = [];
                newResponse.data = response.data;
                if (response.page) {
                    newResponse.page = response.page;
                }
                return newResponse;

            }
            return response;
        });

    })


    .config(function (RestangularProvider) {
        var newBaseUrl = dbSever;
        RestangularProvider.setBaseUrl(newBaseUrl);
    })
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })

    .constant('USER_ROLES', {
        all: '*',
        admin: 'GlobalAdmin',
        staff: 'Staff',
        consumer: 'Consumer',
        buyer: 'Buyer',
        generalAdmin: 'GeneralAdmin',
        trainer: 'Trainer',
        anonymusUser: 'au'
    })
    .run(function ($rootScope, $timeout, AUTH_EVENTS, AuthService) {


        $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
            var notSideBar = ['login', 'register.entitytId'];
            var darkBackground = ['uploaded'];


            if (notSideBar.indexOf(toState.name) !== -1) {
                $rootScope.isSideBar = false;
            } else {
                $rootScope.isSideBar = true;
            }


            if (darkBackground.indexOf(toState.name) !== -1) {
                $rootScope.isBackgroundLight = false;
            } else {
                $rootScope.isBackgroundLight = true;
            }

            $timeout.cancel($rootScope.refreshSearch);
            $timeout.cancel($rootScope.refreshDoc);

        });


        $rootScope.$on('$stateChangeStart', function (event, next) {

        });

    })
    .config(function ($authProvider) {
        $authProvider.httpInterceptor = function () {
            return true;
        },
            $authProvider.withCredentials = false;
        $authProvider.tokenRoot = null;
        $authProvider.baseUrl = '/';
        $authProvider.loginUrl = '/auth/login';
        $authProvider.signupUrl = '/auth/signup';
        $authProvider.unlinkUrl = '/auth/unlink/';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'satellizer';
        $authProvider.tokenHeader = 'Authorization';
        $authProvider.tokenType = 'Bearer';
        $authProvider.storageType = 'localStorage';

        $authProvider.facebook({
            clientId: '1791750004248447'
        });

        $authProvider.facebook({
            name: 'facebook',
            url: dbServe + 'api/v1/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: dbServe,
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            type: '2.0',
            SOCIAL_AUTH_REDIRECT_IS_HTTPS: true,
            popupOptions: {width: 580, height: 400}
        });


    })
    .factory('AuthResolver', function ($q, $rootScope, $state) {
        return {
            resolve: function () {
                var deferred = $q.defer();
                var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
                    if (angular.isDefined(currentUser)) {
                        if (currentUser) {
                            deferred.resolve(currentUser);
                        } else {
                            deferred.reject();
                            // $state.go('index');
                        }
                        unwatch();
                    }
                });
                return deferred.promise;
            }
        };
    });

function programmeTable()
{
    'use strict'
    var uniqueId = 1;
    return {
        replace: false,
        restrict: 'E',
        scope: {
            'myAttr': '=',
        },
        templateUrl: 'views/directives/programmeTable.html',
        link: function (scope, element, attrs) {


            scope.uniqueMTableId = 'mtable' + uniqueId++;

            function keyAction()
            {

                $('td').blur(function () {
                    scope.myAttr = $(element).children('table').tableToJSON();
                    console.log(scope.myAttr);
                });


            };

            $.fn.tableToJSON = function (opts) {

                // Set options
                var defaults = {
                    ignoreColumns: [],
                    onlyColumns: null,
                    ignoreHiddenRows: true,
                    headings: null,
                    allowHTML: false
                };
                opts = $.extend(defaults, opts);

                var notNull = function (value) {
                    return value !== undefined && value !== null;
                };

                var ignoredColumn = function (index) {
                    if (notNull(opts.onlyColumns)) {
                        return $.inArray(index, opts.onlyColumns) === -1;
                    }
                    return $.inArray(index, opts.ignoreColumns) !== -1;
                };

                var arraysToHash = function (keys, values) {
                    var result = {}, index = 0;
                    $.each(values, function (i, value) {
                        // when ignoring columns, the header option still starts
                        // with the first defined column
                        if (index < keys.length && notNull(value)) {
                            result[keys[index]] = value;
                            index++;
                        }
                    });
                    return result;
                };

                var cellValues = function (cellIndex, cell) {
                    var value, result;
                    if (!ignoredColumn(cellIndex)) {
                        var override = $(cell).data('override');
                        if (opts.allowHTML) {
                            value = $.trim($(cell).html());
                        } else {
                            value = $.trim($(cell).text());
                        }
                        result = notNull(override) ? override : value;
                    }
                    return result;
                };

                var rowValues = function (row) {
                    var result = [];
                    $(row).children('td,th').each(function (cellIndex, cell) {
                        if (!ignoredColumn(cellIndex)) {
                            result.push(cellValues(cellIndex, cell));
                        }
                    });
                    return result;
                };

                var getHeadings = function (table) {
                    var firstRow = table.find('tr:first').first();
                    return notNull(opts.headings) ? opts.headings : rowValues(firstRow);
                };

                var construct = function (table, headings) {
                    var i, j, len, len2, txt, $row, $cell,
                        tmpArray = [],
                        cellIndex = 0,
                        result = [];
                    table.children('tbody,*').children('tr').each(function (rowIndex, row) {
                        if (rowIndex > 0 || notNull(opts.headings)) {
                            $row = $(row);
                            if ($row.is(':visible') || !opts.ignoreHiddenRows) {
                                if (!tmpArray[rowIndex]) {
                                    tmpArray[rowIndex] = [];
                                }
                                cellIndex = 0;
                                $row.children().each(function () {
                                    if (!ignoredColumn(cellIndex)) {
                                        $cell = $(this);

                                        // process rowspans
                                        if ($cell.filter('[rowspan]').length) {
                                            len = parseInt($cell.attr('rowspan'), 10) - 1;
                                            txt = cellValues(cellIndex, $cell, []);
                                            for (i = 1; i <= len; i++) {
                                                if (!tmpArray[rowIndex + i]) {
                                                    tmpArray[rowIndex + i] = [];
                                                }
                                                tmpArray[rowIndex + i][cellIndex] = txt;
                                            }
                                        }
                                        // process colspans
                                        if ($cell.filter('[colspan]').length) {
                                            len = parseInt($cell.attr('colspan'), 10) - 1;
                                            txt = cellValues(cellIndex, $cell, []);
                                            for (i = 1; i <= len; i++) {
                                                // cell has both col and row spans
                                                if ($cell.filter('[rowspan]').length) {
                                                    len2 = parseInt($cell.attr('rowspan'), 10);
                                                    for (j = 0; j < len2; j++) {
                                                        tmpArray[rowIndex + j][cellIndex + i] = txt;
                                                    }
                                                } else {
                                                    tmpArray[rowIndex][cellIndex + i] = txt;
                                                }
                                            }
                                        }
                                        // skip column if already defined
                                        while (tmpArray[rowIndex][cellIndex]) {
                                            cellIndex++;
                                        }
                                        if (!ignoredColumn(cellIndex)) {
                                            txt = tmpArray[rowIndex][cellIndex] || cellValues(cellIndex, $cell, []);
                                            if (notNull(txt)) {
                                                tmpArray[rowIndex][cellIndex] = txt;
                                            }
                                        }
                                    }
                                    cellIndex++;
                                });
                            }
                        }
                    });
                    $.each(tmpArray, function (i, row) {
                        if (notNull(row)) {
                            txt = arraysToHash(headings, row);
                            result[result.length] = txt;
                        }
                    });
                    return result;
                };

                // Run
                var headings = getHeadings(this);
                return construct(this, headings);
            };
            var rowIncrement = 1;
            var columnIncrement = 1;

            function rowClick()
            {
                $(element).children('table').find('tbody').append($(element).children('table').find("tbody tr:last").clone());
                $(element).children('table').find("tbody tr:last>td:not(:first-child)").html(' ');
                $(element).children('table').find('tbody tr>td:nth-child(1)').eq(-2).html("W" + rowIncrement).addClass('program-table-color');
                $(element).children('table').find('#irow').unbind('click');
                $(element).children('table').find('#irow').bind('click', rowClick);
                rowIncrement = rowIncrement + 1;
                $('td').unbind('blur');
                keyAction();


            }

            function columnClick()
            {

                $(element).children('table').find('thead>tr').append($(element).children('table').find('thead tr>td:last').clone());
                //$('#mtable thead tr>td')
                $(element).children('table').find('thead tr>td').eq(-2).html("SET " + columnIncrement).addClass('program-table-color').css({width: '5%'});
                $(element).children('table').find('#icol').unbind('click');
                $(element).children('table').find('#icol').bind('click', columnClick);
                columnIncrement = columnIncrement + 1;
                $(element).children('table').find('tbody tr').append('<td>').addClass('table-set-class');

                $('td').unbind('blur');
                keyAction();


            }

            function bindClickEvents()
            {


                $(element).children('table').find('tbody>tr>td:not(:first-child)').unbind('click');

                $('td').unbind('blur');
                keyAction();

            }


            //debugger;

            $(element).children('table').find('#irow').click(rowClick);
            $(element).children('table').find('#icol').click(columnClick);
            //$('#convert').click(convertClick);

            ///$(element).children('table').find('thead tr>td:last-child button').click(rowClick)
            keyAction();
            bindClickEvents();
            $(element).children('table').find('tr:not(:first-child)').map(function () {


                return $(element).find('td:first-child').map(function () {
                    return $(element).html();
                }).get();
            }).get
            ();


        }
    }


}
function clockPicker()
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.clockpicker({
                beforeDone: function () {
                    console.log("before done");
                }
            });
        }
    };
}
function DynamicRect(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
/**
 * Created by anthonylucas on 21/11/2017.
 */

var canvasEditor = function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var isDrawingMode = false;
            var timer = 0;
            var type = 1;
            var container = $("#container");
            var firstTime = true;

            var colors = [];
            colors[1] = 'rgba(236,71,88,0.2)';
            colors[2] = 'rgba(248,172,89,0.2)';
            colors[3] = 'rgba(26,179,148,0.2)';
            colors[4] = 'rgba(26,123,185,0.2)';


            var color = colors[1];

            var last_position = {};
            var scrollDown = function (o) {

                var event = o.e;
                var pointer = canvas.getPointer(o.e);

                if (event.movementY === -1) {
                    //up
                    //container[0].scrollTop -= 5;
                }
                if (event.movementY === 1) {
                    //down
                    if ((Math.abs(canvas._offset.top) + pointer.y) > (container[0].scrollTop - container.height()) && container.height() < Math.abs(canvas._offset.top) + pointer.y) {
                        // container[0].scrollTop += 10;
                    }
                }

            };

            var Rectangle = (function () {
                function Rectangle(canvas)
                {
                    var inst = this;
                    this.canvas = canvas;
                    this.className = 'Rectangle';
                    this.isDrawing = false;
                    this.bindEvents();
                    this.objectSelected = false;
                    this.objectScaling = false;
                }

                Rectangle.prototype.bindEvents = function () {
                    var inst = this;
                    inst.canvas.on('mouse:down', function (o) {

                        var d = new Date();
                        if ((d.getTime() - timer) < 300) {
                            scope.$apply(function () {
                                scope.changeConfiguration(o.target);
                            });
                        }

                        if (!isDrawingMode) {
                            return;
                        }

                        if (!inst.objectSelected && !inst.objectScaling)
                            inst.onMouseDown(o);

                        scope.$apply(function () {
                            scope.emptyType();
                        });
                        isDrawingMode = false;
                    });
                    inst.canvas.on('mouse:move', function (o) {
                        inst.onMouseMove(o);
                    });


                    inst.canvas.on("object:selected", function (options) {
                        options.target.bringToFront();
                    });


                    inst.canvas.on('mouse:up', function (o) {
                        var d = new Date();
                        timer = d.getTime();

                        if (!inst.objectScaling)
                            inst.onMouseUp(o);
                    });
                    inst.canvas.on('object:moving', function (o) {
                        inst.disable();
                        scrollDown(o);
                    });


                    inst.canvas.on("object:selected", function (options) {
                        options.target.bringToFront();
                        inst.objectSelected = true;
                    });

                    inst.canvas.on("selection:cleared", function (options) {
                        inst.objectSelected = false;
                    });

                    inst.canvas.on("object:scaling", function (o) {
                        inst.objectScaling = true;
                        scrollDown(o);
                    });

                    inst.canvas.on("object:modified", function (o) {

                        inst.objectScaling = false;

                        var target = o.target;
                        /*if (!target || target.type !== 'rect') {
                         return;
                         }*/
                        var sX = target.scaleX;
                        var sY = target.scaleY;
                        target.width = Math.abs(Math.ceil(target.width * sX));
                        target.height = Math.abs(Math.ceil(target.height * sY));

                        target.top = Math.abs(Math.floor(target.top));
                        target.left = Math.abs(Math.floor(target.left));

                        target.scaleX = 1;
                        target.scaleY = 1;
                        target.setCoords();
                        inst.canvas.renderAll();
                        //inst.canvas.calcOffset();
                        scope.updateOneObject(target, 0);
                    });
                };
                Rectangle.prototype.onMouseUp = function (o) {
                    var inst = this;
                    inst.disable();
                    scope.$apply(function () {
                        scope.changeConfiguration(o.target);

                        if (o.target.id === "")
                            scope.updateOneObject(o.target, 0);
                    });
                };


                Rectangle.prototype.onMouseMove = function (o) {
                    var inst = this;

                    if (!inst.isEnable()) {
                        return;
                    }
                    var pointer = inst.canvas.getPointer(o.e);
                    var activeObj = inst.canvas.getActiveObject();


                    activeObj.fill = color;
                    activeObj.typeId = type;

                    if (origX > pointer.x) {
                        activeObj.set({left: Math.abs(Math.floor(pointer.x))});
                    }
                    if (origY > pointer.y) {
                        activeObj.set({top: Math.abs(Math.floor(pointer.y))});
                    }

                    activeObj.set({width: Math.abs(Math.ceil(origX - pointer.x))});
                    activeObj.set({height: Math.abs(Math.ceil(origY - pointer.y))});

                    activeObj.setCoords();
                    inst.canvas.renderAll();
                    scrollDown(o);
                    //inst.canvas.calcOffset();

                };

                Rectangle.prototype.onMouseDown = function (o) {
                    var inst = this;
                    inst.enable();

                    var pointer = inst.canvas.getPointer(o.e);
                    origX = pointer.x;
                    origY = pointer.y;
                    color = colors[type];
                    var pageId = attrs.pageId;
                    var rect = new fabric.Rect({
                        left: Math.abs(Math.floor(origX)),
                        top: Math.abs(Math.floor(origY)),
                        originX: 'left',
                        originY: 'top',
                        width: Math.abs(Math.ceil(pointer.x - origX)),
                        height: Math.abs(Math.ceil(pointer.y - origY)),
                        angle: 0,
                        transparentCorners: true,
                        hasBorders: false,
                        hasControls: true,
                        minScaleLimit: 1,
                        perPixelTargetFind: true,
                        id: "",
                        name: "",
                        typeId: type,
                        groupID: '',
                        // fill: color,
                        page_id: pageId //scope.activePage
                    });

                    rect.setControlsVisibility({mtr: false});
                    inst.canvas.add(rect).setActiveObject(rect);
                    inst.canvas.renderAll();
                    //inst.canvas.calcOffset();
                    canvas.isDrawingMode = false;

                };

                Rectangle.prototype.isEnable = function () {
                    return this.isDrawing;
                };

                Rectangle.prototype.enable = function () {
                    this.isDrawing = true;
                };

                Rectangle.prototype.disable = function () {
                    this.isDrawing = false;
                };

                return Rectangle;
            }());

            fabric.Object.prototype.toObject = (function (toObject) {
                return function () {
                    return fabric.util.object.extend(toObject.call(this), {
                        typeId: this.typeId,
                        id: this.id,
                        meta_name: this.meta_name,
                        groupID: this.groupID,
                        page_id: this.page_id
                    });
                };
            })(fabric.Object.prototype.toObject);


            var canvasId = attrs.id;
            var width = 800;
            var height = 800;

            var canDraw = true;
            if (attrs.width)
                width = parseInt(attrs.width);

            if (attrs.height)
                height = parseInt(attrs.height);


            if (attrs.page) {
                var page = JSON.parse(attrs.page);
            }

            var resizeId = "";

            function getOptimalCanvasDimensions()
            {
                var availableWidth = container.outerWidth();
                var canvasW = 0;
                var canvasH = 0;
                if (imageW > availableWidth) {
                    canvasW = availableWidth;
                    canvasH = (canvasW * imageH) / imageW;
                } else {
                    canvasW = imageW;
                    canvasH = imageH;
                }
                return [canvasW, canvasH];
            }

            function rescaleCanvasIfNeeded()
            {
                var optimalDimensions = getOptimalCanvasDimensions();
                var offset;

                if (window.innerWidth >= 1280) {
                    offset = optimalDimensions[0] * 0.03;
                } else
                    if (window.innerWidth > 922) {
                        offset = optimalDimensions[0] * 0.05;
                    } else
                        if (window.innerWidth > 768) {
                            offset = optimalDimensions[0] * 0.15;
                        } else {
                            offset = optimalDimensions[0] * 0.15;
                        }

                var newWidth = (optimalDimensions[0] - offset);
                var newHeight = (newWidth * imageH) / imageW;

                var scaleFactor = newWidth / imageW;
                if (scaleFactor !== 1) {
                    canvas.setWidth(newWidth);
                    canvas.setHeight(newHeight);
                    canvas.setZoom(scaleFactor);
                    //canvas.calcOffset();
                    canvas.renderAll();
                }
            }

            $(window).resize(function () {
                clearTimeout(resizeId);
                resizeId = setTimeout(handleResize, 500);
            });

            function handleResize()
            {
                container.hide();
                rescaleCanvasIfNeeded();
                container.show();
            }

            var canvas = new fabric.Canvas($(element)[0], {
                allowTouchScrolling: true,
                width: width,
                height: height,
                selection: true,
                isDrawingMode: false
            });

            var pleaseWaitImg = new Image();
            var imgOnLoad = function () {
                var pug = new fabric.Image(pleaseWaitImg, {
                    width: 200,
                    height: 200,
                    left: canvas.width / 2 - 100,
                    top: canvas.height / 2 - 100,
                    scaleX: 1,
                    scaleY: 1,
                    lockMovementX: true,
                    lockMovementY: true,
                    hasBorders: false,
                    selectable: false,
                    lockRotation: true,
                    lockScalingX: true,
                    lockScalingY: true
                });
                canvas.add(pug);
            };
            pleaseWaitImg.onload = function () {
                imgOnLoad();
            };
            pleaseWaitImg.src = 'images/pleaseWait.png';

            var imageW = 0;
            var imageH = 0;
            var arrow = new Rectangle(canvas);

            var img = new Image();
            img.onload = function () {
                imageW = this.width;
                imageH = this.height;
                canvas.setHeight(this.height);
                canvas.setWidth(this.width);
                var bg = "";
                if (page) {
                    if (page.page_image_url)
                        bg = page.page_image_url;
                }
                canvas.clear();
                canvas.renderAll();
                canvas.setBackgroundImage(bg, canvas.renderAll.bind(canvas),
                    {
                        width: canvas.width,
                        height: canvas.height,
                        left: 0,
                        top: 0,
                        originX: 'left',
                        originY: 'top'
                    });
                handleResize();

                for (var m = 0; m < page.data.length; m++) {

                    var coors = JSON.parse((page.data[m].coords));

                    var rect = new fabric.Rect({
                        left: Math.floor(coors.x),
                        top: Math.floor(coors.y),
                        originX: 'left',
                        originY: 'top',
                        width: Math.ceil(coors.w),
                        height: Math.ceil(coors.h),
                        angle: 0,
                        transparentCorners: true,
                        hasBorders: false,
                        hasControls: true,
                        //minScaleLimit: 1,
                        perPixelTargetFind: true,
                        id: page.data[m].id,
                        meta_name: page.data[m].meta_name,
                        typeId: page.data[m].meta_type,
                        groupID: parseInt(page.data[m].group_id),
                        fill: colors[page.data[m].meta_type],
                        page_id: page.data[m].page_id
                    });

                    rect.setControlsVisibility({mtr: false});
                    canvas.add(rect);
                    canvas.renderAll();
                }
            };

            img.onerror = function (error) {
            };

            if (page) {
                if (page.page_image_url) {
                    $timeout(function () {
                        img.src = page.page_image_url;
                    }, 0);
                }
            }

            var clear = function () {
                var bg = canvas.backgroundImage;
                canvas.clear();
                canvas.setBackgroundImage(bg, canvas.renderAll.bind(canvas),
                    {
                        width: canvas.width,
                        height: canvas.height,
                        left: 0,
                        top: 0,
                        originX: 'left',
                        originY: 'top'
                    });
                canvas.renderAll();
                handleResize();
            };

            /*canvas.on({
                'object:moving': onChange,
                'object:scaling': onChange,
                'object:modified': onChange
            });*/


            function onChange(options)
            {
                canvas.renderAll();
                options.target.setCoords();
                canvas.forEachObject(function (obj) {
                    if (obj === options.target) return;

                    obj.set('opacity', options.target.intersectsWithObject(obj) ? 0.5 : 1);

                    if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {
                        obj.right = obj.left + obj.width;
                        obj.bottom = obj.top + obj.height;
                        options.target.right = options.target.left + options.target.width;
                        options.target.bottom = options.target.top + options.target.height;

                        var distx = ((obj.left + obj.width) / 2) - ((options.target.left + options.target.width) / 2);
                        var disty = ((obj.top + obj.height) / 2) - ((options.target.top + options.target.height) / 2);


                        if (disty > 0) {
                            options.target.top = Math.abs(Math.floor(obj.top - options.target.height));
                        } else {
                            options.target.top = Math.abs(Math.floor(obj.top + options.target.height));

                        }
                        /*
                         if (distx > 0) {
                         options.target.left = obj.left - options.target.width;
                         } else {
                         options.target.left = obj.left + options.target.width;
                         }
                         */
                    } else {
                        obj.opacity = '1';
                        options.target.lockMovementX = false;
                        options.target.lockMovementY = false;

                    }
                })
            }


            var changeTypes = function (e) {

                if (firstTime) {
                    scope.entity.states[0].status = 3;
                    firstTime = false;
                }
                var elmId = e.target.id;

                if (elmId === "explainerText") {
                    type = 1;
                } else
                    if (elmId === "inputFields") {
                        type = 2;
                    } else
                        if (elmId === "paymentSection") {
                            type = 3;
                        } else
                            if (elmId === "signatureArea") {
                                type = 4;
                            }

                color = colors[type];
                isDrawingMode = true;
            };

            $("#inputFields").click(changeTypes);
            $("#explainerText").click(changeTypes);
            $("#paymentSection").click(changeTypes);
            $("#signatureArea").click(changeTypes);

            $("#removeObject").click(function () {

                if (scope.selectedObject) {
                    canvas.remove(canvas.getActiveObject());
                    //canvas.remove(scope.selectedObject);
                    if (scope.selectedObject.id) {
                        scope.deleteObject(scope.selectedObject);
                    }
                }
                scope.hideConfigurePanel();
                canvas.renderAll();
            });


            $("#clearAll").click(function () {
                clear();
                scope.hideConfigurePanel();
                scope.deleteAll();
            });

            var autoSave = function () {
                scope.update(canvas);
                imgOnLoad();
                clear();
            };


            $("#save").click(function () {
                autoSave();
            });

            scope.$watch('selectedObject.typeId', function (newValue, oldValue, scope) {
                if (scope.selectedObject) {
                    if (scope.selectedObject.typeId) {
                        scope.selectedObject.set("fill", colors[scope.selectedObject.typeId]);
                        canvas.renderAll();
                    }
                }
            });


            $(document).on('keydown', function (e) {
                if (e.keyCode == 46 || e.keyCode == 8) {
                    if (scope.selectedObject) {
                        canvas.remove(canvas.getActiveObject());
                        //canvas.remove(scope.selectedObject);
                        if (scope.selectedObject.id) {
                            scope.deleteObject(scope.selectedObject);
                        }
                    }
                    scope.hideConfigurePanel();
                    canvas.renderAll();
                }
            });

        }
    }
};
/**
 * Created by Admin on 12/19/2017.
 */
function formBuilder($timeout)
{
    'use strict'
    return {
        scope: {
            save: "="
        },
        restrict: 'A',
        link: function (scope, element, attr) {

            var changes = -1,
                docFields = [],
                builderLoaded = false,
                OptionFields = [],
                preview = $('#preview'),
                renderedForm = $('#preview-content'),
                formBuilder,
                availableFieldTypes = [
                    {id: 1, type: "paragraph", icon: "¶"},
                    {id: 2, type: "text", icon: ""},
                    {id: 3, type: "button", icon: "✎"},
                    {id: 4, type: "textarea", icon: "$"}];
            var templates = {
                paypal: function (fieldData) {
                    return {
                        field: '<button id="' + fieldData.name + '">' + fieldData.label
                        /*onRender: function () {
                            //$(document.getElementById(fieldData.name));
                        }*/
                    };
                }
            };


            var getType = function (object) {

                if (object.meta_type === -3) {
                    return {id: 5, type: "paypal", icon: "$"};
                }
                else {
                    for (var i = 0; i < availableFieldTypes.length; i++) {
                        if (availableFieldTypes[i].id === object.meta_type) {
                            return availableFieldTypes[i];
                        }
                    }
                    return availableFieldTypes[0];
                }

            };

            var update = function () {
                if (formBuilder.actions) {
                    var formData = formBuilder.actions.getData('xml'),
                        formDataJson = formBuilder.actions.getData('json'),
                        formRenderOpts = {
                            dataType: 'json',
                            formData: formDataJson
                        };
                    var renderedForm = $('<div>');
                    renderedForm.formRender(formRenderOpts);
                    scope.save(formData, renderedForm.html(), formDataJson);
                }
            };
            var showPreview = function (formData) {
                var formRenderOpts = {
                    dataType: 'json',
                    formData: formData
                };
                var renderContainer = $('<form/>');
                renderContainer.formRender(formRenderOpts);
                var style = "<style>" +
                    ".header-bg{background-color:#f6f6f6;" +
                    "}.p-head{padding: 20px 0;}.m-t-30{margin-top:30px}.p-l-0{padding-left: 0;}" +
                    ".p-l-50{padding-left: 50px;}" +
                    "</style>";
                var html = '<!doctype html><title>Form Preview</title>' +
                    '<head><link href="//fonts.googleapis.com/css?family=Lato:100,300,400,700,900,100italic,300italic,400italic,700italic,900italic" rel="stylesheet" type="text/css" />' +
                    '<link href="https://static.qgov.net.au/assets/v3/latest/css/qg-main.css" type="text/css" rel="stylesheet">' +
                    '<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">' +
                    style +
                    '</head>' +
                    '<body class="container-fluid">' +
                    '<div class="row header-bg m-t-30 p-head" ><div class="col-md-10 p-l-50"><img src="https://static.qgov.net.au/assets/v2/images/skin/qg-coa.svg"  height:auto" class="img-responsive col-md-4 p-l-0"/></div></div>' +
                    '<div class="row">' +
                    '<nav id="qg-breadcrumb" role="navigation" aria-label="breadcrumb navigation" aria-labelledby="breadcrumb-heading" class="collapse">' +
                    '<h2 id="breadcrumb-heading" class="qg-visually-hidden">You are here:</h2>' +
                    '<ol class="list-inline">' +
                    '<li><a href="https://www.qld.gov.au/">Queensland Government home</a></li>' +

                    ' </ol>' +

                    '</nav>' +
                    '' +

                    '</div>' +
                    '<div class="row">' +
                    '' +
                    '<div class=col-md-3>' +
                    '<img src="images/leftpanel.png"><br/>' +
                    '<h4>Are you moving to Queensland?</h4> Support is available to help you settle in, <a href="#">click here</a>.' +
                    '</div>' +
                    '<div class="col-md-6"><br/><br/><h1 >Welcome</h1><hr>' + renderContainer.html() + '</div></div>' +
                    '<div class="col-md-3">' +
                    '<div><h4>Need Help?</h4>' +
                    '<h5>CALL 13 QGOV (13 74 68)</h5>' +
                    '</div><hr/>' +
                    '<h4>Stay Connected</h4>' +
                    '<a class="qg-accessibility-off" href="http://www.facebook.com/share.php?u=https://qld-gov-au.github.io/web-template-release/layout.html&amp;title=Facebook" title="Facebook"><span class="fa fa-facebook fa-2x qg-share-icon" aria-hidden="true"></span></a>' +
                    '<a class="qg-accessibility-off" href="http://twitter.com/home?status=Twitter+https://qld-gov-au.github.io/web-template-release/layout.html" title="Twitter"><span class="fa fa-twitter fa-2x qg-share-icon" aria-hidden="true"></span></a>' +
                    '<a class="qg-accessibility-off" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://qld-gov-au.github.io/web-template-release/layout.html&amp;title=LinkedIn&amp;source=qld-gov-au.github.io" title="LinkedIn"><span class="fa fa-linkedin fa-2x qg-share-icon" aria-hidden="true"></span></a>' +
                    '' +
                    '' +
                    'As we develop projects and activities as part of the <b>Queensland Government Strategy</b>, you can join the conversation through forums, polls, crowd-sourcing ideas and feedback. To join now, <i>register with us</i>.' +
                    '</div><hr/>' +


                    '<div id="qg-options" class="row">' +
                    '<div id="qg-share" class="qg-share"><h2>Share:</h2>' +
                    '<ul class="navbar navbar-right">' +
                    '<li>' +
                    '<a class="qg-share-link qg-accessibility-off" href="http://www.facebook.com/share.php?u=https://qld-gov-au.github.io/web-template-release/layout.html&amp;title=Facebook" title="Facebook"><span class="fa fa-facebook fa-2x qg-share-icon" aria-hidden="true"></span><span class="title qg-visually-hidden" "="">Facebook</span></a>' +
                    '</li><li>' +
                    '<a class="qg-share-link qg-accessibility-off" href="http://twitter.com/home?status=Twitter+https://qld-gov-au.github.io/web-template-release/layout.html" title="Twitter"><span class="fa fa-twitter fa-2x qg-share-icon" aria-hidden="true"></span><span class="title qg-visually-hidden" "="">Twitter</span></a>' +
                    '</li><li>' +
                    '<a class="qg-share-link qg-accessibility-off" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://qld-gov-au.github.io/web-template-release/layout.html&amp;title=LinkedIn&amp;source=qld-gov-au.github.io" title="LinkedIn"><span class="fa fa-linkedin fa-2x qg-share-icon" aria-hidden="true"></span><span class="title qg-visually-hidden" "="">LinkedIn</span></a>' +
                    '</li>' +
                    '<li id="shareDropdown" class="dropdown dropdown-menu-right">' +
                    '<button id="shareDropdownToggle" class="qg-share-link noicon" title="share" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<span class="fa fa-share-alt fa-2x" aria-hidden="true"></span><span class="qg-visually-hidden">Share</span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" aria-labelledby="shareDropdownToggle">' +
                    '<li>' +
                    '<a class="qg-share-link qg-accessibility-off" href="http://www.digg.com/submit?phase=2&amp;url=https://qld-gov-au.github.io/web-template-release/layout.html&amp;title=Digg" title="Digg"><span class="fa fa-digg fa-2x qg-share-icon" aria-hidden="true"></span><span class="title " "="">Digg</span></a>' +
                    '</li><li>' +
                    '<a class="qg-share-link qg-accessibility-off" href="https://plus.google.com/share?url=https://qld-gov-au.github.io/web-template-release/layout.html" title="Google+"><span class="fa fa-google-plus fa-2x qg-share-icon" aria-hidden="true"></span><span class="title " "="">Google+</span></a>' +
                    '</li>' +
                    '</ul>' +
                    '</li>' +
                    '</ul></div>' +

                    '<div id="qg-feedback-btn">' +
                    '<button class="btn btn-default qg-toggle-btn collapsed qg-icon" id="page-feedback-useful" data-toggle="collapse" data-target="#qg-page-feedback">Feedback</button>' +
                    '</div>' +
                    '</div>' +

                    '<footer>' +
                    '<div class="qg-site-map row">' +

                    '<div>' +
                    //                    '<h3>'+
                    //                    '<a href="https://www.qld.gov.au/">Queensland Government</a>'+
                    //                '<button class="btn btn-link qg-toggle-icon-right collapsed visible-xs-inline-block" data-toggle="collapse" data-target="#footer-info-qg" aria-expanded="false" aria-controls="footer-info-qg"><span class="sr-only">More Queensland Government pages</span>&nbsp;</button>'+
                    //                '</h3>'+
                    //                '<ul class="collapse" id="footer-info-qg">'+
                    //                    '<li><a href="https://www.qld.gov.au/about/contact-government/contacts/">Government contacts</a></li>'+
                    //                '<li><a href="https://www.qld.gov.au/about/contact-government/have-your-say/">Have your say</a></li>'+
                    //                '<li><a href="https://www.qld.gov.au/about/staying-informed/">Staying informed</a></li>'+
                    //                '<li><a href="https://www.qld.gov.au/about/government-jobs/">Government jobs</a></li>'+
                    //                '<li><a href="https://www.qld.gov.au/about/how-government-works/">How government works</a></li>'+
                    //                '<li><a href="https://data.qld.gov.au/">Queensland Government data</a></li>'+
                    //                '<li><a href="https://publications.qld.gov.au/">Queensland Government publications</a></li>'+
                    //                '<li><a href="https://www.forgov.qld.gov.au/?utm_medium=website&amp;utm_source=qgov-site&amp;utm_campaign=dsiti-for-gov&amp;utm_content=swe-footer">For government employees</a></li>'+
                    //                '</ul>'+

                    '<img src="images/leftpanel.png"><br/>' +
                    '<div>' +
                    '<h3>' +
                    '<a href="https://www.qld.gov.au/queenslanders/">For Queenslanders</a>' +
                    '<button class="btn btn-link qg-toggle-icon-right collapsed visible-xs-inline-block" data-toggle="collapse" data-target="#footer-info-for-qld" aria-expanded="false" aria-controls="footer-info-qg"><span class="sr-only">More Queensland Government pages</span>&nbsp;</button>' +
                    '</h3>' +
                    '<ul class="col-2 collapse" id="footer-info-for-qld">' +
                    '<li><a href="https://www.qld.gov.au/transport/">Transport and motoring</a></li>' +
                    '<li><a href="https://www.qld.gov.au/jobs/">Employment and jobs</a></li>' +
                    '<li><a href="https://www.qld.gov.au/housing/">Homes and housing</a></li>' +
                    '<li><a href="https://www.qld.gov.au/education/">Education and training</a></li>' +
                    '<li><a href="https://www.qld.gov.au/community/">Community support</a></li>' +
                    '<li><a href="https://www.qld.gov.au/health/">Health and wellbeing</a></li>' +
                    '<li><a href="https://www.qld.gov.au/emergency/">Emergency services and safety</a></li>' +
                    '<li><a href="https://www.qld.gov.au/about/">About Queensland and its government</a></li>' +
                    '<li><a href="https://www.qld.gov.au/families/">Parents and families</a></li>' +
                    '<li><a href="https://www.qld.gov.au/disability/">People with disability</a></li>' +
                    '<li><a href="https://www.qld.gov.au/seniors/">Seniors</a></li>' +
                    '<li><a href="https://www.qld.gov.au/atsi/">Aboriginal and Torres Strait Islander peoples</a></li>' +
                    '<li><a href="https://www.qld.gov.au/youth/">Youth</a></li>' +
                    '<li><a href="https://www.qld.gov.au/environment/">Environment, land and water</a></li>' +
                    '<li><a href="https://www.qld.gov.au/law/">Your rights, crime and the law</a></li>' +
                    '<li><a href="https://www.qld.gov.au/recreation/">Recreation, sport and arts</a></li>' +
                    '</ul>' +
                    '</div>' +

                    '<div>' +
                    '<h3>' +
                    '<a href="http://www.business.qld.gov.au/">Business and industry</a>' +
                    '<button class="btn btn-link qg-toggle-icon-right collapsed visible-xs-inline-block" data-toggle="collapse" data-target="#footer-info-bi" aria-expanded="false" aria-controls="footer-info-qg"><span class="sr-only">More Queensland Government pages</span>&nbsp;</button>' +
                    '</h3>' +
                    '<ul class="collapse col-md-12" id="footer-info-bi">' +
                    '<li><a href="https://www.business.qld.gov.au/starting-business">Starting a business</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/running-business">Running a business</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/running-business/employing">Employing people</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/running-business/employing/payroll-tax">Payroll tax</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries">Industries</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest">Investing in Queensland</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest/chinese-s" lang="zh">昆士兰州的投资机会</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest/chinese-t" lang="zh">昆士蘭州的投資機會</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest/japanese" lang="ja">クイーンズランド州への投資機会</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest/korean" lang="ko">퀸즈랜드 투자 기회</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest/invertir-turismo" lang="sp">Oportunidades de inversión en Queensland</a></li>' +
                    '</ul>' +
                    '</div>' +

                    '</div>' +

                    '<div class="qg-legal row">' +
                    '<ul class="list-inline">' +
                    '<li><a href="https://www.qld.gov.au/contact-us/" class="">Contact us</a></li>' +
                    '<li><a href="https://www.qld.gov.au/help/">Help</a></li>' +
                    '<li><a href="https://www.qld.gov.au/legal/copyright/" class="">Copyright</a></li>' +
                    '<li><a href="https://www.qld.gov.au/legal/disclaimer/">Disclaimer</a></li>' +
                    '<li><a href="https://www.qld.gov.au/legal/privacy/">Privacy</a></li>' +
                    '<li><a href="https://www.qld.gov.au/right-to-information/">Right to information</a></li>' +
                    '<li><a href="https://www.qld.gov.au/help/accessibility/">Accessibility</a></li>' +
                    '<li><a href="http://www.smartjobs.qld.gov.au/">Jobs in Queensland Government</a></li>' +
                    '<li id="link-languages"><a href="https://www.qld.gov.au/languages/">Other languages</a></li>' +
                    '</ul>' +
                    '<p>© The State of Queensland 1995–2018</p>' +
                    '<p><a href="https://www.qld.gov.au/" accesskey="1">Queensland Government</a></p>' +
                    '</div>' +

                    '</footer>' +
                    '</body></html>';


                var h = screen.height;
                var w = screen.width;

                var formPreviewWindow = window.open('', 'formPreview', 'toolbar=no ,scrollbars=yes,location=0,status=no,titlebar=no,menubar=no,width=' + w + ',height=' + h);
                formPreviewWindow.document.body.innerHTML = '';
                html = '';

                formPreviewWindow.document.write(html);

                // formPreviewWindow.document.head.appendChild(style);
            };

            var createEditor = function () {
                var fields = JSON.parse(attr.fields);


                var html = attr.html;
                var OptionFields = [];


                for (var i = 0; i < fields.length; i++) {

                    var obj = getType(fields[i]);
                    var templateName = obj.type + '_' + Math.floor((Math.random() * 10000) + 1);
                    docFields.push(fields[i].label);
                    var temp =
                        {
                            label: fields[i].label,
                            //type: obj.type,
                            //subtype: obj.type,
                            attrs: {
                                type: obj.type
                            },
                            icon: obj.icon,
                            name: templateName
                        };

                    var index = OptionFields.indexOf(temp);

                    if (index === -1) {
                        if (fields[i].label !== "") {
                            OptionFields.push(temp);
                        }
                    }
                }

                var count = 0;
                count++;
                $(element).empty();
                var id = attr.id;
                var content = $("#" + id).empty();
                debugger;
                formBuilder = $(content[0]).formBuilder({
                    fields: OptionFields,
                    //templates: templates,
                    // showActionButtons: false,
                    disabledActionButtons: ['data', 'save', 'clear'],
                    // defaultFields: [{type: 'text', name: 'first-name'}], //replaceFields,
                    dataType: 'json',
                    append: false,
                    formData: html,
                    fieldRemoveWarn: true,
                    actionButtons: [
                        {
                            id: 'save-all',
                            className: 'btn btn-primary text-white',
                            label: 'Save',
                            type: 'button',
                            events: {
                                click: function (e, data) {
                                    update();
                                }
                            }
                        },
                        {
                            id: 'preview',
                            className: 'btn btn-success text-white',
                            label: 'Preview',
                            type: 'button',
                            events: {
                                click: function (e, data) {
                                    var formData = formBuilder.actions.getData('json');

                                    showPreview(formData);


                                    renderedForm.formRender(formRenderOpts);
                                }
                            }
                        }, {
                            id: 'clear-all',
                            className: 'btn btn-danger text-white',
                            label: 'Clear',
                            type: 'button',
                            events: {
                                click: function () {
                                    formBuilder.actions.clearFields();
                                    //update();
                                }
                            }
                        }],
                    disableFields: [
                        'autocomplete',
                        'file',
                        'date',
                        'paragraph',
                        'button',
                        'checkbox-group',
                        'header',
                        'number',
                        'select',
                        'radio-group',
                        'text',
                        'hidden',
                        'textarea'
                    ],
                    typeUserAttrs: {
                        paypal: {
                            stripeKey: {
                                label: 'stripe key',
                            },
                            amount: {
                                label: 'amount'
                            }
                        }
                    }
                });
                formBuilder.promise.then(function (fb) {
                    // fb.actions.clearFields();
                    var local = fb.actions.toLocaleString();
                    builderLoaded = true;
                    /* var allFields = $('.frmb-control li');
                     var exist = [];

                     for (var i = 0; i < allFields.length; i++) {
                     var ex = false;
                     for (var n = 0; i < docFields.length; n++) {
                     if ((allFields[i].innerHTML).indexOf(docFields[n]) !== -1) {
                     if (exist.indexOf(allFields[i].innerHTML) !== -1) {
                     $(allFields[i]).remove();
                     }
                     {
                     exist.push(allFields[i].innerHTML);
                     ex = true;
                     break;
                     }
                     }
                     }
                     if (ex === false) {
                     $(allFields[i]).remove();
                     }
                     }*/
                    //$('li.icon-file-input,li.icon-hidden-input', '.frmb-control').remove();
                });
            };

            $timeout(createEditor, 500);

            var lastChanges = "";

            scope.$watch(function () {
                    return element.html();
                },
                function (newVal, oldVal) {
                    if (builderLoaded === true && newVal !== oldVal) {
                        if (changes > 0) {
                            if ($(newVal).find('.stage-wrap').html() !== $(oldVal).find('.stage-wrap').html()) {
                                //debugger;
                                var rendered = $('<div>');
                                rendered.formRender({
                                    dataType: 'json',
                                    formData: formBuilder.actions.getData('json')
                                });
                                var newChanges = rendered.html();
                                if (lastChanges !== newChanges) {
                                    lastChanges = newChanges;
                                    update();
                                }
                            }
                        } else
                            if (changes === -1) {
                                changes = 1;
                            }
                    }
                }
            );


            $("#form-edit").click(function () {
                preview.addClass('hide');
                preview.removeClass('show');
                $(element).addClass('show');
                $(element).removeClass('hide');
            })
        }
    };
}
function stopWatch()
{
    'use strict'
    return {
        restrict: 'AE',
        scope: {
            // Set title in the isolate scope from the title attribute on the directive's element.
            title: '@title',
            // Set up a bi-directional binding between currentTime on the local scope and the parent
            // scope's variable containing the current time that's the value of the time attribute.
            currentTime: '=time'
        },

        link: function (scope, element, attrs, ctrl) {
        },
        templateUrl: 'views/directives/stopWatch.html',
        controllerAs: 'swctrl',
        controller: function ($scope, $interval) {
            console.log("Creating the directive's controller");
            var self = this;
            var totalElapsedMs = 0;
            var elapsedMs = 0;
            //var time;
            var startTime;
            var timerPromise;

            self.start = function () {
                $scope.start = true;
                if (!timerPromise) {
                    startTime = new Date();
                    timerPromise = $interval(function () {
                        var now = new Date();
                        //$scope.time = now;
                        elapsedMs = now.getTime() - startTime.getTime();
                    }, 1000);
                }
            };

            self.stop = function () {
                $scope.start = false;
                if (timerPromise) {
                    $interval.cancel(timerPromise);
                    timerPromise = undefined;
                    totalElapsedMs += elapsedMs;
                    elapsedMs = 0;
                }
            };

            self.reset = function () {
                startTime = new Date();
                totalElapsedMs = elapsedMs = 0;
            };

            self.getTime = function () {
                return time;
            };

            self.getElapsedMs = function () {
                return Math.round((totalElapsedMs + elapsedMs) / 1000, 0);
            };
        }
    }


}
function datePicker()
{
    'use strict'
    return {
        replace: false,
        restrict: "E,A",
        templateUrl: 'views/directives/datePicker.html',
        link: function (scope, element, attrs) {
            $('#data_1 .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: true,
                forceParse: true,
                calendarWeeks: true,
                autoclose: true
            });

        }
    }


}
function touchSpin()
{
    'use strict'
    return {
        restrict: "E,A",
        link: function (scope, element, attrs) {
            $(".touchspin1").TouchSpin({
                buttondown_class: 'btn btn-white',
                buttonup_class: 'btn btn-white'
            });

        }
    }


}
function stripeConnect()
{
    return {
        scope: true,
        restrict: "E,A",
        link: function (scope, element, attrs) {

            $('#currency').change(function () {
                $('#routing_number_div').show();
                $('#account_number_label').text('Account Number').next('input').attr('placeholder', '');
                $('#routing_number').attr('data-stripe', 'routing_number');
                switch (this.value) {
                    case "usd":
                        $('#routing_number_label').text('Routing Number').next('input').attr('placeholder', '111000000');
                        break;
                    case "eur":
                        // No routing number needed
                        $('#routing_number_div').hide();
                        $('#routing_number').removeAttr('data-stripe');
                        $('#account_number_label').text('IBAN').next('input').attr('placeholder', 'XX9828737432389');
                        break;
                    case "cad":
                        $('#routing_number_label').text('Transit & Institution Number');
                        break;
                    case "gbp":
                        $('#routing_number_label').text('Sort Code').next('input').attr('placeholder', '12-34-56');
                        break;
                    case "mxn":
                        $('#routing_number_label').text('CLABE');
                        break;
                    case 'aud':
                    case "nzd":
                        $('#routing_number_label').text('BSB').next('input').attr('placeholder', '123456');
                        break;
                    case 'sgd':
                    case "jpy":
                    case "brl":
                    case "hkd":
                        $('#routing_number_label').text('Bank / Branch Code');
                        break;
                }
            });

        }
    }


}


function calendar()
{
    'use strict'
    return {
        replace: false,
        restrict: "E,A",
        transclude: true,
        scope: {
            name: '='
        },


        template: '<div id="calendar"></div>',
        link: function (scope, element, attrs) {
            // console.log();
            $('#calendar').fullCalendar({
                defaultView: 'listWeek',

                // customize the button names,
                // otherwise they'd all just say "list"
                views: {
                    listDay: {buttonText: 'list day'},
                    listWeek: {buttonText: 'list week'},
                    listMonth: {buttonText: 'list month'}
                },

                header: {
                    left: 'title',
                    center: '',
                    right: 'listDay,listWeek,listMonth'
                },
                events: scope.calendarObjects


            })


        }
    }


}
function mapBox()
{
    return {
        restrict: 'A',
        template: '<div id="map" style="width: 400px; height: 300px"></div>',
        link: function (scope, element) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZGlhbWF0aWMiLCJhIjoiY2pqZjh2a2huMng0cDNrcGxtaTRwa2NhZiJ9.7RJBlZw7LBi7FuiIFVXRWA';

            var map = new mapboxgl.Map({
                container: 'map', // container id
                style: 'mapbox://styles/mapbox/streets-v9',
                center: [-74.50, 40], // starting position
                zoom: 9 // starting zoom
            });
            map.addControl(new mapboxgl.NavigationControl());

        }
    };
}


// Add zoom and rotation controls to the map.

/**
 * INSPINIA - Responsive Admin Theme
 *
 * Main directives.js file
 * Define directives for used plugin
 *
 *
 * Functions (directives)
 *  - sideNavigation
 *  - iboxTools
 *  - minimalizaSidebar
 *  - vectorMap
 *  - sparkline
 *  - icheck
 *  - ionRangeSlider
 *  - dropZone
 *  - responsiveVideo
 *  - chatSlimScroll
 *  - customValid
 *  - fullScroll
 *  - closeOffCanvas
 *  - clockPicker
 *  - landingScrollspy
 *  - fitHeight
 *  - iboxToolsFullScreen
 *  - slimScroll
 *
 */


/**
 * pageTitle - Directive for set Page title - meta title
 */
function pageTitle($rootScope, $timeout, locale, localeChanged)
{
    return {
        link: function (scope, element) {
            var listener = function (event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = '';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) {
                    var key = toState.data.pageTitle;
                    title = locale.getString('title.' + key);
                }
                $timeout(function () {
                    element.text(title);
                });
            };

            $rootScope.$on('$stateChangeStart', listener);
            // scope.$on(localeChanged.changed, listener);
        }
    };
}


/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout)
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function () {
                element.metisMenu();

            });
        }
    };
}

function step($timeout, $rootScope)
{
    return {
        restrict: 'EA',
        scope: {
            stepFinishing: '=',
            stepCanceled: '=',
            stepChanging: '='
        },
        compile: function (element, scope) {
            element.steps();
            return {
                //pre-link
                pre: function () {
                },
                //post-link
                post: function (scope, element) {
                    element.on('finishing', scope.stepFinishing);
                    element.on('canceled', scope.stepCanceled);
                    element.on('stepChanging', scope.stepChanging);

                }
            };
        }
    };
}

/**
 * responsibleVideo - Directive for responsive video
 */
function responsiveVideo()
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            var figure = element;
            var video = element.children();
            video
                .attr('data-aspectRatio', video.height() / video.width())
                .removeAttr('height')
                .removeAttr('width')

            //We can use $watch on $window.innerWidth also.
            $(window).resize(function () {
                var newWidth = figure.width();
                video
                    .width(newWidth)
                    .height(newWidth * video.attr('data-aspectRatio'));
            }).resize();
        }
    }
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout)
{
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout)
{
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function () {
                    $(window).trigger('resize');
                }, 100);
            };
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
function minimalizaSidebar($timeout)
{
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");

                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                } else
                    if ($('body').hasClass('fixed-sidebar')) {
                        $('#side-menu').hide();
                        setTimeout(
                            function () {
                                $('#side-menu').fadeIn(500);
                            }, 300);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        $('#side-menu').removeAttr('style');
                    }
            };
        }
    };
}


function closeOffCanvas()
{
    return {
        restrict: 'A',
        template: '<a class="close-canvas-menu" ng-click="closeOffCanvas()"><i class="fa fa-times"></i></a>',
        controller: function ($scope, $element) {
            $scope.closeOffCanvas = function () {
                $("body").toggleClass("mini-navbar");
            };
        }
    };
}

/**
 * vectorMap - Directive for Vector map plugin
 */
function vectorMap()
{
    return {
        restrict: 'A',
        scope: {
            myMapData: '='
        },
        link: function (scope, element, attrs) {
            element.vectorMap({
                map: 'world_mill_en',
                backgroundColor: "transparent",
                regionStyle: {
                    initial: {
                        fill: '#e4e4e4',
                        "fill-opacity": 0.9,
                        stroke: 'none',
                        "stroke-width": 0,
                        "stroke-opacity": 0
                    }
                },
                series: {
                    regions: [{
                        values: scope.myMapData,
                        scale: ["#1ab394", "#22d6b1"],
                        normalizeFunction: 'polynomial'
                    }]
                },
            });
        }
    };
}


/**
 * sparkline - Directive for Sparkline chart
 */
function sparkline()
{
    return {
        restrict: 'A',
        scope: {
            sparkData: '=',
            sparkOptions: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch(scope.sparkData, function () {
                render();
            });
            scope.$watch(scope.sparkOptions, function () {
                render();
            });
            var render = function () {
                $(element).sparkline(scope.sparkData, scope.sparkOptions);
            };
        }
    };
}

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout)
{
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, element, $attrs, ngModel) {
            return $timeout(function () {
                var value;
                value = $attrs.value;

                $scope.$watch($attrs['ngModel'], function (newValue) {
                    $(element).iCheck('update');
                });

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-blue',
                    radioClass: 'iradio_square-blue'

                }).on('ifChanged', function (event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function () {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function () {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
}

/**
 * ionRangeSlider - Directive for Ion Range Slider
 */
function ionRangeSlider()
{
    return {
        restrict: 'A',
        scope: {
            rangeOptions: '='
        },
        link: function (scope, elem, attrs) {
            elem.ionRangeSlider(scope.rangeOptions);
        }
    };
}

/**
 * dropZone - Directive for Drag and drop zone file upload plugin
 */
function dropZone()
{
    return {
        restrict: 'AE',
        template: '<div ng-transclude></div>',
        transclude: true,
        scope: {
            dropzone: '=',
            dropzoneConfig: '=',
            eventHandlers: '='
        },
        link: function (scope, element, attrs, ctrls) {
            try {
                Dropzone
            } catch (error) {
                throw new Error('Dropzone.js not loaded.');
            }

            var dropzone = new Dropzone(element[0], scope.dropzoneConfig);

            if (scope.eventHandlers) {
                Object.keys(scope.eventHandlers).forEach(function (eventName) {
                    dropzone.on(eventName, scope.eventHandlers[eventName]);
                });
            }

            scope.dropzone = dropzone;
        }
    };


}

/**
 * chatSlimScroll - Directive for slim scroll for small chat
 */
function chatSlimScroll($timeout)
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            $timeout(function () {
                element.slimscroll({
                    height: '234px',
                    railOpacity: 0.4
                });

            });
        }
    };
}

/**
 * customValid - Directive for custom validation example
 */
function customValid()
{
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function () {

                // You can call a $http method here
                // Or create custom validation

                var validText = "Inspinia";

                if (scope.extras == validText) {
                    c.$setValidity('cvalid', true);
                } else {
                    c.$setValidity('cvalid', false);
                }

            });
        }
    };
}


/**
 * fullScroll - Directive for slimScroll with 100%
 */
function fullScroll($timeout)
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            $timeout(function () {
                element.slimscroll({
                    height: '100%',
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * slimScroll - Directive for slimScroll with custom height
 */
function slimScroll($timeout)
{
    return {
        restrict: 'A',
        scope: {
            boxHeight: '@'
        },
        link: function (scope, element) {
            $timeout(function () {
                element.slimscroll({
                    height: scope.boxHeight,
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * clockPicker - Directive for clock picker plugin
 */
function clockPicker()
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.clockpicker();
        }
    };
}


/**
 * landingScrollspy - Directive for scrollspy in landing page
 */
function landingScrollspy()
{
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.scrollspy({
                target: '.navbar-fixed-top',
                offset: 80
            });
        }
    };
}

/**
 * fitHeight - Directive for set height fit to window height
 */
function fitHeight()
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.css("height", $(window).height() + "px");
            element.css("min-height", $(window).height() + "px");
        }
    };
}


function starRating()
{
    return {
        restrict: 'A',
        template: '<ul class="rating" style="color: #a9a9a9; margin: 0;padding: 0;display: inline-block;">' + '<li ng-repeat="star in stars"  ng-class="star" ng-click="toggle($index)" style=" list-style-type: none;display: inline-block;' + 'padding: 1px;' + ' text-align: center;' + ' font-weight: bold;' + ' cursor: pointer;">' + '  <i class="fa fa-star-o fa-3x"></i>' + ' </li>' + '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue',
                function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                }
            );
        }
    };
}


function starRatingShow()
{
    return {
        restrict: 'A',
        template: '<ul class="rating" style="color: #a9a9a9; margin: 0;padding: 0;display: inline-block;">' + '<li ng-repeat="star in stars"  ng-class="star" ng-click="toggle($index)" style=" list-style-type: none;display: inline-block;' + 'padding: 1px;' + ' text-align: center;' + ' font-weight: bold;' + ' cursor: pointer;">' + '  <i class="fa fa-star-o fa-2x"></i>' + ' </li>' + '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue',
                function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                }
            );
        }
    };
}

function averageRating()
{
    return {
        restrict: 'A',
        template: '<ul class="rating" style="color: #a9a9a9; margin: 0;padding: 0;display: inline-block;">' + '<li ng-repeat="star in stars"  ng-class="star"  style=" list-style-type: none;display: inline-block;' + 'padding: 1px;' + ' text-align: center;' + ' font-weight: bold;' + ' ">' + '  <i class="fa fa-star-o"></i>' + ' </li>' + '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue',
                function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                }
            );
        }
    };
}

function backgroundImage()
{
    return function (scope, element, attrs) {
        scope.$watch(attrs.backImg, function (value) {
            element.css({
                'background-image': 'url(' + value + ')',
                'background-size': 'cover'
            });
        });
    };
}

function myAngularDirective()
{
    return {
        restrict: 'E',
        template: '<span>Hi this is myAngularDirective </span>',
        link: function (scope, elem, attrs, $compile) {
        }
    };
}

function test($compile)
{
    return {
        restrict: 'E',
        scope: {
            text: '@'
        },
        template: '<button ng-click="add()" class="btn btn-primary">{{text}}</button>',
        controller: function ($scope, $element) {
            $scope.add = function () {
                var el = $compile("<my-angular-directive />")($scope);
                $('#page').append(el);
                //  $element.parent().append(el);
            };
        }
    };
}

function andyDraggable()
{
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            var options = scope.$eval(attrs.andyDraggable); //allow options to be passed in
            elm.draggable(options);
        }
    };
}

function colorPicker()
{
    return {
        restrict: 'C',
        link: function (scope, elm, attrs) {
            elm.spectrum({
                preferredFormat: "hex",
                showPalette: true,
                allowEmpty: true,
                showInput: true,
                palette: [
                    ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                    ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                    ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                    ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                    ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                    ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                    ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                    ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
                ]
            });
        }
    };
}


function editElement()
{
    return {
        restrict: 'AC',
        link: function (scope, element, attrs) {
            var el = element.context.tagName;
            scope.$watch(scope, function (value) {
                element.css('background-color', (value ? 'transparent' : attrs.myBgcolor));
            });
        }
    };
}

function fullPath()
{
    return {
        link: function (scope, element, attrs) {
            if (element[0].tagName === "A") {
                attrs.$set('href', dbServe + attrs.fullPath);
            } else {
                attrs.$set('src', dbServe + attrs.fullPath);
            }

        }
    };
}

function zoomer()
{
    return {
        restrict: 'AC',
        scope: {
            height: '@'
        },
        link: function (scope, element, attrs) {

            element[0].zoomer({
                zoom: 0.25,
                width: 270,
                height: scope.height * 0.25,
                message: "Drag&Drop Me!"
            });
        }
    };
}


function editContent($modal)
{
    return {
        restrict: 'C',
        link: function (scope, elm, attrs) {

            elm
                .on('mouseenter', function () {
                    elm.css({'outline': '3px dashed red', 'cursor': 'pointer'});
                })
                .on('mouseleave', function () {
                    elm.css({'outline': '', 'cursor': ''});
                });

            scope.showEditModalContent = function (selector) {
                var modalInstance = $modal.open({
                    templateUrl: 'editModalContent.html',
                    controller: 'EditContentModalInstanceController',
                    resolve: {
                        selector: function () {
                            return selector;
                        }
                    }
                });
                modalInstance.result.then(function (selector) {
                }, function () {

                });
            };

            elm.click(function () {
                if (scope.mode == 'radio_content') {
                    scope.showEditModalContent(elm);
                } else
                    if (scope.mode == 'radio_details') {
                        scope.showStyleEditor = true;
                        scope.main = false;
                        scope.second = false;
                        scope.all = false;
                    }
            });
        }
    };
}

angular
    .module('inspinia').directive('appFilereader', function ($q) {
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$render = function () {
            };

            element.bind('change', function (e) {
                var element = e.target;

                $q.all(slice.call(element.files, 0).map(readFile))
                    .then(function (values) {
                        if (element.multiple) ngModel.$setViewValue(values);
                        else ngModel.$setViewValue(values.length ? values[0] : null);
                    });

                function readFile(file)
                {
                    var deferred = $q.defer();

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        deferred.resolve(e.target.result);
                    };
                    reader.onerror = function (e) {
                        deferred.reject(e);
                    };
                    reader.readAsDataURL(file);


                    return deferred.promise;
                }

            }); //change

        } //link
    }; //return
})


    .directive('loginDialog', function (AUTH_EVENTS, $modal) {
        return {
            restrict: 'A',
            link: function (scope) {
                var showDialog = function () {
                    scope.visible = true;
                    var modalInstance = $modal.open({
                        backdrop: 'static',
                        templateUrl: 'views/loginPopUp.html',
                        controller: 'LoginPopUpController',
                    });
                    modalInstance.result.then(function () {

                    }, function () {

                    });

                };
                scope.visible = false;
                scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
                scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);

            }
        };
    })


    .directive('alphabets', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                $(document).ready(function () {
                    element.keypress(function (event) {
                        var inputValue = event.charCode;
                        if (inputValue == 32 || (inputValue >= 65 && inputValue <= 90) ||
                            (inputValue >= 97 && inputValue <= 122)) {
                            return true;
                        } else {
                            event.preventDefault();
                        }
                    });
                });
            }
        };
    })


    .directive('fileDownload', [function () {
        return {
            restrict: 'A',
            replace: true,
            template: '<button class="btn btn-default" ng-click="download()"><span class="glyphicon glyphicon-download"></span></button>',
            controller: ['$rootScope', '$scope', '$element', '$attrs', 'dialogs', '$timeout', function ($rootScope, $scope, $element, $attrs, dialogs, $timeout) {
                $scope.progress = 0;

                function prepare(url)
                {
                    dialogs.wait("Please wait", "Your download starts in a few seconds.", $scope.progress);
                    fakeProgress();
                }

                function success(url)
                {
                    $rootScope.$broadcast('dialogs.wait.complete');
                }

                function error(response, url)
                {
                    dialogs.error("Couldn't process your download!");
                }

                function fakeProgress()
                {
                    $timeout(function () {
                        if ($scope.progress < 95) {
                            $scope.progress += (96 - $scope.progress) / 2;
                            $rootScope.$broadcast('dialogs.wait.progress', {'progress': $scope.progress});
                            fakeProgress();
                        }
                    }, 250);
                }

                $scope.download = function () {
                    $scope.progress = 0;
                    $.fileDownload($attrs.href, {
                        prepareCallback: prepare,
                        successCallback: success,
                        failCallback: error
                    });
                };
            }]
        };
    }])


    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }])


    .directive("ngFileSelect", function () {
        return {
            link: function ($scope, el) {
                el.bind("change", function (e) {
                    $scope.file = (e.srcElement || e.target).files[0];
                    debugger;
                    $scope.getFile($scope.file);
                });
            }
        };
    })


    .service("fileReader", function ($q) {

        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        var onProgress = function (reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress", {
                    total: event.total,
                    loaded: event.loaded
                });
            };
        };

        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };

    });

/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .filter("htmlToPlaintext", function () {
        return function (input) {
            return input.replace(/<[^>]+>/gm, '');
        };
    })
    .controller("generate", function () {
        $scope.testing = function () {
        };
    })
    .directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(elem).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        };
    }])
    .filter('capitalize', function () {
        return function (input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        };
    })
    .filter('limitHtml', function () {
        return function (text, limit) {
            var changedString = String(text).replace(/<[^>]+>/gm, '');
            var length = changedString.length;
            return changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
        };
    })
    .filter('limitToHtml', function () {
        return function (text, limit) {
            return text.length > limit ? text.substr(0, limit - 1) : text;
        }
    })


    .directive('creditCardType', function () {
            var directive =
                {
                    require: 'ngModel', link: function (scope, elm, attrs, ctrl) {
                        ctrl.$parsers.unshift(function (value) {
                            scope.creditCard.type =
                                (/^5[1-5]/.test(value)) ? "mastercard"
                                    : (/^4/.test(value)) ? "visa"
                                    : (/^(?:2131|1800|35\d{3})\d{11}$/.test(value)) ? "jcb"
                                        : (/^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/.test(value)) ? "maestro"
                                            : (/^3[47]/.test(value)) ? 'amex'
                                                : (/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? 'discover'
                                                    : undefined;
                            ctrl.$setValidity('invalid', !!scope.creditCard.type);
                            return value;
                        });
                    }
                };
            return directive;
        }
    )


    .directive('cardExpiration', function () {
            var directive =
                {
                    require: 'ngModel', link: function (scope, elm, attrs, ctrl) {
                        scope.$watch('[creditCard.month,creditCard.year]', function (value) {
                            ctrl.$setValidity('invalid', true);
                            if (scope.creditCard.year == scope.currentYear &&
                                scope.creditCard.month <= scope.currentMonth
                            ) {
                                ctrl.$setValidity('invalid', false);
                            }
                            return value;
                        }, true);
                    }
                };
            return directive;
        }
    )


    .filter('range', function () {
            var filter =
                function (arr, lower, upper) {
                    for (var i = lower; i <= upper; i++) arr.push(i);
                    return arr;
                };
            return filter;
        }
    )


    .directive('myMaps', function () {
        // directive link function
        var link = function (scope, element, attrs) {
            var map, infoWindow;
            var markers = [];
            var locations = attrs.myMaps;
            var latitude = 40.7984357;
            var longtitude = -75.6635683;

            scope.$watch("locations", function (newValue, oldValue) {

            });


            // map config
            var mapOptions = {
                center: new google.maps.LatLng(latitude, longtitude),
                zoom: 5,
                styles: [],
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };

            // init the map
            function initMap()
            {
                if (map === void 0) {
                    map = new google.maps.Map(element[0], mapOptions);
                }
            }

            var beachFlagUrl = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
            var image = new google.maps.MarkerImage(
                beachFlagUrl,
                null,
                null,
                null,
                new google.maps.Size(172, 172)
            );

            // place a marker
            function setMarker(map, position, title, content)
            {
                var marker;
                var markerOptions = {
                    position: position,
                    map: map,
                    title: title,
                    icon: {
                        url: '/images/red-pin.png',
                        scaledSize: {width: 60, height: 50}
                    },
                    //  icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                };

                marker = new google.maps.Marker(markerOptions);
                markers.push(marker); // add marker to array

                google.maps.event.addListener(marker, 'click', function () {
                    // close window if not undefined
                    if (infoWindow !== void 0) {
                        infoWindow.close();
                    }
                    // create new window
                    var infoWindowOptions = {
                        content: content
                    };
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, marker);
                });
            }

            // show the map and place some markers
            initMap();

            function getLatLong(address)
            {
                var geocoder = new google.maps.Geocoder();
                var result = "";
                geocoder.geocode({'address': address}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {

                        if (results.length > 0) {
                            result = results[0].geometry.location;
                            map.setCenter(result);
                            setMarker(map, result, 'My Location', locations);
                        }
                    } else {
                        result = "Unable to find address: " + status;
                    }
                });
                return result;
            }

            //getLatLong(locations);
            for (var i = 0; i < scope.locations.length; i++) {

                var companyAddress = scope.locations[i].address + ' ' + scope.locations[i].city + ' ' + scope.locations[i].country;

                setMarker(map, new google.maps.LatLng(parseFloat(scope.locations[i].geo_lat), parseFloat(scope.locations[i].geo_long)), scope.locations[i].name, companyAddress);

            }

        };

        return {
            restrict: 'A',
            template: '<div id="gmaps"></div>',
            scope: {
                locations: '='
            },
            replace: true,
            link: link
        };
    })
    .directive('myMap', function () {
        // directive link function
        var link = function (scope, element, attrs) {
            var map, infoWindow;
            var markers = [];
            var location = attrs.myMap;

            scope.$watch("location", function (newValue, oldValue) {
            });
            // map config
            var mapOptions = {
                center: new google.maps.LatLng(latitude, longtitude),
                zoom: 16,
                styles: [],
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
            // init the map
            function initMap()
            {
                if (map === void 0) {
                    map = new google.maps.Map(element[0], mapOptions);
                }
            }

            var beachFlagUrl = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
            var image = new google.maps.MarkerImage(
                beachFlagUrl,
                null,
                null,
                null,
                new google.maps.Size(172, 172)
            );


            // place a marker
            function setMarker(map, position, title, content)
            {
                var marker;
                var markerOptions = {
                    position: position,
                    map: map,
                    title: title,
                    icon: {
                        url: '/images/red-pin.png',
                        scaledSize: {width: 120, height: 106}
                    },
                    //  icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                };

                marker = new google.maps.Marker(markerOptions);
                markers.push(marker); // add marker to array

                google.maps.event.addListener(marker, 'click', function () {
                    // close window if not undefined
                    if (infoWindow !== void 0) {
                        infoWindow.close();
                    }
                    // create new window
                    var infoWindowOptions = {
                        content: content
                    };
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, marker);
                });
            }

            // show the map and place some markers
            initMap();
            var latitude = 0.0;
            var longtitude = 0.0;

            function getLocation(address)
            {
                var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address;
                $.getJSON(url)
                    .success(function (data, status, headers, config) {
                        if (data.results.length > 0) {
                            latitude = data.results[0].geometry.location.lat;
                            longtitude = data.results[0].geometry.location.lng;

                            map.setCenter(data.results[0].geometry.location);
                            setMarker(map, new google.maps.LatLng(latitude, longtitude), 'WedooBox', location);
                        }
                    })
                    .error(function (data, status, headers, config) {
                    });
            }

            getLocation(location);


        };

        return {
            restrict: 'A',
            template: '<div id="gmaps"></div>',
            replace: true,
            link: link
        };
    })

    .directive('myIframe', function () {
        var linkFn = function (scope, element, attrs) {
            element.find('iframe').bind('load', function (event) {
                event.target.contentWindow.scrollTo(0, 400);
            });
        };
        return {
            restrict: 'EA',
            scope: {
                src: '@src',
                height: '@height',
                width: '@width',
                scrolling: '@scrolling'
            },
            template: '<iframe class="frame" height="{{height}}" width="{{width}}" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="{{scrolling}}" src="{{src}}"></iframe>',
            link: linkFn
        };
    })

    .directive('pageHeight', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                $timeout(function () {
                    var winHeight = $(this).height();
                    if ($(this).width() > 992) {

                        element.css("min-height", winHeight - 153);
                    } else
                        if ($(this).width() > 767) {
                            element.css("min-height", winHeight - 203);
                        } else {
                            element.css("min-height", $(this).height() - 153);
                        }

                    $(window).bind("load resize", function () {
                        var winHeight = $(this).height();
                        if ($(this).width() > 992) {
                            element.css("min-height", winHeight - 153);
                        } else
                            if ($(this).width() > 767) {
                                element.css("min-height", winHeight - 203);
                            } else {
                                element.css("min-height", $(this).height() - 153);
                            }
                    });
                });
            }
        };
    })

    .directive('footBottom', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                $timeout(function () {

                    if ($(this).width() > 992) {
                        var winHeight = $(this).height();
                        element.css("min-height", winHeight - 146);
                    } else {

                    }

                    $(window).bind("load resize", function () {
                        if ($(this).width() > 992) {
                            var winHeight = $(this).height();
                            element.css("min-height", winHeight - 146);
                        } else {

                        }
                    });

                });
            }
        };
    })

    .directive('changeImgHeight', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                var offset = 154;
                $timeout(function () {
                    var ele = element.children().find("img.change");

                    if ($(this).width() > 992) {
                        var winHeight = $(this).height();
                        ele.css("min-height", winHeight - offset);
                        ele.css("height", winHeight - offset);
                    } else {
                        ele.css("min-height", "");
                        ele.css("height", "");
                    }

                    $(window).bind("load resize", function () {
                        var ele = element.children().find("img.change");
                        if ($(this).width() > 992) {
                            var winHeight = $(this).height();
                            ele.css("min-height", winHeight - offset);
                            ele.css("height", winHeight - offset);
                        } else {
                            ele.css("min-height", "");
                            ele.css("height", "");
                        }
                    });

                });
            }
        };
    }).directive('fileDownloader', [function () {
    return {
        restrict: 'A',
        replace: true,
        template: '<button class="btn btn-default" data-ng-click="download()">Download</button>',
        controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
            $scope.progress = 0;

            function prepare(url)
            {
                fakeProgress();
            }

            function success(url)
            {
            }

            function error(response, url)
            {
            }

            function fakeProgress()
            {
                $timeout(function () {
                    if ($scope.progress < 95) {
                        $scope.progress += (96 - $scope.progress) / 2;
                        fakeProgress();
                    }
                }, 250);
            }

            $scope.download = function () {
                $scope.progress = 0;
                $.fileDownload($attrs.href, {prepareCallback: prepare, successCallback: success, failCallback: error});
            }
        }]
    }
}]).directive('convertToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return val != null ? parseInt(val, 10) : null;
            });
            ngModel.$formatters.push(function (val) {
                return val != null ? '' + val : null;
            });
        }
    };
}).directive('format', function ($filter) {
    'use strict';
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) {
                return;
            }

            ctrl.$formatters.unshift(function () {
                if (ctrl.$modelValue == 0) {
                    return '';
                }
                else {
                    return $filter('number')(ctrl.$modelValue);
                }

            });

            ctrl.$parsers.unshift(function (viewValue) {
                var sign = {
                    pos: /[+]/.test(viewValue),
                    neg: /[-]/.test(viewValue),
                    zero: /[0]/.test(viewValue)
                };
                sign.has = sign.pos || sign.neg;
                sign.both = sign.pos && sign.neg;
                sign.test = sign.zero;
                var plainNumber = viewValue.replace(/[\,\.]/g, ''),

                    b = $filter('number')(!sign.both || sign.neg || sign.zero ? plainNumber.replace(/[^0-9]/g, '') : plainNumber);

                if (parseInt(b) === 0) {
                    elem.val('');
                }
                else {
                    elem.val(b);
                }
                return plainNumber;
            });
        }
    };
})
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .directive('draggableElement', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.draggable({cursor: "move"});
            }
        };
    }])
    .directive('onScroll', function ($timeout) {
        'use strict';
        return {
            scope: {
                onScroll: '&onScroll',
            },
            link: function (scope, element) {
                var scrollDelay = 250,
                    scrollThrottleTimeout,
                    throttled = false,
                    scrollHandler = function () {
                        if (!throttled) {
                            scope.onScroll();
                            throttled = true;
                            scrollThrottleTimeout = $timeout(function () {
                                throttled = false;
                            }, scrollDelay);
                        }
                    };

                element.on("scroll", scrollHandler);

                scope.$on('$destroy', function () {
                    element.off('scroll', scrollHandler);
                });
            }
        };
    })
    .directive('showFocus', function ($timeout) {
        return function (scope, element, attrs) {
            scope.$watch(attrs.showFocus,
                function (newValue) {
                    $timeout(function () {
                        newValue && element.focus();
                    });
                }, true);
        };
    })
    .directive('circleProgress', function ($timeout) {
        'use strict';
        return {
            restrict: 'A',
            scope: {
                value: '='
            },
            link: function (scope, element) {
                $(element).circleProgress({
                    value: parseFloat(scope.value),
                    size: 30,
                    fill: {
                        gradient: ["red", "orange"]
                    }
                });
            }
        };
    })
    .directive('scrollBottom', function () {
        return {
            scope: {
                scrollBottom: "="
            },
            link: function (scope, element) {
                scope.$watchCollection('scrollBottom', function (newValue) {
                    if (newValue) {
                        $(element).scrollTop($(element)[0].scrollHeight);
                    }
                });
            }
        }
    })
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('vectorMap', vectorMap)
    .directive('sparkline', sparkline)
    .directive('icheck', icheck)
    .directive('ionRangeSlider', ionRangeSlider)
    .directive('dropZone', dropZone)
    .directive('responsiveVideo', responsiveVideo)
    .directive('chatSlimScroll', chatSlimScroll)
    .directive('customValid', customValid)
    .directive('fullScroll', fullScroll)
    .directive('closeOffCanvas', closeOffCanvas)
    .directive('clockPicker', clockPicker)
    .directive('landingScrollspy', landingScrollspy)
    .directive('fitHeight', fitHeight)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('slimScroll', slimScroll)
    .directive('starRating', starRating)
    .directive('starRatingShow', starRatingShow)
    .directive('averageRating', averageRating)
    .directive('backImg', backgroundImage)
    .directive('myAngularDirective', myAngularDirective)
    .directive('test', test)
    .directive('andyDraggable', andyDraggable)
    .directive('colorPicker', colorPicker)
    .directive('editElement', editElement)
    .directive('zoomer', zoomer)
    .directive('editContent', editContent)
    .directive('fullPath', fullPath)
    .directive('step', step)
    .directive('datePicker', datePicker)
    .directive('clockPicker', clockPicker)
    .directive('stopWatch', stopWatch)
    .directive('touchSpin', touchSpin);






function MainController($location, $cookieStore, $scope, $rootScope, $interval, $timeout, MenuByUser, $window, $store, CheckAuthentication, locale, USER_ROLES, AuthService, CurrentUser, Session, AUTH_EVENTS, $modal)
{

    $scope.editing = false;
    $scope.$watch(function () {
        return $location.path();
    }, function (value) {
        console.log(value);

        if (value.indexOf('/user/document/edit/') >= 0) {
            $scope.editing = true;
        } else {
            $scope.editing = false;
        }
    });

    var loadingStart = function () {
        $window.loading_screen = $window.pleaseWait({
            logo: "images/logo1.png",
            backgroundColor: '#ffffff',
            loadingHtml: "<div style='padding-left:10px;padding-bottom:10px' class='loading-message text-center'>Please Wait ...</div><div class='sk-spinner sk-spinner-rotating-plane'></div>"
        });
    };

    var loadingFinished = function () {
        $window.loading_screen.finish();
    };


    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;
    Session.create(0, 0, 'au');
    $rootScope.currentUser = null;
    $scope.navCollapsed = true;
    $scope.embed = false;
    $scope.sidebar = false;
    //$rootScope.isLoading = true;



    if ($cookieStore.get('COOKIE_LOCALE_LANG')) {
        var stLang = $cookieStore.get('COOKIE_LOCALE_LANG');
        $rootScope.setCurrentLanguageByCode(stLang);
        $rootScope.changeLag($rootScope.lang);
    } else {
        $rootScope.changeLag($rootScope.lang);
    }




    $scope.navigate = function (url) {
        if (window.innerWidth < 990) {
            $scope.navCollapsed = !$scope.navCollapsed;
        }
        $rootScope.go(url);
    };


    $(window).resize(function () {
        $scope.$apply(function () {
            if (window.innerWidth > 990) {
                $scope.navCollapsed = false;
            } else {
                $scope.navCollapsed = true;
            }
        });
    });
    $scope.currentPage = 1;

    $scope.allNotification = function () {
        $rootScope.go('allNotification');
    };

    $scope.setCurrentUser = function () {

        if (!$rootScope.firstLogin) {
            $rootScope.go('login');
        }
        $rootScope.hideLogin = true;

        // loadingStart();
        CurrentUser.get().then(function (result) {
            $scope.currentUser = result;

            var groupId = parseInt($scope.currentUser.roles[0].id);

            $store.set('gId', groupId);
            $rootScope.currentUser = $scope.currentUser;
            Session.create($scope.currentUser.id, $scope.currentUser.id, $scope.currentUser.roles[0].name);
            if ($scope.currentUser) {
                var params = {};
                MenuByUser.customGET('', params).then(function (result) {
                    $scope.menues = result.menus;
                    $rootScope.go($scope.menues[0].view_name);


                    //  loadingFinished();
                }, function (error) {

                });
            }

        }, function (error) {
            $scope.checkAuthentication();
            Session.create(0, 0, 'au');
            // loadingFinished();

        });
    };


    $scope.$on(AUTH_EVENTS.loginSuccess, $scope.setCurrentUser);


    var login = AuthService.isAuthenticated();

    $scope.logout = function () {
        $rootScope.hideLogin = false;
        AuthService.logOut();
        Session.destroy();
        Session.create(0, 0, 'au');
        $scope.currentUser = null;
        $store.set('gId', "");
        $rootScope.go('index');


    };
    if ($store.get('access_token')) {
        //if (self === top && window.menubar.visible) {
        $scope.setCurrentUser();
        // }
    }
    $scope.checkAuthentication = function () {
        CheckAuthentication.get().then(function (data) {


        }, function (error) {
            var refresh_token = $store.get('refresh_token');
            if (refresh_token) {
                var signInDetails = {
                    refresh_token: refresh_token,
                    client_id: 2,
                    client_secret: 'RX586LXPT8nFzNEQcwXYIvn7bzA9NLoYOKGiaikd',
                    grant_type: 'refresh_token'
                };
                AuthService.login(signInDetails).then(function (user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                }, function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    $scope.user = {
                        username: '',
                        password: ''
                    };
                    $scope.logout();
                });
            } else {
                $scope.logout();
            }
        });
    };

    $interval(function () {
        if ($store.get('access_token')) {
            // if (self == top && window.menubar.visible) {
            $scope.checkAuthentication();
            //}
        }
    }, 10000);

    $scope.goToHome = function () {
        if ($scope.isAuthorized($scope.userRoles.consumer) || $scope.isAuthorized($scope.userRoles.generalAdmin)) {
            $rootScope.go('user/dashboard');
        } else
            if ($scope.isAuthorized($scope.userRoles.admin)) {
                $rootScope.go('routeManagement');
            }
    };


}
function LoginController($scope, locale, $rootScope, AUTH_EVENTS, AuthService, $auth, PostRemind, sweetAlert, $modal)
{

    $rootScope.logo = false;
    $rootScope.isFooter = false;//hide show footer

    $scope.$parent.embed = false;
    $scope.isLoginPage = false;
    $scope.forgotPw = false;
    $scope.login = true;
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.loginAccount = function () {
        $scope.login = true;
        $scope.forgotPw = false;
    };

    $scope.forgotPassword = function () {
        $scope.forgotPw = true;
        $scope.login = false;
    };

    $scope.forgetPassword = function () {

        var modalInstance = $modal.open({
            size: 'md',
            templateUrl: 'views/user/contactAdmin.html',
            controller: 'ContactAdminController'
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };
    $scope.sendEmail = function () {

        if ($scope.resetEmail) {
            var reset = {email: $scope.resetEmail};
            PostRemind.post(reset).then(function (data, headers) {
                sweetAlert.swal({
                    title: locale.getString('common.resetSent'),
                    html: locale.getString('common.resetMessage'),
                    type: "success",
                    confirmButtonText: "Ok"
                }, function () {
                });


                $scope.resetEmail = '';

            }, function (error) {
                sweetAlert.swal({
                    title: locale.getString('common.error'),
                    html: locale.getString('common.errorReset'),
                    type: "error",
                    confirmButtonText: "Ok"
                }, function () {
                });

            });
        }
    };


    $scope.signIn = function () {
        var credentials = {
            email: $scope.user.username,
            password: $scope.user.password
        };
        AuthService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        }, function (error) {
            sweetAlert.swal({
                title: locale.getString('common.error'),
                html: locale.getString('common.credentialsWrong'),
                type: "error",
                confirmButtonText: "Ok"
            }, function () {
            });

            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.user = {
                username: '',
                password: ''
            };
        });
    };


    $scope.authenticate = function (provider) {


        $auth.authenticate(provider).then(function (response) {

            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        })
            .catch(function (response) {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });

    };


}

function RegisterController($scope, $timeout, flash, User, $rootScope, $modal, $stateParams, AuthService, AUTH_EVENTS, sweetAlert)
{
    $scope.registerFlashMessage = false;
    $scope.registerFirst = true;
    $scope.registerSecond = false;
    $scope.fromCampaign = false;

    $scope.entity = {
        company_name: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        mobile: '',
        password: '',
        password_repeat: '',
    };

    $scope.goRegister = function (value) {

        if ($scope.entity) {
            $scope.registerFlashMessage = false;


            var modalWait = sweetAlert.swal({
                title: "Please wait.....",
                html: "We're creating your user",
                onOpen: function () {

                    sweetAlert.swal({
                        title: 'Success!',
                        html: "You've successfully registered",
                        type: "success",
                        confirmButtonText: "Ok"
                    }, function () {

                        $scope.signIn();
                    });


                    swal.showLoading();
                }
            });


            User.create($scope.entity).then(function (data, headers) {
                sweetAlert.swal.close();

                currentUser = data.data;
                $scope.passwordConfirm = '';
                $scope.signIn();
            }, function (error) {
                sweetAlert.swal.close();

                sweetAlert.swal({
                    title: "Error!",
                    html: "Sorry, but we're having trouble registering you.",
                    type: "error",
                    confirmButtonText: "Ok"
                }, function () {
                    $scope.fromCampaign = false;
                });


            });
        }

    };


    $scope.registerPrrevious = function () {
        $scope.registerFirst = true;
    };
    $scope.registerNext = function () {
        $scope.registerFirst = false;
        $scope.registerSecond = true;
    };
    if ($stateParams.entitytId) {
        $scope.entitytId = $stateParams.entitytId;
    }

    $scope.screenLoad = true;


    if ($stateParams.emailAddress) {
        $scope.entity.email = $stateParams.emailAddress;
        $scope.entity.username = $stateParams.emailAddress;

        $scope.fromCampaign = true;
        $scope.goRegister(0);
    }

    $rootScope.logo = true;


    $scope.passwordConfirm = '';
    $scope.saveCustomer = function (status, response) {
        if (!response.error) {
            $scope.entity.token = response.id;
            $scope.submit();
        } else
            if (response.error.code == 'invalid_expiry_year') {
                flash.error = response.error.message;
            } else
                if (response.error.code == 'invalid_expiry_month') {
                    flash.error = response.error.message;
                }
                else
                    if (response.error.code == 'incorrect_number') {
                        flash.error = response.error.message;
                    }

    };

    var EnitityRepository = User;

    $scope.countries = countriesList;
    $scope.term = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/termsAndCondition.html',
            controller: 'TermAndConditionController',
        });
        modalInstance.result.then(function (order) {
        }, function () {

        });
    };

    var cal = (100 / 6);
    $scope.registerPercentage = function () {
        $scope.screenLoad = false;
        $scope.registraterPageTotal = 0;
        if ($scope.entity.first_name !== "" && !angular.isUndefined($scope.entity.first_name)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.last_name !== "" && !angular.isUndefined($scope.entity.last_name)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.email !== "" && !angular.isUndefined($scope.entity.email)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.mobile !== "" && !angular.isUndefined($scope.entity.mobile)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.password !== "" && !angular.isUndefined($scope.entity.password)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.password_confirmation !== "") {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }

        $scope.screenLoad = true;
    };

    var currentUser = {};


    $scope.signIn = function () {
        var credentials = {
            username: $scope.entity.email,
            password: $scope.entity.password,
            client_id: 2,
            client_secret: 'RX586LXPT8nFzNEQcwXYIvn7bzA9NLoYOKGiaikd',
            grant_type: 'password'
        };
        AuthService.login(credentials).then(function (user) {
            $rootScope.firstLogin = true;
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.dataLoading = false;
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.user = {
                username: '',
                password: ''
            };
            $scope.dataLoading = false;
        });
    };



}


function TermAndConditionController($scope, $modalInstance)
{
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
function LoginPopUpController($scope, AUTH_EVENTS, AuthService, flash, $modalInstance, $rootScope)
{


    $scope.login = true;
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.close = function () {
        $modalInstance.dismiss('cancel');//close modal
        $rootScope.go('login');
    };

    $scope.signIn = function () {//sign in

        var credentials = {
            username: $scope.user.username,
            password: $scope.user.password,
            client_id: 2,
            client_secret: 'RX586LXPT8nFzNEQcwXYIvn7bzA9NLoYOKGiaikd',
            grant_type: 'password',
            scope: ""
        };

        AuthService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $modalInstance.close();

        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.user = {
                username: '',
                password: ''
            };
            flash.error = 'Username or Password is invalid. Or User is banned. Contact admin.';
        });
    };


    $scope.goRegister = function () {
        $rootScope.go('register');
        $modalInstance.dismiss('cancel');

    };

}

/**
 * Created by Diamatic.ltd on 10/5/2015.
 */

var countriesList = [
    {"name": "Australia", "code": "AU"}
]

/**
 * Created by Anthony on 11/30/2015.
 */

'use strict';

function RegisterConfirmationController($scope, $stateParams, flash, $http, $window)
{


    if ($stateParams.code) {
        $scope.codeHash = $stateParams.code;
    }

    $scope.$parent.isLoginTemp = true;
    $scope.$parent.myAccount = false;

    $scope.goToLogin = function () {
        $window.open('/#/login', '_self');
    }

    $scope.confirmed = false;

    $scope.confirmCode = function () {
        if ($scope.codeHash) {
            /*   $http.defaults.headers.post['Content-Type'] = 'application/json';*/

            /*  var confirmation_code = "activation_code=" +$scope.codeHash;*/

            var confirmation_code = {activation_code: $scope.codeHash};

            $http.post(dbSever + 'activateUser', confirmation_code
            )
                .success(function (data, status, headers, config) {

                    flash.success = 'Successfully confirmed your account!';
                    $scope.confirmed = true;
                })
                .error(function (data, status, headers, config) {

                    flash.error = 'Your confirmation key is wrong. Please check your email and try again.';
                });
        }
    }
}

/**
 * @desc controller that show profile of current user
 * @param $scope, flash, $sce, fileReader, $rootScope, UserRepository, GetEmail, MailingRepository, PhoneVerify, PhoneVerifyCode, GetVerificationNumber
 * @return
 */
'use strict';

function ProfileController(USER_ROLES, $scope, flash, $sce, fileReader, $rootScope, UserRepository, User)
{
    // show profile to update contact
    $scope.profileShow = true;
    $scope.password_change = false;
    $scope.passwordConfirm = '';
    $scope.userRoles = USER_ROLES;
    $scope.hidePic = true;
    $scope.dataLoading = false;
    $scope.hideProfilePic = false;

    /**
     * @desc edit the profile details of current user
     * @param
     * @return
     */
    $scope.contactEdit = function () {
        // update profile
        $scope.profileShow = false;
    };

    /**
     * @desc get current users details
     * @param
     * @return
     */
    $scope.getUsers = function () {
        User.get($scope.currentUser.id).then(function (result) {
            $scope.entity = result.data;

            // if(!$scope.$$phase){
            //    $scope.$apply(function () {
            $scope.$parent.currentUser.avatar = $scope.entity.avatar;
            $scope.$parent.currentUser.first_name = $scope.entity.first_name;

            //        //  $scope.$apply();
            //    });
            // }

            $scope.hideProfilePic = true;

        }, function (error) {
            $rootScope.errorMessage(error, "update");
        });
    };
    $scope.getUsers();


    $scope.editing = false;


    if ($scope.$parent.currentUser.website) {
        $scope.$parent.currentUser.is_website = true;
    }


    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function (result) {
                $scope.imageSrc = result;
            });
    };

    $scope.path = '';
    $scope.countries = countriesList;

    /**
     * @desc after make changes save user details
     * @param
     * @return
     */
    $scope.save = function () {

        $scope.dataLoading = true;
        if ($scope.entity) {
            $scope.entity.picture = $scope.entity.file;

            $scope.entity.password_confirmation = $scope.passwordConfirm;
            $scope.entity.password_change = $scope.password_change;

            debugger;
            User.customPUT('', $scope.entity).then(function (data) {

                $scope.newPassword = '';
                $scope.password_change = false;
                flash.success = 'Successfully Updated Profile';

                // $scope.$parent.setCurrentUser();
                $scope.getUsers();
                $scope.entity.file = data.user.file;
                $scope.entity.profile_pic = data.user.file;
                $scope.hidePic = false;
                $scope.dataLoading = false;


            }, function (error) {
                $scope.errorMessage(error, "delete");

            });
        }
    };

    /**
     * @desc cancel update user details
     * @param
     * @return
     */
    $scope.cancel = function () {
        $rootScope.go("products");
    };

    $scope.visible = true;
    $scope.verification = true;
    $scope.error = null;
    $scope.entity = {};


    /**
     * @desc change the verificaiton number
     * @param
     * @return
     */
    $scope.change = function () {
        $scope.visible = false;
    };

    /**
     * @desc back to previous page
     * @param
     * @return
     */
    $scope.back = function () {
        if ($scope.isAuthorized($scope.userRoles.consumer)) {
            $rootScope.go('myProperties');
        } else
            if ($scope.isAuthorized($scope.userRoles.buyer)) {
                $rootScope.go('propertyOffers');
            }
            else
                if ($scope.isAuthorized($scope.userRoles.admin)) {
                    $rootScope.go('lender');
                }
        // $scope.profileShow = !$scope.profileShow;
        // $scope.entity.file = "";
        // angular.element("input[type='file']").val(null);
    };
}

'use strict';

function UserManagementsController($scope, $modal, $rootScope, UserRepository)
{

    var EnitityRepository = UserRepository;
    $scope.entityName = "user";
    $scope.entitiesName = "users";
    $scope.search = '';
    $scope.currentPage = 1;
    $scope.group_id = 2;
    $scope.getEntities = function () {
        var params = {page: $scope.currentPage, search: $scope.search, group_id: $scope.group_id};
        EnitityRepository.getList(params).then(function (result) {
            $scope.entities = result.data;
            $scope.itemsPerPage = result.page.per_page;
            $scope.currentPage = result.page.current_page;
            $scope.totalItems = result.page.total;
            $scope.maxSize = 5;
        });
    };
    $scope.getEntities();
    $scope.delete = function (entity) {
        EnitityRepository.remove(entity).then(function () {
            $scope.entity = null;
            $scope.getEntities();
            var success = 'Deletion of' + ' ' + $scope.entityName + ' ' + 'completed!';
            $rootScope.successMessage("", success);
        }, function (error) {
            $rootScope.errorMessage(error, "delete");
        });
    };

    $scope.deleteConfirm = function (entity) {

        var modalInstance = $rootScope.getDeleteConfirmationModel($scope.entityName);

        modalInstance.result.then(function () {
            $scope.delete(entity);
            $scope.createEntity = 1;
        }, function () {

        });

    };

    $scope.bandConfirm = function (entity) {

        var modalInstance = $rootScope.getBanConfirmationModel($scope.entityName, entity);

        modalInstance.result.then(function () {
            $scope.getEntities();

        }, function () {

        });

    };

    $scope.unBannedUser = function (entity) {


        var modalInstance = $rootScope.getUnBanConfirmationModel($scope.entityName, entity);


        modalInstance.result.then(function () {
            $scope.getEntities();

        }, function () {

        });
    };


    $scope.moreDetails = function (entityID) {
        $rootScope.go("userManagements_edit/" + entityID);

    };
    $scope.open = function () {
        $rootScope.go("userManagements_create");
    };
}


function MoreDetailsUserManagementsModalInstanceController($scope, $stateParams, UserRepository, $rootScope, $modalInstance)
{

    $scope.entityName = "user";
    $scope.entitiesName = "users";

    $scope.countries = countriesList;
    $scope.confirm = false;
    $scope.change = false;

    $scope.confirmMessages = "";

    $scope.notMatch = "Password Not Match";

    $scope.newPassword = '';
    $scope.check = function (newPassword, confirmPassword) {
        if (newPassword != confirmPassword) {
            $scope.confirm = true;
            return $scope.confirmMessage = $scope.notMatch;
        } else {
            $scope.confirm = false;
        }
    };
    if ($stateParams.entityID) {
        $scope.entityID = $stateParams.entityID;
    }
    $scope.getUser = function () {
        UserRepository.get($scope.entityID).then(function (result) {
            $scope.entity = result;
        });
    };
    $scope.getUser();
    $scope.ok = function () {
        if ($scope.entity) {
            if ($scope.newPassword) {
                $scope.user.password = $scope.newPassword;
            }
            UserRepository.update($scope.entity).then(function () {
                // Success
                var success = 'SuccessFully update' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage("", success);
                $scope.entity = null;
                $modalInstance.close();
            }, function (error) {
                // failure
                $rootScope.errorMessage(error, "update");
            });

        }
    };

}

function NewUserManagementsController($scope, $rootScope, UserCreate)
{

    $scope.entityName = "user";
    $scope.entitiesName = "users";
    $scope.countries = countriesList;
    $scope.confirm = false;

    $scope.confirmMessages = "";

    $scope.notMatch = "Password Not Match";

    $scope.newPassword = '';
    $scope.check = function (newPassword, confirmPassword) {
        if (newPassword != confirmPassword) {
            $scope.confirm = true;
            return $scope.confirmMessage = $scope.notMatch;
        } else {
            $scope.confirm = false;
        }
    };

    $scope.entity = null;
    $scope.submit = function () {

        if ($scope.entity) {

            $scope.entity.group_id = 2;

            UserCreate.post($scope.entity).then(function (data, headers) {
                $scope.entity = null;
                var success = 'SuccessFully create' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage("", success);
                $scope.entity = null;
                $scope.user = null;
                $scope.passwordConfirm = '';
                $scope.planId = 0;
                // $window.open('/#/userManagement', '_self');

            }, function (error) {
                $rootScope.errorMessage(error, "update");
            });
        }

    };

}




/**
 * Created by Admin on 11/1/2017.
 */
function UserManagementController($scope, $rootScope, User, $stateParams, sweetAlert)
{
    $scope.entityName = 'user';
    $scope.pageIndex = 0;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.itemsPerPage = 20;
    $scope.pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
    $scope.totalItems = 0;
    $scope.requireSubscription = false;

    $scope.sortedBy = 'asc';
    $scope.orderBy = 'username';
    $scope.sort = false;
    if ($stateParams.email) {
        $scope.searchTerm = $stateParams.email;
    }

    $scope.tableHeaders = [
        {
            id: 1,
            db_name: 'username',
            label: 'username',
            lng_name: 'Username'
        },
        {
            id: 2,
            db_name: 'first_name',
            label: 'first_name NAME',
            lng_name: 'First Name'
        },
        {
            id: 3,
            db_name: 'last_name',
            label: 'last_name',
            lng_name: 'Last Name'
        },
        {
            id: 4,
            db_name: 'email',
            label: 'email',
            lng_name: 'Email'
        },
        {
            id: 5,
            db_name: 'action',
            label: 'action',
            lng_name: 'Action'
        }
        // {
        //     id : 6,
        //     db_name : 'ban',
        //     label : 'ban',
        //     lng_name : 'Ban'
        // }

    ];


    $scope.getUsers = function () {
        User.getList({
            limit: $scope.itemsPerPage,
            page: $scope.currentPage,
            search: $scope.searchTerm,
            orderBy: $scope.orderBy,
            sortedBy: $scope.sortedBy
        }).then(function (result) {
            var data = result.data;
            $scope.entities = data.data;
            $scope.totalItems = data.total;

        });

    };
    $scope.getUsers();

    $scope.order = function (orderBy) {
        $scope.sort = true;
        $scope.orderBy = orderBy;

        if ($scope.sortedBy === 'desc') {
            $scope.sortedBy = 'asc';
        } else {
            $scope.sortedBy = 'desc';
        }

    };

    $scope.$watch('orderBy', function () {
        $scope.getUsers();
    });


    $scope.$watch('sortedBy', function () {
        $scope.getUsers();
    });

    $scope.delete = function (entity) {
        User.remove(entity).then(function () {
            $scope.entity = null;
            $scope.getUsers();
            var success = 'Deletion of' + ' ' + $scope.entityName + ' ' + 'completed!';

            sweetAlert.swal({
                title: "Delete Successful!",
                html: "You've successfully deleted the user",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Delete",
                html: "Error in deleting user",
                type: "error",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        });
    };

    $scope.deleteConfirm = function (entity) {

        var modalInstance = $rootScope.getDeleteConfirmationModel($scope.entityName);

        modalInstance.result.then(function () {
            $scope.delete(entity);
            $scope.createEntity = 1;
        }, function () {

        });

    };

    $scope.bandConfirm = function (entity) {

        var modalInstance = $rootScope.getBanConfirmationModel($scope.entityName, entity);

        modalInstance.result.then(function () {
            $scope.getEntities();

        }, function () {

        });

    };

    $scope.unBannedUser = function (entity) {


        var modalInstance = $rootScope.getUnBanConfirmationModel($scope.entityName, entity);


        modalInstance.result.then(function () {
            $scope.getEntities();

        }, function () {

        });
    };


    $scope.moreDetails = function (entityID) {
        $rootScope.go("/admin/management/edit/" + entityID);

    };
    $scope.open = function () {
        $rootScope.go("/admin/management/create");
    };


}
function RegisterByInviteController(ClientCreateStripe, ClientInformation, ClientConfirmPassword, ClientConfirm, $scope, $timeout, flash, UserCreate, $rootScope, $modal, $locale, $stateParams, UserRepository, AuthService, AUTH_EVENTS, sweetAlert)
{
    $scope.registerFlashMessage = false;
    $scope.registerFirst = true;
    $scope.registerSecond = false;
    $scope.fromCampaign = false;

    $scope.entity = {
        company_name: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        mobile: '',
        password: '',
        password_repeat: '',
    };


    $scope.getCredentialsByCode = function () {
        var confirm = {code: $stateParams.code}
        ClientInformation.getList(confirm).then(function (result) {
            $scope.credentials = result.data;


        });
    }
    $scope.cardValidation = function () {
        console.log('CARD VALID');
    }
    $scope.credentialsValidation = function () {
        console.log('CREDENTIALS VALID');
    }
    $scope.passwordValidation = function () {
        console.log('PASSWORD VALID');
    }

    $scope.stepChanging = function (event, currentIndex, newIndex) {

        if (currentIndex == 0) {

            $scope.cardValidation();
        }

        if (currentIndex == 1) {

            $scope.credentialsValidation();
        }
        if (currentIndex == 2) {

            $scope.passwordValidation();
        }
    }

    $scope.stepFinishing = function (event, currentIndex, newIndex) {


        if (currentIndex == 2) {

            $scope.addClient();


        }


    }

    $scope.getCredentialsByCode();


    $scope.addStripe = function () {

        var confirm = {
            code: $stateParams.code,

        };

        ClientCreateStripe.create(confirm).then(function (result) {
            confirm = result.data;
            sweetAlert.swal({
                title: "Success",
                html: "",
                type: "success",
                confirmButtonText: "Ok"
            }, function () {
            });
        }, function (error) {

            sweetAlert.swal({
                title: "Error",
                html: "",
                type: "error",
                confirmButtonText: "Ok"
            }, function () {
            });
        })

    }


    $scope.addClient = function (email, first_name, last_name, mobile, password, password_confirmation) {


        var confirm = {

            email: $scope.entity.email,
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            mobile: $scope.mobile,
            password: $scope.client.password,
            password_confirmation: $scope.client.passwordConfirm,
            code: $stateParams.code
        }


        ClientConfirm.create(confirm).then(function (result) {

            confirm = result.data;
            sweetAlert.swal({
                title: " You have registered!",
                html: "Your account has been created!       ",
                type: "success",
                confirmButtonText: "Ok"
            }, function () {
            });
            $scope.signIn();

        }, function (error) {

            sweetAlert.swal({
                title: "Error",
                html: "Sorry, but we're having trouble registering you.",
                type: "error",
                confirmButtonText: "Ok"
            }, function () {
            });
        });


    }


    // }


    $scope.goRegister = function (value) {

        if ($scope.entity) {
            $scope.registerFlashMessage = false;
            var password = $rootScope.makeId(8);
            $scope.entity.password = password;
            $scope.entity.password_confirmation = password;


            var modalWait = sweetAlert.swal({
                title: "Please wait.....",
                html: "We're creating your user",
                onOpen: function () {
                    swal.showLoading();
                }
            });


            UserRepository.post($scope.entity).then(function (data, headers) {
                sweetAlert.swal.close();

                currentUser = data.data;
                $scope.passwordConfirm = '';
                $scope.signIn();
            }, function (error) {
                sweetAlert.swal.close();

                sweetAlert.swal({
                    title: "Error!",
                    html: "Sorry, but we're having trouble registering you.",
                    type: "error",
                    confirmButtonText: "Ok"
                }, function () {
                    $scope.fromCampaign = false;
                });


            });
        }

    };


    $scope.registerPrrevious = function () {
        $scope.registerFirst = true;
    };
    $scope.registerNext = function () {
        $scope.registerFirst = false;
        $scope.registerSecond = true;
    };
    if ($stateParams.entitytId) {
        $scope.entitytId = $stateParams.entitytId;
    }

    $scope.screenLoad = true;


    if ($stateParams.emailAddress) {
        $scope.entity.email = $stateParams.emailAddress;
        $scope.entity.username = $stateParams.emailAddress;

        $scope.fromCampaign = true;
        $scope.goRegister(0);
    }

    $rootScope.logo = true;


    $scope.passwordConfirm = '';
    $scope.saveCustomer = function (status, response) {
        if (!response.error) {
            $scope.entity.token = response.id;
            $scope.addStripe();

        } else
            if (response.error.code == 'invalid_expiry_year') {
                sweetAlert.swal({
                    title: "Error",
                    html: "Sorry, but we're having trouble adding your card",
                    type: "error",
                    confirmButtonText: "Ok"
                }, function () {
                });
            } else
                if (response.error.code == 'invalid_expiry_month') {
                    sweetAlert.swal({
                        title: "Error",
                        html: "Sorry, but we're having trouble adding your card",
                        type: "error",
                        confirmButtonText: "Ok"
                    }, function () {
                    });
                }
                else
                    if (response.error.code == 'incorrect_number') {
                        sweetAlert.swal({
                            title: "Error",
                            html: "Sorry, but we're having trouble adding your card",
                            type: "error",
                            confirmButtonText: "Ok"
                        }, function () {
                        });
                    }

    };


    var EnitityRepository = UserCreate;

    $scope.countries = countriesList;
    $scope.term = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/termsAndCondition.html',
            controller: 'TermAndConditionController',
        });
        modalInstance.result.then(function (order) {
        }, function () {

        });
    };

    var cal = (100 / 6);
    $scope.registerPercentage = function () {
        $scope.screenLoad = false;
        $scope.registraterPageTotal = 0;
        if ($scope.entity.first_name !== "" && !angular.isUndefined($scope.entity.first_name)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.last_name !== "" && !angular.isUndefined($scope.entity.last_name)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.email !== "" && !angular.isUndefined($scope.entity.email)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.mobile !== "" && !angular.isUndefined($scope.entity.mobile)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.password !== "" && !angular.isUndefined($scope.entity.password)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.password_confirmation !== "") {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }

        $scope.screenLoad = true;
    };

    var currentUser = {};


    $scope.signIn = function () {
        var credentials = {
            username: $scope.entity.email,
            password: $scope.client.password,
            client_id: 9,
            client_secret: 'acmvofDnPVmMTkeV8uSPyUR4I78Bpa3zp9lSol1J',
            grant_type: 'password'
        };
        AuthService.login(credentials).then(function (user) {
            $rootScope.firstLogin = true;
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.dataLoading = false;
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.user = {
                username: '',
                password: ''
            };
            $scope.dataLoading = false;
        });
    };


    function TermAndConditionController($scope, $modalInstance)
    {
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
}
function ForgetPasswordController($scope, PostReset, $stateParams, sweetAlert, locale)
{
    $scope.goToLogin = function () {
        $window.open('/#/login', '_self');
    };

    $scope.user = {};

    if ($stateParams.code) {
        $scope.codeHash = $stateParams.code;
    }

    $scope.resetPassword = function () {

        if ($scope.user) {
            var reset = {
                email: $scope.user.email,
                password: $scope.user.password,
                password_confirmation: $scope.user.password,
                token: $scope.codeHash
            };

            PostReset.post(reset).then(function (data, headers) {
                // Success
                $scope.user = null;
                $scope.resetSuccess = true;
                sweetAlert.swal({
                    title: locale.getString('common.success'),
                    html: locale.getString('common.resetPasswordSuccess'),
                    type: "success",
                    confirmButtonText: "Ok"
                }, function () {
                });
            }, function (error) {
                // failure
                sweetAlert.swal({
                    title: locale.getString('common.error'),
                    html: locale.getString('common.resetPasswordError'),
                    type: "error",
                    confirmButtonText: "Ok"
                }, function () {
                });

            });
        }
    };
}
function DeleteConfirmModalInstanceController($scope, $modalInstance, entityName)
{
    $scope.entityName = entityName;

    $scope.deleteEntity = function () {
        $modalInstance.close(); //close modal
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');//close modal
    };
}
function RouteManagementController($scope, $rootScope, AllRoutes, AddRemovePermissionToRole)
{


    var getEntities = function () {

        AllRoutes.customGET('', {}).then(function (data, headers) {
            $scope.entities = data;
        }, function (error) {

        });
    };
    getEntities();

    $scope.update = function (entity, route) {
        var permissionId = 0;
        if (route.permissionId) {
            permissionId = route.permissionId;
        }
        var params = {roleId: entity.id, permissionId: permissionId, permission: route.permission, name: route.name};
        AddRemovePermissionToRole.post(params).then(function (data) {
            var success = 'Successfully updated';
            $rootScope.successMessage("", success);
        }, function (error) {
            $rootScope.errorMessage(error, "update");
        });
    };
}


/*
'use strict';
function RouteManagementController(USER_ROLES,$scope,$rootScope,AllRoutes,AddRemovePermissionToRole, flash, $sce, fileReader, $rootScope, UserRepository, GetEmail, MailingRepository, PhoneVerify, PhoneVerifyCode, GetVerificationNumber) {
    // show profile to update contact
    $scope.profileShow = true;
    $scope.password_change = false;
    $scope.passwordConfirm = '';
    $scope.userRoles = USER_ROLES;
    $scope.hidePic = true;
    $scope.dataLoading = false;
    $scope.hideProfilePic = false;

  
    $scope.contactEdit = function () {
        // update profile
        $scope.profileShow = false;
    };

    
    $scope.getUsers = function () {
        UserRepository.get($scope.currentUser.id).then(function (result) {
            $scope.entity = result;

             // if(!$scope.$$phase){
             //    $scope.$apply(function () {
                    $scope.$parent.currentUser.avatar = $scope.entity.avatar;
                    $scope.$parent.currentUser.first_name = $scope.entity.first_name;

             //        //  $scope.$apply();
             //    });
             // }

            $scope.hideProfilePic = true;

        }, function (error) {
            $rootScope.errorMessage(error, "update");
        });
    };
    $scope.getUsers();

   
    $scope.getEntities = function () {
        // get all emails or message sent to an user
        GetEmail.customGET('', {}).then(function (result) {

            $scope.mailing = result.data;

            for (var i = 0; i < $scope.mailing.length; i++) {
                if ($scope.mailing[i].marketing_type == 'EMAIL_1_DAY') {
                    $scope.mailing[i].message = 'Send Email Before One Day';
                } else if ($scope.mailing[i].marketing_type == 'EMAIL_1_WEEK') {
                    $scope.mailing[i].message = 'Send Email Before One Week';
                } else if ($scope.mailing[i].marketing_type == 'EMAIL_1_MONTH') {
                    $scope.mailing[i].message = 'Send Email Before One Month';
                } else if ($scope.mailing[i].marketing_type == 'ALERT_1_DAY') {
                    $scope.mailing[i].message = 'Send Message Before One Day'
                } else if ($scope.mailing[i].marketing_type == 'ALERT_1_WEEK') {
                    $scope.mailing[i].message = 'Send Message Before One Week';
                } else if ($scope.mailing[i].marketing_type == 'ALERT_1_MONTH') {
                    $scope.mailing[i].message = 'Send Message Before One Month';
                }


            }

            for (var i = 0; i < $scope.mailing.length; i++) {
                if ($scope.mailing[i].is_enabled == 1) {
                    $scope.mailing[i].is_enabled = true;
                } else if ($scope.mailing[i].is_enabled == 0) {
                    $scope.mailing[i].is_enabled = false;
                }

            }

        }, function (error) {
        });
    };
    $scope.getEntities();

   
    $scope.updateOnOff = function (mail) {

        if (mail) {

            MailingRepository.get(mail.id).then(function (result, headers) {

                result.is_enabled = mail.is_enabled;

                MailingRepository.update(result).then(function (data, headers) {
                    var success = 'Successfully Updated';
                    $rootScope.successMessage("", success);
                }, function (error) {
                    $rootScope.errorMessage(error, "update");
                });
            }, function (error) {
                $rootScope.errorMessage(error, "update");
            });
        }
    };

    $scope.editing = false;


    if ($scope.$parent.currentUser.website) {
        $scope.$parent.currentUser.is_website = true;
    }


    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function (result) {
                $scope.imageSrc = result;
            });
    };

    $scope.path = '';
    $scope.countries = countriesList;


    $scope.save = function () {

        $scope.dataLoading = true;
        if ($scope.entity) {
            $scope.entity.picture = $scope.entity.file;

            $scope.entity.password_confirmation = $scope.passwordConfirm;
            $scope.entity.password_change = $scope.password_change;
            UserRepository.update($scope.entity).then(function (data) {

                $scope.newPassword = '';
                $scope.password_change = false;
                flash.success = 'Successfully Updated Profile';

                // $scope.$parent.setCurrentUser();
                $scope.getUsers();
                $scope.entity.file = data.user.file;
                $scope.entity.profile_pic = data.user.file;
                $scope.hidePic = false;
                $scope.dataLoading = false;


            }, function (error) {
                $scope.errorMessage(error, "delete");

            });
        }
    };


    $scope.cancel = function () {
        $rootScope.go("products");
    };

    $scope.visible = true;
    $scope.verification = true;
    $scope.error = null;
    $scope.entity = {};


    $scope.verify = function () {
        var params = {number: $scope.entity.phoneNumber};
        PhoneVerify.post(params).then(function (data, headers) {
            $scope.code = data.data;
            $scope.verification = false;
            $scope.error = null;

            $scope.entity = null;
        }, function (error) {
            // $rootScope.errorMessage(error, "Unable to update the card details!");
            $scope.error = "Please Enter the Correct Number";
            $scope.verification = true;
        });
    }


    $scope.verifyCode = function () {
        var params = {code: $scope.entity.verifyCode};
        PhoneVerifyCode.post(params).then(function (data, headers) {
            var success = 'Successfully verified your number';
            $rootScope.sweetAlert("Verified", success, "success");
            $scope.visible = true;
            $scope.verification = true;
            $scope.getVerification();
            $scope.entity = null;

        }, function (error) {
            // $rootScope.errorMessage(error, "Unable to update the card details!");
            $scope.notverifiedNumbrer = "please Enter the Correct Code";

        });
    }


    $scope.getVerification = function () { //get properties of user

        GetVerificationNumber.customGET('', {}).then(function (result) {
            $scope.verifyNumber = result.data;
            $scope.visible = true;
        }, function (error) {
            $scope.visible = false;
        });
    };
    $scope.getVerification();


    $scope.change = function () {
        $scope.visible = false;
    };


    $scope.back = function () {
        if ($scope.isAuthorized($scope.userRoles.consumer)) {
            $rootScope.go('myProperties');
        } else if ($scope.isAuthorized($scope.userRoles.buyer)) {
            $rootScope.go('propertyOffers');
        }
        else if ($scope.isAuthorized($scope.userRoles.admin)) {
            $rootScope.go('lender');
        }
        // $scope.profileShow = !$scope.profileShow;
        // $scope.entity.file = "";
        // angular.element("input[type='file']").val(null);
    };
}
*/
function MenuManagementController($scope, $rootScope, AllMenuesByRole, AddRemoveMenuToRole)
{

    var getEntities = function () {

        AllMenuesByRole.customGET('', {}).then(function (data, headers) {
            $scope.entities = data;
        }, function (error) {

        });
    };
    getEntities();

    $scope.update = function (entity, menu) {

        var params = {roleId: entity.id, menuId: menu.id, permission: menu.permission};
        AddRemoveMenuToRole.post(params).then(function (data) {
            var success = 'Successfully updated';
            //$rootScope.successMessage("",success);
        }, function (error) {
            //$rootScope.errorMessage (error,"update");
        });
    };

}
function TopNavigationBarController($scope)
{


}
function BillingInfoController(SaveBillingExpire, PaymentMethodDetailsByCustomer, $modal, UserRepository, GetBillingData, SaveBillingData, $scope, flash, $rootScope, $locale)
{
    // customer's credit card is saved
    $scope.trial = false;

    $scope.entity = {};

    /**
     * @desc save customer in stripe
     * @param status, response
     * @return
     */
    $scope.paymentMethodDetails = {};
    $scope.saveCustomer = function (status, response) {
        if (!response.error) {
            $scope.paymentMethodDetails.token = response.id;
            $scope.submit();
        } else
            if (response.error.code) {
                flash.error = response.error.message;
            }
    };

    /**
     * @desc save credit card details
     * @param
     * @return
     */
    $scope.submit = function () {
        $scope.isLoading = true;
        if ($scope.paymentMethodDetails) {

            $scope.paymentMethodDetails.group_id = 2;

            SaveBillingExpire.post($scope.paymentMethodDetails).then(function (data, headers) {

                UserRepository.get($scope.currentUser.id).then(function (result) {
                    var user = result;
                    user.city = $scope.currentUser.city;
                    user.address_line_1 = $scope.currentUser.address_line_1;
                    user.address_line_2 = $scope.currentUser.address_line_2;
                    user.state = $scope.currentUser.state;

                    UserRepository.update(user).then(function (data) {
                        var success = 'Thanks. Successfully Saved.';
                        $rootScope.successMessage("", success);
                        $scope.passwordConfirm = '';
                        $scope.paymentMethodDetails = null;
                        $scope.getPaymentMethodDetails();
                        $scope.isLoading = false;
                    }, function (error) {
                        $rootScope.errorMessage(error, "delete");
                        $scope.isLoading = false;
                    });
                });

            }, function (error) {
                $rootScope.errorMessage(error, "delete");
                $scope.isLoading = false;
            });
        }
    };

    /**
     * @desc get credit card details of the user
     * @param
     * @return
     */
    $scope.getPaymentMethodDetails = function () {
        // when loading
        $scope.isLoading = true;

        PaymentMethodDetailsByCustomer.customGET('', {}).then(function (result) {
            $scope.paymentMethodDetails = result;

            if ($scope.paymentMethodDetails) {
                $scope.trial = true;
            } else {
                $scope.trial = false;
            }
            $scope.isLoading = false;
        }, function (error) {
            $scope.isLoading = false;
        });
    };
    $scope.getPaymentMethodDetails();

    /**
     * @desc update credit card details of the user
     * @param entity
     * @return entity
     */
    $scope.updateModal = function (entity) {
        $scope.isModelOpen = true;
        var modalInstance = $modal.open({
            templateUrl: 'views/editCreditCard.html',
            controller: 'EditCreditCardController',
            backdrop: 'static',
            resolve: {
                entity: function () {
                    return entity;
                }
            }

        });
        modalInstance.result.then(function () {
            $scope.isModelOpen = false;
            $scope.getPaymentMethodDetails();

        }, function () {
            $scope.isModelOpen = false;
        });
    };

    /**
     * @desc update a credit card in stripe into default payment method
     * @param
     * @return
     */
    $scope.changeDefaultModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/changeDefaultCreditCard.html',
            controller: 'ChangeDefaultCreditCardController',
            // when clicking outside of modal disable closing the modal
            backdrop: 'static',


        });
        modalInstance.result.then(function () {
            // after modal closing get updated credit cards
            $scope.getPaymentMethodDetails();

        }, function () {

        });
    };

    /**
     * @desc open modal for delete credit card and its details
     * @param
     * @return
     */
    $scope.deleteCard = function (entity) {
        var modalInstance = $modal.open({
            templateUrl: 'views/deleteCard.html',
            controller: 'DeleteCardController',
            // when clicking outside of modal disable closing the modal
            backdrop: 'static',

            resolve: {
                entity: function () {
                    // entity is the credit card id. This is passed to modal
                    return entity;
                }
            }


        });
        modalInstance.result.then(function () {

            $scope.getPaymentMethodDetails();

        }, function () {

        });
    };
}


/**
 * @desc edit credit card details of the user
 * @param $scope, $modalInstance, PaymentMethodDetailsByCustomer, UpdateCreditCardDetails, $rootScope, CreateCreditCard, flash, CardDetails, entity
 * @return
 */
function EditCreditCardController($scope, $modalInstance, PaymentMethodDetailsByCustomer, UpdateCreditCardDetails, $rootScope, CreateCreditCard, flash, CardDetails, entity)
{
    // before save button clicked
    $scope.saveChange = true;

    // credit card id
    $scope.card_id = entity;

    // show hide edit credit card and enter new credit card
    $scope.edit = 0;

    // if there is no credit card then add new
    if (entity == null) {
        $scope.edit = 1;

        // make default is used for setting a credit card as default credit card
        $scope.paymentMethodDetails = {makeDefault: false};
    }
    else {
        // show edit credit card form
        $scope.edit = 0;
    }

    /**
     * @desc get credit card details of the user
     * @param
     * @return
     */
    $scope.getPaymentMethodDetails = function () {
        // when loading
        $scope.isLoading = true;

        // get details of the selected credit card
        CardDetails.customGET('', {card_id: $scope.card_id}).then(function (result) {
            $scope.paymentMethodDetails = result.data;
            var exp_month = '' + $scope.paymentMethodDetails.exp_month;
            if (exp_month.length == 1) {
                exp_month = '0' + exp_month;
                $scope.paymentMethodDetails.exp_month = exp_month;

            }
            // loading is over
            $scope.isLoading = false;
        }, function (error) {

        });

    };

    $scope.getPaymentMethodDetails();
    // wait after loading
    $scope.isLoading_save = false;

    /**
     * @desc save customer in stripe
     * @param status, response
     * @return
     */
    $scope.saveCustomer = function (status, response) {

        if (!response.error) {
            $scope.token = response.id;
            $scope.submit();
        } else
            if (response.error.code == 'invalid_expiry_year') {
                flash.error = response.error.message;
            } else
                if (response.error.code == 'invalid_expiry_month') {
                    flash.error = response.error.message;
                } else
                    if (response.error.code == 'incorrect_number') {
                        flash.error = response.error.message;
                    }

        /* else if(response.error){
         flash.error = 'Unable to Create an account' + errorMsg;
         }*/
    };

    /**
     * @desc save credit card details
     * @param
     * @return
     */
    $scope.submit = function () {
        // show loading screen when saving customer in stripe
        $scope.isLoading_save = true;

        // store the card details
        var storeCardDetails = {
            customer_id: $scope.paymentMethodDetails.customer,
            card_id: $scope.paymentMethodDetails.card_id,
            stripeToken: $scope.token,

            // this has  1 and 0 values. They are used to make credit card as default payment credit card or not.
            makeDefault: $scope.paymentMethodDetails.makeDefault
        };

        // add a credit card
        CreateCreditCard.post(storeCardDetails).then(function (data, headers) {

            var success = 'Successfully added the credit card';
            $rootScope.successMessage("", success);
            $scope.isLoading_save = false;
            $modalInstance.close();
        }, function (error) {
            $scope.isLoading_save = false;
            $rootScope.errorMessage(error, "Unable to update the card details!");

        });

    };

    /**
     * @desc update a credit card in stripe
     * @param
     * @return
     */
    $scope.save = function () {
        $scope.saveChange = false;
        // when show loading screen
        $scope.isLoading = true;

        var updateDetails = {
            customer_id: $scope.paymentMethodDetails.customer,
            card_id: $scope.paymentMethodDetails.card_id,
            last4: $scope.paymentMethodDetails.last4,
            exp_month: $scope.paymentMethodDetails.exp_month,
            exp_year: $scope.paymentMethodDetails.exp_year
        };
        if (updateDetails) {
            UpdateCreditCardDetails.post(updateDetails).then(function (data, headers) {//update credit card
                var success = 'successfully updated';
                $rootScope.successMessage("", success);
                $modalInstance.close();

            }, function (error) {
                // failure
                //$rootScope.errorMessage("Unable to update the card details!");
                flash.error = "Unable to update the card details!";
                $scope.isLoading = false;
                $scope.saveChange = true;
                // $scope.isLoading_save = false;
                //$rootScope.errorMessage(error, "Unable to update the card details!");
            });
        }

    }


    $scope.cancel = function () {
        // close modal
        $modalInstance.dismiss('cancel');
    };
}

/**
 * @desc controller for update a credit card in stripe into default payment method
 * @param
 * @return
 */
function ChangeDefaultCreditCardController($scope, $rootScope, $modalInstance, PaymentMethodDetailsByCustomer, SetDefaultCard)
{
    // used to disable save and cancel button after save button clicked
    $scope.saveChange = true;
    $scope.default = "";

    /**
     * @desc get credit card details of the user
     * @param
     * @return
     */
    $scope.getPaymentMethodDetails = function () {
        // show loading animation
        $scope.isLoading = true;

        // get all cards,of user, with details
        PaymentMethodDetailsByCustomer.customGET('', {}).then(function (result) {
            $scope.paymentMethodDetails = result.cards;

            for (var i = 0; i < $scope.paymentMethodDetails.length - 1; i++) {

                if ($scope.paymentMethodDetails[i].default == 1) {

                    // card id of the default card
                    $scope.default = $scope.paymentMethodDetails[i].card_id;
                }


            }

            if ($scope.paymentMethodDetails) {
                // if there is already added cards
                $scope.trial = true;
            } else {
                // if there is no added cards show add new card form
                $scope.trial = false;
            }
            $scope.isLoading = false;
        }, function (error) {
            $scope.isLoading = false;
        });
    };
    $scope.getPaymentMethodDetails();

    /**
     * @desc this method is called after selecting a card as default card
     * @param card_id
     * @return
     */
    $scope.changeDefault = function (card_id) {
        $scope.default = card_id;
    };

    $scope.cancel = function () {
        // close modal
        $modalInstance.dismiss();
    };

    /**
     * @desc save as default card
     * @param
     * @return
     */
    $scope.save = function () {
        if ($scope.default != null && $scope.default != "") {
            // show loading
            $scope.isLoading = true;
            // disable save and cancel buttons
            $scope.saveChange = false;
            // set card as default paying card
            SetDefaultCard.post({card_id: $scope.default}).then(function (data, headers) {


                var success = 'Successfully changed default credit card';
                $rootScope.successMessage("", success);

                $modalInstance.close();

            }, function (error) {
                $rootScope.errorMessage(error, "delete");
            });
        }
    }


}

/**
 * @desc controller for delete card and its details
 * @param
 * @return
 */
function DeleteCardController($scope, entity, DeleteCard, $rootScope, $modalInstance)
{
    // id of card going to delete
    $scope.entity = entity;

    $scope.isLoading_delete = false;
    $scope.deleteEntity = function () {
        // delete card
        $scope.isLoading_delete = true;
        DeleteCard.post({card_id: $scope.entity}).then(function (data, headers) {


            var success = 'Successfully Deleted the Card';
            $rootScope.successMessage("", success);

            $modalInstance.close();
            $scope.isLoading_delete = false;
        }, function (error) {
            $scope.isLoading_delete = false;
            $rootScope.errorMessage(error, "delete");
        });

    };

    /**
     * @desc close modal
     * @param
     * @return
     */
    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}

function MenusController($scope, $rootScope, $modal, MenuRepository)
{

    var EnitityRepository = MenuRepository;
    $scope.entityName = "menu";
    $scope.entitiesName = "menus";
    $scope.createEntity = 1;
    $scope.entity = null;
    $scope.search = '';
    $scope.currentPage = 1;

    $scope.getEntities = function () {
        var params = {page: this.currentPage, search: $scope.search};
        EnitityRepository.getList(params).then(function (result) {
            $scope.entities = result.data.data;
            $scope.itemsPerPage = result.data.per_page;
            $scope.currentPage = result.data.current_page;
            $scope.totalItems = result.data.total;
            $scope.maxSize = 0;

        }, function (error) {

        });
    };
    $scope.getEntities();

    $scope.selectedCategoryId = 0;
    $scope.setEntity = function (entity) {
        EnitityRepository.get(entity.id).then(function (result) {
            $scope.entity = result;
            $scope.createEntity = 0;
        }, function (error) {
        });
    };
    $scope.create = function () {

        if ($scope.entity) {

            $scope.entity.order_number = 40;

            EnitityRepository.create($scope.entity).then(function (result, headers) {
                var action = 'Successfully Created ' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage(result, action);
                $scope.entity = null;
                $scope.getEntities();
            }, function (error) {

                $rootScope.errorMessage(error, "create");
            });
        }
    };

    $scope.createEnable = function () {
        $scope.entity = null;

        $scope.createEntity = 1;
    };

    $scope.update = function () {

        if ($scope.entity) {

            if ($scope.entity.change_tile_image) {
                $scope.entity.tile_image = $scope.entity.change_tile_image;
            } else {
                delete $scope.entity.tile_image;
            }

            EnitityRepository.update($scope.entity).then(function (result) {
                var success = 'Successfully updated' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage(result, success);
                $scope.entity = null;
                $scope.createEntity = 1;
                $scope.getEntities();
            }, function (error) {
                $rootScope.errorMessage(error, "update");
                $scope.getEntities();
            });
        }
    };

    $scope.delete = function (entity) {
        EnitityRepository.remove($scope.entity).then(function () {
            $scope.entity = null;
            $scope.getEntities();
            var success = 'Deletion of' + ' ' + $scope.entityName + ' ' + 'completed!';
            $rootScope.successMessage("", success);
        }, function (error) {
            $rootScope.errorMessage(error, "delete");
        });
    };

    $scope.deleteConfirm = function (entity) {

        var modalInstance = $modal.open({
            templateUrl: 'views/deleteConfirmation.html',
            controller: 'DeleteConfirmModalInstanceController',
            resolve: {
                entityName: function () {
                    return $scope.entityName;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.delete(entity);
            $scope.createEntity = 1;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}

'use strict';

function PaymentsManagementController(Payment, $scope, $rootScope)
{

    var EnitityRepository = Payment;


    Payment.getList().then(function (result) {
        $scope.entities = result.data;
        //console.log($scope.entities);

    });


};
'use strict';

function PaymentsSettingsController()
{

};
/**
 * Created by Admin on 10/26/2017.
 */
function UserCreateController($scope, User, $rootScope, sweetAlert)
{
    $scope.entityName = "user";
    $scope.entitiesName = "users";
    $scope.countries = countriesList;
    $scope.userRoles = [{"name": "General Admin", "id": 3}, {"name": "General User", "id": 1}];
    $scope.confirm = false;
    $scope.update = false;

    $scope.confirmMessages = "";
    $scope.notMatch = "Password Not Match";
    $scope.newPassword = '';

    $scope.entity = null;
    $scope.submit = function () {

        if ($scope.entity) {

            User.create($scope.entity).then(function (data, headers) {
                $scope.entity = null;
                var success = 'SuccessFully create' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage("", success);
                $scope.entity = null;
                $scope.user = null;
                $scope.passwordConfirm = '';
                $scope.planId = 0;
                sweetAlert.swal({
                    title: "Create Successful!",
                    html: "You've successfully create the user",
                    type: "success",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {
                    $rootScope.go('/admin/user/management');
                });
                // $rootScope.go('userDetails');
                // $window.open('/#/userManagement', '_self');

            }, function (error) {
                sweetAlert.swal({
                    title: "Unable to Create",
                    html: error.data.message,
                    type: "error",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {
                    $rootScope.go('userManagement');
                });
                //flash.message = error.data.error;
            });
        }
    };


}
/**
 * Created by Admin on 11/1/2017.
 */
/**
 * Created by Admin on 10/26/2017.
 */
function UserEditController($scope, $stateParams, User, sweetAlert, $rootScope, $modal)
{
    $scope.entityName = "user";
    $scope.entitiesName = "users";
    $scope.countries = countriesList;
    $scope.confirm = false;
    $scope.change = false;
    $scope.update = true;
    $rootScope.createCases = true;
    $scope.companyExist = false;
    $scope.hideBack = true;
    $scope.userRoles = [{"name": "General Admin", "id": 3}, {"name": "Client", "id": 1}, {"name": "Trainer", "id": 4}];
    $scope.sortedBy = 'desc';
    $scope.orderBy = 'created_at';
    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalItems = 0;


    $scope.createNewCases = function () {
        $rootScope.createCases = false;
    };
    $scope.backToCase = function () {
        $rootScope.createCases = true;
    };
    $scope.companyEdit = function () {
        $scope.companyExist = !$scope.companyExist;
        $scope.hideBack = false;
    };

    $scope.getUser = function () {
        User.get($stateParams.entityID).then(function (result) {
            $scope.entity = result.data;
            $scope.entity.role_id = $scope.entity.roles[0].id;
            // $scope.ugroup_types = $scope.entity.group_types;
        });

    };
    $scope.getUser();

    $scope.updateUser = function () {

        delete $scope.entity.roles;


        User.update($stateParams.entityID, $scope.entity).then(function (result) {
            $scope.entity = result.data;
            $scope.change = false;
            sweetAlert.swal({
                title: "Update Successful!",
                html: "You've successfully updated the user",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                $rootScope.go('/admin/user/management');
            });

        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Update",
                html: error.data.message,
                type: "error",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                //$rootScope.go('userManagement');
            });

            //flash.message = error.data.error;

        });

    };

    $scope.createNewDebtor = function () {
        $rootScope.go("/user/" + $stateParams.entityID + "/debtor/create");
    };

    $scope.createCompany = function () {
        $scope.companyCreate = true;
    };


    $scope.more = function (cvr, companyId) {
        $scope.hideChooseProperty = false;
        if ($scope.isActive === companyId) {
            $scope.hideChooseProperty = true;
        }
        var params = {cvr: cvr, id: companyId};
        var modalInstance = $modal.open({
            size: 'md',
            templateUrl: 'views/user/company/details.html',
            controller: 'UserCompanyDetailsController',
            resolve: {
                entity: function () {
                    return params;
                }
            }
        });

        modalInstance.result.then(function (companyId) {

            if (typeof companyId !== 'undefined') {
                $scope.selectedItem(companyId);
                $scope.chooseCompany(companyId);
            }

        }, function () {
        });

    };
    $scope.chooseCompany = function (id) {
        $scope.cvrFound = true;

        $scope.company = $scope.results[id];

    };


    $scope.back = function () {
        $scope.cvrFound = false;
    };
    $scope.company = {};

    $scope.selectedItem = function (id) {
        if (id === $scope.selectedResult) {
            $scope.selectedResult = 0;
            $scope.isActive = 0;
        }
        else {
            $scope.selectedResult = id;
            $scope.isActive = id;
        }
    };

    /*$scope.saveCompany = function() {
        $scope.company.user_id = $stateParams.entityID;
        $scope.company.k_number = '';
        if(!$scope.company.konto_no) {
            $scope.company.konto_no = '';
        }

        UserCompany.post($scope.company).then(function(result) {
            $scope.entity = result.data;

            sweetAlert.swal({
                title: "Create Successful!",
                html: "You've successfully updated the company",
                type: "success",
                confirmButtonText: "Ok"

            }, function ()
            {

            }).then(function () {
                $rootScope.go('/admin/user/management');
            });

        }, function (error)
        {
            sweetAlert.swal({
                title: "Error!",
                html: "Sorry unable to create company",
                type: "error",
                confirmButtonText: "Ok"
            }, function ()
            {
            });

        });

    };*/


    //
    // $scope.saveCompany = function() {
    //     $scope.company.user_id = $stateParams.entityID;
    //     $scope.company.k_number = '';
    //     if(!$scope.company.konto_no) {
    //         $scope.company.konto_no = '';
    //     }
    //     UserCompany.post($scope.entity).then(function (result) {
    //         $scope.entity = result.data;
    //
    //         sweetAlert.swal({
    //             title: "Create Successful!",
    //             html: "You've successfully updated the company",
    //             type: "success",
    //             confirmButtonText: "Ok"
    //
    //         }, function () {
    //
    //         }).then(function () {
    //             $rootScope.go('/admin/user/management');
    //         });
    //
    //     },function (error) {
    //         sweetAlert.swal({
    //             title: "Error!",
    //             html: "Sorry unable to create company",
    //             type: "error",
    //             confirmButtonText: "Ok"
    //         }, function ()
    //         {
    //         });
    //
    //     });
    //
    // };


    $scope.searching = false;
    $scope.pageIndex = 0;
    $scope.currentPage = 1;
    $scope.maxSize = 20;
    $scope.itemsPerPage = 5;
    $scope.pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
    $scope.totalItems = 0;
    $scope.isActive = 0;
    $scope.selectedResult = 0;
    $scope.companyTypes = null;
    $scope.searchTerm = {"name": ""};

    /*$scope.findCvr = function()
    {

        $scope.searching = true;

        CompanySearch.one($scope.searchTerm.name,$scope.pageIndex).getList().then(
            function (data)
            {
                $scope.searching = false;
                $scope.results = data.data.results;
                $scope.totalItems = data.data.totalCount;
            }
        );
    };*/


    var companySearch = "user_id:" + $stateParams.entityID;
    /*$scope.getCurrentCompany = function() {
        UserCompany.customGET('', {
            search : companySearch,
            orderBy: 'created_at',
            sortedBy: 'desc'
        }).then(function(result)
        {
            $scope.currentCompany = result.data.data[0];
            if($scope.currentCompany){
                $scope.companyExist = true;
                $scope.hideBack = true;
            }

        });

    };

    $scope.getCurrentCompany();*/


}
/**
 */
function PhotosController($scope, $rootScope, User, $stateParams, sweetAlert, Photos)
{
    $scope.entityName = 'photos';
    $scope.pageIndex = 0;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.itemsPerPage = 20;
    $scope.pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
    $scope.totalItems = 0;
    $scope.requireSubscription = false;

    $scope.sortedBy = 'asc';
    $scope.orderBy = 'id';
    $scope.sort = false;

    $scope.tableHeaders = [
        {
            id: 1,
            db_name: 'path',
            label: 'path',
            lng_name: 'Path'
        },
        {
            id: 2,
            db_name: 'src',
            label: 'source',
            lng_name: 'Source'
        },
        {
            id: 3,
            db_name: 'link',
            label: 'link',
            lng_name: 'Link'
        },
        {
            id: 4,
            db_name: 'created_at',
            label: 'created_at',
            lng_name: 'Created'
        },
        {
            id: 5,
            db_name: 'action',
            label: 'action',
            lng_name: 'Action'
        }

    ];


    $scope.getPhotos = function () {
        Photos.getList({
            limit: $scope.itemsPerPage,
            page: $scope.currentPage,
            search: $scope.searchTerm,
            orderBy: $scope.orderBy,
            sortedBy: $scope.sortedBy
        }).then(function (result) {
            var data = result.data;
            $scope.entities = data.data;
            $scope.totalItems = data.total;

        });

    };
    $scope.getPhotos();

    $scope.order = function (orderBy) {
        $scope.sort = true;
        $scope.orderBy = orderBy;

        if ($scope.sortedBy === 'desc') {
            $scope.sortedBy = 'asc';
        } else {
            $scope.sortedBy = 'desc';
        }

    };

    $scope.$watch('orderBy', function () {
        $scope.getPhotos();
    });


    $scope.$watch('sortedBy', function () {
        $scope.getPhotos();
    });

    $scope.delete = function (entity) {
        Photos.remove(entity).then(function () {
            $scope.entity = null;
            $scope.getPhotos();
            var success = 'Deletion of' + ' ' + $scope.entityName + ' ' + 'completed!';

            sweetAlert.swal({
                title: "Delete Successful!",
                html: "You've successfully deleted the photo",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Delete",
                html: "Error in deleting photo",
                type: "error",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        });
    };

    $scope.deleteConfirm = function (entity) {

        var modalInstance = $rootScope.getDeleteConfirmationModel($scope.entityName);

        modalInstance.result.then(function () {
            $scope.delete(entity);
            $scope.createEntity = 1;
        }, function () {
            $scope.getPhotos();
        });

    };


    $scope.moreDetails = function (entityID) {
        $rootScope.go("/admin/photos/edit/" + entityID);

    };
    $scope.open = function () {
        $rootScope.go("/admin/photos/create");
    };


}
function PhotosEditController($scope, $stateParams, Photos, sweetAlert, $rootScope, $modal)
{
    $scope.entityName = "photos";
    $scope.entitiesName = "photos";
    $scope.confirm = false;
    $scope.change = false;
    $scope.update = true;
    $rootScope.createCases = true;
    $scope.companyExist = false;
    $scope.hideBack = true;
    $scope.sortedBy = 'desc';
    $scope.orderBy = 'created_at';
    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalItems = 0;

    $scope.getPhoto = function () {
        Photos.get($stateParams.entityID).then(function (result) {
            $scope.entity = result.data;
        });

    };
    $scope.getPhoto();

    $scope.updatePhoto = function () {


        Photos.update($stateParams.entityID, $scope.entity).then(function (result) {
            $scope.entity = result.data;
            $scope.change = false;
            sweetAlert.swal({
                title: "Update Successful!",
                html: "You've successfully updated the photo",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                $rootScope.go('/admin/user/photo');
            });

        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Update",
                html: error.data.message,
                type: "error",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                //$rootScope.go('userManagement');
            });

            //flash.message = error.data.error;

        });

    };


}
/**
 * Created by Admin on 10/26/2017.
 */
function PhotosCreateController($scope, Photos, $rootScope, sweetAlert)
{
    $scope.entityName = "photos";
    $scope.entitiesName = "photos";

    $scope.entity = null;
    $scope.submit = function () {

        if ($scope.entity) {

            Photos.create($scope.entity).then(function (data, headers) {
                $scope.entity = null;
                var success = 'SuccessFully create' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage("", success);
                $scope.photo = data.result;
                $scope.passwordConfirm = '';
                $scope.planId = 0;
                sweetAlert.swal({
                    title: "Create Successful!",
                    html: "You've successfully create the photo",
                    type: "success",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {
                    $rootScope.go('/admin/user/photos');
                });
                // $rootScope.go('userDetails');
                // $window.open('/#/userManagement', '_self');

            }, function (error) {
                sweetAlert.swal({
                    title: "Unable to Create",
                    html: error.data.message,
                    type: "error",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {
                    $rootScope.go('/admin/user/photos');
                });
                //flash.message = error.data.error;
            });
        }
    };


}
/**
 */
function PlacesController($scope, $rootScope, User, $stateParams, sweetAlert, Places, PlacesMap, PlacesIndex, mapboxglMapsData, debounce)
{

    $scope.parameters = {};
    $scope.filter = {
        maxLat: 64.8,
        maxLng: 44.7,
        minLat: 41.9,
        minLng: -54
    };


    $scope.filterObject = {
        limit: $scope.itemsPerPage,
        page: $scope.currentPage,
        search: $scope.searchTerm,
        orderBy: $scope.orderBy,
        sortedBy: $scope.sortedBy,
        filter: $scope.filter
    };
    $scope.loaded = false;

    $scope.entityName = 'places';
    $scope.pageIndex = 0;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.itemsPerPage = 20;
    $scope.pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
    $scope.totalItems = 0;
    $scope.requireSubscription = false;

    $scope.sortedBy = 'asc';
    $scope.orderBy = 'place_id';
    $scope.sort = false;

    $scope.center = {lat: 55, lng: -5};
    $scope.loaded = false;


    $scope.tableHeaders = [
        {
            id: 1,
            db_name: 'name',
            label: 'name',
            lng_name: 'Name'
        },
        {
            id: 2,
            db_name: 'domain',
            label: 'domain',
            lng_name: 'Domain'
        },
        {
            id: 5,
            db_name: 'action',
            label: 'action',
            lng_name: 'Action'
        }

    ];

    $scope.glLayers = [
        {
            id: 'clusters',
            type: 'circle',
            source: 'earthquakes',
            filter: ['has', 'point_count'],
            paint: {
                'circle-color': {
                    property: 'point_count',
                    type: 'interval',
                    stops: [
                        [0, '#51bbd6'],
                        [100, '#f1f075'],
                        [750, '#f28cb1'],
                    ]
                },
                'circle-radius': {
                    property: 'point_count',
                    type: 'interval',
                    stops: [
                        [0, 20],
                        [100, 30],
                        [750, 40]
                    ]
                }
            }
        }, {
            id: 'cluster-count',
            type: 'symbol',
            source: 'earthquakes',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '',
                'text-size': 12
            }
        }, {
            id: 'unclustered-point',
            type: 'circle',
            source: 'earthquakes',
            filter: ['!has', 'point_count'],
            paint: {
                'circle-color': '#11b4da',
                'circle-radius': 8,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#ffffff'
            }
        }
    ];



    $scope.glHandlers = {
    };

    $scope.getOuterBounds = function () {
        var zoom = mapboxglMapsData.getMaps()[0].mapInstance.getZoom();
        var center = mapboxglMapsData.getMaps()[0].mapInstance.getCenter();
        var bounds = geoViewport.bounds([center.lng, center.lat], zoom, [1000, 400], 512);

        $scope.filter = {
            minLat: bounds[1],
            maxLat: bounds[3],
            minLng: bounds[0],
            maxLng: bounds[2]
        };

    };


    $scope.$on('mapboxglMap:load', debounce(function (angularEvent, obj) {
        $scope.getOuterBounds();
        $scope.getPlaces();
        mapboxglMapsData.getMaps()[0].mapInstance.getSource('earthquakes').setData($scope.markers);

    }, 2000));


    $scope.$on('mapboxglMap:move', debounce(function (angularEvent, obj) {
        $scope.getOuterBounds();
        $scope.getPlaces();
        mapboxglMapsData.getMaps()[0].mapInstance.getSource('earthquakes').setData($scope.markers);

    }, 2000));

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    $scope.$on('mapboxglMap:mousemove', function (angularEvent, e) {

        var features = mapboxglMapsData.getMaps()[0].mapInstance.queryRenderedFeatures(e.point, {
            layers: ['unclustered-point']
        });
        mapboxglMapsData.getMaps()[0].mapInstance.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
        if (!features.length) {
            popup.remove();
            return;
        }

        var feature = features[0];
        popup.setLngLat(feature.geometry.coordinates)
            .setHTML("<h2>" + feature.properties.name + "</h2>")
            .addTo(mapboxglMapsData.getMaps()[0].mapInstance);


    });

    $scope.$on('mapboxglMap:click', function (angularEvent, e) {
        debugger;
        var features = mapboxglMapsData.getMaps()[0].mapInstance.queryRenderedFeatures(e.point, {
            layers: ['unclustered-point']
        });

        var feature = features[0];

        $rootScope.go('/admin/places/edit/' + feature.properties.id);


    });



//
//    $scope.$on('mapboxglMap:move', debounce(function(angularEvent, obj) {
//        $scope.getOuterBounds();
//        $scope.getPlaceList();
//        $scope.getPlaces();
//    }, 2000));

    $scope.getPlaceList = function () {
        $scope.filterObject.page = $scope.currentPage;
        PlacesIndex.create($scope.filterObject).then(function (result) {

            $scope.result = result;
            var data = result.data;
            $scope.entities = data.data;

            $scope.totalItems = data.totalItems;
            $scope.currentPage = data.page;

        });
    };



    $scope.getPlaces = function () {
        $scope.filterObject = {
            limit: $scope.itemsPerPage,
            page: $scope.currentPage,
            search: $scope.searchTerm,
            orderBy: $scope.orderBy,
            sortedBy: $scope.sortedBy,
            filter: $scope.filter,
            additionalFilters: []
        };


        Object.keys($scope.parameters).forEach(function (key, index) {
            var template = {};

            template[key] = $scope.parameters[key];
            $scope.filterObject.additionalFilters[index] = template;


        });


        PlacesMap.create($scope.filterObject).then(function (result) {

            var data = result.data;

            $scope.places = data;
            var newArray = {};
            newArray.features = [];

            $scope.places.forEach(function(entity) {

                var geoObject = { geometry: {
                        coordinates: [entity.lng, entity.lat, 0],
                        type: "Point"
                    },
                    properties: {
                        id: entity.place_id,
                        name: entity.name
                    },
                    type: "Feature"
                };


                newArray.features.push(geoObject);

            });

            $scope.markers = newArray;

            $scope.glSources = [
                {
                    id: 'earthquakes',
                    type: 'geojson',
                    data: $scope.markers,
                    cluster: true,
                    clusterMaxZoom: 10,
                    clusterRadius: 30
                }
            ];


            $scope.getPlaceList();

            $scope.loaded = true;
        });




    };
    $scope.getPlaces();

    $scope.order = function (orderBy) {
        $scope.sort = true;
        $scope.orderBy = orderBy;

        if ($scope.sortedBy === 'desc') {
            $scope.sortedBy = 'asc';
        } else {
            $scope.sortedBy = 'desc';
        }

    };

    $scope.$watch('orderBy', function (newValue, oldValue) {
        if(newValue) {
            if(oldValue) {

                //$scope.getPlaces();
            }
        }
    });


    $scope.$watch('sortedBy', function (newValue, oldValue) {

        if(newValue) {
            if (oldValue) {

               // $scope.getPlaces();
            }
        }
    });

    $scope.delete = function (entity) {
        Places.remove(entity).then(function () {
            $scope.entity = null;
            $scope.getPlaces();
            var success = 'Deletion of' + ' ' + $scope.entityName + ' ' + 'completed!';

            sweetAlert.swal({
                title: "Delete Successful!",
                html: "You've successfully deleted the photo",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Delete",
                html: "Error in deleting photo",
                type: "error",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        });
    };

    $scope.deleteConfirm = function (entity) {

        var modalInstance = $rootScope.getDeleteConfirmationModel($scope.entityName);

        modalInstance.result.then(function () {
            $scope.delete(entity);
            $scope.createEntity = 1;
        }, function () {

        });

    };


    $scope.moreDetails = function (entityID) {
        $rootScope.go("/admin/places/edit/" + entityID);

    };
    $scope.open = function () {
        $rootScope.go("/admin/places/create");
    };


}
function PlacesEditController($scope, $stateParams, Places, sweetAlert, $rootScope, $sce, $modal)
{
    $scope.entityName = "places";
    $scope.entitiesName = "places";
    $scope.confirm = false;
    $scope.change = false;
    $scope.update = true;
    $rootScope.createCases = true;
    $scope.companyExist = false;
    $scope.hideBack = true;
    $scope.sortedBy = 'desc';
    $scope.orderBy = 'created_at';
    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalItems = 0;

    function createElement(icon)
    {
        var marker = document.createElement('div');
        marker.style.backgroundImage = "url(" + icon.iconUrl + ")";
        marker.style.backgroundSize = icon.iconSize[0] + "px " + icon.iconSize[1] + "px";
        marker.style.width = icon.iconSize[0] + "px";
        marker.style.height = icon.iconSize[1] + "px";
        marker.style.marginLeft = "-" + Math.floor(icon.iconSize[0] / 2) + "px";
        marker.style.marginTop = "-" + Math.floor(icon.iconSize[1] / 2) + "px";
        marker.id = "marker";


        return marker;
    }


    $scope.getPlace = function () {
        Places.get($stateParams.entityID).then(function (result) {
            $scope.entity = result.data;



            $scope.center = {lat:$scope.entity.lat, lng:$scope.entity.lng};
            $scope.marker = {
                coordinates: [$scope.entity.lng, $scope.entity.lat],
                element: createElement({
                    iconSize: [100, 100],
                    iconUrl: "https://cdn.icon-icons.com/icons2/317/PNG/128/map-marker-icon_34392.png"
                })
            };

            debugger;


        });

    };
    $scope.getPlace();

    $scope.updatePlace = function () {


        Places.update($stateParams.entityID, $scope.entity).then(function (result) {
            $scope.entity = result.data;
            $scope.change = false;
            sweetAlert.swal({
                title: "Update Successful!",
                html: "You've successfully updated the Place",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                $rootScope.go('/admin/user/Place');
            });

        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Update",
                html: error.data.message,
                type: "error",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                //$rootScope.go('userManagement');
            });

            //flash.message = error.data.error;

        });

    };


}
'use strict';

function RoleUserController(RoleUser, $scope, $rootScope)
{

    var EnitityRepository = RoleUser;


    RoleUser.getList().then(function (result) {
        $scope.entities = result.data;
        console.log($scope.entities);

    });

}
/**
 * Created by Admin on 11/14/2017.
 */
function ConfirmationModalController($scope, $modalInstance)
{

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}
/**
 * Created by Admin on 11/29/2017.
 */
function FileModalController(locale, $scope, $store, sweetAlert, $rootScope, $sce)
{


    $scope.dataLoading = false;

    $scope.dropzoneConfig = {};
    $scope.dropzone = {};
    var accessToken = $store.get('access_token');

    $scope.dropzoneConfig = {
        parallelUploads: 20,
        maxFileSize: 40,
        maxFiles: 1,
        uploadMultiple: false,
        autoProcessQueue: false,
        init: function () {
            this.on("complete", function (file) {
                $scope.dataLoading = false;
                sweetAlert.swal({
                    title: "Thank You!!",
                    html: "Your file has been uploaded successfully. As soon as the file is ready for use, the status on the dashboard will be updated.",
                    type: "success",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {
                    $rootScope.go('/user/dashboard');
                });
            });
            $('#fileUpload').click(function () {
                $scope.dataLoading = true;
                if ($scope.dropzone.files.length > 0) {
                    $scope.dropzone.processQueue();
                }
                else {
                    sweetAlert.swal({
                        title: "Unable to upload file!",
                        html: "Please choose at least one file",
                        type: "warning",
                        confirmButtonText: "Ok"

                    }, function () {

                    }).then(function () {
                        $scope.dataLoading = false;
                    });


                }


            });
        },
        headers: {'Authorization': 'Bearer ' + accessToken},
        acceptedFiles: "application/pdf",
        url: $sce.trustAsResourceUrl(dbSever + 'user/file/upload')
    };


    $scope.back = function () {
        $rootScope.go('/user/dashboard');
    }

}
function UserFileUploadController($rootScope, $scope, $modalInstance, $http, sweetAlert, $store)
{

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
    $scope.entity = {"file_name": ""};
    $scope.dataLoading = false;
    $scope.ok = function () {
        $scope.dataLoading = true;
        var file = $scope.myFile;
        var fd = new FormData();
        fd.append('file', file);
        fd.append('user_id', $scope.user_id);
        fd.append('file_name', $scope.entity.file_name);
        var uploadUrl = dbSever + "user/file/upload/single";
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined, 'Authorization': 'Bearer' + $store.get('access_token')}
        })
            .success(function (data) {
                $scope.dataLoading = false;
                $modalInstance.close();
                sweetAlert.swal({
                    title: "Thank You!",
                    html: "Your file has been uploaded successfully. As soon as the file is ready for use, the status on the dashboard will be updated.",
                    type: "success",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {

                    $rootScope.go('/user/dashboard');
                });

            })
            .error(function (error) {
                $scope.dataLoading = true;
                $modalInstance.close();
                sweetAlert.swal({
                    title: "Unable upload file!",
                    html: 'Please upload file',
                    type: "warning",
                    confirmButtonText: "Ok"
                }, function () {
                });
            });
    };
}
/**
 * Created by Admin on 12/13/2017.
 */
function UserGroupController($scope, RoleUser, $modal, $rootScope, sweetAlert, $timeout)
{
    $scope.sortedBy = 'desc';
    $scope.orderBy = 'created_at';
    $scope.search = '';
    $scope.currentPage = 1;
    $scope.searchTerm = "";
    $scope.itemsPerPage = 15;
    $scope.totalItems = 0;
    $scope.create = true;
    $scope.entity = '';
    $scope.entityName = 'Group';
    var initializing = true;

    $scope.tableHeaders = [
        {
            id: 1,
            db_name: 'group_name',
            label: 'group_name',
            lng_name: 'Name'
        },
        {
            id: 2,
            db_name: 'blob_type_id',
            label: 'blob_type',
            lng_name: 'Blob Type'
        },
        {
            id: 3,
            db_name: 'group_affix',
            label: 'group_affix',
            lng_name: 'Affix'
        },
        {
            id: 5,
            db_name: 'action',
            label: 'action',
            lng_name: 'Action'
        }
    ];

    $scope.getEntities = function () {

        RoleUser.getList({
            limit: $scope.itemsPerPage,
            page: $scope.currentPage,
            search: $scope.searchTerm,
            orderBy: $scope.orderBy,
            sortedBy: $scope.sortedBy
        }).then(function (result) {
            var data = result.data;
            $scope.entities = data.data;
            $scope.totalItems = data.total;
        });
    };

    $scope.getEntities();

    $scope.order = function (orderBy) {
        $scope.sort = true;
        $scope.orderBy = orderBy;

        if ($scope.sortedBy === 'desc') {
            $scope.sortedBy = 'asc';
        } else {
            $scope.sortedBy = 'desc';
        }

    };

    $scope.$watchGroup(['orderBy', 'sortedBy', 'searchTerm'], function () {

        if (initializing) {
            $timeout(function () {
                initializing = false;
            });
        } else {
            $scope.getEntities();
        }
    });


    $scope.moreDetails = function (entity) {
        var temp = {group: entity};
        $scope.errorModelOpen = true;
        var modalInstance = $modal.open({
            templateUrl: 'views/admin/user/groupModal.html',
            controller: 'GroupModalController',
            resolve: {
                entity: function () {
                    return temp;
                }
            }
        });
        modalInstance.result.then(function (value) {
            $scope.getEntities();
        }, function () {

        });

    };

    $scope.delete = function (entity) {
        GroupTypes.remove(entity).then(function () {
            $scope.entity = null;
            $scope.getEntities();
            var success = 'Deletion of' + ' ' + $scope.entityName + ' ' + 'completed!';

            sweetAlert.swal({
                title: "Delete Successful!",
                html: "You've successfully deleted the group",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Delete",
                html: "Error in deleting group",
                type: "error",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        });
    };

    $scope.deleteConfirm = function (entity) {

        var modalInstance = $rootScope.getDeleteConfirmationModel($scope.entityName);

        modalInstance.result.then(function () {
            $scope.delete(entity);
        }, function () {

        });

    };

}
/**
 * Created by Admin on 12/13/2017.
 */
function GroupModalController($scope, entity, $modalInstance, GroupTypes, sweetAlert, BlobTypes)
{
    $scope.isCreate = true;
    $scope.group = {};


    $scope.getBlobTypes = function () {
        BlobTypes.get().then(function (result) {
            $scope.blobTypes = result.data;
        });
    };
    $scope.getBlobTypes();

    $scope.getGroup = function () {
        GroupTypes.get($scope.entity).then(function (result) {
            $scope.group = result.data;
        });
    };

    if (entity.group) {
        $scope.entity = entity.group.id;
        $scope.isCreate = false;
        $scope.getGroup();

    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    $scope.ok = function () {
        $modalInstance.close();
        GroupTypes.update($scope.entity, $scope.group).then(function (result) {

            sweetAlert.swal({
                title: "Update Successful!",
                html: "You've successfully updated the group",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });

        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Update",
                html: error.data.message,
                type: "error",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                //$rootScope.go('userManagement');
            });

            //flash.message = error.data.error;

        });

    };


    $scope.create = function () {
        $modalInstance.close();
        GroupTypes.create($scope.group).then(function (result) {

            sweetAlert.swal({
                title: "Create Successful!",
                html: "You've successfully created the group",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });

        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Update",
                html: error.data.message,
                type: "error",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                //$rootScope.go('userManagement');
            });

            //flash.message = error.data.error;

        });

    };


}
function EditCreditCardController($scope, $modalInstance, PaymentMethodDetailsByCustomer, UpdateCreditCardDetails, $rootScope, CreateCreditCard, flash, CardDetails, entity)
{
    // before save button clicked
    $scope.saveChange = true;

    // credit card id
    $scope.card_id = entity;

    // show hide edit credit card and enter new credit card
    $scope.edit = 0;

    // if there is no credit card then add new
    if (entity == null) {
        $scope.edit = 1;

        // make default is used for setting a credit card as default credit card
        $scope.paymentMethodDetails = {makeDefault: false};
    }
    else {
        // show edit credit card form
        $scope.edit = 0;
    }

    /**
     * @desc get credit card details of the user
     * @param
     * @return
     */
    $scope.getPaymentMethodDetails = function () {
        // when loading
        $scope.isLoading = true;

        // get details of the selected credit card
        CardDetails.customGET('', {card_id: $scope.card_id}).then(function (result) {
            $scope.paymentMethodDetails = result.data;
            var exp_month = '' + $scope.paymentMethodDetails.exp_month;
            if (exp_month.length == 1) {
                exp_month = '0' + exp_month;
                $scope.paymentMethodDetails.exp_month = exp_month;

            }
            // loading is over
            $scope.isLoading = false;
        }, function (error) {

        });

    };

    $scope.getPaymentMethodDetails();
    // wait after loading
    $scope.isLoading_save = false;

    /**
     * @desc save customer in stripe
     * @param status, response
     * @return
     */
    $scope.saveCustomer = function (status, response) {

        if (!response.error) {
            $scope.token = response.id;
            $scope.submit();
        } else
            if (response.error.code == 'invalid_expiry_year') {
                flash.error = response.error.message;
            } else
                if (response.error.code == 'invalid_expiry_month') {
                    flash.error = response.error.message;
                } else
                    if (response.error.code == 'incorrect_number') {
                        flash.error = response.error.message;
                    }

        /* else if(response.error){
         flash.error = 'Unable to Create an account' + errorMsg;
         }*/
    };

    /**
     * @desc save credit card details
     * @param
     * @return
     */
    $scope.submit = function () {
        // show loading screen when saving customer in stripe
        $scope.isLoading_save = true;

        // store the card details
        var storeCardDetails = {
            customer_id: $scope.paymentMethodDetails.customer,
            card_id: $scope.paymentMethodDetails.card_id,
            stripeToken: $scope.token,

            // this has  1 and 0 values. They are used to make credit card as default payment credit card or not.
            makeDefault: $scope.paymentMethodDetails.makeDefault
        };

        // add a credit card
        CreateCreditCard.post(storeCardDetails).then(function (data, headers) {

            var success = 'Successfully added the credit card';
            $rootScope.successMessage("", success);
            $scope.isLoading_save = false;
            $modalInstance.close();
        }, function (error) {
            $scope.isLoading_save = false;
            $rootScope.errorMessage(error, "Unable to update the card details!");

        });

    };

    /**
     * @desc update a credit card in stripe
     * @param
     * @return
     */
    $scope.save = function () {
        $scope.saveChange = false;
        // when show loading screen
        $scope.isLoading = true;

        var updateDetails = {
            customer_id: $scope.paymentMethodDetails.customer,
            card_id: $scope.paymentMethodDetails.card_id,
            last4: $scope.paymentMethodDetails.last4,
            exp_month: $scope.paymentMethodDetails.exp_month,
            exp_year: $scope.paymentMethodDetails.exp_year
        };
        if (updateDetails) {
            UpdateCreditCardDetails.post(updateDetails).then(function (data, headers) {//update credit card
                var success = 'successfully updated';
                $rootScope.successMessage("", success);
                $modalInstance.close();

            }, function (error) {
                // failure
                //$rootScope.errorMessage("Unable to update the card details!");
                flash.error = "Unable to update the card details!";
                $scope.isLoading = false;
                $scope.saveChange = true;
                // $scope.isLoading_save = false;
                //$rootScope.errorMessage(error, "Unable to update the card details!");
            });
        }

    }


    $scope.cancel = function () {
        // close modal
        $modalInstance.dismiss('cancel');
    };
}

/**
 * @desc controller for update a credit card in stripe into default payment method
 * @param
 * @return
 */
function ChangeDefaultCreditCardController($scope, $rootScope, $modalInstance, PaymentMethodDetailsByCustomer, SetDefaultCard)
{
    // used to disable save and cancel button after save button clicked
    $scope.saveChange = true;
    $scope.default = "";

    /**
     * @desc get credit card details of the user
     * @param
     * @return
     */
    $scope.getPaymentMethodDetails = function () {
        // show loading animation
        $scope.isLoading = true;

        // get all cards,of user, with details
        PaymentMethodDetailsByCustomer.customGET('', {}).then(function (result) {
            $scope.paymentMethodDetails = result.cards;

            for (var i = 0; i < $scope.paymentMethodDetails.length - 1; i++) {

                if ($scope.paymentMethodDetails[i].default == 1) {

                    // card id of the default card
                    $scope.default = $scope.paymentMethodDetails[i].card_id;
                }


            }

            if ($scope.paymentMethodDetails) {
                // if there is already added cards
                $scope.trial = true;
            } else {
                // if there is no added cards show add new card form
                $scope.trial = false;
            }
            $scope.isLoading = false;
        }, function (error) {
            $scope.isLoading = false;
        });
    };
    $scope.getPaymentMethodDetails();

    /**
     * @desc this method is called after selecting a card as default card
     * @param card_id
     * @return
     */
    $scope.changeDefault = function (card_id) {
        $scope.default = card_id;
    };

    $scope.cancel = function () {
        // close modal
        $modalInstance.dismiss();
    };

    /**
     * @desc save as default card
     * @param
     * @return
     */
    $scope.save = function () {
        if ($scope.default != null && $scope.default != "") {
            // show loading
            $scope.isLoading = true;
            // disable save and cancel buttons
            $scope.saveChange = false;
            // set card as default paying card
            SetDefaultCard.post({card_id: $scope.default}).then(function (data, headers) {


                var success = 'Successfully changed default credit card';
                $rootScope.successMessage("", success);

                $modalInstance.close();

            }, function (error) {
                $rootScope.errorMessage(error, "delete");
            });
        }
    }


}

/**
 * @desc controller for delete card and its details
 * @param
 * @return
 */
function ChatController(ChatSlideBarList, Chat, ShowMessages, $scope, $pusher, $rootScope, $cookieStore, $timeout, User, ProgrammeGroups)
{
    $scope.isChatSlideBar = true;

    $scope.backButton = function () {
        $scope.isChatSlideBar = true;
        $scope.selectedUser = -1;
        $scope.showSendMessageButton = false;
    };
    $scope.messages = [];
    $scope.selectedUser = -1;

    $scope.isGroup = false;
    $scope.showSendMessageButton = false;

    var currentUser = $rootScope.currentUser;
    var isTrainer = false;
    Pusher.log = function (msg) {
        console.log(msg);
    };


    var pusherEndPointAuth = dbServe + 'broadcasting/auth';

    var pusher;
    var channel;
    var client;
    $scope.$watch('selectedUser', function (selectedUser) {

        console.log(selectedUser);


        if (selectedUser !== -1) {
            var channelName = '';

            if ($scope.isGroup) {
                channelName = 'private-groupchat.' + selectedUser;
            } else {
                if (currentUser.id >= selectedUser) {
                    channelName = 'private-chats.' + currentUser.id + '.' + selectedUser;
                } else {
                    channelName = 'private-chats.' + selectedUser + '.' + currentUser.id;
                }
            }


            client = new Pusher('7d43f429ace86ef80f85', {
                cluster: 'eu',
                authEndpoint: pusherEndPointAuth,
                auth: {
                    headers: {
                        "Authorization": "Bearer " + $cookieStore.get('access_token')
                    }
                }
            });
            Pusher.logToConsole = true;

            pusher = $pusher(client);
            pusher.logToConsole = true;
            channel = pusher.subscribe(channelName);
            channel.bind('App\\Events\\MessageSendCreated', function (data) {
                debugger;
                if (data.message.from.id !== currentUser.id) {
                    var audio = new Audio('audio/song.mp3');
                    audio.play();
                }


                if ($scope.currentUser.id !== data.message.user_from) {
                    $scope.entities.push(data.message);
                }
            });

            channel.bind('client-user-typing', function (data) {
                $scope.lastTypedUser = data.from;

                $scope.isTyping = true;


                $timeout(function () {
                    $scope.isTyping = false;
                }, 5000);

            });


            channel.bind('pusher:subscription_succeeded', function (data) {
            });
        }


    });

    $scope.goToEntity = function (entity) {

        if (entity.type == "group") {

            $rootScope.go('user/groups/details/' + entity.id);

        } else {

            $rootScope.go('admin/management/edit/' + entity.id);
        }
    };
    $scope.slideBarList = function () {
        ChatSlideBarList.getList().then(function (result) {
            $scope.slideBarData = result.data;
            console.log($scope.slideBarData);
        });
    };
    $scope.slideBarList();

    $scope.entities = {};
    $scope.entitiesSlideBar = {};







    var EnitityRepository = Chat;


    $scope.getEntities = function () {
        Chat.getList().then(function (result) {
            $scope.entities = result.data;
        });
    };
    $scope.getEntities();



    $scope.sendChat = function (message) {
        if ($scope.isGroup) {
            if (message.length > 0) {

                var messageObj = {
                    "user_from": $scope.currentUser.id,
                    "from": $scope.currentUser,
                    "user_to": null,
                    "message": message,
                    'group_id': $scope.selectedUser,
                    "created": moment().locale('en').startOf('second').fromNow()
                };

                $scope.entities.push(messageObj);
                var messageObject = {
                    "user_from": $scope.currentUser.id,
                    "user_to": null,
                    "message": message,
                    'group_id': $scope.selectedUser
                };

                $scope.newMessage = '';
                Chat.create(messageObject).then(function (result) {
                })
            }
        } else {
            if (message.length > 0) {

                var messageObj = {
                    "user_from": $scope.currentUser.id,
                    "from": $scope.currentUser,
                    "user_to": $scope.selectedUser,
                    "message": message,
                    "created": moment().locale('en').startOf('second').fromNow()
                };

                $scope.entities.push(messageObj);

                var messageObject = {
                    "user_from": $scope.currentUser.id,
                    "user_to": $scope.selectedUser,
                    "message": message
                };

                $scope.newMessage = '';
                Chat.create(messageObject).then(function (result) {
                })
            }
        }


    };

    $scope.showMessages = function (entity) {
        $scope.isChatSlideBar = false;
        $scope.showSendMessageButton = true;
        if (entity.type === "group") {
            $scope.isGroup = true;
            ProgrammeGroups.get(entity.id).then(function (result) {
                $scope.selectedTopName = result.data.group_name;
                $scope.selectedTopAvatar = 'images/group.png'
            });
        } else {
            $scope.isGroup = false;
            User.get(entity.id).then(function (result) {
                $scope.selectedTopName = result.data.first_name + ' ' + result.data.last_name;
                $scope.selectedTopAvatar = result.data.avatar;
            });
        }

        $scope.selectedUser = entity.id;
        ShowMessages.getList({from: entity.id, type: entity.type}).then(function (result) {
            $scope.entities = result.data;
        });

    };


    $scope.keyDownEvent = function () {

        var triggered = channel.trigger('client-user-typing', {from: currentUser.first_name});
        if (event.keyCode === 13) {
            $scope.sendChat($scope.newMessage);

        }

    };


    $scope.selectedPerson = function (id) {
        if (id === $scope.selectedProperty) {
            $scope.selectedProperty = 0;
            $scope.isActive = 0;

        }
        else {
            $scope.selectedProperty = id;
            $scope.isActive = id;
        }
    };

    $scope.selectedGroup = function (id) {
        if (id === $scope.selectedGroupProperty) {
            $scope.selectedGroupProperty = 0;
            $scope.isGroupActive = 0;

        }
        else {
            $scope.selectedGroupProperty = id;
            $scope.isGroupActive = id;

        }
    }





}
smartApp
    .controller('MainController', MainController)
    .controller('LoginController', LoginController)
    .controller('RegisterController', RegisterController)
    .controller('LoginPopUpController', LoginPopUpController)
    .controller('RegisterByInviteController', RegisterByInviteController)
    .controller('ForgetPasswordController', ForgetPasswordController)
    .controller('RegisterConfirmationController', RegisterConfirmationController)
    .controller('ProfileController', ProfileController)
    .controller('DeleteConfirmModalInstanceController', DeleteConfirmModalInstanceController)
    .controller('RouteManagementController', RouteManagementController)
    .controller('MenuManagementController', MenuManagementController)
    .controller('TopNavigationBarController', TopNavigationBarController)
    .controller('MenusController', MenusController)
    .controller('UserCreateController', UserCreateController)
    .controller('UserEditController', UserEditController)
    .controller('UserFileUploadController', UserFileUploadController)
    .controller('UserManagementsController', UserManagementsController)
    .controller('PaymentsManagementController', PaymentsManagementController)
    .controller('PaymentsSettingsController', PaymentsSettingsController)
    .controller('EditCreditCardController', EditCreditCardController)
    .controller('PhotosController', PhotosController)
    .controller('PhotosEditController', PhotosCreateController)
    .controller('PlacesController', PlacesController)
    .controller('PlacesEditController', PlacesEditController)
    .controller('RoleUserController', RoleUserController)
    .controller('ChangeDefaultCreditCardController', ChangeDefaultCreditCardController);
'use strict';
smartApp.factory('AbstractRepository', [

    function () {

        function AbstractRepository(restangular, route)
        {
            this.restangular = restangular;
            this.route = route;
        }

        AbstractRepository.prototype = {
            getList: function (params) {
                return this.restangular.all(this.route).getList(params);
            },
            get: function (id) {
                return this.restangular.one(this.route, id).get();
            },
            getView: function (id) {
                return this.restangular.one(this.route, id).one(this.route + 'view').get();
            },
            update: function (id, updatedResource) {
                return this.restangular.one(this.route, id).customPUT(updatedResource);
            },
            create: function (newResource) {
                return this.restangular.all(this.route).post(newResource);
            },
            remove: function (object) {
                return this.restangular.one(this.route, object.id).remove();
            },
            customGET: function (params) {
                return this.restangular.all(this.route).customGET("", params);

            },
            customPOST: function (params) {
                return this.restangular.all(this.route).customPOST("", params);

            }
        };

        AbstractRepository.extend = function (repository) {
            repository.prototype = Object.create(AbstractRepository.prototype);
            repository.prototype.constructor = repository;
        };

        return AbstractRepository;
    }
]);
/**
 * Created by Anthony on 5/29/2015.
 */

angular
    .module('inspinia')
    .factory("$store", function ($parse) {
        /**
         * Global Vars
         */
        var storage = (typeof window.localStorage === 'undefined') ? undefined : window.localStorage,
            supported = !(typeof storage == 'undefined' || typeof window.JSON == 'undefined');

        var privateMethods = {
            /**
             * Pass any type of a string from the localStorage to be parsed so it returns a usable version (like an Object)
             * @param res - a string that will be parsed for type
             * @returns {*} - whatever the real type of stored value was
             */
            parseValue: function (res) {
                var val;
                try {
                    val = JSON.parse(res);
                    if (typeof val == 'undefined') {
                        val = res;
                    }
                    if (val == 'true') {
                        val = true;
                    }
                    if (val == 'false') {
                        val = false;
                    }
                    if (parseFloat(val) == val && !angular.isObject(val)) {
                        val = parseFloat(val);
                    }
                } catch (e) {
                    val = res;
                }
                return val;
            }
        };
        var publicMethods = {
            /**
             * Set - let's you set a new localStorage key pair set
             * @param key - a string that will be used as the accessor for the pair
             * @param value - the value of the localStorage item
             * @returns {*} - will return whatever it is you've stored in the local storage
             */
            set: function (key, value) {
                if (!supported) {
                    try {
                        $.cookie(key, value);
                        return value;
                    } catch (e) {
                    }
                }
                var saver = JSON.stringify(value);
                storage.setItem(key, saver);
                return privateMethods.parseValue(saver);
            },
            /**
             * Get - let's you get the value of any pair you've stored
             * @param key - the string that you set as accessor for the pair
             * @returns {*} - Object,String,Float,Boolean depending on what you stored
             */
            get: function (key) {
                if (!supported) {
                    try {
                        return privateMethods.parseValue($.cookie(key));
                    } catch (e) {
                        return null;
                    }
                }
                var item = storage.getItem(key);
                return privateMethods.parseValue(item);
            },
            /**
             * Remove - let's you nuke a value from localStorage
             * @param key - the accessor value
             * @returns {boolean} - if everything went as planned
             */
            remove: function (key) {
                if (!supported) {
                    try {
                        $.cookie(key, null);
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
                storage.removeItem(key);
                return true;
            },
            /**
             * Bind - let's you directly bind a localStorage value to a $scope variable
             * @param $scope - the current scope you want the variable available in
             * @param key - the name of the variable you are binding
             * @param def - the default value (OPTIONAL)
             * @returns {*} - returns whatever the stored value is
             */
            bind: function ($scope, key, def) {
                def = def || '';
                if (!publicMethods.get(key)) {
                    publicMethods.set(key, def);
                }
                $parse(key).assign($scope, publicMethods.get(key));
                $scope.$watch(key, function (val) {
                    publicMethods.set(key, val);
                }, true);
                return publicMethods.get(key);
            }
        };
        return publicMethods;
    });

/**
 * Created by Anthony on 3/27/2015.
 */


smartApp
    .factory('MenuByUser', function (Restangular) {
        return Restangular.allUrl('users/current/menu');
    })

   
/**
 * Created by Anthony on 3/4/2015.
 */

smartApp
    .factory('GroupRepository', ['Restangular', 'AbstractRepository',
        function (Restangular, AbstractRepository) {

            function GroupRepository()
            {
                AbstractRepository.call(this, Restangular, 'user');
            }

            AbstractRepository.extend(GroupRepository);
            return new GroupRepository();
        }
    ])
    .factory('PostRemind', function (Restangular) {
        return Restangular.allUrl('password/email');
    })
    .factory('PostReset', function (Restangular) {
        return Restangular.allUrl('password/reset');
    })
    .factory('CheckAuthentication', function (Restangular) {
        return Restangular.one('check/user');
    })
    .factory('SearchCity', function (Restangular) {
        return Restangular.one('searchSuburb');
    })

    .factory('ContactUs', function (Restangular) {
        return Restangular.allUrl('contactUs');
    })

    .factory('SearchTitleCompany', function (Restangular) {
        return Restangular.one('searchTitleCompany');
    });


smartApp.factory('AuthService', function ($http, $window, Session, $cookieStore, $store) {
    var authService = {};

    authService.login = function (credentials) {
        return $http
            .post(dbServe + 'api/v1/login', credentials)
            .then(function (res) {
                $cookieStore.put('access_token', res.data.access_token);
                $cookieStore.put('refresh_token', res.data.refresh_token);
                $store.set('access_token', res.data.access_token);
                $store.set('refresh_token', res.data.refresh_token);
                return res.data;
            }, function (error) {
                throw error;

            });
    };

    authService.logOut = function () {
        $cookieStore.remove('access_token');
        $cookieStore.remove('refresh_token');
        $store.remove('access_token');
        $store.remove('refresh_token');
    };

    authService.isAuthenticated = function () {  //Is he login
        return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {

        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        // authService.isAuthenticated() &&
        return (authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;


})

    .service('Session', function () {
        this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
    });








smartApp
    .factory('UserRepository',
        function (Restangular) {
            return Restangular.all('users/register');
        }
    )
    .factory('User', function (Restangular, AbstractRepository) {

        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'users');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();

    })
    .factory('BannedUser', function (Restangular) {
        return Restangular.allUrl('banUser');
    })
    .factory('UnBannedUser', function (Restangular) {
        return Restangular.allUrl('unBanUser');
    })
    .factory('TrainerCreatesClient', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'trainer/create/user');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('ClientConfirmPassword', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'client/confirm/password');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('ClientConfirm', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'client/confirm/credentials');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('ClientCreateStripe', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'client/create/stripe');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('ClientInformation', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'client/information');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('UserCreate', function (Restangular) {
        return Restangular.allUrl('userCreate');
    })
    .factory('CurrentUser', function (Restangular) {
        return Restangular.one('users/current');
    })
    .factory('SendPropertySaleRemindNotification', function (Restangular) {
        return Restangular.one('sendPropertySaleRemindNotification');
    })
    .factory('GetBillingData', function (Restangular) {
        return Restangular.allUrl('billinginfo');
    })
    .factory('SaveBillingData', function (Restangular) {
        return Restangular.allUrl('saveBillingData');
    })
    .factory('cloudinaryInterceptor', function () {
        return {
            request: function (config) {
                var authHeader = config.headers('authorization');
                //Check for the host
                var regex = "https://diamatic.s3.us-east-2.amazonaws.com/8baec93b-cfcf-4bc1-9bfd-0ef206058c1d/Form/sample.json";
                if (regex.test(config.url))
                //Detach the header
                    delete config.headers.authorization;
                return config;
            }
        }
    });




/**
 * Created by Anthony on 9/11/2015.
 */

'use strict';
smartApp
    .factory('AllRoutes', function (Restangular) {
        return Restangular.allUrl('routes');
    })
    .factory('AddRemovePermissionToRole', function (Restangular) {
        return Restangular.allUrl('addRemovePermissionToRole');
    });


 
'use strict';
smartApp
    .factory('AllMenuesByRole', function (Restangular) {
        return Restangular.allUrl('menuesByRole');
    })
    .factory('AddRemoveMenuToRole', function (Restangular) {
        return Restangular.allUrl('addRemoveMenuToRole');
    });
 
smartApp
    .factory('MenuRepository', ['Restangular', 'AbstractRepository',
        function (Restangular, AbstractRepository) {
            function MenuRepository()
            {
                AbstractRepository.call(this, Restangular, 'menuses');
            }

            AbstractRepository.extend(MenuRepository);
            return new MenuRepository();
        }
    ]);
smartApp
    .factory('Payment', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'payments');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    });
smartApp
    .factory('RoleUser', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'role/user');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    });
smartApp
    .factory('PaymentMethodDetailsByCustomer', function (Restangular) {
        return Restangular.allUrl('getPaymentMethodDetailsByCustomer');
    })//get all credit cards with details of cards

    .factory('UpdateCreditCardDetails', function (Restangular) {
        return Restangular.allUrl('updateCreditCardDetails');
    })//update details of credit card
    .factory('SaveBillingExpire', function (Restangular) {
        return Restangular.allUrl('saveBillingExpire');
    })//subscribe user to stripe
    .factory('SaveBillingExpireBuyer', function (Restangular) {
        return Restangular.allUrl('saveBillingExpireBuyer');
    })//subscribe buyer to stripe
    .factory('CreateCreditCard', function (Restangular) {
        return Restangular.allUrl('createCreditCard');
    })//add a credit card
    .factory('CardDetails', function (Restangular) {
        return Restangular.allUrl('cardDetails');
    })//get details of a card
    .factory('SetDefaultCard', function (Restangular) {
        return Restangular.allUrl('setDefaultCard');
    })//set a card as default paying card
    .factory('DeleteCard', function (Restangular) {
        return Restangular.allUrl('deleteCard');
    })//delete a card  from stripe


    




    

    
smartApp
    .factory('Photos', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'photos');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    });
smartApp
    .factory('Places', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'places');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('PlacesMap', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'places/map');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('PlacesIndex', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'places/index');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    });
smartApp.factory('ProgrammeGroups', function (Restangular, AbstractRepository) {
    function CurrentRepository()
    {
        AbstractRepository.call(this, Restangular, 'programme/groups');
    }

    AbstractRepository.extend(CurrentRepository);
    return new CurrentRepository();
});
'use strict';
smartApp
    .factory('Chat', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'messages');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();


    })
    .factory('ShowMessages', function (Restangular) {
        return Restangular.allUrl('show/messages');
    })
    .factory('ChatSlideBar', function (Restangular) {
        return Restangular.allUrl('show/chat');
    })
    .factory('ShowGroupChatMessages', function (Restangular) {
        return Restangular.allUrl('show/group/messages/{id}');
    })
    .factory('ChatSlideBarList', function (Restangular) {
        return Restangular.allUrl('chat/slideBar/list');
    })
    .factory('GroupChatSlideBar', function (Restangular) {
        return Restangular.allUrl('show/group/chat');
    });