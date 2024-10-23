var ThemeControl = {};
ThemeControl.currentPage = 'neutral';

ThemeControl.isModeLg = function() {
  return $(window).width() >= 1024 ? true : false;
};
ThemeControl.detectMode = function() {
    if( ThemeControl.currentPage == 'neutral' ){
        //console.log(ThemeControl.currentPage);
        return false;
    }
    
    if (ThemeControl.isModeLg()) {
      $("body").removeClass("mode-sm mode-sm-open").addClass("mode-lg");
    } else {
      $("body").removeClass("mode-lg mode-sm-open").addClass("mode-sm");
    }
};

ThemeControl.sideBarState = function(state) {
  if (ThemeControl.isModeLg()) {
    return false;
  }

  if (state === "show") {
    $("body").removeClass("mode-sm mode-lg").addClass("mode-sm-open");
  } else {
    $("body").removeClass("mode-lg mode-sm-open").addClass("mode-sm");
  }
};

ThemeControl.setNeutral = function(){
    $("body").removeClass("mode-sm mode-sm-open mode-lg");
}

ThemeControl.appHeight = function(){
    var contentHeight = ( $("#main-content-slot").height() + 120 ) + ( $('footer').height() + 45 );
    var bodyHeight = $("body").height() + ( $('footer').height() + 150 );
    if( $(window).height() < bodyHeight ){ //$(window).height() < contentHeight
        $('footer').removeClass('fixed-bottom');
    }else{
        $('footer').addClass('fixed-bottom');
    }
}

$(document).on("click", ".navbar-toggler", function() {
  ThemeControl.sideBarState("show");
});

$(document).on("click", ".close-btn", function() {
  ThemeControl.sideBarState("hide");
});

$(window).on("resize", function() {
    //console.log('Screen changed!');
  ThemeControl.detectMode();
  ThemeControl.appHeight();
});

$(window).on("load", function() {
  ThemeControl.appHeight();
});
