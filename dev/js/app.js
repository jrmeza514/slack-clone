(function () {
  'use strict';
  angular
      .module('SlackClone', ['ngMaterial'])
      .controller('GroupSelectController', function() {
        this.selectedGroup = '';
        this.groups = ['Juan\'s Group', 'Other Group'];
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
