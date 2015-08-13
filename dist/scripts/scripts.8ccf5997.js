"use strict";angular.module("spotifyAngularApp",["ngAnimate","ngResource","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("spotifyAngularApp").value("URL","http://localhost:8001/"),angular.module("spotifyAngularApp").controller("MainCtrl",["$scope","$location","$rootScope","$routeParams","Controlls","URL",function(a,b,c,d,e,f){a.name="Press Ip Button to get Ip Addr of server",a.songObj,a.hostButton="Press If u are the host",a.playBtn="btn btn-primary",a.setIp=function(){f="http://",f+=a.myIp,f+=":",f+=a.myPort,f+="/",console.log("The url is : "+f)},a.getIp=function(){e.ip().success(function(b){a.hostButton="http://"+b.ip+":"+b.port}).error(function(b){a.hostButton="Error getting host info",console.log("ip error "+b)})},a.play=function(){a.playBtn="btn btn-primary jelly",e.play().success(function(){console.log("Play success")}).error(function(a){console.log("Play error"+a)}),setTimeout(function(){a.playBtn="btn btn-primary"},500)},a.pause=function(){e.pause().success(function(){console.log("Pause success")}).error(function(a){console.log("Pause error"+a)})},a.getUrl=function(){a.name=f},a.next=function(){e.next().success(function(){console.log("next success")}).error(function(a){console.log("next error"+a)})},a.prev=function(){e.prev().success(function(){console.log("Prev success")}).error(function(a){console.log("Prev error"+a)})},setInterval(function(){e.getCurrent().success(function(b){a.songObj!==b&&(a.songObj=b,a.name=b.song,a.name+=" / "+b.artist)}).error(function(a){console.log("error getting current song"+a)})},5e3)}]),angular.module("spotifyAngularApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("spotifyAngularApp").factory("Controlls",["$http",function(a){return{play:function(){return a.get("play")},pause:function(){return a.get("pause")},ip:function(){return a.get("ip")},next:function(){return a.get("next")},prev:function(){return a.get("prev")},getCurrent:function(){return a.get("currSong")}}}]),angular.module("spotifyAngularApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="well"> <h1>GitHub Repositories</h1> <h2><a href="https://github.com/kristinn93/spotifynodejs-applecontroll">Node Backend</a></h2> <h2><a href="https://github.com/kristinn93/spotify-angular">Angular Frontend</a></h2> </div>'),a.put("views/main.html",'<div class="jumbotron"> <p>{{name}}</p> <button class="btn btn-warning" ng-click="prev()">Previous Song</button> <button ng-class="playBtn" class="btn btn-primary" ng-click="play()">Play/Pause</button> <!--<button class="btn btn-info" ng-click="pause()">Pause</button>--> <button class="btn btn-success" ng-click="next()">Next Song</button> </div> <button class="btn btn-danger" ng-click="getIp()">{{hostButton}}</button>')}]);