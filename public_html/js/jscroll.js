
$(document).scroll(function(){
  var docH=$(document).height();
  var windowH=$(window).height();
  var windowS=$(document).scrollTop();
  if(windowS>=200){
    $('#top').fadeIn(100);
  }
  else
  {
    $('#top').fadeOut(100);
  }
});

$('#top #up').on('click',function(e){
  $('html').animate({'scrollTop':0},'slow');
  e.preventDefault();
});
