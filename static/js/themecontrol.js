$(window).resize(setContentHeight)

$(document).on('click', '.btn-mini', function () {
  var current = document.getElementsByClassName("active");
  $(".btn-mini").removeClass("active");
  console.log("$(this)", $(this));
  $(this).addClass("active");
});

function defaultBtnActive() {
  console.log(".btn-mini", $(".btn-mini"));
  $.each($(".btn-mini"), function (index, value) {
    console.log("value", value);
    if (index == 0) {
      $(value).addClass("active");
    }
  });
}

function initScreen(flagNoHeader) {
  setContentHeight(flagNoHeader);
  checkLoginObj();
  //Device Ready For function view back button
  // document.addEventListener("deviceready", onDeviceReady, false);
}

// function onDeviceReady() {
//   document.addEventListener("backbutton", onBackKeyDown, false); //Listen to the User clicking on the back button
// }

// function onBackKeyDown(e) {
//   e.preventDefault();
//   navigator.notification.confirm($t("mainmenu.label.do.you.need.to.exit"), onConfirm, "Confirmation", "Yes,No");
//   // Prompt the user with the choice
// }

function onConfirm(button) {
  if (button == 2) { //If User selected No, then we just do nothing
    return;
  } else {
    navigator.app.exitApp(); // Otherwise we quit the app.
  }
}

function setContentHeight(flagNoHeader) {
  var footerH = (flagNoHeader ? 120 : 70);
  var hContent = document.documentElement.clientHeight - footerH;
  $(".wrapper-content").height(hContent);
}

function checkLoginObj() {
  if (localStorage.getItem("user_obj")) {
    $("#div_toggle").show();
  } else {
    $("#div_toggle").hide();
  }
}




// ******************************************
var ThemeControl = {};
ThemeControl.isModeLg = function () {
  // return $(window).width() > 800 ? true : false;
};
ThemeControl.detectMode = function () {
  if (ThemeControl.isModeLg()) {
    $('body').removeClass('mode-sm').removeClass('mode-sm-open');
    $('body').addClass('mode-lg');
  } else {
    if ($('body').hasClass('mode-lg')) {
      $('body').removeClass('mode-lg');
    }

    if (!$('body').hasClass('mode-sm-open') || !$('body').hasClass('mode-sm')) {
      $('body').addClass('mode-sm');
    }
  }
};


ThemeControl.sideBarState = function (state) {
  if (ThemeControl.isModeLg()) {
    return false;
  }

  if (state === 'show') {
    $('body').removeClass('mode-sm').removeClass('mode-lg').addClass('mode-sm-open');
  } else {
    $('body').removeClass('mode-sm-open').removeClass('mode-lg').addClass('mode-sm');
  }
};

$(document).on('click', '.navbar-toggler', function () {
  // alert('navbar-toggler');
  ThemeControl.sideBarState('show');
});

$(document).on('click', '.close-btn', function () {
  // alert('close-btn');
  ThemeControl.sideBarState('hide');
});

$(window).on('resize', function () {
  // alert('resize');
  ThemeControl.detectMode();
});

$(window).on('load', function () {
  // alert('load');
  ThemeControl.detectMode();
});
