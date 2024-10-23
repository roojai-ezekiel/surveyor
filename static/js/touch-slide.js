$(document).ready(function () {
  //   createNewSlick();
});

function createNewSlick(id) {
  $('#' + id).on('init', function (event, slick) {
      console.log("Init Slick", slick);
      console.log("Init Slick getDotCount", slick.slideCount);
      $(".slick-dots").css('width', (35 * slick.slideCount));
      //set left from real width - content width
      $(".slick-dots").css('left', (document.documentElement.clientWidth - (35 * slick.slideCount)) / 2)
    })
    .on('beforeChange', function (event, slick, currentSlide, nextSlide) {})
    .on('afterChange', function (event, slick, currentSlide, nextSlide) {
      $(".btn-mini").removeClass("active");
      $('.btn-mini').eq(slick.currentSlide).addClass('active');
    });
  $('#' + id).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    // autoplaySpeed: 3000,
    arrows: true,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    dots: true,
    pauseOnHover: false,
    customPaging: function (slider, i) {
      return '<div><div class="btn-mini ' + (i == 0 ? 'active' : '') + '">' + (i + 1) + '</div>';
    },
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }, {
      breakpoint: 520,
      settings: {
        slidesToShow: 1
      }
    }]
  });
}
// customPaging: function (slider, i) {
//     return '<div><div class="btn-mini '+(i==0?'active':'')+'">' + (i + 1) + '</div>';
//     $(".btn-mini").removeClass("active");
//   }
