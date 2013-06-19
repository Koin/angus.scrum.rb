"use strict";var apiServer="api-scrum-rb.herokuapp.com";angular.module("angus.scrum.rbApp",["ngResource"]).config(["$routeProvider",function(r){r.when("/",{templateUrl:"/views/main.html",controller:"MainCtrl"}).when("/product/:productId/stories.html",{templateUrl:"/views/stories.html",controller:"StoryCtrl"}).otherwise({redirectTo:"/"})}]).factory("Products",["$resource",function(r){return r("http://"+apiServer+"/products/:id",{id:"@id"},{get:{method:"GET"},query:{method:"GET",isArray:!0},save:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}})}]).factory("Stories",["$resource",function(r){return r("http://"+apiServer+"/stories/:id",{id:"@id"},{query:{method:"GET",isArray:!0},save:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}})}]),angular.module("angus.scrum.rbApp").directive("drag",["$rootScope",function(r){function t(r,t,e){t.addClass(e),r.dataTransfer.setData("id",r.target.id),r.dataTransfer.effectAllowed="move"}function e(r,t,e){t.removeClass(e)}return{restrict:"A",link:function(o,d,s){s.$set("draggable","true"),o.dragData=o[s.drag],o.dragStyle=s.dragStyle,d.bind("dragstart",function(e){r.draggedElement=o.dragData,t(e,d,o.dragStyle)}),d.bind("dragend",function(r){e(r,d,o.dragStyle)})}}}]).directive("drop",["$rootScope",function(r){function t(r,t,e){r.preventDefault(),t.addClass(e)}function e(r,t,e){t.removeClass(e)}function o(r){r.preventDefault()}function d(r,t,e){r.preventDefault(),t.removeClass(e)}return{restrict:"A",link:function(s,n,a){s.dropData=s[a.drop],s.dropStyle=a.dropStyle,n.bind("dragenter",function(r){t(r,n,s.dropStyle)}),n.bind("dragleave",function(r){e(r,n,s.dropStyle)}),n.bind("dragover",o),n.bind("drop",function(t){d(t,n,s.dropStyle),r.$broadcast("dropEvent",r.draggedElement,s.dropData)})}}}]),angular.module("angus.scrum.rbApp").controller("MainCtrl",["$scope","Products",function(r,t){r.products=t.query(),r.edit=function(t){r.product=t},r.save=function(){r.product.$save?r.product.$save():r.products.push(t.create(r.product))},r.delete=function(t,e,o){o.stopPropagation(),r.products.splice(e,1),t.$destroy()}}]),angular.module("angus.scrum.rbApp").controller("StoryCtrl",["$scope","$rootScope","$routeParams","Products","Stories",function(r,t,e,o,d){r.productId=e.productId,r.product=o.get({id:r.productId}),r.stories=d.query({productId:r.productId}),r.edit=function(t){r.story=t},r.save=function(){r.story.productId=r.productId,r.story.$save?r.story.$save():r.stories.push(d.create(r.story))},r.delete=function(t,e,o){o.stopPropagation(),r.stories.splice(e,1),t.$destroy()},t.$on("dropEvent",function(t,e,o){var d,s,n;for(d=0;r.stories.length>d;d++){var a=r.stories[d];e.id===a.id&&(s=d),o.id===a.id&&(n=d)}var i=r.stories[s];r.stories[s]=r.stories[n],r.stories[n]=i,r.stories[s].order=s,r.stories[s].$save(),r.stories[n].order=n,r.stories[n].$save()})}]);