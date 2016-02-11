function bs(){
  $(window).on('keypress', function(e){
    if (e.keyCode === 97){
      $('#mod1').get(0).play();
    }
  });
}

$(function(){
  bs();
});
