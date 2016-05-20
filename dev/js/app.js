(function () {
  'use strict';

  var app = angular.module('SlackClone', ['ngMaterial']);


  app.controller('GroupSelectController', function() {
    this.selectedGroup = '';
    this.groups = ['Juan\'s Group', 'Other Group'];
  });

  app.controller('AppDrawerController', function(){

  });

  app.controller('SectionUnreadController', function(){
    this.title = "Channels";
    this.items = [
      { name: 'changes', link : "#" },
      { name: 'general', link : "#" },
      { name: 'marketing', link : "#" },
      { name: 'products', link : "#" },
      { name: 'random', link : "#" },
      { name: 'sales', link : "#" },
      { name: 'support', link : "#" }
    ];
  });

  app.controller('DirectMessagesController', function(){
      this.dms  =[
        { name: 'slack bot', threadId: 'some threadId' },
        { name: 'david', threadId: 'some threadId' },
        { name: 'don', threadId: 'some threadId' },
        { name: 'eric', threadId: 'some threadId' },
        { name: 'jessica', threadId: 'some threadId' },
        { name: 'liz', threadId: 'some threadId' },
        { name: 'myles', threadId: 'some threadId' },
        { name: 'steweart', threadId: 'some threadId' },
        { name: 'tara', threadId: 'some threadId' }
      ];
  });

  app.controller('ThreadMessagesController', function(){
    this.messages = [
      { name: 'Juan Meza', title: "Monthly Meeting", body: "Hey Guys... We are having a coorporate meeting tonight"},
      { name: 'John Doe', title: "Can't Make it", body: "Sorry Man I can't make it that day."},
      { name: 'Jane Doe', title: "Me either", body: "My daughter's ballet recital uis that day"},
      { name: 'Dolores Amet', title: "Aswesome message", body: "Holly balls man! This shit be awesome"},
      { name: 'Lorem Ipsum', title: "Aswesome message", body: "Holly balls man! This shit be awesome"}
    ];
  });
})();

window.onload = (function(){
  var hamburger = document.getElementById('hamburger');
  var nav_drawer = document.getElementById('nav_drawer');

  var nav_back_drop = document.getElementById('nav_back_drop');

  var settings_button = document.getElementById('settings_button');
  var options_menu = document.getElementById('options_menu');

  function toggleMenu( e ){
    e.stopPropagation();
    if ( e.target === hamburger || e.target === nav_back_drop ) {
      nav_drawer.classList.toggle('open');
    }

  }

  function showSettingsMenu( e ){
    e.stopPropagation();
    options_menu.classList.toggle('open');
  }

  settings_button.addEventListener('click', showSettingsMenu );
  settings_button.addEventListener('touch', showSettingsMenu );
  document.body.addEventListener('click', toggleMenu );
  document.body.addEventListener('touch', toggleMenu );
});
