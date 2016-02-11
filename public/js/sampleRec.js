function newRecording(){
  $('.rec-btn').removeClass('rec-inactive').addClass('rec-active');
  setTimeout(function(){
    $('.rec-btn').removeClass('rec-active').addClass('rec-inactive');
  }, 2000);
}

function setRecListener(){
  $('.rec-btn').click(function(){
    newRecording();
  });
}

$(function(){
  setRecListener();
});
