$('.slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor:'.slider-item__buttons'
});

$('.slider-item__buttons').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
    asNavFor:'.slider'
});