function sendToSampler(){
  audioRecorder.exportWAV(function(blob){
    var url = URL.createObjectURL(blob);
    console.log(url);
    $('#mod1').attr('src', url);
  });
}

function newRecording(){
  $('.rec-btn').removeClass('rec-inactive').addClass('rec-active');
  audioRecorder.clear();
  audioRecorder.record();
  setTimeout(function(){
    $('.rec-btn').removeClass('rec-active').addClass('rec-inactive');
    audioRecorder.stop();
    sendToSampler();
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
