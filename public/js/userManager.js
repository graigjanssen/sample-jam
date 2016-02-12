function setUserModalHandler(){
  $('.circle-btn').click(function(e){
    // Will return 'signup-btn' or 'login-btn'
    var btnClass = e.currentTarget.classList[1];
    $('.modal').css('display', 'block');
    if (btnClass === "signup-btn"){
      $('#signup').show();
    } else if (btnClass === "login-btn"){
      $('#login').show();
    }
  });
}

function setModalCloseListener(){
    $('.close-modal').click(function(){
      // Hide Modal //
      $('.modal').hide();
      // Reset User Forms //
      $('#signup').hide();
      $('#login').hide();
    });
}

$(function(){
  setUserModalHandler();
  setModalCloseListener();
});
