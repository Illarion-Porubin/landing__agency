$(function() {
  $('.our__slider').slick({
    centerMode: true,//true
    dots: false,
    infinite: true,
    arrows: true,
    cssEase: 'linear',
    centerPadding: '0%', // обрезаем фото по бокам
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: '<button type="button" class="slick-arrow slick-next"><img src="images/next-arrow.png" alt="next arrow"></button>',
    prevArrow: '<button type="button" class="slick-arrow slick-prev"><img src="images/prev-arrow.png" alt="prev arrow"></button>',
    responsive: [
      {
        breakpoint: 1480,
        settings: {
          arrows: false,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          centerMode: true,//true
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 680,
        settings: {
          arrows: false,
          centerMode: true,//true
          slidesToShow: 1,
        }
      }
    ]
  });

  // menu-btn

  $(".header__btn").on("click", function () {
    $(".header__list").toggleClass("active");
    $(".header__btn").toggleClass("active");
  });

 
})