




$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-50
        }, 1000);
        return false;
      }
    }
  });
});




// Add class to header

$(window).scroll(function() {    
  var scroll = $(window).scrollTop();
  var $heightcheck = $('#heads');
  
  if (scroll > $heightcheck.height()-64) {
    $(".clearHeader").addClass("whiteHeader");
  } else {
    $(".clearHeader").removeClass("whiteHeader");
  }
});


// 2nd spyscroll

// Cache selectors
var lasttId,
    toppMenu = $(".top-menu"),
    headerHa = $("#ha-header"),
    toppMenuHeight = headerHa.outerHeight()+30,
    // All list items
    menuuItems = toppMenu.find("a"),
    // Anchors corresponding to menu items
    scrolllItems = menuuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });



// Bind to scroll
$(window).scroll(function(){
  // Get container scroll position
  var fromTop = $(this).scrollTop()+toppMenuHeight;
  
  // Get id of current scroll item
  var cur = scrolllItems.map(function(){
    if ($(this).offset().top < fromTop)
      return this;
  });
  // Get the id of the current element
  cur = cur[cur.length-1];
  var id = cur && cur.length ? cur[0].id : "";
  
  if (lasttId !== id) {
    lasttId = id;
    // Set/remove active class
    menuuItems
    .parent().removeClass("active")
    .end().filter("[href=#"+id+"]").parent().addClass("active");
  }                   
});

// SPYSCROLL AFFIX

// Cache selectors
var lastId,
    topMenu = $("#plx"),
    headerHa = $("#ha-header"),
    topMenuHeight = headerHa.outerHeight()+10,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });



// Bind to scroll
$(window).scroll(function(){
  // Get container scroll position
  var fromTop = $(this).scrollTop()+topMenuHeight;
  
  // Get id of current scroll item
  var cur = scrollItems.map(function(){
    if ($(this).offset().top < fromTop)
      return this;
  });
  // Get the id of the current element
  cur = cur[cur.length-1];
  var id = cur && cur.length ? cur[0].id : "";
  
  if (lastId !== id) {
    lastId = id;
    // Set/remove active class
    menuItems
    .parent().removeClass("current")
    .end().filter("[href=#"+id+"]").parent().addClass("current");
  }                   
});


/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {
  
  'use strict';
  
  // class helper functions from bonzo https://github.com/ded/bonzo
  
  function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }
  
  // classList support for class management
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;
  
  if ( 'classList' in document.documentElement ) {
    hasClass = function( elem, c ) {
      return elem.classList.contains( c );
    };
    addClass = function( elem, c ) {
      elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
      elem.classList.remove( c );
    };
  }
  else {
    hasClass = function( elem, c ) {
      return classReg( c ).test( elem.className );
    };
    addClass = function( elem, c ) {
      if ( !hasClass( elem, c ) ) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function( elem, c ) {
      elem.className = elem.className.replace( classReg( c ), ' ' );
    };
  }
  
  function toggleClass( elem, c ) {
    var fn = hasClass( elem, c ) ? removeClass : addClass;
    fn( elem, c );
  }
  
  var classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };
  
  // transport
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( classie );
  } else {
    // browser global
    window.classie = classie;
  }
  
})( window );


/**
 * dialogFx.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
  
  'use strict';
  
  var support = { animations : Modernizr.cssanimations },
      animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
      animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
      onEndAnimation = function( el, callback ) {
        var onEndCallbackFn = function( ev ) {
          if( support.animations ) {
            if( ev.target != this ) return;
            this.removeEventListener( animEndEventName, onEndCallbackFn );
          }
          if( callback && typeof callback === 'function' ) { callback.call(); }
        };
        if( support.animations ) {
          el.addEventListener( animEndEventName, onEndCallbackFn );
        }
        else {
          onEndCallbackFn();
        }
      };
  
  function extend( a, b ) {
    for( var key in b ) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }
  
  function DialogFx( el, options ) {
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );
    this.ctrlClose = this.el.querySelector( '[data-dialog-close]' );
    this.isOpen = false;
    this._initEvents();
  }
  
  DialogFx.prototype.options = {
    // callbacks
    onOpenDialog : function() { return false; },
    onCloseDialog : function() { return false; }
  }
  
  DialogFx.prototype._initEvents = function() {
    var self = this;
    
    // close action
    this.ctrlClose.addEventListener( 'click', this.toggle.bind(this) );
    
    // esc key closes dialog
    document.addEventListener( 'keydown', function( ev ) {
      var keyCode = ev.keyCode || ev.which;
      if( keyCode === 27 && self.isOpen ) {
        self.toggle();
      }
    } );
    
    this.el.querySelector( '.dialog__overlay' ).addEventListener( 'click', this.toggle.bind(this) );
  }
  
  DialogFx.prototype.toggle = function() {
    var self = this;
    if( this.isOpen ) {
      classie.remove( this.el, 'dialog--open' );
      classie.add( self.el, 'dialog--close' );
      
      onEndAnimation( this.el.querySelector( '.dialog__content' ), function() {
        classie.remove( self.el, 'dialog--close' );
      } );
      
      // callback on close
      this.options.onCloseDialog( this );
    }
    else {
      classie.add( this.el, 'dialog--open' );
      
      // callback on open
      this.options.onOpenDialog( this );
    }
    this.isOpen = !this.isOpen;
  };
  
  // add to global namespace
  window.DialogFx = DialogFx;
  
})( window );


// Animation

(function() {
  var support = { animations : Modernizr.cssanimations },
      animEndEventNames = {
        'WebkitAnimation' : 'webkitAnimationEnd',
        'OAnimation' : 'oAnimationEnd',
        'msAnimation' : 'MSAnimationEnd',
        'animation' : 'animationend'
      },
      // animation end event name
      animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
      effectSel = document.getElementById( 'fxselect' ),
      component = document.getElementById( 'component' ),
      items = component.querySelector( 'ul.itemwrap' ).children,
      current = 0,
      itemsCount = items.length,
      nav = component.querySelector( 'nav' ),
      navNext = nav.querySelector( '.next' ),
      navPrev = nav.querySelector( '.prev' ),
      isAnimating = true;
  
  function init() {
    hideNav();
    changeEffect();
    navNext.addEventListener( 'click', function( ev ) { ev.preventDefault(); navigate( 'next' ); } );
    navPrev.addEventListener( 'click', function( ev ) { ev.preventDefault(); navigate( 'prev' ); } );
    
  }
  
  function hideNav() {
    nav.style.display = 'none';
  }
  
  function showNav() {
    nav.style.display = 'block';
  }
  
  function changeEffect() {
    
    showNav();
    
    
  }
  
  function navigate( dir ) {
    
    isAnimating = true;
    var cntAnims = 0;
    
    
    var currentItem = items[ current ];
    
    if( dir === 'next' ) {
      current = current < itemsCount - 1 ? current + 1 : 0;
    }
    else if( dir === 'prev' ) {
      current = current > 0 ? current - 1 : itemsCount - 1;
    }
      
      var nextItem = items[ current ];
    
    var onEndAnimationCurrentItem = function() {
      this.removeEventListener( animEndEventName, onEndAnimationCurrentItem );
      classie.removeClass( this, 'current' );
      classie.removeClass( this, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
      ++cntAnims;
      if( cntAnims === 2 ) {
        isAnimating = false;
      }
    }
    
    var onEndAnimationNextItem = function() {
      this.removeEventListener( animEndEventName, onEndAnimationNextItem );
      classie.addClass( this, 'current' );
      classie.removeClass( this, dir === 'next' ? 'navInNext' : 'navInPrev' );
      ++cntAnims;
      if( cntAnims === 2 ) {
        isAnimating = false;
      }
    }
    
    if( support.animations ) {
      currentItem.addEventListener( animEndEventName, onEndAnimationCurrentItem );
      nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
    }
    else {
      onEndAnimationCurrentItem();
      onEndAnimationNextItem();
    }
    
    classie.addClass( currentItem, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
    classie.addClass( nextItem, dir === 'next' ? 'navInNext' : 'navInPrev' );
  }
  
  init();
})();

/*global jQuery */
/*!	
* Lettering.JS 0.6.1
*
* Copyright 2010, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Thanks to Paul Irish - http://paulirish.com - for the feedback.
*
* Date: Mon Sep 20 17:14:00 2010 -0600
*/
(function($){
  function injector(t, splitter, klass, after) {
    var a = t.text().split(splitter), inject = '';
    if (a.length) {
      $(a).each(function(i, item) {
        inject += '<span class="'+klass+(i+1)+'">'+item+'</span>'+after;
      });	
      t.empty().append(inject);
    }
  }
  
  var methods = {
    init : function() {
      
      return this.each(function() {
        injector($(this), '', 'char', '');
      });
      
    },
    
    words : function() {
      
      return this.each(function() {
        injector($(this), ' ', 'word', ' ');
      });
      
    },
    
    lines : function() {
      
      return this.each(function() {
        var r = "eefec303079ad17405c889e092e105b0";
        // Because it's hard to split a <br/> tag consistently across browsers,
        // (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
        // (of the word "split").  If you're trying to use this plugin on that 
        // md5 hash string, it will fail because you're being ridiculous.
        injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
      });
      
    }
  };
  
  $.fn.lettering = function( method ) {
    // Method calling logic
    if ( method && methods[method] ) {
      return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
    } else if ( method === 'letters' || ! method ) {
      return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
    }
      $.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
    return this;
  };
  
})(jQuery);